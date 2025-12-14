# Agent Evolution: Next-Generation Agent Builder

**Date:** 2025-12-14
**Status:** Approved for Implementation
**Author:** Summit Intelligence Team

---

## Executive Summary

Agent Evolution is a comprehensive agent creation and management experience that transforms how legal professionals build, deploy, and evolve AI agents. It combines intelligent problem-to-solution generation, sophisticated multi-agent collaboration, robust governance controls, and continuous learning capabilities.

The feature addresses four key innovation areas:
1. **Discoverability** - Users discover what agents are possible through natural language and curated templates
2. **Sophistication** - Multi-agent collaboration, delegation chains, and hierarchical supervision
3. **Governance** - Enterprise-grade guardrails, approval workflows, and comprehensive audit trails
4. **Personalization** - Agents that learn from attorney feedback and adapt over time

---

## Section 1: Agent Genesis - The Entry Point

The page opens with **Agent Genesis** - an intelligent dialogue that understands legal practice:

**"Describe a challenge, process, or friction point in your practice"**

### Example Interactions

**Example 1:** User types: *"Our associates spend too much time on routine discovery, and partners can't review everything before deadlines"*

The system responds with **Agent Proposals**:

1. **Discovery Triage Agent** - Reviews incoming documents overnight, tags by relevance and privilege, surfaces critical items for partner attention by 8am
2. **Review Delegation Agent** - Assigns documents to associates based on expertise and capacity, tracks completion, escalates blockers
3. **Discovery Quality Sentinel** - Samples associate work, flags inconsistencies, ensures defensible review process

**Example 2:** User types: *"I never know which matters need my attention until something is already overdue"*

Agent Proposals:
1. **Matter Pulse Agent** - Daily digest of matters requiring partner input, ranked by urgency and commercial importance
2. **Deadline Horizon Agent** - Scans all matters for approaching deadlines, court dates, limitation periods - alerts 14/7/3 days out
3. **Risk Radar Agent** - Monitors matter health signals (billing delays, document volume spikes, client silence) and flags deteriorating matters

**Example 3:** User types: *"We're losing revenue because time isn't being captured accurately"*

Agent Proposals:
1. **Time Reconstruction Agent** - Analyses email, document edits, calendar, and phone logs to suggest billable entries
2. **Leakage Detective Agent** - Compares actual activity to recorded time, identifies patterns of under-recording by lawyer and matter type
3. **WIP Shepherd Agent** - Chases aged unbilled time, prepares partner narratives, triggers billing workflows

### Template Gallery

Below the Genesis input sits a **Template Gallery** organized by:

| Practice Area | Function |
|--------------|----------|
| Litigation & Disputes | Intake & Triage |
| Corporate & M&A | Document Intelligence |
| Property & Construction | Compliance & Risk |
| Employment & Safety | Billing & Revenue |
| Regulatory & Government | Client Communication |
| Banking & Finance | Knowledge & Precedent |

---

## Section 2: Agent Identity & DNA

Once a user selects or refines an agent proposal, they enter the **Agent Identity** configuration:

### Core Identity

- **Name** - Human-readable identifier (e.g., "Morning Matter Pulse")
- **Purpose Statement** - One sentence describing what success looks like
- **Category** - Primary function tag for organization
- **Icon** - Visual identifier from curated legal iconography

### Agent Personality

Agents have configurable behavioural traits that affect how they operate:

| Trait | Spectrum | Impact |
|-------|----------|--------|
| **Risk Tolerance** | Conservative ↔ Assertive | How much uncertainty before escalating to human |
| **Communication Style** | Formal ↔ Conversational | Tone of notifications and summaries |
| **Thoroughness** | Efficient ↔ Exhaustive | Depth vs speed tradeoff |
| **Autonomy** | Supervised ↔ Independent | How often to checkpoint with humans |

**Example:** A "Discovery Triage Agent" for a cautious partner might be set to Conservative + Exhaustive + Supervised. The same agent for a high-volume practice might be Assertive + Efficient + Independent.

