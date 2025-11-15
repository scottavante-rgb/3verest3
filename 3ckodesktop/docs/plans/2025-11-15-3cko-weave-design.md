# 3cko Weave Desktop Application - Design Document

**Date:** November 15, 2025
**Platform:** macOS
**Technology:** Tauri 2.0 + TypeScript + React + Vite + Tailwind CSS

## Purpose

3cko Weave provides real-time voice-to-text dictation for macOS users. A floating bubble window captures audio, streams it to the 3cko API, and delivers instant transcripts. Users can paste or copy transcripts with one click.

## Architecture

### Technology Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS
- **Backend:** Tauri 2.0 (Rust)
- **Icons:** Phosphor Icons (waveform for tray)
- **Plugins:** Store, GlobalShortcut, Autostart, Clipboard

### Window Structure

The application manages three windows:

1. **Tray (no UI)** - Registers system tray menu
2. **Bubble (floating)** - Transparent, always-on-top dictation interface
3. **Settings (standard)** - User preferences window (480×600)

### Project Organization

```
3cko-weave/
  src/
    features/
      audio/           # Audio capture and streaming
      bubble/          # Floating window UI and states
      settings/        # Preferences interface
      tray/            # System tray menu
    shared/
      contexts/        # Global state (WeaveContext)
      stores/          # Tauri Store wrapper
      types/           # TypeScript interfaces
  src-tauri/
    src/
      commands/        # Rust commands by domain
        audio.rs       # Buffer management
        shortcuts.rs   # Global shortcuts
        windows.rs     # Window management
      tray.rs
      main.rs
```

Feature-based modules keep related code together. Each feature owns its components, hooks, and utilities. Shared code lives in `shared/`.

## Audio Pipeline

### Capture

The `useAudioRecorder` hook captures audio via MediaRecorder:

- 16kHz sample rate, mono, opus/webm codec
- 100ms chunks for low latency
- Real-time level monitoring drives waveform animation
- Handles microphone permission errors

### Streaming (Hybrid Approach)

Frontend establishes WebSocket connection to `wss://api.3cko.ai/v1/transcribe/stream`. Audio chunks stream as binary frames. When connection drops:

1. Frontend detects disconnect
2. Calls Rust command `buffer_audio_chunk()` for pending chunks
3. Rust buffers in memory, attempts reconnect (3 retries, exponential backoff)
4. On reconnect: flushes buffer, resumes streaming
5. On total failure: saves buffer locally, shows error

This hybrid approach provides resilience without frontend complexity.

### Commands

- **buffer_audio_chunk(chunk: Vec<u8>)** - Stores chunk in memory
- **retry_stream()** - Attempts reconnection
- **flush_buffer()** - Sends buffered chunks after reconnect
- **clear_buffer()** - Discards buffer on cancel

## State Management

### Data Structure

```typescript
interface WeaveState {
  // Recording
  isRecording: boolean;
  isProcessing: boolean;
  audioLevel: number;

  // Transcripts
  currentTranscript: string | null;
  lastTranscript: Transcript | null;
  transcriptHistory: Transcript[];

  // Settings
  selectedMicrophone: string;
  selectedLanguage: string;
  selectedRegion: string;
  autoPaste: boolean;
  startOnBoot: boolean;

  // UI
  bubblePosition: { x: number; y: number };
}
```

### Cross-Window Sync

WeaveContext wraps global state. All windows subscribe to Tauri events. State changes emit `weave://state-changed`. Windows listen and update their local context. Store plugin persists to disk.

**Example:**
1. Settings window changes microphone
2. Context updates, emits event
3. Bubble receives event, updates UI
4. Store persists to `~/.3cko-weave/settings.json`

### Persistence Strategy

- **Settings** → Tauri Store (immediate)
- **Last transcript** → Tauri Store (for cmd+shift+V)
- **Bubble position** → Tauri Store (on drag end)
- **History** → Deferred to future version

## Bubble UI

### States

The bubble transitions through four states:

**1. IDLE (64px circle)**
- Gradient icon with 3cko brand colors
- Subtle pulse (scale 1.0 → 1.05)
- Tooltip: "Click to start dictating"
- Fully draggable

