import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { requireAuth, AuthenticatedUser, verifyMatterAccess } from '@/lib/api/auth-middleware';
import { z } from 'zod';

// Validation schema for document upload
const documentSchema = z.object({
  matterId: z.string().uuid('Invalid matter ID format'),
  filename: z.string().min(1).max(255),
  content: z.string().optional(),
  fileType: z.string().optional(),
  fileSize: z.number().positive().optional(),
});

/**
 * POST /api/lens/documents
 * Upload or update a source document
 */
export async function POST(request: NextRequest) {
  // Authenticate user
  const authResult = await requireAuth(request);
  if (authResult instanceof NextResponse) {
    return authResult;
  }
  const user: AuthenticatedUser = authResult;
  const userId = user.id;

  try {
    const body = await request.json();

    // Validate input
    const parseResult = documentSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const { matterId, filename, content, fileType, fileSize } = parseResult.data;

    // Verify user has access to the matter
    const hasAccess = await verifyMatterAccess(userId, matterId);
    if (!hasAccess) {
      return NextResponse.json(
        { error: 'Access denied to this matter' },
        { status: 403 }
      );
    }

    const supabase = await createClient();

    // Insert into database
    const { data, error } = await supabase
      .from('lens_documents')
      .insert({
        matter_id: matterId,
        uploaded_by: userId,
        filename,
        content: content || '',
        file_type: fileType,
        file_size: fileSize,
      })
      .select()
      .single();

    if (error) {
      console.error('[Lens] Database error:', error);
      return NextResponse.json(
        { error: 'Failed to save document' },
        { status: 500 }
      );
    }

    console.log('[Lens] Document uploaded:', data.id);

    return NextResponse.json({ document: data }, { status: 201 });

  } catch (error) {
    console.error('[Lens] Document upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload document' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/lens/documents?matterId=xxx
 * Get all documents for a matter
 */
export async function GET(request: NextRequest) {
  // Authenticate user
  const authResult = await requireAuth(request);
  if (authResult instanceof NextResponse) {
    return authResult;
  }
  const user: AuthenticatedUser = authResult;

  const searchParams = request.nextUrl.searchParams;
  const matterId = searchParams.get('matterId');

  if (!matterId) {
    return NextResponse.json(
      { error: 'matterId required' },
      { status: 400 }
    );
  }

  // Verify user has access to the matter
  const hasAccess = await verifyMatterAccess(user.id, matterId);
  if (!hasAccess) {
    return NextResponse.json(
      { error: 'Access denied to this matter' },
      { status: 403 }
    );
  }

  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('lens_documents')
      .select('*')
      .eq('matter_id', matterId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[Lens] Database error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch documents' },
        { status: 500 }
      );
    }

    return NextResponse.json({ documents: data || [] });

  } catch (error) {
    console.error('[Lens] Get documents error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    );
  }
}
