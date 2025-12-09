/**
 * 3cko Backend Server
 * Ultra-fast ASR + LLM processing for radiology dictation
 */

import http from "http";
import { WebSocketServer } from "ws";
import { handleAsrConnection } from "./ws-asr.js";
import { handleEndDictation, handleHealth } from "./end-dictation.js";

const PORT = process.env.PORT || 9000;

// Create HTTP server for REST endpoints
const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // Parse URL
  const url = new URL(req.url, `http://localhost:${PORT}`);

  // Health check
  if (url.pathname === "/health" && req.method === "GET") {
    return handleHealth(req, res);
  }

  // End dictation endpoint
  if (url.pathname === "/end-dictation" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        req.body = JSON.parse(body);
      } catch (e) {
        req.body = {};
      }
      return handleEndDictation(req, res);
    });
    return;
  }

  // 404 for unknown routes
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
});

// Create WebSocket server for ASR
const wss = new WebSocketServer({ server, path: "/ws/asr" });

wss.on("connection", (ws, req) => {
  // Extract session ID from query params
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const sessionId = url.searchParams.get("sessionId") || crypto.randomUUID();

  handleAsrConnection(ws, sessionId);
});

// Start server
server.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════╗
║           3CKO BACKEND SERVER                  ║
╠════════════════════════════════════════════════╣
║  REST API:    http://localhost:${PORT}            ║
║  WebSocket:   ws://localhost:${PORT}/ws/asr       ║
╠════════════════════════════════════════════════╣
║  Endpoints:                                    ║
║    GET  /health         - Health check         ║
║    POST /end-dictation  - LLM cleanup          ║
║    WS   /ws/asr         - Streaming ASR        ║
╚════════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("[SERVER] Shutting down...");
  wss.close();
  server.close(() => {
    console.log("[SERVER] Goodbye!");
    process.exit(0);
  });
});