### Learning Mode

- **Static** - Agent behaves consistently based on initial configuration
- **Adaptive** - Agent learns from attorney corrections and feedback over time
- **Mentored** - Agent proposes improvements but requires approval before changing behaviour

---

## Section 3: Capabilities & Data Boundaries

### Data Access Permissions

Agents declare explicitly what data they can see. This creates trust and auditability:

| Data Domain | Access Level | Description |
|-------------|--------------|-------------|
| **Matters** | All / My Matters / Specific | Which matters the agent can access |
| **Documents** | Read / Read+Summarise / None | Document corpus access |
| **Financials** | Full / Summary / None | Time entries, WIP, billing data |
| **Communications** | Email / Calendar / Both / None | Outlook/Exchange integration |
| **People** | Team / Firm-wide / External | Contact and personnel data |
| **Precedents** | Full Library / Practice Group | Knowledge management access |

### Tool Permissions

What actions can the agent take?

| Action Category | Examples | Approval Required |
|-----------------|----------|-------------------|
| **Read & Analyse** | Search documents, query data | No |
| **Generate & Draft** | Create summaries, draft emails | Configurable |
| **Notify & Alert** | Send notifications, flag items | No |
| **Create Records** | Log time entries, create tasks | Yes (default) |
| **Modify Data** | Update matter status, edit records | Always |
| **External Comms** | Send client emails, file documents | Always |

### Cost Boundaries

Prevent runaway agents with explicit limits:

- **Daily token budget** - Maximum AI compute per day
- **Action limits** - Max records created/modified per run
- **Escalation threshold** - Auto-pause if exceeding normal patterns

---

## Section 4: Multi-Agent Collaboration

### Agent Relationships

Agents don't work in isolation. The builder allows configuration of agent-to-agent relationships:

### Delegation Chains

An agent can spawn sub-tasks to specialist agents:
- Example: "Matter Pulse Agent" detects a billing issue → delegates to "Leakage Detective Agent" for deep analysis → results flow back to parent

### Supervisor Hierarchy

```
Partner Oversight Agent (Supervisor)
├── Discovery Triage Agent
├── Deadline Horizon Agent
└── WIP Shepherd Agent
```

Supervisor agents can:
- Monitor subordinate agent health and performance
- Override or pause subordinate actions
- Aggregate outputs into consolidated reporting

### Agent Handoffs

Sequential workflows where one agent's output becomes another's input:
- Example: "Intake Agent" creates matter → triggers "Conflict Check Agent" → triggers "Team Assignment Agent"

### Collaboration Modes

| Mode | Behaviour |
|------|-----------|
| **Solo** | Agent works independently |
| **Delegate** | Can assign work to other agents |
| **Subordinate** | Reports to a supervisor agent |
| **Peer** | Collaborates with equals, no hierarchy |
| **Swarm** | Multiple instances work in parallel on partitioned data |

---

## Section 5: Workflow Builder

### Visual Flow Canvas

A drag-and-drop canvas for constructing agent logic:

### Node Types

| Node | Icon | Purpose |
|------|------|---------|
| **Trigger** | ⚡ | What starts the agent (schedule, event, manual, webhook) |
| **Think** | 🧠 | AI reasoning step - analyse, summarise, decide |
| **Action** | ⚙️ | Execute a tool - query data, create record, send notification |
| **Control** | 🔀 | Conditional routing - if/else, thresholds, loops |
| **Checkpoint** | ✋ | Human approval gate - pause for review |
| **Handoff** | 🤝 | Delegate to another agent |

### Trigger Types

| Trigger | Configuration |
|---------|---------------|
| **Schedule** | Cron expression with timezone (Sydney default) |
| **Event** | Matter created, document uploaded, deadline approaching, email received |
| **Manual** | User-initiated with optional input form |
| **Webhook** | External system integration |
| **Agent** | Called by another agent |

### Think Node Configuration

