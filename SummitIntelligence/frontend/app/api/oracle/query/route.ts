import { NextRequest, NextResponse } from "next/server";
import { requireAuth, verifyMatterAccess, isDemoMode } from "@/lib/api/auth-middleware";
import { z } from "zod";

// Input validation schema
const QueryRequestSchema = z.object({
  text: z.string().min(1).max(5000),
  mode: z.enum(["diagnostic", "predictive", "strategic", "capital", "economics"]),
  matterId: z.string().optional(),
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
    const parseResult = QueryRequestSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid request format", details: parseResult.error.issues },
        { status: 400 }
      );
    }

    const { text, mode, matterId } = parseResult.data;

    // Verify user has access to this matter if specified
    if (matterId && !isDemoMode()) {
      const hasAccess = await verifyMatterAccess(user.id, matterId);
      if (!hasAccess) {
        return NextResponse.json(
          { error: "Access denied to this matter" },
          { status: 403 }
        );
      }
    }

    // Create a query object with user context
    const query = {
      id: `query_${Date.now()}`,
      text,
      mode,
      matterId,
      userId: user.id,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(query);
  } catch (error) {
    console.error("Error processing query:", error);
    return NextResponse.json({ error: "Failed to process query" }, { status: 500 });
  }
}
