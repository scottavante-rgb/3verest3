/**
 * In-memory session store for dictation sessions
 * Each session holds text chunks from ASR finals
 */

const sessions = new Map();

export function createSession(id) {
  sessions.set(id, {
    textChunks: [],
    partialText: "",
    createdAt: Date.now(),
  });
  return sessions.get(id);
}

export function getSession(id) {
  return sessions.get(id);
}

export function addChunk(id, text) {
  const session = sessions.get(id);
  if (session) {
    session.textChunks.push(text);
    session.partialText = "";
  }
}

export function updatePartial(id, text) {
  const session = sessions.get(id);
  if (session) {
    session.partialText = text;
  }
}

export function getText(id) {
  const session = sessions.get(id);
  if (!session) return "";
  return session.textChunks.join(" ");
}

export function deleteSession(id) {
  sessions.delete(id);
}

export function cleanupOldSessions(maxAgeMs = 30 * 60 * 1000) {
  const now = Date.now();
  for (const [id, session] of sessions) {
    if (now - session.createdAt > maxAgeMs) {
      sessions.delete(id);
    }
  }
}

// Cleanup old sessions every 5 minutes
setInterval(() => cleanupOldSessions(), 5 * 60 * 1000);