| Setting | Options |
|---------|---------|
| **Model** | Opus 4 (complex reasoning), Sonnet 4 (balanced), Haiku (fast/simple) |
| **Prompt Template** | Structured prompt with variable injection |
| **Output Schema** | Expected structure of reasoning output |
| **Confidence Threshold** | Minimum confidence to proceed without escalation |

### Control Flow Patterns

- **Conditional Branch** - Route based on previous step output
- **Parallel Fan-out** - Process multiple items simultaneously
- **Loop** - Iterate over collection with per-item logic
- **Try/Catch** - Error handling with fallback paths
- **Wait** - Pause for time duration or external signal

---

## Section 6: Governance & Guardrails

### Approval Workflows

Configure human-in-the-loop checkpoints:

| Approval Type | When Used |
|---------------|-----------|
| **Pre-flight** | Agent requires approval before each run |
| **Threshold** | Approval needed if action exceeds defined limits |
| **Spot-check** | Random sampling of agent outputs for quality |
| **Exception** | Only when agent encounters uncertainty |
| **Post-run** | Review after completion before results are actioned |

### Approval Routing

```
If action = external_communication → Partner approval
If cost_impact > $10,000 → Finance approval
If risk_score > 0.7 → Compliance approval
Default → Matter owner approval
```

### Audit Trail

Every agent action is logged with:
- Timestamp and duration
- Input data fingerprint (what the agent saw)
- Reasoning trace (why it decided)
- Action taken and outcome
- Model used and token consumption
- Human approvals received

### Compliance Controls

| Control | Description |
|---------|-------------|
| **Matter Boundary** | Agent cannot access matters outside its scope |
| **Privilege Protection** | Auto-detect and exclude privileged content |
| **Conflict Wall** | Respect information barriers between matter groups |
| **Retention** | Agent logs follow firm retention policies |
| **Export Restrictions** | Prevent data leaving approved systems |

---

## Section 7: Evolution & Learning

### Feedback Mechanisms

Agents improve through structured feedback:

| Feedback Type | Capture Method |
|---------------|----------------|
| **Correction** | User edits agent output → agent learns preference |
| **Rating** | Thumbs up/down on individual outputs |
| **Override** | User takes different action → agent notes pattern |
| **Annotation** | User explains why output was wrong |

### Performance Metrics

Each agent tracks:

- **Accuracy** - Corrections vs accepted outputs
- **Efficiency** - Time/cost to complete tasks
- **Adoption** - How often users engage with outputs
- **Value** - Estimated time saved (SGI contribution)

### Evolution Proposals

Adaptive agents periodically propose improvements:

> "Based on 47 corrections over 3 months, I've noticed you prefer shorter summaries for routine matters but detailed analysis for matters over $500K. Would you like me to adjust my behaviour?"

Proposals require explicit approval before taking effect.

### Agent Generations

Version control for agent configurations:
- **v1.0** - Initial deployment
- **v1.1** - Learned preferences from feedback
- **v2.0** - Major workflow restructure

Roll back to previous versions if needed.

---

## Section 8: Testing & Deployment

### Sandbox Mode

Before going live, agents run in sandbox:

- **Simulation** - Run against historical data, compare to actual outcomes
- **Shadow Mode** - Run live but don't action outputs, just log what would happen
- **Pilot** - Limited deployment to single matter or user

### Deployment States

```
Draft → Testing → Shadow → Pilot → Active → Paused → Archived
```

### Health Monitoring

Live agents display health indicators:

| Metric | Healthy | Warning | Critical |
|--------|---------|---------|----------|
| Success rate | >95% | 85-95% | <85% |
| Avg latency | <30s | 30-60s | >60s |
| User adoption | >80% | 50-80% | <50% |
| Cost efficiency | On budget | 10-25% over | >25% over |

### Alerting

- Slack/Teams notifications for agent failures
- Daily digest of agent performance
- Immediate escalation for critical errors

---

## Section 9: Page Layout & Navigation

### Route Structure

