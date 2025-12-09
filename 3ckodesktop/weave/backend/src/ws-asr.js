/**
 * WebSocket ASR Handler
 * Accepts audio from Tauri, forwards to OpenAI Realtime API
 */

import WebSocket from "ws";
import { createSession, addChunk, updatePartial, getSession } from "./session-store.js";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_REALTIME_URL = "wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-10-01";

export function handleAsrConnection(clientWs, sessionId) {
  console.log(`[ASR] New connection: ${sessionId}`);

  // Create session
  createSession(sessionId);

  // Connect to OpenAI Realtime API
  const openaiWs = new WebSocket(OPENAI_REALTIME_URL, {
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "OpenAI-Beta": "realtime=v1",
    },
  });

  let isOpenAIReady = false;

  openaiWs.on("open", () => {
    console.log(`[ASR] Connected to OpenAI Realtime API for session: ${sessionId}`);
    isOpenAIReady = true;

    // Configure the session for audio transcription
    openaiWs.send(JSON.stringify({
      type: "session.update",
      session: {
        modalities: ["text", "audio"],
        input_audio_format: "pcm16",
        input_audio_transcription: {
          model: "whisper-1",
        },
        turn_detection: {
          type: "server_vad",
          threshold: 0.5,
          prefix_padding_ms: 300,
          silence_duration_ms: 500,
        },
      },
    }));
  });

  openaiWs.on("message", (data) => {
    try {
      const event = JSON.parse(data.toString());

      switch (event.type) {
        case "conversation.item.input_audio_transcription.completed":
          // Final transcription
          const finalText = event.transcript || "";
          if (finalText.trim()) {
            addChunk(sessionId, finalText);
            clientWs.send(JSON.stringify({
              type: "final",
              text: finalText,
              sessionId,
            }));
            console.log(`[ASR] Final: "${finalText.substring(0, 50)}..."`);
          }
          break;

        case "input_audio_buffer.speech_started":
          clientWs.send(JSON.stringify({
            type: "speech_started",
            sessionId,
          }));
          break;

        case "input_audio_buffer.speech_stopped":
          clientWs.send(JSON.stringify({
            type: "speech_stopped",
            sessionId,
          }));
          break;

        case "error":
          console.error(`[ASR] OpenAI error:`, event.error);
          clientWs.send(JSON.stringify({
            type: "error",
            error: event.error?.message || "Unknown error",
            sessionId,
          }));
          break;

        case "session.created":
        case "session.updated":
          console.log(`[ASR] Session ${event.type}`);
          break;

        default:
          // Log other event types for debugging
          if (process.env.DEBUG) {
            console.log(`[ASR] Event: ${event.type}`);
          }
      }
    } catch (err) {
      console.error(`[ASR] Failed to parse OpenAI message:`, err);
    }
  });

  openaiWs.on("error", (err) => {
    console.error(`[ASR] OpenAI WebSocket error:`, err);
    clientWs.send(JSON.stringify({
      type: "error",
      error: "ASR connection failed",
      sessionId,
    }));
  });

  openaiWs.on("close", () => {
    console.log(`[ASR] OpenAI connection closed for session: ${sessionId}`);
  });

  // Handle audio from Tauri client
  clientWs.on("message", (data) => {
    if (!isOpenAIReady) {
      console.log(`[ASR] Buffering audio, OpenAI not ready`);
      return;
    }

    // Check if it's binary audio data
    if (Buffer.isBuffer(data)) {
      // Forward raw PCM audio to OpenAI
      openaiWs.send(JSON.stringify({
        type: "input_audio_buffer.append",
        audio: data.toString("base64"),
      }));
    } else {
      // Handle text commands from client
      try {
        const message = JSON.parse(data.toString());

        if (message.type === "end_audio") {
          // Signal end of audio input
          openaiWs.send(JSON.stringify({
            type: "input_audio_buffer.commit",
          }));
          console.log(`[ASR] Audio committed for session: ${sessionId}`);
        }
      } catch (err) {
        console.error(`[ASR] Failed to parse client message:`, err);
      }
    }
  });

  clientWs.on("close", () => {
    console.log(`[ASR] Client disconnected: ${sessionId}`);
    openaiWs.close();
  });

  clientWs.on("error", (err) => {
    console.error(`[ASR] Client WebSocket error:`, err);
    openaiWs.close();
  });
}
