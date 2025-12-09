import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { useAppMode } from "../../hooks/useAppMode";
import "./AppShell.css";

interface AppShellProps {
  header: ReactNode;
  sessionRail?: ReactNode;
  agentRail?: ReactNode;
  children: ReactNode;
  inputBar?: ReactNode;
}

export function AppShell({
  header,
  sessionRail,
  agentRail,
  children,
  inputBar,
}: AppShellProps) {
  const { isAgentic } = useAppMode();

  return (
    <div className="app-shell" data-tauri-drag-region>
      {/* Deep navy background */}
      <div className="app-shell__background" />

      {/* Main glass panel */}
      <motion.div
        className="app-shell__panel glass-panel"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="app-shell__header">
          {header}
        </div>

        {/* Content area with optional rails */}
        <div className="app-shell__body">
          {/* Session rail (left) */}
          {sessionRail && (
            <div className="app-shell__rail app-shell__rail--left">
              {sessionRail}
            </div>
          )}

          {/* Main content */}
          <div className="app-shell__content">
            {children}
          </div>

          {/* Agent rail (right, only in agentic mode) */}
          {isAgentic && agentRail && (
            <motion.div
              className="app-shell__rail app-shell__rail--right"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              {agentRail}
            </motion.div>
          )}
        </div>

        {/* Input bar */}
        {inputBar && (
          <div className="app-shell__footer">
            {inputBar}
          </div>
        )}
      </motion.div>
    </div>
  );
}
