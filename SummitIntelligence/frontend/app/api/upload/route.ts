import { NextRequest, NextResponse } from "next/server";
import { supabaseServer, DOCS_BUCKET } from "@/lib/supabase-server";
import { embedLegal } from "@/lib/ai-gateway";
import {
  requireAuth,
  verifyMatterAccess,
  isDemoMode,
} from "@/lib/api/auth-middleware";

// Allowed file types for upload (legal documents)
const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "text/plain",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/rtf",
  "text/rtf",
];

// Maximum file size: 50MB
const MAX_FILE_SIZE = 50 * 1024 * 1024;

// Simple text chunking function
function chunkText(text: string, maxTokens: number = 400): string[] {
  const words = text.split(/\s+/);
  const chunks: string[] = [];
  let currentChunk: string[] = [];
  let currentLength = 0;

  for (const word of words) {
    // Rough token estimate: ~0.75 tokens per word
    const wordTokens = Math.ceil(word.length / 4);

    if (currentLength + wordTokens > maxTokens && currentChunk.length > 0) {
      chunks.push(currentChunk.join(" "));
      currentChunk = [word];
      currentLength = wordTokens;
    } else {
      currentChunk.push(word);
      currentLength += wordTokens;
    }
  }

  if (currentChunk.length > 0) {
    chunks.push(currentChunk.join(" "));
  }

  return chunks;
}

// Sanitize filename to prevent path traversal and injection
function sanitizeFilename(filename: string): string {
  // Remove path separators and special characters
  return filename
    .replace(/[/\\:*?"<>|]/g, "_")
    .replace(/\.\./g, "_")
    .substring(0, 200); // Limit length
}

export async function POST(request: NextRequest) {
  try {
    // Authentication check
    const authResult = await requireAuth(request);
    if (authResult instanceof NextResponse) {
      return authResult; // Return 401 response
    }
    const user = authResult;

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const matterId = formData.get("matterId") as string;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!matterId) {
      return NextResponse.json(
        { error: "Matter ID is required" },
        { status: 400 }
      );
    }

    // Validate matter ID format (UUID)
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!isDemoMode() && !uuidRegex.test(matterId)) {
      return NextResponse.json(
        { error: "Invalid matter ID format" },
        { status: 400 }
      );
    }

    // Verify user has access to this matter
    if (!isDemoMode()) {
      const hasAccess = await verifyMatterAccess(user.id, matterId);
      if (!hasAccess) {
        return NextResponse.json(
          { error: "Access denied to this matter" },
          { status: 403 }
        );
      }
    }

    // Validate file type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error: `Invalid file type: ${file.type}. Allowed types: PDF, Word documents, RTF, plain text`,
        },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File too large. Maximum size: ${MAX_FILE_SIZE / 1024 / 1024}MB` },
        { status: 400 }
      );
    }

    // Sanitize filename
    const safeFilename = sanitizeFilename(file.name);

    // Step 1: Upload to Supabase Storage
    const fileName = `${matterId}/${Date.now()}_${safeFilename}`;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error: uploadError } = await supabaseServer.storage
      .from(DOCS_BUCKET)
      .upload(fileName, buffer, {
        contentType: file.type,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return NextResponse.json(
        { error: "Failed to upload file" },
        { status: 500 }
      );
    }

    // Step 2: Insert document record
    const { data: docData, error: docError } = await supabaseServer
      .from("source_document")
      .insert({
        matter_id: matterId,
        file_name: file.name,
        storage_path: fileName,
        mime_type: file.type,
      })
      .select()
      .single();

    if (docError) {
      console.error("Document insert error:", docError);
      return NextResponse.json(
        { error: "Failed to create document record" },
        { status: 500 }
      );
    }

    // Step 3: Extract text (for now, assume text files)
    const text = new TextDecoder().decode(buffer);

    // Step 4: Chunk the text
    const chunks = chunkText(text);

    // Step 5: Generate embeddings and insert chunks
    const chunkInserts = [];

    for (let i = 0; i < chunks.length; i++) {
      const embedding = await embedLegal(chunks[i]);
      chunkInserts.push({
        matter_id: matterId,
        document_id: docData.id,
        chunk_index: i,
        content: chunks[i],
        embedding: embedding,
      });
    }

    const { error: chunkError } = await supabaseServer
      .from("source_chunk")
      .insert(chunkInserts);

    if (chunkError) {
      console.error("Chunk insert error:", chunkError);
      return NextResponse.json(
        { error: "Failed to create chunk records" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      document: docData,
      chunksCreated: chunks.length,
    });
  } catch (error) {
    console.error("Upload API error:", error);
    return NextResponse.json(
      { error: "Failed to process upload" },
      { status: 500 }
    );
  }
}
