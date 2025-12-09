use arboard::Clipboard;
use base64::{engine::general_purpose::STANDARD as BASE64, Engine};
use serde::{Deserialize, Serialize};
use std::sync::{Arc, Mutex};
use std::time::Instant;
use tauri::{
    menu::{Menu, MenuItem},
    tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent},
    Manager, State,
};
use tokio::sync::mpsc;
use window_vibrancy::{apply_vibrancy, NSVisualEffectMaterial};

mod asr;
mod audio;
mod config;

use asr::StreamingAsrService;
use audio::AudioRecorder;
use config::WeaveConfig;

// Global state - use Arc for audio recorder to avoid Send issues
struct AppState {
    recording: Mutex<bool>,
    config: Mutex<WeaveConfig>,
    asr_service: Mutex<Option<StreamingAsrService>>,
    audio_sender: Mutex<Option<mpsc::Sender<Vec<u8>>>>,
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn authenticate(state: State<'_, AppState>) -> Result<String, String> {
    let (device_id, app_version, platform_config) = {
        let config = state.config.lock().map_err(|e| e.to_string())?;
        (
            config.device_id.clone(),
            config.app_version.clone(),
            config.platform.clone(),
        )
    };

    let mut service = StreamingAsrService::new(platform_config);
    let token = service.authenticate(&device_id, &app_version).await?;

    {
        let mut config = state.config.lock().map_err(|e| e.to_string())?;
        config.session_token = Some(token.clone());
    }

    {
        let mut asr_service = state.asr_service.lock().map_err(|e| e.to_string())?;
        *asr_service = Some(service);
    }

    Ok(token)
}

#[tauri::command]
async fn start_recording(state: State<'_, AppState>) -> Result<String, String> {
    {
        let recording = state.recording.lock().map_err(|e| e.to_string())?;
        if *recording {
            return Err("Already recording".to_string());
        }
    }

    // Skip authentication check for now - allow recording without server connection
    // This enables testing the UI without the 3cko platform running

    // Create channel for audio streaming
    let (tx, _rx) = mpsc::channel::<Vec<u8>>(100);

    {
        let mut audio_sender = state.audio_sender.lock().map_err(|e| e.to_string())?;
        *audio_sender = Some(tx);
    }

    // Start audio recording in a separate thread (to avoid Send issues)
    let audio_config = {
        let config = state.config.lock().map_err(|e| e.to_string())?;
        config.audio.clone()
    };

    std::thread::spawn(move || {
        eprintln!("Audio recording thread started");
        let mut recorder = AudioRecorder::new();
        match recorder.start_streaming(audio_config.sample_rate) {
            Ok(_) => eprintln!("Audio recording finished"),
            Err(e) => eprintln!("Failed to start recording: {}", e),
        }
    });

    {
        let mut recording = state.recording.lock().map_err(|e| e.to_string())?;
        *recording = true;
    }

    Ok("Recording started".to_string())
}

#[tauri::command]
async fn stop_recording(state: State<'_, AppState>) -> Result<String, String> {
    {
        let mut recording = state.recording.lock().map_err(|e| e.to_string())?;
        if !*recording {
            return Err("Not recording".to_string());
        }
        *recording = false;
    }

    // For now, return a placeholder - real implementation will stream audio
    // Drop the audio sender to signal end of stream
    {
        let mut audio_sender = state.audio_sender.lock().map_err(|e| e.to_string())?;
        *audio_sender = None;
    }

    // Process the transcript (placeholder for now)
    let processed_text = "Recording stopped. Transcription processing...".to_string();

    // Copy to clipboard if enabled
    let should_paste = {
        let config = state.config.lock().map_err(|e| e.to_string())?;
        config.auto_paste
    };

    if should_paste {
        let mut clipboard =
            Clipboard::new().map_err(|e| format!("Clipboard error: {}", e))?;
        clipboard
            .set_text(&processed_text)
            .map_err(|e| format!("Failed to copy to clipboard: {}", e))?;
    }

    Ok(processed_text)
}

#[tauri::command]
fn is_recording(state: State<AppState>) -> bool {
    *state.recording.lock().unwrap_or_else(|e| e.into_inner())
}

#[tauri::command]
fn is_authenticated(state: State<AppState>) -> bool {
    let config = state.config.lock().unwrap_or_else(|e| e.into_inner());
    config.session_token.is_some()
}

#[tauri::command]
fn get_config(state: State<AppState>) -> Result<WeaveConfig, String> {
    let config = state.config.lock().map_err(|e| e.to_string())?;
    Ok(config.clone())
}

#[tauri::command]
fn update_config(state: State<AppState>, new_config: WeaveConfig) -> Result<String, String> {
    let mut config = state.config.lock().map_err(|e| e.to_string())?;
    *config = new_config;
    Ok("Configuration updated".to_string())
}

#[tauri::command]
fn copy_to_clipboard(text: String) -> Result<String, String> {
    let mut clipboard = Clipboard::new().map_err(|e| format!("Clipboard error: {}", e))?;
    clipboard
        .set_text(&text)
        .map_err(|e| format!("Failed to copy to clipboard: {}", e))?;
    Ok("Copied to clipboard".to_string())
}

// Types for the new transcription pipeline
#[derive(Debug, Serialize, Deserialize)]
pub struct TranscriptionTimings {
    #[serde(rename = "asrMs")]
    pub asr_ms: u64,
    #[serde(rename = "llmMs")]
    pub llm_ms: Option<u64>,
    #[serde(rename = "totalMs")]
    pub total_ms: u64,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct TranscriptionResponse {
    #[serde(rename = "nativeTranscript")]
    pub native_transcript: String,
    #[serde(rename = "summaryTranscript")]
    pub summary_transcript: Option<String>,
    pub timings: TranscriptionTimings,
    pub mode: String,
}

#[tauri::command]
async fn process_transcription(
    audio_base64: String,
    mode: String,
) -> Result<TranscriptionResponse, String> {
    let start_time = Instant::now();

    // Decode base64 audio
    let audio_data = BASE64
        .decode(&audio_base64)
        .map_err(|e| format!("Failed to decode audio: {}", e))?;

    // Send audio to ASR service
    let asr_start = Instant::now();
    let native_transcript = run_asr_service(&audio_data).await?;
    let asr_ms = asr_start.elapsed().as_millis() as u64;

    // Check if we need LLM cleanup
    let (summary_transcript, llm_ms, final_mode) = if mode == "ASR_PLUS_LLM" {
        let llm_start = Instant::now();
        match run_llm_cleanup_service(&native_transcript).await {
            Ok(summary) => {
                let elapsed = llm_start.elapsed().as_millis() as u64;
                (Some(summary), Some(elapsed), "ASR_PLUS_LLM".to_string())
            }
            Err(e) => {
                eprintln!("LLM cleanup failed: {}", e);
                // Fallback to ASR_ONLY if LLM fails
                (None, None, "ASR_ONLY".to_string())
            }
        }
    } else {
        (None, None, "ASR_ONLY".to_string())
    };

    let total_ms = start_time.elapsed().as_millis() as u64;

    Ok(TranscriptionResponse {
        native_transcript,
        summary_transcript,
        timings: TranscriptionTimings {
            asr_ms,
            llm_ms,
            total_ms,
        },
        mode: final_mode,
    })
}

// Real ASR implementation - sends audio to web service
async fn run_asr_service(audio_data: &[u8]) -> Result<String, String> {
    let client = reqwest::Client::new();

    // Create multipart form with audio file
    let part = reqwest::multipart::Part::bytes(audio_data.to_vec())
        .file_name("audio.webm")
        .mime_str("audio/webm")
        .map_err(|e| format!("Failed to create multipart: {}", e))?;

    let form = reqwest::multipart::Form::new().part("file", part);

    // Send to ASR service
    let response = client
        .post("http://localhost:9000/transcribe")
        .multipart(form)
        .timeout(std::time::Duration::from_secs(30))
        .send()
        .await
        .map_err(|e| format!("ASR request failed: {}", e))?;

    if !response.status().is_success() {
        return Err(format!("ASR service returned error: {}", response.status()));
    }

    // Parse response
    let json: serde_json::Value = response
        .json()
        .await
        .map_err(|e| format!("Failed to parse ASR response: {}", e))?;

    json["text"]
        .as_str()
        .map(|s| s.to_string())
        .ok_or_else(|| "ASR response missing 'text' field".to_string())
}

// LLM cleanup via 3cko backend - sends text for end-dictation processing
async fn run_llm_cleanup_service(transcript: &str) -> Result<String, String> {
    let client = reqwest::Client::new();

    let payload = serde_json::json!({
        "text": transcript
    });

    let response = client
        .post("http://localhost:9000/end-dictation")
        .header("Content-Type", "application/json")
        .json(&payload)
        .timeout(std::time::Duration::from_secs(60))
        .send()
        .await
        .map_err(|e| format!("LLM request failed: {}", e))?;

    if !response.status().is_success() {
        return Err(format!("LLM service returned error: {}", response.status()));
    }

    // Parse response
    let json: serde_json::Value = response
        .json()
        .await
        .map_err(|e| format!("Failed to parse LLM response: {}", e))?;

    // Try to get cleaned_text from new format, fallback to old format
    json["cleaned_text"]
        .as_str()
        .or_else(|| json["processedText"].as_str())
        .map(|s| s.to_string())
        .ok_or_else(|| "LLM response missing 'cleaned_text' field".to_string())
}

#[tauri::command]
async fn transcribe_audio_chunk(audio_base64: String) -> Result<String, String> {
    println!("[DIAG] transcribe_audio_chunk called, base64 length: {}", audio_base64.len());

    // Decode base64 audio chunk
    let audio_data = BASE64
        .decode(&audio_base64)
        .map_err(|e| format!("Failed to decode audio chunk: {}", e))?;

    println!("[DIAG] Decoded audio data, size: {} bytes", audio_data.len());

    // Send to ASR service for real-time transcription
    let result = run_asr_service(&audio_data).await;
    match &result {
        Ok(transcript) => println!("[DIAG] ASR service returned: {}", transcript),
        Err(e) => println!("[DIAG] ASR service error: {}", e),
    }
    result
}

#[tauri::command]
fn paste_to_active_field() -> Result<String, String> {
    // Use AppleScript to simulate Cmd+V paste into the active field
    let script = r#"
        tell application "System Events"
            keystroke "v" using command down
        end tell
    "#;

    let output = std::process::Command::new("osascript")
        .arg("-e")
        .arg(script)
        .output()
        .map_err(|e| format!("Failed to execute AppleScript: {}", e))?;

    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        return Err(format!("AppleScript error: {}", stderr));
    }

