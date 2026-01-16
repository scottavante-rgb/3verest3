import { NextRequest, NextResponse } from "next/server";
import { answerWithMatterContext } from "@/lib/rag";
import { requireAuth, verifyMatterAccess, isDemoMode } from "@/lib/api/auth-middleware";
import { z } from "zod";

// Input validation schema
const ChatRequestSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant", "system"]),
        content: z.string().max(10000),
      })
    )
    .min(1)
    .max(50),
  matterId: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    // Authentication check
    const authResult = await requireAuth(request);
    if (authResult instanceof NextResponse) {
      return authResult; // Return 401 response
    }
    const user = authResult;

    // Parse and validate input
    const body = await request.json();
    const parseResult = ChatRequestSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid request format", details: parseResult.error.issues },
        { status: 400 }
      );
    }

    const { messages, matterId } = parseResult.data;

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

    const { reply, sources } = await answerWithMatterContext(messages, matterId);

    return NextResponse.json({ reply, sources });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    );
  }
}
