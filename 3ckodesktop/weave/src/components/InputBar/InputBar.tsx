import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { useSessions } from "../../hooks/useSessions";
import "./InputBar.css";

interface InputBarProps {
  onSubmit?: (text: string) => void;
  onMicClick?: () => void;
  isRecording?: boolean;
  isProcessing?: boolean;
  placeholder?: string;
}

export function InputBar({
  onSubmit,
  onMicClick,
  isRecording = false,
  isProcessing = false,
  placeholder = "Ask about labs, vitals, diagnoses...",
}: InputBarProps) {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { activeSession, addMessage } = useSessions();

  const handleSubmit = useCallback(() => {
    const trimmed = text.trim();
    if (!trimmed || !activeSession) return;

    // Add user message
    addMessage(activeSession.id, {
      role: "user",
      content: trimmed,
    });

    // Call external handler if provided
    onSubmit?.(trimmed);

    // Clear input
    setText("");
  }, [text, activeSession, addMessage, onSubmit]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }, [handleSubmit]);

  // Focus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Keyboard shortcut: Cmd/Ctrl + Enter
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        handleSubmit();
      }
    };
    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, [handleSubmit]);

  const isDisabled = isRecording || isProcessing;

  return (
    <div className={`input-bar ${isRecording ? "input-bar--recording" : ""}`}>
      {/* Microphone button */}
      <motion.button
        className={`input-bar__mic ${isRecording ? "input-bar__mic--active" : ""}`}
        onClick={onMicClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={isProcessing}
        aria-label={isRecording ? "Stop recording" : "Start recording"}
      >
        {isRecording ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="6" width="12" height="12" rx="2"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/>
            <path d="M19 10v2a7 7 0 01-14 0v-2"/>
            <line x1="12" y1="19" x2="12" y2="23"/>
            <line x1="8" y1="23" x2="16" y2="23"/>
          </svg>
        )}
      </motion.button>

      {/* Text input */}
      <input
        ref={inputRef}
        type="text"
        className="input-bar__input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={isDisabled}
      />

      {/* Submit button */}
      <motion.button
        className="input-bar__submit"
        onClick={handleSubmit}
        disabled={!text.trim() || isDisabled}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isProcessing ? (
          <div className="input-bar__spinner" />
        ) : (
          "Ask"
        )}
      </motion.button>
    </div>
  );
}
