import React from "react";
import { motion } from "framer-motion";
import { useSessions } from "../../hooks/useSessions";
import { MOCK_AGENT_TRACE } from "../../lib/3cko/mockAgentData";
import type { AgentTrace } from "../../lib/3cko/types";
import "./AgentRail.css";

const statusColors: Record<string, string> = {
  idle: "rgba(255, 255, 255, 0.4)",
  thinking: "#F59E0B",
  executing: "#3B82F6",
  complete: "#10B981",
  error: "#EF4444",
};

export function AgentRail() {
  const { activeSession } = useSessions();

  // For now, use mock data. In production, this would come from the last message's agentTrace
  const trace: AgentTrace | null = MOCK_AGENT_TRACE;

  if (!trace) {
    return (
      <div className="agent-rail agent-rail--empty">
        <p>No active agent</p>
      </div>
    );
  }

  const currentStep = trace.steps[trace.currentStepIndex];

  return (
    <div className="agent-rail">
      {/* Status header */}
      <div className="agent-rail__header">
        <div
          className="agent-rail__status-dot"
          style={{ backgroundColor: statusColors[trace.status] }}
        />
        <span className="agent-rail__status-text">
          {trace.status === "executing" ? "Working..." : trace.status}
        </span>
      </div>

      {/* Goal */}
      <div className="agent-rail__section">
        <div className="agent-rail__label">Goal</div>
        <div className="agent-rail__goal">{trace.goal}</div>
      </div>

      {/* Current step */}
      {currentStep && (
        <div className="agent-rail__section">
          <div className="agent-rail__label">Current Step</div>
          <div className="agent-rail__current-step">
            <motion.div
              className="agent-rail__step-indicator"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span>{currentStep.name}</span>
          </div>
        </div>
      )}

      {/* Tools */}
      <div className="agent-rail__section">
        <div className="agent-rail__label">Tools</div>
        <div className="agent-rail__tools">
          {trace.toolCalls.map((tool) => (
            <div
              key={tool.id}
              className={`agent-rail__tool agent-rail__tool--${tool.status}`}
            >
              <span className="agent-rail__tool-icon">⚙</span>
              <span className="agent-rail__tool-name">{tool.name}</span>
              {tool.status === "running" && (
                <motion.span
                  className="agent-rail__tool-running"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  ●
                </motion.span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div className="agent-rail__section">
        <div className="agent-rail__label">Progress</div>
        <div className="agent-rail__progress">
          <div
            className="agent-rail__progress-bar"
            style={{
              width: `${((trace.currentStepIndex + 1) / trace.steps.length) * 100}%`
            }}
          />
        </div>
        <div className="agent-rail__progress-text">
          Step {trace.currentStepIndex + 1} of {trace.steps.length}
        </div>
      </div>
    </div>
  );
}