```
/autopilot                    → Agent library (existing)
/autopilot/new                → Agent Genesis (new page)
/autopilot/new/[id]           → Agent Builder (draft in progress)
/autopilot/agent/[id]         → Agent Detail (existing enhanced)
/autopilot/agent/[id]/edit    → Edit existing agent
/autopilot/agent/[id]/runs    → Run history
```

### New Page Layout: `/autopilot/new`

```
┌─────────────────────────────────────────────────────────────────┐
│ PageHeader: "Agent Evolution"                      [?] How to use│
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  AGENT GENESIS                                           │   │
│  │  ─────────────────────────────────────────────────────── │   │
│  │  "Describe a challenge, process, or friction point..."  │   │
│  │  ┌─────────────────────────────────────────────────────┐│   │
│  │  │                                                     ││   │
│  │  │  [Natural language input area]                      ││   │
│  │  │                                                     ││   │
│  │  └─────────────────────────────────────────────────────┘│   │
│  │                                        [Generate Ideas]  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  AGENT PROPOSALS (appears after generation)              │   │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐        │   │
│  │  │ Proposal 1  │ │ Proposal 2  │ │ Proposal 3  │        │   │
│  │  │ Time saved  │ │ Time saved  │ │ Time saved  │        │   │
│  │  │ Complexity  │ │ Complexity  │ │ Complexity  │        │   │
│  │  │ [Select]    │ │ [Select]    │ │ [Select]    │        │   │
│  │  └─────────────┘ └─────────────┘ └─────────────┘        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ─────────────────── OR START FROM TEMPLATE ───────────────────  │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  TEMPLATE GALLERY                                        │   │
│  │  [Litigation] [Corporate] [Property] [Employment] [All] │   │
│  │                                                          │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐    │   │
│  │  │Discovery │ │Contract  │ │Deadline  │ │Billing   │    │   │
│  │  │Triage    │ │Intel     │ │Sentinel  │ │Forensics │    │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Builder Page Layout: `/autopilot/new/[id]`

```
┌─────────────────────────────────────────────────────────────────┐
│ [← Back] Agent Builder: "Discovery Triage Agent"    [Save Draft]│
├────────────────────┬────────────────────────────────────────────┤
│                    │                                             │
│  CONFIGURATION     │           WORKFLOW CANVAS                   │
│  ────────────────  │                                             │
│                    │    ┌─────┐    ┌─────┐    ┌─────┐           │
│  ▼ Identity        │    │ ⚡  │───→│ 🧠  │───→│ ⚙️  │           │
│    Name            │    │Trig │    │Think│    │Act  │           │
│    Purpose         │    └─────┘    └─────┘    └─────┘           │
│    Category        │                   │                         │
│                    │                   ▼                         │
│  ▼ Personality     │              ┌─────┐    ┌─────┐            │
│    Risk: ●●●○○     │              │ 🔀  │───→│ ✋  │            │
│    Style: ●●○○○    │              │Ctrl │    │Gate │            │
│    Depth: ●●●●○    │              └─────┘    └─────┘            │
│                    │                                             │
│  ▼ Data Access     │                                             │
│    Matters: [...]  │  ┌─────────────────────────────────────┐   │
│    Documents: [...] │  │ NODE INSPECTOR                      │   │
│    Financials: [...]│  │ ─────────────────────────────────── │   │
│                    │  │ Selected: "Think: Analyze Documents" │   │
│  ▼ Governance      │  │ Model: Sonnet 4                      │   │
│    Approvals: [...] │  │ Prompt: [Edit template]              │   │
│    Audit: [...]     │  │ Confidence threshold: 0.85           │   │
│                    │  └─────────────────────────────────────┘   │
│  ▼ Collaboration   │                                             │
│    Mode: Solo      │                                             │
│    Delegates: None │                                             │
│                    │                                             │
├────────────────────┴────────────────────────────────────────────┤
│ [Test in Sandbox]  [Deploy to Shadow]  [Activate Agent]         │
└─────────────────────────────────────────────────────────────────┘
```

---

## Section 10: Component Inventory

### New Components Required

| Component | Location | Purpose |
|-----------|----------|---------|
| `AgentGenesisInput` | `components/autopilot/genesis/` | Natural language problem input |
| `AgentProposalCard` | `components/autopilot/genesis/` | Display AI-generated agent proposals |
| `TemplateGallery` | `components/autopilot/genesis/` | Browsable template library |
| `TemplateCard` | `components/autopilot/genesis/` | Individual template display |
| `AgentIdentityForm` | `components/autopilot/builder/` | Name, purpose, category config |
| `PersonalitySliders` | `components/autopilot/builder/` | Trait configuration UI |
| `DataBoundaryConfig` | `components/autopilot/builder/` | Permission matrix |
| `GovernanceConfig` | `components/autopilot/builder/` | Approval workflow setup |
| `CollaborationConfig` | `components/autopilot/builder/` | Multi-agent relationships |
| `WorkflowCanvas` | `components/autopilot/builder/` | Visual flow editor (enhance existing) |
| `NodePalette` | `components/autopilot/builder/` | Draggable node types |
| `CheckpointNode` | `components/autopilot/builder/` | Human approval gate node |
| `HandoffNode` | `components/autopilot/builder/` | Agent delegation node |
| `AgentHealthCard` | `components/autopilot/monitoring/` | Live health indicators |
| `EvolutionTimeline` | `components/autopilot/evolution/` | Version history & proposals |
| `EvolutionProposalCard` | `components/autopilot/evolution/` | Individual proposal display |
| `FeedbackCapture` | `components/autopilot/evolution/` | Correction/rating UI |
| `SandboxRunner` | `components/autopilot/testing/` | Test execution interface |
| `DeploymentControls` | `components/autopilot/testing/` | State transition buttons |

### Existing Components to Enhance

| Component | Enhancement |
|-----------|-------------|
| `AutopilotAgentList` | Add "New Agent" button linking to `/autopilot/new` |
| `AutopilotCanvas` | Support new node types (Checkpoint, Handoff) |
| `NodeInspector` | Personality and governance configuration |
| `AutopilotFlowPreview` | Show collaboration relationships |
| `CanvasNode` | New visual styles for checkpoint and handoff nodes |

---

## Section 11: Data Model Extensions

### New Types

```typescript
// Agent personality configuration
interface AgentPersonality {
  riskTolerance: 1 | 2 | 3 | 4 | 5;      // Conservative to Assertive
  communicationStyle: 1 | 2 | 3 | 4 | 5; // Formal to Conversational
  thoroughness: 1 | 2 | 3 | 4 | 5;       // Efficient to Exhaustive
  autonomy: 1 | 2 | 3 | 4 | 5;           // Supervised to Independent
}

