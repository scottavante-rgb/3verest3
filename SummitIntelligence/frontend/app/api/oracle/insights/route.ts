import { NextRequest, NextResponse } from 'next/server';
import { audit } from '@/lib/oracle/audit/auditLog';
import { privilegeCheck } from '@/lib/oracle/privilege/privilegeMap';
import { requireAuth, AuthenticatedUser } from '@/lib/api/auth-middleware';

/**
 * GET /api/oracle/insights
 * Retrieve insights by matter or client
 */
export async function GET(request: NextRequest) {
  // Authenticate user
  const authResult = await requireAuth(request);
  if (authResult instanceof NextResponse) {
    return authResult;
  }
  const user: AuthenticatedUser = authResult;
  const userId = user.id;

  const searchParams = request.nextUrl.searchParams;
  const matterId = searchParams.get('matterId');
  const clientId = searchParams.get('clientId');
  const category = searchParams.get('category');
  const severity = searchParams.get('severity');

  // Privilege check
  if (matterId && !privilegeCheck(userId, matterId)) {
    await audit('oracle_access_denied', {
      action: 'get_insights',
      matterId,
      reason: 'insufficient_privilege'
    }, { actorId: userId, matterId });

    return NextResponse.json(
      { error: 'Access denied' },
      { status: 403 }
    );
  }

  // TODO: Fetch insights from database
  const insights: any[] = [];

  await audit('oracle_query', {
    action: 'get_insights',
    filters: { matterId, clientId, category, severity },
    resultCount: insights.length
  }, { actorId: userId, matterId: matterId || undefined });

  return NextResponse.json({ insights });
}

/**
 * POST /api/oracle/insights
 * Create new insight
 */
export async function POST(request: NextRequest) {
  // Authenticate user
  const authResult = await requireAuth(request);
  if (authResult instanceof NextResponse) {
    return authResult;
  }
  const user: AuthenticatedUser = authResult;
  const userId = user.id;

  const body = await request.json();
  const { matterId, clientId, category, insight, confidence, evidence, severity } = body;

  // Privilege check
  if (matterId && !privilegeCheck(userId, matterId, 'full')) {
    return NextResponse.json(
      { error: 'Access denied' },
      { status: 403 }
    );
  }

  // TODO: Insert insight into database
  const newInsight = {
    id: crypto.randomUUID(),
    matterId,
    clientId,
    category,
    insight,
    confidence,
    evidence,
    severity,
    createdAt: new Date()
  };

  await audit('oracle_insight_generated', {
    action: 'create_insight',
    category,
    confidence
  }, { actorId: userId, matterId: matterId || undefined });

  return NextResponse.json({ insight: newInsight }, { status: 201 });
}
