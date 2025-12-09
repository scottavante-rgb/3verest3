use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PlatformConfig {
    pub base_url: String,
    pub ws_transcribe_url: String,
    pub auth_endpoint: String,
    pub process_endpoint: String,
}

impl Default for PlatformConfig {
    fn default() -> Self {
        Self {
            base_url: "http://localhost:9000".to_string(),
            ws_transcribe_url: "ws://localhost:9000/ws/asr".to_string(),
            auth_endpoint: "/health".to_string(),
            process_endpoint: "/end-dictation".to_string(),
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AudioConfig {
    pub sample_rate: u32,
    pub channels: u16,
    pub chunk_ms: u32,
}

impl Default for AudioConfig {
    fn default() -> Self {
        Self {
            sample_rate: 16000,
            channels: 1,
            chunk_ms: 250,
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct WeaveConfig {
    pub platform: PlatformConfig,
    pub audio: AudioConfig,
    pub auto_paste: bool,
    pub device_id: String,
    pub app_version: String,
    pub session_token: Option<String>,
}

impl Default for WeaveConfig {
    fn default() -> Self {
        Self {
            platform: PlatformConfig::default(),
            audio: AudioConfig::default(),
            auto_paste: true,
            device_id: "weave-desktop".to_string(),
            app_version: "0.1.0".to_string(),
            session_token: None,
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AuthResponse {
    pub success: bool,
    pub session_token: Option<String>,
    pub endpoints: Option<serde_json::Value>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ProcessResponse {
    #[serde(rename = "processedText")]
    pub processed_text: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TranscriptionMessage {
    pub text: String,
}
