/**
 * Authentication middleware for Next.js API routes
 *
 * Provides server-side authentication using Supabase sessions.
 * Returns the authenticated user or null if not authenticated.
 */

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export interface AuthenticatedUser {
  id: string;
  email: string;
  org_id?: string;
  full_name?: string;
  role?: string;
}

/**
 * Get the authenticated user from the request session.
 * Returns null if not authenticated.
 */
export async function getAuthenticatedUser(
  request?: NextRequest
): Promise<AuthenticatedUser | null> {
  try {
    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error || !session) {
      return null;
    }

    // Return basic user info from the session
    return {
      id: session.user.id,
      email: session.user.email || "",
      // Additional fields would come from your users table
    };
  } catch (error) {
    console.error("Auth middleware error:", error);
    return null;
  }
}

/**
 * Check if running in demo mode (Supabase not configured)
 */
export function isDemoMode(): boolean {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return (
    !supabaseUrl ||
    !supabaseKey ||
    supabaseUrl === "https://your-project.supabase.co"
  );
}

/**
 * Demo user for development without Supabase
 */
const DEMO_USER: AuthenticatedUser = {
  id: "demo_user_001",
  email: "demo@summitlegal.com.au",
  org_id: "demo_org_001",
  full_name: "Demo User",
  role: "partner",
};

/**
 * Require authentication for an API route.
 * Returns the user if authenticated, or a 401 response if not.
 *
 * Usage:
 * ```ts
 * export async function POST(request: NextRequest) {
 *   const authResult = await requireAuth(request);
 *   if (authResult instanceof NextResponse) {
 *     return authResult; // Return 401 response
 *   }
 *   const user = authResult;
 *   // Continue with authenticated request...
 * }
 * ```
 */
export async function requireAuth(
  request: NextRequest
): Promise<AuthenticatedUser | NextResponse> {
  // In demo mode, return demo user
  if (isDemoMode()) {
    return DEMO_USER;
  }

  const user = await getAuthenticatedUser(request);

  if (!user) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  return user;
}

/**
 * Verify that the user has access to a specific matter.
 * This should be called after authentication to ensure proper authorization.
 */
export async function verifyMatterAccess(
  userId: string,
  matterId: string
): Promise<boolean> {
  // In demo mode, allow all access
  if (isDemoMode()) {
    return true;
  }

  try {
    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    // Check if user is on the matter team or has org-wide access
    const { data, error } = await supabase
      .from("matter_team")
      .select("id")
      .eq("matter_id", matterId)
      .eq("user_id", userId)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 = no rows found
      console.error("Matter access check error:", error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error("Matter access verification error:", error);
    return false;
  }
}
