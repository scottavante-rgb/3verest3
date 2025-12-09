/**
 * End Dictation Handler
 * Runs LLM cleanup on session text and returns structured output
 */

import OpenAI from "openai";
import { getText, deleteSession } from "./session-store.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const CLEANUP_PROMPT = `You are the 3cko medical language cleanup model.
Tasks:
1. Clean up dictation text.
2. Correct grammar, punctuation, and radiology phrasing.
3. Identify FINDINGS blocks and return them as JSON.
4. Identify any agentic commands such as:
     "add section", "compare with prior", "insert measurement",
     "rewrite as impression", "flag urgent".
5. Output strict JSON:
   {
     "cleaned_text": "...",
     "findings_blocks": [...],
     "agentic_commands": [...]
   }

Return ONLY valid JSON, no markdown formatting.`;

export async function handleEndDictation(req, res) {
  const startTime = Date.now();

  try {
    const { sessionId, text } = req.body;

    // Get text from session or use direct text input
    let combinedText = "";

    if (text && text.trim()) {
      // Direct text input (e.g., from Tauri client)
      combinedText = text;
    } else if (sessionId) {
      // Get from session store
      combinedText = getText(sessionId);
    }

    if (!combinedText || combinedText.trim() === "") {
      return res.status(400).json({ error: "No text provided" });
    }

    console.log(`[END] Processing session: ${sessionId}, text length: ${combinedText.length}`);

    // Call LLM for cleanup
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: CLEANUP_PROMPT },
        { role: "user", content: `Dictation text:\n\n${combinedText}` },
      ],
    });

    const llmResponse = completion.choices[0]?.message?.content;

    if (!llmResponse) {
      throw new Error("Empty LLM response");
    }

    // Parse the JSON response
    let result;
    try {
      result = JSON.parse(llmResponse);
    } catch (parseErr) {
      console.error(`[END] Failed to parse LLM JSON:`, llmResponse);
      // Fallback: return cleaned text without structure
      result = {
        cleaned_text: llmResponse,
        findings_blocks: [],
        agentic_commands: [],
      };
    }

    // Clean up session
    deleteSession(sessionId);

    const processingTime = Date.now() - startTime;
    console.log(`[END] Completed in ${processingTime}ms`);

    res.json({
      ...result,
      sessionId,
      processingTimeMs: processingTime,
    });

  } catch (err) {
    console.error(`[END] Error:`, err);
    res.status(500).json({
      error: err.message || "Processing failed",
    });
  }
}

// Health check for the cleanup service
export function handleHealth(req, res) {
  res.json({
    status: "ok",
    service: "3cko-end-dictation",
    timestamp: new Date().toISOString(),
  });
}
