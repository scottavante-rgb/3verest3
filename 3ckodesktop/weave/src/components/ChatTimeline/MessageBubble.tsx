import React from "react";
import { motion } from "framer-motion";
import type { ChatMessage } from "../../lib/3cko/types";
import { useAppMode } from "../../hooks/useAppMode";
import { AgentCard } from "./AgentCard";

interface MessageBubbleProps {
  message: ChatMessage;
  isLatest?: boolean;
}

export function MessageBubble({ message, isLatest = false }: MessageBubbleProps) {
  const { isAgentic } = useAppMode();
  const isUser = message.role === "user";

  return (
    <motion.div
      className={`message-bubble message-bubble--${message.role}`}
      initial={isLatest ? { opacity: 0, y: 8 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="message-bubble__content">
        <p className="message-bubble__text">{message.content}</p>

        <div className="message-bubble__meta">
          <span className="message-bubble__time">
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit"
            })}
          </span>
        </div>
      </div>

      {/* Agent card for assistant messages in agentic mode */}
      {!isUser && isAgentic && message.agentTrace && (
        <AgentCard trace={message.agentTrace} />
      )}
    </motion.div>
  );
}