// Learning configuration
type LearningMode = 'static' | 'adaptive' | 'mentored';

// Data access permissions
interface DataBoundary {
  matters: 'all' | 'team' | 'specific';
  matterIds?: string[];
  documents: 'full' | 'summarise' | 'none';
  financials: 'full' | 'summary' | 'none';
  communications: 'email' | 'calendar' | 'both' | 'none';
  people: 'team' | 'firm' | 'external';
  precedents: 'full' | 'practice-group';
}

// Governance configuration
interface GovernanceConfig {
  approvalMode: 'preflight' | 'threshold' | 'spot-check' | 'exception' | 'post-run';
  approvalRouting: ApprovalRule[];
  auditLevel: 'minimal' | 'standard' | 'comprehensive';
  costLimit: number;
  actionLimit: number;
}

interface ApprovalRule {
  condition: string;  // e.g., "action = external_communication"
  approver: 'partner' | 'matter-owner' | 'compliance' | 'finance';
}

// Multi-agent collaboration
type CollaborationMode = 'solo' | 'delegate' | 'subordinate' | 'peer' | 'swarm';

interface AgentRelationship {
  id: string;
  fromAgentId: string;
  toAgentId: string;
  relationshipType: 'supervises' | 'delegates-to' | 'peers-with';
}

