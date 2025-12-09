import React from "react";
import { motion } from "framer-motion";
import { ChatTimeline } from "../ChatTimeline";
import { useApp } from "../../context";

export function VRPreviewView() {
  const { vrConfig } = useApp();

  return (
    <div className="vr-preview-view">
      {/* VR Banner */}
      <motion.div
        className="vr-preview-view__banner"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="vr-preview-view__banner-icon">🥽</span>
        <span className="vr-preview-view__banner-text">VR Mode Preview</span>
        {vrConfig.headsetConnected && (
          <span className="vr-preview-view__banner-connected">
            Headset Connected
          </span>
        )}
      </motion.div>

      {/* Info card */}
      <div className="vr-preview-view__info glass-card">
        <h3>Spatial Interface Ready</h3>
        <p>
          This mode is optimized for WebXR and headset displays.
          When a VR headset is connected, the interface will adapt
          for spatial interaction.
        </p>
        <ul className="vr-preview-view__features">
          <li>✓ Large, readable typography</li>
          <li>✓ High contrast for depth</li>
          <li>✓ Hand tracking ready</li>
          <li>✓ Gaze-based selection</li>
        </ul>
      </div>

      {/* Chat timeline with VR styling */}
      <div className="vr-preview-view__timeline">
        <ChatTimeline />
      </div>
    </div>
  );
}
