import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { AgentTrace, AgentStep, AgentToolCall } from "../../lib/3cko/types";

interface AgentCardProps {
  trace: AgentTrace;
}

const statusIcons: Record<string, string> = {
  pending: "○",
  running: "◐",
  complete: "●",
  error: "✕",
};

const statusColors: Record<string, string> = {
  pending: "rgba(255, 255, 255, 0.4)",
  running: "#F59E0B",
  complete: "#10B981",
  error: "#EF4444",
};

export function AgentCard({ trace }: AgentCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className="agent-card glass-card"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ duration: 0.2 }}
    >
      <button
        className="agent-card__header"
        onClick={() => setExpanded(!expanded)}
      >
        <span className="agent-card__goal">{trace.goal}</span>
        <span className="agent-card__toggle">
          {expanded ? "▲" : "▼"}
        </span>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            className="agent-card__body"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Steps */}
            <div className="agent-card__section">
              <div className="agent-card__section-title">Steps</div>
              <ul className="agent-card__steps">
                {trace.steps.map((step, index) => (
                  <li
                    key={step.id}
                    className={`agent-card__step agent-card__step--${step.status}`}
                  >
                    <span
                      className="agent-card__step-icon"
                      style={{ color: statusColors[step.status] }}
                    >
                      {statusIcons[step.status]}
                    </span>
                    <span className="agent-card__step-name">{step.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tool calls */}
            {trace.toolCalls.length > 0 && (
              <div className="agent-card__section">
                <div className="agent-card__section-title">Tools</div>
                <ul className="agent-card__tools">
                  {trace.toolCalls.map((tool) => (
                    <li
                      key={tool.id}
                      className={`agent-card__tool agent-card__tool--${tool.status}`}
                    >
                      <span
                        className="agent-card__tool-icon"
                        style={{ color: statusColors[tool.status] }}
                      >
                        ⚙
                      </span>
                      <span className="agent-card__tool-name">{tool.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
