import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from "react";
import {
  AppMode,
  ChatSession,
  ChatMessage,
  SESSION_COLORS,
  VRConfig,
  DEFAULT_VR_CONFIG,
} from "../lib/3cko/types";

// =============================================================================
// CONTEXT TYPES
// =============================================================================

interface AppState {
  // Mode state
  currentMode: AppMode;
  setCurrentMode: (mode: AppMode) => void;

  // Session state
  sessions: ChatSession[];
  activeSessionId: string | null;
  setActiveSessionId: (id: string) => void;

  // Session actions
  createSession: (title?: string) => ChatSession;
  deleteSession: (id: string) => void;
  addMessage: (sessionId: string, message: Omit<ChatMessage, "id" | "timestamp">) => void;
  updateSessionTitle: (sessionId: string, title: string) => void;
  markSessionRead: (sessionId: string) => void;

  // Active session helper
  activeSession: ChatSession | null;

  // VR config
  vrConfig: VRConfig;
  setVRConfig: (config: Partial<VRConfig>) => void;
}

const AppContext = createContext<AppState | null>(null);

// =============================================================================
// PROVIDER COMPONENT
// =============================================================================

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  // Mode state
  const [currentMode, setCurrentMode] = useState<AppMode>("chat");

  // VR config
  const [vrConfig, setVRConfigState] = useState<VRConfig>(DEFAULT_VR_CONFIG);

  // Session state
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    // Initialize with one default session
    const initialSession: ChatSession = {
      id: crypto.randomUUID(),
      title: "New Chat",
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      color: SESSION_COLORS[0],
      unreadCount: 0,
    };
    return [initialSession];
  });

  const [activeSessionId, setActiveSessionId] = useState<string | null>(() =>
    sessions[0]?.id ?? null
  );

  // Derived: active session
  const activeSession = useMemo(() =>
    sessions.find(s => s.id === activeSessionId) ?? null,
    [sessions, activeSessionId]
  );

  // Create new session
  const createSession = useCallback((title?: string): ChatSession => {
    const colorIndex = sessions.length % SESSION_COLORS.length;
    const newSession: ChatSession = {
      id: crypto.randomUUID(),
      title: title ?? `Chat ${sessions.length + 1}`,
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      color: SESSION_COLORS[colorIndex],
      unreadCount: 0,
    };

    setSessions(prev => {
      if (prev.length >= 5) {
        console.warn("Maximum 5 sessions allowed");
        return prev;
      }
      return [...prev, newSession];
    });

    setActiveSessionId(newSession.id);
    return newSession;
  }, [sessions.length]);

  // Delete session
  const deleteSession = useCallback((id: string) => {
    setSessions(prev => {
      const filtered = prev.filter(s => s.id !== id);
      // Ensure at least one session exists
      if (filtered.length === 0) {
        const fallback: ChatSession = {
          id: crypto.randomUUID(),
          title: "New Chat",
          messages: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
          color: SESSION_COLORS[0],
          unreadCount: 0,
        };
        return [fallback];
      }
      return filtered;
    });

    // Switch to first session if active was deleted
    if (activeSessionId === id) {
      setSessions(prev => {
        setActiveSessionId(prev[0]?.id ?? null);
        return prev;
      });
    }
  }, [activeSessionId]);

  // Add message to session
  const addMessage = useCallback((
    sessionId: string,
    message: Omit<ChatMessage, "id" | "timestamp">
  ) => {
    const fullMessage: ChatMessage = {
      ...message,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    };

    setSessions(prev => prev.map(session => {
      if (session.id !== sessionId) {
        // Increment unread if not active
        if (message.role === "assistant" && sessionId !== activeSessionId) {
          return { ...session, unreadCount: session.unreadCount + 1 };
        }
        return session;
      }
      return {
        ...session,
        messages: [...session.messages, fullMessage],
        updatedAt: Date.now(),
      };
    }));
  }, [activeSessionId]);

  // Update session title
  const updateSessionTitle = useCallback((sessionId: string, title: string) => {
    setSessions(prev => prev.map(session =>
      session.id === sessionId
        ? { ...session, title, updatedAt: Date.now() }
        : session
    ));
  }, []);

  // Mark session as read
  const markSessionRead = useCallback((sessionId: string) => {
    setSessions(prev => prev.map(session =>
      session.id === sessionId
        ? { ...session, unreadCount: 0 }
        : session
    ));
  }, []);

  // VR config updater
  const setVRConfig = useCallback((config: Partial<VRConfig>) => {
    setVRConfigState(prev => ({ ...prev, ...config }));
  }, []);

  // Context value
  const value = useMemo<AppState>(() => ({
    currentMode,
    setCurrentMode,
    sessions,
    activeSessionId,
    setActiveSessionId,
    createSession,
    deleteSession,
    addMessage,
    updateSessionTitle,
    markSessionRead,
    activeSession,
    vrConfig,
    setVRConfig,
  }), [
    currentMode,
    sessions,
    activeSessionId,
    createSession,
    deleteSession,
    addMessage,
    updateSessionTitle,
    markSessionRead,
    activeSession,
    vrConfig,
    setVRConfig,
  ]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// =============================================================================
// HOOK
// =============================================================================

export function useApp(): AppState {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