// Evolution tracking
interface AgentVersion {
  id: string;
  agentId: string;
  version: string;
  changelog: string;
  configuration: Record<string, unknown>;
  createdAt: string;
  createdBy: string;
}

interface EvolutionProposal {
  id: string;
  agentId: string;
  proposalType: 'behaviour' | 'threshold' | 'prompt' | 'workflow';
  description: string;
  evidence: string;        // What triggered this proposal
  suggestedChange: Record<string, unknown>;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

// Agent health monitoring
interface AgentHealth {
  agentId: string;
  successRate: number;
  avgLatency: number;
  adoptionRate: number;
  costEfficiency: number;
  lastRunAt: string;
  status: 'healthy' | 'warning' | 'critical';
}

// New step types
type StepKind = 'trigger' | 'think' | 'action' | 'control' | 'checkpoint' | 'handoff';

interface CheckpointStep extends AgentStep {
  kind: 'checkpoint';
  stepConfig: {
    approvalType: 'any' | 'all';
    approvers: string[];
    timeoutHours: number;
    timeoutAction: 'proceed' | 'fail' | 'escalate';
  };
}

interface HandoffStep extends AgentStep {
  kind: 'handoff';
  stepConfig: {
    targetAgentId: string;
    inputMapping: Record<string, string>;
    awaitCompletion: boolean;
  };
}
```

### Extended Agent Type

```typescript
interface Agent {
  // Existing fields
  id: string;
  orgId: string;
  name: string;
  description: string | null;
  ownerUserId: string;
  visibilityScope: AgentVisibilityScope;
  status: AgentStatus;

  // New fields
  purpose: string;
  category: AgentCategory;
  iconId: string;
  personality: AgentPersonality;
  learningMode: LearningMode;
  dataBoundary: DataBoundary;
  governance: GovernanceConfig;
  collaborationMode: CollaborationMode;
  supervisorAgentId: string | null;
  currentVersion: string;
  health: AgentHealth;