**2. RECORDING (260px × 64px pill)**
- Black background (#0A0A0A, 80% opacity blur)
- Animated waveform synced to audio levels
- Cancel button (left, grey circle, X)
- Finish button (right, red circle, ■)
- Timer (00:00 format)
- Draggable except buttons

**3. PROCESSING (260px × 64px pill)**
- Black pill with bouncing dots
- Text: "Transcribing..."
- Brief state, not draggable

**4. COMPLETE (280px × 120px card)**
- Transcript preview (2 lines max, ellipsis)
- Copy button (grey) and Paste button (blue)
- Auto-collapse after 4s unless hovered
- Click outside collapses immediately

### Transitions

All state changes animate with 200ms ease-in-out. Size changes use spring physics. Opacity fades in 150ms.

### Drag Behavior

Tauri's `startDragging()` enables repositioning. Users drag anywhere except buttons. Position persists to Store on drag end and restores on launch.

## Global Shortcuts

Rust implements three shortcuts via GlobalShortcut plugin:

**cmd+shift+D** - Toggles dictation
- If idle: starts recording
- If recording: finishes recording
- Shows bubble if hidden

**cmd+shift+V** - Pastes last transcript
- Reads from Store
- Writes to clipboard
- Simulates cmd+V to active app
- Shows brief confirmation

**fn key hold** - Starts dictation (500ms threshold)
- Detects repeated fn presses
- May require accessibility API for true hold detection

## Tray Menu

Waveform icon from Phosphor Icons appears in system tray. Menu structure:

```
3cko Weave
├─ Home (opens Settings)
├─ Check for updates
├─ Paste last transcript
├─ Shortcuts (shows modal)
├─ Microphone › (submenu with devices)
├─ Languages › (submenu with languages)
├─ Help Center (opens URL)
├─ Talk to Support (opens URL)
├─ General Feedback (opens form)
├─ ───────────────────
└─ Quit Weave
```

Microphone submenu queries devices via Tauri command. Selected items show bullet (•). Changes update WeaveContext and Store. Menu rebuilds when devices change.

## Settings Window

Standard 480×600 window, not resizable, centered on screen. Opens via tray "Home" or first launch.

**Sections:**
- **Audio** - Microphone selector
- **Language & Region** - Dropdowns for language and region
- **Preferences** - Auto-paste and start-on-boot toggles
- **API Configuration** - Read-only masked key (beta)
- **Keyboard Shortcuts** - Reference list

All changes auto-save to Store. No "Save" button needed. Real-time validation prevents invalid input.

### Microphone Selector

Populated via `get_audio_devices()` command. Updates when devices hot-plug. Shows device name and icon (built-in vs external).

### Language/Region

Hardcoded options:
- **Languages:** en-US, en-AU, en-GB, es-ES, fr-FR, de-DE
- **Regions:** au-syd, us-east, eu-west, asia-pacific

### Toggles

- **Auto-paste** - Automatically pastes after transcription
- **Start on boot** - Uses Tauri autostart plugin

### API Key

Read-only for beta. Shows masked value (••••••••). Lock icon indicates backend management. Future versions allow custom keys.

## Error Handling

### Audio Errors

**Permission denied:**
- Alert: "Microphone access required"
- Button opens System Preferences → Privacy

**No microphone:**
- Warning in settings
- Disabled recording button
- Poll for device changes

**Recording failure:**
- Save partial buffer
- Show: "Recording error. Try again?"
- Retry or cancel options

### Network Errors

**WebSocket fails to connect:**
- Show: "Connection failed"
- Retry button
- Check network status

**Connection drops:**
- Buffer in Rust
- Show: "Reconnecting..." with spinner
- 3 retries (1s, 2s, 4s backoff)
- On failure: save locally, notify user

**API error:**
- Display error message
- Option to copy audio file

### Window Errors

**Bubble off-screen:**
- Detect screen bounds on startup
- Reset to primary screen center if invalid

**Settings already open:**
- Focus existing window

### State Errors

**Store read/write fails:**
- Fall back to in-memory state
- Warning: "Settings won't persist"
- Log for debugging

### Graceful Degradation

- Shortcut registration fails → Show warning, offer tray trigger
- Clipboard denied → Show transcript, allow manual copy
- Auto-paste fails → Fall back to clipboard with notification

## Implementation Notes

### Tauri Configuration

```json
{
  "productName": "3cko Weave",
  "identifier": "com.3cko.weave",
  "app": {
    "windows": [
      {
        "label": "bubble",
        "decorations": false,
        "transparent": true,
        "alwaysOnTop": true,
        "width": 260,
        "height": 64,
        "resizable": false,
        "focus": false
      }
    ]
  }
}
```

### Icons

Generate placeholder icons:
- 512×512 PNG
- 128×128 PNG
- macOS .icns bundle

Use Phosphor waveform icon for tray.

### Testing Priorities

1. Audio capture across different microphones
2. WebSocket reconnection under poor network
3. Multi-monitor bubble positioning
4. Global shortcuts don't conflict with system
5. State sync between windows
6. Store persistence and recovery

### Performance Considerations

- Audio chunks stream every 100ms (low latency)
- Waveform animation at 60fps
- State updates batched to prevent event spam
- Store writes debounced (300ms)

## Success Criteria

Users can:
1. Start dictation with one click or keyboard shortcut
2. See real-time waveform feedback
3. Receive transcripts within 2 seconds
4. Paste with one click
5. Reposition bubble anywhere on screen
6. Change settings without restarting
7. Use app immediately after system boot (if enabled)

Technical requirements:
1. Audio streams without drops
2. Connection recovers from network issues
3. State syncs instantly across windows
4. Settings persist across restarts
5. Bubble never loses focus of other apps
6. Memory usage stays under 100MB
7. CPU usage under 5% when idle