    Ok("Pasted to active field".to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .manage(AppState {
            recording: Mutex::new(false),
            config: Mutex::new(WeaveConfig::default()),
            asr_service: Mutex::new(None),
            audio_sender: Mutex::new(None),
        })
        .setup(|app| {
            // Create tray menu
            let show_hud = MenuItem::with_id(app, "show_hud", "Show 3cko HUD", true, None::<&str>)?;
            let hide_hud = MenuItem::with_id(app, "hide_hud", "Hide 3cko HUD", true, None::<&str>)?;
            let separator = tauri::menu::PredefinedMenuItem::separator(app)?;
            let settings = MenuItem::with_id(app, "settings", "Settings...", true, None::<&str>)?;
            let quit = MenuItem::with_id(app, "quit", "Quit Weave", true, None::<&str>)?;
            let menu = Menu::with_items(app, &[&show_hud, &hide_hud, &separator, &settings, &quit])?;

            // Create system tray
            let _tray = TrayIconBuilder::new()
                .icon(app.default_window_icon().unwrap().clone())
                .menu(&menu)
                .menu_on_left_click(false)
                .on_menu_event(|app, event| match event.id.as_ref() {
                    "quit" => {
                        app.exit(0);
                    }
                    "show_hud" => {
                        if let Some(window) = app.get_webview_window("floating") {
                            let _ = window.show();
                            let _ = window.set_focus();
                        }
                    }
                    "hide_hud" => {
                        if let Some(window) = app.get_webview_window("floating") {
                            let _ = window.hide();
                        }
                    }
                    "settings" => {
                        if let Some(window) = app.get_webview_window("main") {
                            let _ = window.show();
                            let _ = window.set_focus();
                        }
                    }
                    _ => {}
                })
                .on_tray_icon_event(|tray, event| {
                    if let TrayIconEvent::Click {
                        button: MouseButton::Left,
                        button_state: MouseButtonState::Up,
                        ..
                    } = event
                    {
                        let app = tray.app_handle();
                        // Toggle floating HUD visibility on left click
                        if let Some(window) = app.get_webview_window("floating") {
                            if window.is_visible().unwrap_or(false) {
                                let _ = window.hide();
                            } else {
                                let _ = window.show();
                                let _ = window.set_focus();
                            }
                        }
                    }
                })
                .build(app)?;

            // Show the floating HUD on startup with vibrancy effect
            if let Some(window) = app.get_webview_window("floating") {
                // Apply macOS vibrancy for native glass effect
                #[cfg(target_os = "macos")]
                {
                    let _ = apply_vibrancy(&window, NSVisualEffectMaterial::HudWindow, None, Some(16.0));
                }
                let _ = window.show();
            }

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            greet,
            authenticate,
            start_recording,
            stop_recording,
            is_recording,
            is_authenticated,
            get_config,
            update_config,
            copy_to_clipboard,
            paste_to_active_field,
            process_transcription,
            transcribe_audio_chunk
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
