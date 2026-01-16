import { NextRequest, NextResponse } from 'next/server';
import { buildMatterGraph, buildMatterTimeline } from '@/lib/oracle/graph/matterGraph';
import { computeRiskScore } from '@/lib/oracle-engine/scoring';
import { detectPatterns } from '@/lib/oracle-engine/patterns';
import { forecastMatter, forecastCost } from '@/lib/oracle-engine/forecasting';
import { audit } from '@/lib/oracle/audit/auditLog';
import { privilegeCheck } from '@/lib/oracle/privilege/privilegeMap';
import { requireAuth, AuthenticatedUser } from '@/lib/api/auth-middleware';

/**
 * GET /api/oracle/matter-360?matterId=xxx
 * Get comprehensive 360° view of matter
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

  if (!matterId) {
    return NextResponse.json(
      { error: 'matterId required' },
      { status: 400 }
    );
  }

  // Privilege check
  if (!privilegeCheck(userId, matterId)) {
    return NextResponse.json(
      { error: 'Access denied' },
      { status: 403 }
    );
  }

  try {
    // Fetch matter data
    // TODO: Implement database queries
    const matter = {
      id: matterId,
      name: 'Sample Matter',
      code: 'MAT-2024-001',
      clientId: 'client-1',
      jurisdiction: 'NSW',
      status: 'active',
      compliance_state: 'green' as const,
      startDate: new Date('2024-01-01'),
      riskScore: 0.35
    };

    // Build knowledge graph
    const graph = await buildMatterGraph(matterId);

    // Build timeline
    const timeline = await buildMatterTimeline(matterId);

    // Detect patterns
    const matterData = {
      id: matterId,
      timeline: { events: [], milestones: [] },
      billing: { entries: [], wip: 50000, billedToDate: 150000 },
      documents: [],
      riskScore: 0.35
    };
    const patterns = detectPatterns(matterData);

    // Generate forecasts
    const trajectoryForecast = await forecastMatter(matterId);
    const costForecast = await forecastCost(matterId);

    // Compute risk score
    const riskScore = computeRiskScore({
      deadlinePressure: 0.4,
      billingStall: 0.2,
      documentVolumeSpike: 0.3,
      partnerInvolvement: 0.8,
      historySimilarityScore: 0.7,
      complexityScore: 0.4,
      clientRelationshipHealth: 0.9,
      complianceRisk: 0.1
    });

    // Fetch recent insights
    // TODO: Query insights from database
    const insights: any[] = [];

    // Audit
    await audit('oracle_query', {
      action: 'matter_360',
      matterId
    }, { actorId: userId, matterId });

    return NextResponse.json({
      matter,
      graph,
      timeline,
      patterns,
      forecasts: {
        trajectory: trajectoryForecast,
        cost: costForecast
      },
      riskScore,
      insights,
      generatedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Matter 360 error:', error);
    return NextResponse.json(
      { error: 'Failed to generate matter 360 view' },
      { status: 500 }
    );
  }
}
