use futures::{SinkExt, StreamExt};
use reqwest;
use serde::{Deserialize, Serialize};
use std::sync::{Arc, Mutex};
use tokio::sync::mpsc;
use tokio_tungstenite::{connect_async, tungstenite::protocol::Message};

use crate::config::{AuthResponse, PlatformConfig, ProcessResponse, TranscriptionMessage};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AuthRequest {
    pub device_id: String,
    pub app_version: String,
}

pub struct StreamingAsrService {
    config: PlatformConfig,
    session_token: Option<String>,
    client: reqwest::Client,
}

impl StreamingAsrService {
    pub fn new(config: PlatformConfig) -> Self {
        Self {
            config,
            session_token: None,
            client: reqwest::Client::new(),
        }
    }

    pub async fn authenticate(
        &mut self,
        device_id: &str,
        app_version: &str,
    ) -> Result<String, String> {
        let auth_url = format!("{}{}", self.config.base_url, self.config.auth_endpoint);

        let request = AuthRequest {
            device_id: device_id.to_string(),
            app_version: app_version.to_string(),
        };

        let response = self
            .client
            .post(&auth_url)
            .header("Content-Type", "application/json")
            .json(&request)
            .send()
            .await
            .map_err(|e| format!("Failed to send auth request: {}", e))?;

        if !response.status().is_success() {
            let error_text = response
                .text()
                .await
                .unwrap_or_else(|_| "Unknown error".to_string());
            return Err(format!("Auth API error: {}", error_text));
        }

        let auth_response: AuthResponse = response
            .json()
            .await
            .map_err(|e| format!("Failed to parse auth response: {}", e))?;

        if !auth_response.success {
            return Err("Authentication failed".to_string());
        }

        let token = auth_response
            .session_token
            .ok_or("No session token in response")?;
        self.session_token = Some(token.clone());
        Ok(token)
    }

    pub async fn start_streaming_transcription(
        &self,
        audio_receiver: mpsc::Receiver<Vec<u8>>,
    ) -> Result<String, String> {
        let token = self
            .session_token
            .as_ref()
            .ok_or("Not authenticated")?;

        let ws_url = format!("{}?token={}", self.config.ws_transcribe_url, token);

        let (ws_stream, _) = connect_async(&ws_url)
            .await
            .map_err(|e| format!("Failed to connect to WebSocket: {}", e))?;

        let (mut write, mut read) = ws_stream.split();
        let transcription = Arc::new(Mutex::new(String::new()));
        let transcription_clone = transcription.clone();

        // Spawn task to receive transcription messages
        let recv_task = tokio::spawn(async move {
            while let Some(msg) = read.next().await {
                match msg {
                    Ok(Message::Text(text)) => {
                        if let Ok(trans_msg) = serde_json::from_str::<TranscriptionMessage>(&text)
                        {
                            let mut trans = transcription_clone.lock().unwrap();
                            if !trans.is_empty() {
                                trans.push(' ');
                            }
                            trans.push_str(&trans_msg.text);
                        }
                    }
                    Ok(Message::Close(_)) => break,
                    Err(_) => break,
                    _ => {}
                }
            }
        });

        // Send audio chunks
        let mut receiver = audio_receiver;
        while let Some(audio_chunk) = receiver.recv().await {
            let binary_msg = Message::Binary(audio_chunk);
            if write.send(binary_msg).await.is_err() {
                break;
            }
        }

        // Signal end of stream
        let _ = write.close().await;

        // Wait for all transcriptions
        let _ = recv_task.await;

        let final_transcription = transcription.lock().unwrap().clone();
        Ok(final_transcription)
    }

    pub async fn process_transcript(&self, transcription: &str) -> Result<String, String> {
        let token = self.session_token.as_ref().ok_or("Not authenticated")?;

        let process_url = format!("{}{}", self.config.base_url, self.config.process_endpoint);

        let response = self
            .client
            .post(&process_url)
            .header("Authorization", format!("Bearer {}", token))
            .header("Content-Type", "application/json")
            .json(&serde_json::json!({ "transcript": transcription }))
            .send()
            .await
            .map_err(|e| format!("Failed to send process request: {}", e))?;

        if !response.status().is_success() {
            let error_text = response
                .text()
                .await
                .unwrap_or_else(|_| "Unknown error".to_string());
            return Err(format!("Process API error: {}", error_text));
        }

        let process_response: ProcessResponse = response
            .json()
            .await
            .map_err(|e| format!("Failed to parse process response: {}", e))?;

        Ok(process_response.processed_text)
    }
}
