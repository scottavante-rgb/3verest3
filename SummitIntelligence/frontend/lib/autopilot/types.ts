export type AgentStatus = 'draft' | 'testing' | 'active' | 'paused' | 'archived';
export type AgentVisibilityScope = 'private' | 'team' | 'org';
export type StepKind = 'trigger' | 'think' | 'action' | 'control';
export type RunStatus = 'running' | 'success' | 'failed' | 'cancelled';
export type TriggerKind = 'manual' | 'schedule' | 'event';

export interface Agent {
  id: string;
  orgId: string;
  name: string;
  description: string | null;
  ownerUserId: string;
  visibilityScope: AgentVisibilityScope;
  status: AgentStatus;
  estimatedSgi: number | null;
  dataBoundary: Record<string, unknown>;
  privilegeProfile: Record<string, unknown>;
  runtimeConfig: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface AgentStep {
  id: string;
  agentId: string;
  kind: StepKind;
  title: string;
  summary: string | null;
  positionX: number;
  positionY: number;
  toolName: string | null;
  modelProfile: string | null;
  stepConfig: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface AgentStepEdge {
  id: string;
  agentId: string;
  fromStepId: string;
  toStepId: string;
  label: string | null;
  conditionConfig: Record<string, unknown>;
}

export interface AgentRun {
  id: string;
  agentId: string;
  triggeredByUserId: string | null;
  triggerKind: TriggerKind;
  status: RunStatus;
  orgId: string;
  context: Record<string, unknown>;
  startedAt: string;
  finishedAt: string | null;
  itemsProcessed: number;
  sgiContribution: number | null;
  errorSummary: string | null;
}

export interface AgentRunStep {
  id: string;
  runId: string;
  stepId: string;
  status: string;
  startedAt: string;
  finishedAt: string | null;
  inputPayload: Record<string, unknown> | null;
  outputPayload: Record<string, unknown> | null;
  toolCalls: unknown;
  modelCalls: unknown;
}

export interface AutopilotFlow {
  agent: Agent;
  steps: AgentStep[];
  edges: AgentStepEdge[];
}

// ============================================
// Agent Evolution Types
// ============================================

// Agent personality configuration
export interface AgentPersonality {
  riskTolerance: 1 | 2 | 3 | 4 | 5;
  communicationStyle: 1 | 2 | 3 | 4 | 5;
  thoroughness: 1 | 2 | 3 | 4 | 5;
  autonomy: 1 | 2 | 3 | 4 | 5;
}

// Learning configuration
export type LearningMode = 'static' | 'adaptive' | 'mentored';

// Data access permissions
export interface DataBoundary {
  matters: 'all' | 'team' | 'specific';
  matterIds?: string[];
  documents: 'full' | 'summarise' | 'none';
  financials: 'full' | 'summary' | 'none';
  communications: 'email' | 'calendar' | 'both' | 'none';
  people: 'team' | 'firm' | 'external';
  precedents: 'full' | 'practice-group';
}

// Governance configuration
export interface GovernanceConfig {
  approvalMode: 'preflight' | 'threshold' | 'spot-check' | 'exception' | 'post-run';
  approvalRouting: ApprovalRule[];
  auditLevel: 'minimal' | 'standard' | 'comprehensive';
  costLimit: number;
  actionLimit: number;
}

export interface ApprovalRule {
  condition: string;
  approver: 'partner' | 'matter-owner' | 'compliance' | 'finance';
}

// Multi-agent collaboration
export type CollaborationMode = 'solo' | 'delegate' | 'subordinate' | 'peer' | 'swarm';

// Agent categories
export type AgentCategory =
  | 'intake-triage'
  | 'document-intelligence'
  | 'compliance-risk'
  | 'billing-revenue'
  | 'client-communication'
  | 'knowledge-precedent'
  | 'deadline-management'
  | 'discovery-review'
  | 'custom';

// Agent template
export interface AgentTemplate {
  id: string;
  name: string;
  description: string;
  category: AgentCategory;
  practiceAreas: string[];
  iconId: string;
  defaultPersonality: AgentPersonality;
  defaultDataBoundary: DataBoundary;
  estimatedTimeSavings: string;
  complexity: 'simple' | 'moderate' | 'advanced';
  featured: boolean;
}

// Agent proposal from Genesis
export interface AgentProposal {
  id: string;
  name: string;
  description: string;
  purpose: string;
  estimatedTimeSavings: string;
  complexity: 'simple' | 'moderate' | 'advanced';
  suggestedCategory: AgentCategory;
  suggestedTrigger: string;
  dataAccessPreview: string[];
}

// Extended step kinds
export type ExtendedStepKind = StepKind | 'checkpoint' | 'handoff';
