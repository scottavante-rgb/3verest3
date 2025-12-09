import React, { useState } from "react";
import { motion } from "framer-motion";
import type { ChatSession } from "../../lib/3cko/types";

interface SessionIndicatorProps {
  session: ChatSession;
  isActive: boolean;
  onClick: () => void;
}

export function SessionIndicator({ session, isActive, onClick }: SessionIndicatorProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const lastMessage = session.messages[session.messages.length - 1];
  const snippet = lastMessage?.content.slice(0, 40) ?? "No messages yet";

  return (
    <div className="session-indicator-wrapper">
      <motion.button
        className={`session-indicator ${isActive ? "session-indicator--active" : ""}`}
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        style={{ "--session-color": session.color } as React.CSSProperties}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        layout
      >
        <div className="session-indicator__dot" />

        {/* Unread badge */}
        {session.unreadCount > 0 && (
          <motion.div
            className="session-indicator__badge"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500 }}
          >
            {session.unreadCount > 9 ? "9+" : session.unreadCount}
          </motion.div>
        )}

        {/* Active ring */}
        {isActive && (
          <motion.div
            className="session-indicator__ring"
            layoutId="session-ring"
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          />
        )}
      </motion.button>

      {/* Tooltip */}
      {showTooltip && (
        <motion.div
          className="session-indicator__tooltip"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
        >
          <div className="session-indicator__tooltip-title">{session.title}</div>
          <div className="session-indicator__tooltip-snippet">{snippet}...</div>
        </motion.div>
      )}
    </div>
  );
}
