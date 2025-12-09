import React from "react";
import { motion } from "framer-motion";
import { useAppMode } from "../../hooks/useAppMode";
import type { AppMode } from "../../lib/3cko/types";
import { MODE_CONFIGS } from "../../lib/3cko/types";

const modes: AppMode[] = ["chat", "agentic", "vr"];

export function ModeSelector() {
  const { mode, setMode } = useAppMode();

  return (
    <div className="mode-selector">
      {modes.map((m) => {
        const config = MODE_CONFIGS[m];
        const isActive = mode === m;

        return (
          <button
            key={m}
            className={`mode-selector__pill glass-pill ${isActive ? "glass-pill--active" : ""}`}
            onClick={() => setMode(m)}
            style={{
              "--mode-color": config.color,
            } as React.CSSProperties}
          >
            {isActive && (
              <motion.div
                className="mode-selector__indicator"
                layoutId="mode-indicator"
                style={{ backgroundColor: config.color }}
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            <span className="mode-selector__label">{config.label}</span>
          </button>
        );
      })}
    </div>
  );
}
