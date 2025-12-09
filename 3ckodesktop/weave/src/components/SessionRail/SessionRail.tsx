import React from "react";
import { motion } from "framer-motion";
import { useSessions } from "../../hooks/useSessions";
import { SessionIndicator } from "./SessionIndicator";
import "./SessionRail.css";

export function SessionRail() {
  const {
    sessions,
    activeSessionId,
    setActiveSessionId,
    createSession,
    markSessionRead,
    canCreateSession,
  } = useSessions();

  const handleSessionClick = (sessionId: string) => {
    setActiveSessionId(sessionId);
    markSessionRead(sessionId);
  };

  return (
    <nav className="session-rail">
      <div className="session-rail__sessions">
        {sessions.map((session) => (
          <SessionIndicator
            key={session.id}
            session={session}
            isActive={session.id === activeSessionId}
            onClick={() => handleSessionClick(session.id)}
          />
        ))}
      </div>

      {/* Add session button */}
      {canCreateSession && (
        <motion.button
          className="session-rail__add glass-button"
          onClick={() => createSession()}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="New chat session"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </motion.button>
      )}
    </nav>
  );
}
