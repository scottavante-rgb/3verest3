import React, { useRef, useEffect } from "react";
import { useSessions } from "../../hooks/useSessions";
import { MessageBubble } from "./MessageBubble";
import "./ChatTimeline.css";

export function ChatTimeline() {
  const { activeSession } = useSessions();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeSession?.messages.length]);

  if (!activeSession) {
    return (
      <div className="chat-timeline chat-timeline--empty">
        <p>No active session</p>
      </div>
    );
  }

  const messages = activeSession.messages;

  return (
    <div className="chat-timeline" ref={scrollRef}>
      {messages.length === 0 ? (
        <div className="chat-timeline__empty">
          <div className="chat-timeline__empty-icon">💬</div>
          <p className="chat-timeline__empty-text">
            Start a conversation
          </p>
          <p className="chat-timeline__empty-hint">
            Ask about labs, vitals, or diagnoses
          </p>
        </div>
      ) : (
        <div className="chat-timeline__messages">
          {messages.map((message, index) => (
            <MessageBubble
              key={message.id}
              message={message}
              isLatest={index === messages.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
