import React from "react";
import { motion } from "framer-motion";
import { ChatTimeline } from "../ChatTimeline";
import { useApp } from "../../context";

export function VRPreviewView() {
  const { vrConfig } = useApp();

  return (
    <div className="vr-preview-view">
      {/* Voice Recognition Banner */}
      <motion.div
        className="vr-preview-view__banner"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="vr-preview-view__banner-icon">🎙️</span>
        <span className="vr-preview-view__banner-text">Voice Recognition Mode</span>
        {vrConfig.microphoneConnected && (
          <span className="vr-preview-view__banner-connected">
            Microphone Ready
          </span>
        )}
      </motion.div>

      {/* Info card */}
      <div className="vr-preview-view__info glass-card">
        <h3>Voice Interface Active</h3>
        <p>
          This mode is optimized for hands-free voice interaction.
          Speak naturally and 3cko will transcribe and respond
          to your queries.
        </p>
        <ul className="vr-preview-view__features">
          <li>✓ Real-time transcription</li>
          <li>✓ Noise reduction enabled</li>
          <li>✓ {vrConfig.listeningMode === "push-to-talk" ? "Push-to-talk" :
                  vrConfig.listeningMode === "voice-activation" ? "Voice activation" :
                  "Continuous listening"}</li>
          <li>✓ Radiology-optimized vocabulary</li>
        </ul>
      </div>

      {/* Chat timeline with VR styling */}
      <div className="vr-preview-view__timeline">
        <ChatTimeline />
      </div>
    </div>
  );
}