  // Existing fields
  estimatedSgi: number | null;
  privilegeProfile: Record<string, unknown>;
  runtimeConfig: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

type AgentCategory =
  | 'intake-triage'
  | 'document-intelligence'
  | 'compliance-risk'
  | 'billing-revenue'
  | 'client-communication'
  | 'knowledge-precedent'
  | 'deadline-management'
  | 'discovery-review'
  | 'custom';
```

### Agent Template Type

```typescript
interface AgentTemplate {
  id: string;
  name: string;
  description: string;
  category: AgentCategory;
  practiceAreas: string[];
  iconId: string;
  defaultPersonality: AgentPersonality;
  defaultDataBoundary: DataBoundary;
  defaultGovernance: GovernanceConfig;
  suggestedSteps: AgentStep[];
  suggestedEdges: AgentStepEdge[];
  estimatedTimeSavings: string;
  complexity: 'simple' | 'moderate' | 'advanced';
  featured: boolean;
  usageCount: number;
}
```

---

## Section 12: API Endpoints

### New Endpoints

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/api/autopilot/genesis` | Generate agent proposals from problem description |
| `GET` | `/api/autopilot/templates` | List available agent templates |
| `GET` | `/api/autopilot/templates/[id]` | Get template details |
| `POST` | `/api/autopilot/agents` | Create new agent draft |
| `PUT` | `/api/autopilot/agents/[id]` | Update agent configuration |
| `POST` | `/api/autopilot/agents/[id]/test` | Run agent in sandbox |
| `POST` | `/api/autopilot/agents/[id]/deploy` | Change deployment state |
| `GET` | `/api/autopilot/agents/[id]/versions` | List agent versions |
| `POST` | `/api/autopilot/agents/[id]/rollback` | Rollback to previous version |
| `GET` | `/api/autopilot/agents/[id]/health` | Get health metrics |
| `GET` | `/api/autopilot/agents/[id]/proposals` | List evolution proposals |
| `POST` | `/api/autopilot/agents/[id]/proposals/[pid]/approve` | Approve evolution |
| `POST` | `/api/autopilot/agents/[id]/feedback` | Submit feedback on output |
| `GET` | `/api/autopilot/relationships` | List agent relationships |
| `POST` | `/api/autopilot/relationships` | Create agent relationship |

### Genesis Request/Response

```typescript
// POST /api/autopilot/genesis
interface GenesisRequest {
  problemDescription: string;
  context?: {
    practiceArea?: string;
    matterTypes?: string[];
    userRole?: string;
  };
}

interface GenesisResponse {
  proposals: AgentProposal[];
  clarifyingQuestions?: string[];  // If problem is ambiguous
}

interface AgentProposal {
  id: string;
  name: string;
  description: string;
  purpose: string;
  estimatedTimeSavings: string;    // e.g., "3-5 hours per week"
  complexity: 'simple' | 'moderate' | 'advanced';
  suggestedCategory: AgentCategory;
  suggestedTrigger: string;
  suggestedSteps: AgentStepSummary[];
  dataAccessPreview: string[];     // What this agent would see
}

interface AgentStepSummary {
  title: string;
  kind: StepKind;
  description: string;
}
```

### Template Endpoints

```typescript
// GET /api/autopilot/templates
interface TemplateListResponse {
  templates: AgentTemplate[];
  categories: { id: AgentCategory; label: string; count: number }[];
  practiceAreas: { id: string; label: string; count: number }[];
}

// GET /api/autopilot/templates/[id]
interface TemplateDetailResponse {
  template: AgentTemplate;
  relatedTemplates: AgentTemplate[];
  recentUsage: { userId: string; agentName: string; createdAt: string }[];
}
```

### Feedback Endpoint

```typescript
// POST /api/autopilot/agents/[id]/feedback
interface FeedbackRequest {
  runId: string;
  stepId?: string;
  feedbackType: 'correction' | 'rating' | 'override' | 'annotation';
  rating?: 'positive' | 'negative';
  originalOutput?: Record<string, unknown>;
  correctedOutput?: Record<string, unknown>;
  annotation?: string;
}
```

---

## Section 13: Implementation Phases

### Phase 1: Foundation (MVP)
- Agent Genesis page with natural language input
- Basic proposal generation (mock/templated initially)
- Template gallery with 6-8 core templates
- Agent identity configuration
- Integration with existing workflow canvas
- Basic "New Agent" button on Autopilot page

### Phase 2: Intelligence
- Full AI-powered proposal generation via OpenAI
- Personality configuration with behavioural impact
- Data boundary configuration
- Enhanced node types (checkpoint, handoff)

### Phase 3: Governance
- Approval workflow configuration
- Audit trail implementation
- Compliance controls
- Sandbox and shadow deployment modes

### Phase 4: Collaboration
- Multi-agent relationships
- Delegation chains
- Supervisor hierarchy
- Agent health monitoring

### Phase 5: Evolution
- Feedback capture mechanisms
- Performance metrics dashboard
- Evolution proposals
- Version control and rollback

---

## Section 14: Guide Content

### Agent Evolution Guide

```typescript
export const agentEvolutionGuide: FeatureGuide = {
  featureId: "agent-evolution",
  title: "Agent Evolution",
  tagline: "Build intelligent agents that learn and adapt to your practice",

  overview: "Agent Evolution is Summit's next-generation agent builder. Describe a challenge in natural language and receive tailored agent proposals. Configure agent personality, data access, and governance controls. Deploy with confidence using sandbox testing and shadow modes. Watch your agents evolve through feedback and continuous learning.",

  steps: [
    {
      step: 1,
      action: "Describe your challenge",
      detail: "Enter a natural language description of a process, task, or friction point in your practice. Be specific about what takes time, what gets missed, or what needs automation."
    },
    {
      step: 2,
      action: "Review agent proposals",
      detail: "Summit generates 2-3 tailored agent concepts. Each shows estimated time savings, complexity level, and what data the agent would access. Select one to refine or combine ideas."
    },
    {
      step: 3,
      action: "Configure identity and personality",
      detail: "Name your agent and set its behavioural traits: risk tolerance, communication style, thoroughness, and autonomy level. These affect how the agent operates and escalates."
    },
    {
      step: 4,
      action: "Set boundaries and governance",
      detail: "Define what data the agent can access and what actions require human approval. Configure audit levels and compliance controls appropriate for your practice."
    },
    {
      step: 5,
      action: "Build the workflow",
      detail: "Use the visual canvas to construct agent logic. Add triggers, thinking steps, actions, and control flow. Insert checkpoints where human review is needed."
    },
    {
      step: 6,
      action: "Test and deploy",
      detail: "Run your agent in sandbox mode against historical data. Use shadow mode to see what it would do without taking action. Gradually promote to active when confident."
    }
  ],

  useCases: [
    {
      scenario: "Building a discovery assistant",
      context: "Your team reviews thousands of documents but partners can't review everything before deadlines.",
      howItHelps: "Describe the challenge. Select 'Discovery Triage Agent'. Configure for overnight runs, partner-level summaries, and privilege-aware filtering.",
      outcome: "Critical documents surfaced by 8am daily, with full audit trail of what was reviewed."
    },
    {
      scenario: "Automating time capture",
      context: "Associates forget to log time, leading to revenue leakage.",
      howItHelps: "Describe the billing challenge. Select 'Time Reconstruction Agent'. Set to analyse email, documents, and calendar daily.",
      outcome: "Suggested time entries delivered each evening for quick review and approval."
    },
    {
      scenario: "Creating a matter early warning system",
      context: "You want proactive alerts before matters go off track.",
      howItHelps: "Select 'Risk Radar Agent' template. Configure thresholds for billing delays, deadline proximity, and client communication gaps.",
      outcome: "Daily digest of matters requiring attention, ranked by commercial importance."
    }
  ],

  tips: [
    "Start with templates and customise - faster than building from scratch",
    "Use shadow mode for 1-2 weeks before activating new agents",
    "Set conservative personality traits initially, loosen as trust builds",
    "Provide feedback on agent outputs - adaptive agents learn from corrections",
    "Review evolution proposals monthly to approve beneficial changes"
  ],

  relatedFeatures: [
    {
      featureId: "autopilot",
      name: "Autopilot",
      reason: "View and manage all your deployed agents"
    },
    {
      featureId: "oracle",
      name: "Oracle",
      reason: "Agents can use Oracle's analytical capabilities"
    }
  ]
};
```

---

## Appendix: Template Library (Initial Set)

### Litigation & Disputes

1. **Discovery Triage Agent** - Overnight document review, relevance tagging, privilege detection
2. **Deadline Horizon Agent** - Court date monitoring, limitation periods, filing deadlines
3. **Opposition Research Agent** - Track opposing counsel patterns, judge preferences, precedent cases

### Corporate & M&A

4. **Contract Intelligence Agent** - Key term extraction, risk flagging, playbook comparison
5. **Due Diligence Coordinator** - Document request tracking, gap identification, issue escalation
6. **Board Meeting Prep Agent** - Agenda analysis, document assembly, minute drafting

### Billing & Revenue

7. **Time Reconstruction Agent** - Activity analysis, entry suggestions, leakage detection
8. **WIP Shepherd Agent** - Aged time chase, narrative preparation, billing workflow triggers
9. **Fee Proposal Agent** - Historical analysis, scope estimation, competitive benchmarking

### Compliance & Risk

10. **Compliance Sentinel Agent** - Policy monitoring, breach detection, regulatory horizon scanning
11. **Conflict Check Agent** - New matter screening, relationship analysis, wall recommendations
12. **Matter Health Monitor** - Risk scoring, early warning indicators, partner alerts

---

*End of Design Document*
