import { useApp } from "../context";

export function useSessions() {
  const {
    sessions,
    activeSessionId,
    setActiveSessionId,
    createSession,
    deleteSession,
    addMessage,
    updateSessionTitle,
    markSessionRead,
    activeSession,
  } = useApp();

  const canCreateSession = sessions.length < 5;

  return {
    sessions,
    activeSessionId,
    activeSession,
    setActiveSessionId,
    createSession,
    deleteSession,
    addMessage,
    updateSessionTitle,
    markSessionRead,
    canCreateSession,
    sessionCount: sessions.length,
  };
}
