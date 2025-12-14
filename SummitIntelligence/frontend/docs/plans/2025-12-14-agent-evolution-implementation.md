# Agent Evolution Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the Agent Evolution feature - a next-generation agent builder with natural language problem-to-agent generation, template gallery, and visual workflow configuration.

**Architecture:** Two new routes (`/autopilot/new` for Agent Genesis, `/autopilot/new/[id]` for Agent Builder). Genesis page accepts natural language input and displays AI-generated proposals or templates. Builder page provides identity configuration, personality sliders, data boundaries, and integrates with existing workflow canvas.

**Tech Stack:** Next.js 15 App Router, React, TypeScript, Tailwind CSS, Lucide icons, existing Summit component library (pearl-card, PageHeader, BentoGrid)

---

## Phase 1: Foundation MVP

### Task 1: Create Type Definitions

**Files:**
- Modify: `lib/autopilot/types.ts`

**Step 1: Add new type definitions to existing types file**

Add to `lib/autopilot/types.ts`:

```typescript
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
```

**Step 2: Verify TypeScript compiles**

Run: `npm run build 2>&1 | head -20`
Expected: "Compiled successfully" or type checking passes

**Step 3: Commit**

```bash
git add lib/autopilot/types.ts
git commit -m "feat(autopilot): add Agent Evolution type definitions"
```

---

### Task 2: Create Agent Templates Data

**Files:**
- Create: `lib/autopilot/templates.ts`

**Step 1: Create templates data file**

Create `lib/autopilot/templates.ts`:

```typescript
import type { AgentTemplate } from './types';

export const agentTemplates: AgentTemplate[] = [
  // Litigation & Disputes
  {
    id: 'discovery-triage',
    name: 'Discovery Triage Agent',
    description: 'Reviews incoming documents overnight, tags by relevance and privilege, surfaces critical items for partner attention by 8am.',
    category: 'discovery-review',
    practiceAreas: ['litigation', 'disputes'],
    iconId: 'file-search',
    defaultPersonality: {
      riskTolerance: 2,
      communicationStyle: 3,
      thoroughness: 4,
      autonomy: 2,
    },
    defaultDataBoundary: {
      matters: 'specific',
      documents: 'full',
      financials: 'none',
      communications: 'none',
      people: 'team',
      precedents: 'practice-group',
    },
    estimatedTimeSavings: '4-6 hours per day',
    complexity: 'moderate',
    featured: true,
  },
  {
    id: 'deadline-horizon',
    name: 'Deadline Horizon Agent',
    description: 'Scans all matters for approaching deadlines, court dates, and limitation periods. Alerts at 14, 7, and 3 days out.',
    category: 'deadline-management',
    practiceAreas: ['litigation', 'disputes', 'corporate'],
    iconId: 'calendar-clock',
    defaultPersonality: {
      riskTolerance: 1,
      communicationStyle: 3,
      thoroughness: 5,
      autonomy: 4,
    },
    defaultDataBoundary: {
      matters: 'all',
      documents: 'none',
      financials: 'none',
      communications: 'calendar',
      people: 'team',
      precedents: 'none',
    },
    estimatedTimeSavings: '2-3 hours per week',
    complexity: 'simple',
    featured: true,
  },
  {
    id: 'opposition-research',
    name: 'Opposition Research Agent',
    description: 'Tracks opposing counsel patterns, judge preferences, and relevant precedent cases for strategic advantage.',
    category: 'document-intelligence',
    practiceAreas: ['litigation', 'disputes'],
    iconId: 'search',
    defaultPersonality: {
      riskTolerance: 3,
      communicationStyle: 4,
      thoroughness: 5,
      autonomy: 3,
    },
    defaultDataBoundary: {
      matters: 'specific',
      documents: 'full',
      financials: 'none',
      communications: 'none',
      people: 'external',
      precedents: 'full',
    },
    estimatedTimeSavings: '3-5 hours per matter',
    complexity: 'advanced',
    featured: false,
  },
  // Corporate & M&A
  {
    id: 'contract-intelligence',
    name: 'Contract Intelligence Agent',
    description: 'Extracts key terms, identifies risk clauses, compares against firm playbook, and generates negotiation talking points.',
    category: 'document-intelligence',
    practiceAreas: ['corporate', 'banking'],
    iconId: 'file-text',
    defaultPersonality: {
      riskTolerance: 2,
      communicationStyle: 4,
      thoroughness: 5,
      autonomy: 2,
    },
    defaultDataBoundary: {
      matters: 'specific',
      documents: 'full',
      financials: 'none',
      communications: 'none',
      people: 'team',
      precedents: 'full',
    },
    estimatedTimeSavings: '2-4 hours per contract',
    complexity: 'moderate',
    featured: true,
  },
  {
    id: 'due-diligence-coordinator',
    name: 'Due Diligence Coordinator',
    description: 'Tracks document requests, identifies gaps in received materials, and escalates outstanding items.',
    category: 'intake-triage',
    practiceAreas: ['corporate', 'banking'],
    iconId: 'clipboard-check',
    defaultPersonality: {
      riskTolerance: 2,
      communicationStyle: 3,
      thoroughness: 4,
      autonomy: 3,
    },
    defaultDataBoundary: {
      matters: 'specific',
      documents: 'full',
      financials: 'summary',
      communications: 'email',
      people: 'team',
      precedents: 'none',
    },
    estimatedTimeSavings: '5-8 hours per deal',
    complexity: 'moderate',
    featured: false,
  },
  {
    id: 'board-meeting-prep',
    name: 'Board Meeting Prep Agent',
    description: 'Analyses meeting agendas, assembles required documents, and prepares draft minutes templates.',
    category: 'document-intelligence',
    practiceAreas: ['corporate'],
    iconId: 'users',
    defaultPersonality: {
      riskTolerance: 1,
      communicationStyle: 2,
      thoroughness: 4,
      autonomy: 2,
    },
    defaultDataBoundary: {
      matters: 'specific',
      documents: 'full',
      financials: 'none',
      communications: 'calendar',
      people: 'team',
      precedents: 'practice-group',
    },
    estimatedTimeSavings: '2-3 hours per meeting',
    complexity: 'simple',
    featured: false,
  },
  // Billing & Revenue
  {
    id: 'time-reconstruction',
    name: 'Time Reconstruction Agent',
    description: 'Analyses email, document edits, calendar, and phone logs to suggest accurate billable entries.',
    category: 'billing-revenue',
    practiceAreas: ['all'],
    iconId: 'clock',
    defaultPersonality: {
      riskTolerance: 2,
      communicationStyle: 3,
      thoroughness: 4,
      autonomy: 3,
    },
    defaultDataBoundary: {
      matters: 'team',
      documents: 'summarise',
      financials: 'full',
      communications: 'both',
      people: 'team',
      precedents: 'none',
    },
    estimatedTimeSavings: '30-45 minutes per day',
    complexity: 'moderate',
    featured: true,
  },
  {
    id: 'wip-shepherd',
    name: 'WIP Shepherd Agent',
    description: 'Chases aged unbilled time, prepares partner narratives, and triggers billing workflows.',
    category: 'billing-revenue',
    practiceAreas: ['all'],
    iconId: 'dollar-sign',
    defaultPersonality: {
      riskTolerance: 3,
      communicationStyle: 3,
      thoroughness: 3,
      autonomy: 4,
    },
    defaultDataBoundary: {
      matters: 'team',
      documents: 'none',
      financials: 'full',
      communications: 'email',
      people: 'team',
      precedents: 'none',
    },
    estimatedTimeSavings: '2-4 hours per week',
    complexity: 'simple',
    featured: false,
  },
  {
    id: 'leakage-detective',
    name: 'Leakage Detective Agent',
    description: 'Compares actual activity to recorded time, identifies under-recording patterns by lawyer and matter type.',
    category: 'billing-revenue',
    practiceAreas: ['all'],
    iconId: 'trending-down',
    defaultPersonality: {
      riskTolerance: 2,
      communicationStyle: 4,
      thoroughness: 5,
      autonomy: 2,
    },
    defaultDataBoundary: {
      matters: 'all',
      documents: 'summarise',
      financials: 'full',
      communications: 'both',
      people: 'firm',
      precedents: 'none',
    },
    estimatedTimeSavings: '$10-50K recovered monthly',
    complexity: 'advanced',
    featured: false,
  },
  // Compliance & Risk
  {
    id: 'compliance-sentinel',
    name: 'Compliance Sentinel Agent',
    description: 'Monitors policy compliance, detects potential breaches, and scans regulatory horizon for changes.',
    category: 'compliance-risk',
    practiceAreas: ['regulatory', 'banking', 'corporate'],
    iconId: 'shield',
    defaultPersonality: {
      riskTolerance: 1,
      communicationStyle: 2,
      thoroughness: 5,
      autonomy: 3,
    },
    defaultDataBoundary: {
      matters: 'all',
      documents: 'full',
      financials: 'summary',
      communications: 'email',
      people: 'firm',
      precedents: 'full',
    },
    estimatedTimeSavings: 'Risk mitigation',
    complexity: 'advanced',
    featured: true,
  },
  {
    id: 'conflict-check',
    name: 'Conflict Check Agent',
    description: 'Screens new matters for conflicts, analyses relationships, and recommends information barriers.',
    category: 'compliance-risk',
    practiceAreas: ['all'],
    iconId: 'alert-triangle',
    defaultPersonality: {
      riskTolerance: 1,
      communicationStyle: 2,
      thoroughness: 5,
      autonomy: 1,
    },
    defaultDataBoundary: {
      matters: 'all',
      documents: 'none',
      financials: 'none',
      communications: 'none',
      people: 'firm',
      precedents: 'none',
    },
    estimatedTimeSavings: '1-2 hours per matter',
    complexity: 'moderate',
    featured: false,
  },
  {
    id: 'matter-health-monitor',
    name: 'Matter Health Monitor',
    description: 'Continuously scores matter health, surfaces early warning indicators, and alerts partners to deteriorating matters.',
    category: 'compliance-risk',
    practiceAreas: ['all'],
    iconId: 'activity',
    defaultPersonality: {
      riskTolerance: 2,
      communicationStyle: 3,
      thoroughness: 4,
      autonomy: 4,
    },
    defaultDataBoundary: {
      matters: 'team',
      documents: 'summarise',
      financials: 'summary',
      communications: 'both',
      people: 'team',
      precedents: 'none',
    },
    estimatedTimeSavings: 'Proactive risk management',
    complexity: 'moderate',
    featured: true,
  },
];

export function getTemplatesByCategory(category: string): AgentTemplate[] {
  if (category === 'all') return agentTemplates;
  return agentTemplates.filter(t => t.category === category || t.practiceAreas.includes(category));
}

export function getFeaturedTemplates(): AgentTemplate[] {
  return agentTemplates.filter(t => t.featured);
}

export function getTemplateById(id: string): AgentTemplate | undefined {
  return agentTemplates.find(t => t.id === id);
}
```

**Step 2: Verify TypeScript compiles**

Run: `npm run build 2>&1 | head -20`
Expected: "Compiled successfully"

**Step 3: Commit**

```bash
git add lib/autopilot/templates.ts
git commit -m "feat(autopilot): add agent template library with 12 templates"
```

---

### Task 3: Create Genesis Components Directory Structure

**Files:**
- Create: `components/autopilot/genesis/index.ts`
- Create: `components/autopilot/genesis/AgentGenesisInput.tsx`

**Step 1: Create the AgentGenesisInput component**

Create `components/autopilot/genesis/AgentGenesisInput.tsx`:

```typescript
"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";

interface AgentGenesisInputProps {
  onGenerate: (problemDescription: string) => Promise<void>;
  isLoading: boolean;
}

export function AgentGenesisInput({ onGenerate, isLoading }: AgentGenesisInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = async () => {
    if (input.trim().length < 10 || isLoading) return;
    await onGenerate(input.trim());
  };

  const placeholderExamples = [
    "Our associates spend too much time on routine discovery, and partners can't review everything before deadlines",
    "I never know which matters need my attention until something is already overdue",
    "We're losing revenue because time isn't being captured accurately",
    "Contract reviews take too long and we miss key risk clauses",
  ];

  const randomPlaceholder = placeholderExamples[Math.floor(Math.random() * placeholderExamples.length)];

  return (
    <div className="pearl-card p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-summit-blue to-summit-amber flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-pearl-charcoal">Agent Genesis</h2>
            <p className="text-sm text-pearl-charcoal/50">Describe a challenge and we'll design an agent for you</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-pearl-charcoal/60 mb-2 uppercase tracking-wider">
              Describe a challenge, process, or friction point in your practice
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={randomPlaceholder}
              className="w-full min-h-[120px] px-4 py-3 text-sm rounded-sovereign border border-pearl-slate/30 bg-white focus:outline-none focus:ring-2 focus:ring-summit-blue/20 focus:border-summit-blue/40 resize-none transition-all"
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xs text-pearl-charcoal/40">
              Be specific about what takes time, what gets missed, or what needs automation
            </p>
            <button
              onClick={handleSubmit}
              disabled={input.trim().length < 10 || isLoading}
              className="px-6 py-2.5 rounded-sovereign bg-summit-blue text-white text-sm font-medium hover:bg-summit-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating Ideas...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate Agent Ideas
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Create the index export file**

Create `components/autopilot/genesis/index.ts`:

```typescript
export { AgentGenesisInput } from './AgentGenesisInput';
```

**Step 3: Verify TypeScript compiles**

Run: `npm run build 2>&1 | head -30`
Expected: "Compiled successfully"

**Step 4: Commit**

```bash
git add components/autopilot/genesis/
git commit -m "feat(autopilot): add AgentGenesisInput component"
```

---

### Task 4: Create AgentProposalCard Component

**Files:**
- Create: `components/autopilot/genesis/AgentProposalCard.tsx`
- Modify: `components/autopilot/genesis/index.ts`

**Step 1: Create the AgentProposalCard component**

Create `components/autopilot/genesis/AgentProposalCard.tsx`:

```typescript
"use client";

import { Clock, Zap, Database, ChevronRight } from "lucide-react";
import type { AgentProposal } from "@/lib/autopilot/types";
import { cn } from "@/lib/utils";

interface AgentProposalCardProps {
  proposal: AgentProposal;
  index: number;
  onSelect: (proposal: AgentProposal) => void;
}

export function AgentProposalCard({ proposal, index, onSelect }: AgentProposalCardProps) {
  const complexityColors = {
    simple: "bg-emerald-50 text-emerald-700",
    moderate: "bg-amber-50 text-amber-700",
    advanced: "bg-rose-50 text-rose-700",
  };

  return (
    <div
      className="pearl-card p-6 hover:shadow-lg transition-all cursor-pointer group border-2 border-transparent hover:border-summit-blue/20"
      onClick={() => onSelect(proposal)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-summit-blue/10 flex items-center justify-center text-summit-blue font-semibold text-sm">
            {index + 1}
          </div>
          <div>
            <h3 className="font-semibold text-pearl-charcoal group-hover:text-summit-blue transition-colors">
              {proposal.name}
            </h3>
            <span className={cn("text-xs px-2 py-0.5 rounded-full", complexityColors[proposal.complexity])}>
              {proposal.complexity}
            </span>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-pearl-charcoal/30 group-hover:text-summit-blue group-hover:translate-x-1 transition-all" />
      </div>

      <p className="text-sm text-pearl-charcoal/70 mb-4 line-clamp-2">
        {proposal.description}
      </p>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-pearl-charcoal/60">
          <Clock className="w-3.5 h-3.5" />
          <span>Est. savings: {proposal.estimatedTimeSavings}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-pearl-charcoal/60">
          <Zap className="w-3.5 h-3.5" />
          <span>Trigger: {proposal.suggestedTrigger}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-pearl-charcoal/60">
          <Database className="w-3.5 h-3.5" />
          <span>Access: {proposal.dataAccessPreview.slice(0, 2).join(", ")}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-pearl-slate/20">
        <p className="text-xs text-pearl-charcoal/50 italic">
          "{proposal.purpose}"
        </p>
      </div>
    </div>
  );
}
```

**Step 2: Update index exports**

Update `components/autopilot/genesis/index.ts`:

```typescript
export { AgentGenesisInput } from './AgentGenesisInput';
export { AgentProposalCard } from './AgentProposalCard';
```

**Step 3: Verify TypeScript compiles**

Run: `npm run build 2>&1 | head -30`
Expected: "Compiled successfully"

**Step 4: Commit**

```bash
git add components/autopilot/genesis/
git commit -m "feat(autopilot): add AgentProposalCard component"
```

---

### Task 5: Create TemplateGallery Component

**Files:**
- Create: `components/autopilot/genesis/TemplateCard.tsx`
- Create: `components/autopilot/genesis/TemplateGallery.tsx`
- Modify: `components/autopilot/genesis/index.ts`

**Step 1: Create TemplateCard component**

Create `components/autopilot/genesis/TemplateCard.tsx`:

```typescript
"use client";

import { Clock, ChevronRight } from "lucide-react";
import * as LucideIcons from "lucide-react";
import type { AgentTemplate } from "@/lib/autopilot/types";
import { cn } from "@/lib/utils";

interface TemplateCardProps {
  template: AgentTemplate;
  onSelect: (template: AgentTemplate) => void;
}

export function TemplateCard({ template, onSelect }: TemplateCardProps) {
  const complexityColors = {
    simple: "bg-emerald-50 text-emerald-700",
    moderate: "bg-amber-50 text-amber-700",
    advanced: "bg-rose-50 text-rose-700",
  };

  // Dynamic icon lookup
  const iconName = template.iconId
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('') as keyof typeof LucideIcons;
  const IconComponent = (LucideIcons[iconName] as React.ComponentType<{ className?: string }>) || LucideIcons.Bot;

  return (
    <div
      className="pearl-card p-5 hover:shadow-lg transition-all cursor-pointer group border-2 border-transparent hover:border-summit-blue/20"
      onClick={() => onSelect(template)}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-summit-blue/10 flex items-center justify-center text-summit-blue flex-shrink-0">
          <IconComponent className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-pearl-charcoal text-sm truncate group-hover:text-summit-blue transition-colors">
              {template.name}
            </h3>
            {template.featured && (
              <span className="text-[10px] px-1.5 py-0.5 bg-summit-amber/10 text-summit-amber rounded-full flex-shrink-0">
                Featured
              </span>
            )}
          </div>
          <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full", complexityColors[template.complexity])}>
            {template.complexity}
          </span>
        </div>
        <ChevronRight className="w-4 h-4 text-pearl-charcoal/30 group-hover:text-summit-blue group-hover:translate-x-1 transition-all flex-shrink-0" />
      </div>

      <p className="text-xs text-pearl-charcoal/60 line-clamp-2 mb-3">
        {template.description}
      </p>

      <div className="flex items-center gap-2 text-[10px] text-pearl-charcoal/50">
        <Clock className="w-3 h-3" />
        <span>{template.estimatedTimeSavings}</span>
      </div>
    </div>
  );
}
```

**Step 2: Create TemplateGallery component**

Create `components/autopilot/genesis/TemplateGallery.tsx`:

```typescript
"use client";

import { useState } from "react";
import { LayoutGrid } from "lucide-react";
import type { AgentTemplate } from "@/lib/autopilot/types";
import { agentTemplates, getTemplatesByCategory, getFeaturedTemplates } from "@/lib/autopilot/templates";
import { TemplateCard } from "./TemplateCard";
import { cn } from "@/lib/utils";

interface TemplateGalleryProps {
  onSelectTemplate: (template: AgentTemplate) => void;
}

const categories = [
  { id: 'all', label: 'All Templates' },
  { id: 'litigation', label: 'Litigation' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'billing-revenue', label: 'Billing' },
  { id: 'compliance-risk', label: 'Compliance' },
  { id: 'document-intelligence', label: 'Documents' },
];

export function TemplateGallery({ onSelectTemplate }: TemplateGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredTemplates = selectedCategory === 'all'
    ? agentTemplates
    : getTemplatesByCategory(selectedCategory);

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-center gap-4">
        <div className="h-px flex-1 bg-pearl-slate/20" />
        <div className="flex items-center gap-2 text-pearl-charcoal/50">
          <LayoutGrid className="w-4 h-4" />
          <span className="text-xs font-medium uppercase tracking-wider">Or Start From Template</span>
        </div>
        <div className="h-px flex-1 bg-pearl-slate/20" />
      </div>

      {/* Category Filters */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={cn(
              "px-3 py-1.5 text-xs font-medium rounded-full transition-all",
              selectedCategory === cat.id
                ? "bg-summit-blue text-white"
                : "bg-pearl-warm text-pearl-charcoal/70 hover:bg-pearl-slate/20"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onSelect={onSelectTemplate}
          />
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12 text-pearl-charcoal/50">
          <p>No templates found in this category.</p>
        </div>
      )}
    </div>
  );
}
```

**Step 3: Update index exports**

Update `components/autopilot/genesis/index.ts`:

```typescript
export { AgentGenesisInput } from './AgentGenesisInput';
export { AgentProposalCard } from './AgentProposalCard';
export { TemplateCard } from './TemplateCard';
export { TemplateGallery } from './TemplateGallery';
```

**Step 4: Verify TypeScript compiles**

Run: `npm run build 2>&1 | head -30`
Expected: "Compiled successfully"

**Step 5: Commit**

```bash
git add components/autopilot/genesis/ lib/autopilot/templates.ts
git commit -m "feat(autopilot): add TemplateGallery and TemplateCard components"
```

---

### Task 6: Create Agent Genesis Page

**Files:**
- Create: `app/autopilot/new/page.tsx`

**Step 1: Create the Agent Genesis page**

Create `app/autopilot/new/page.tsx`:

```typescript
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/ui/page-header";
import { FeatureGuide } from "@/components/future/guidance";
import { AgentGenesisInput, AgentProposalCard, TemplateGallery } from "@/components/autopilot/genesis";
import type { AgentProposal, AgentTemplate } from "@/lib/autopilot/types";

// Mock proposal generation - will be replaced with API call
function generateMockProposals(problemDescription: string): AgentProposal[] {
  const lowercaseDesc = problemDescription.toLowerCase();

  if (lowercaseDesc.includes('discovery') || lowercaseDesc.includes('document') || lowercaseDesc.includes('review')) {
    return [
      {
        id: 'proposal-1',
        name: 'Discovery Triage Agent',
        description: 'Reviews incoming documents overnight, tags by relevance and privilege, surfaces critical items for partner attention by 8am.',
        purpose: 'Reduce document review backlog and ensure partners see critical items first',
        estimatedTimeSavings: '4-6 hours per day',
        complexity: 'moderate',
        suggestedCategory: 'discovery-review',
        suggestedTrigger: 'Nightly at 11pm',
        dataAccessPreview: ['Matter documents', 'Privilege tags', 'Team assignments'],
      },
      {
        id: 'proposal-2',
        name: 'Review Delegation Agent',
        description: 'Assigns documents to associates based on expertise and capacity, tracks completion, escalates blockers.',
        purpose: 'Optimise workload distribution and ensure timely review completion',
        estimatedTimeSavings: '2-3 hours per day',
        complexity: 'moderate',
        suggestedCategory: 'intake-triage',
        suggestedTrigger: 'On new document batch',
        dataAccessPreview: ['Team capacity', 'Expertise profiles', 'Document metadata'],
      },
      {
        id: 'proposal-3',
        name: 'Discovery Quality Sentinel',
        description: 'Samples associate work, flags inconsistencies, ensures defensible review process.',
        purpose: 'Maintain quality standards and catch errors before they become problems',
        estimatedTimeSavings: '1-2 hours per day',
        complexity: 'advanced',
        suggestedCategory: 'compliance-risk',
        suggestedTrigger: 'Continuous monitoring',
        dataAccessPreview: ['Review decisions', 'Quality metrics', 'Historical patterns'],
      },
    ];
  }

  if (lowercaseDesc.includes('deadline') || lowercaseDesc.includes('overdue') || lowercaseDesc.includes('attention')) {
    return [
      {
        id: 'proposal-1',
        name: 'Matter Pulse Agent',
        description: 'Daily digest of matters requiring partner input, ranked by urgency and commercial importance.',
        purpose: 'Ensure partners focus on what matters most each day',
        estimatedTimeSavings: '1-2 hours per day',
        complexity: 'simple',
        suggestedCategory: 'deadline-management',
        suggestedTrigger: 'Daily at 7am',
        dataAccessPreview: ['All matters', 'Deadlines', 'Activity levels'],
      },
      {
        id: 'proposal-2',
        name: 'Deadline Horizon Agent',
        description: 'Scans all matters for approaching deadlines, court dates, limitation periods - alerts 14/7/3 days out.',
        purpose: 'Never miss a critical deadline again',
        estimatedTimeSavings: '2-3 hours per week',
        complexity: 'simple',
        suggestedCategory: 'deadline-management',
        suggestedTrigger: 'Daily scan',
        dataAccessPreview: ['Court dates', 'Filing deadlines', 'Limitation periods'],
      },
      {
        id: 'proposal-3',
        name: 'Risk Radar Agent',
        description: 'Monitors matter health signals (billing delays, document volume spikes, client silence) and flags deteriorating matters.',
        purpose: 'Catch problems early before they escalate',
        estimatedTimeSavings: 'Proactive risk management',
        complexity: 'moderate',
        suggestedCategory: 'compliance-risk',
        suggestedTrigger: 'Continuous monitoring',
        dataAccessPreview: ['Billing data', 'Communication logs', 'Activity patterns'],
      },
    ];
  }

  if (lowercaseDesc.includes('time') || lowercaseDesc.includes('billing') || lowercaseDesc.includes('revenue')) {
    return [
      {
        id: 'proposal-1',
        name: 'Time Reconstruction Agent',
        description: 'Analyses email, document edits, calendar, and phone logs to suggest billable entries.',
        purpose: 'Capture every billable minute accurately',
        estimatedTimeSavings: '30-45 minutes per day',
        complexity: 'moderate',
        suggestedCategory: 'billing-revenue',
        suggestedTrigger: 'End of day at 5pm',
        dataAccessPreview: ['Email activity', 'Document edits', 'Calendar events'],
      },
      {
        id: 'proposal-2',
        name: 'Leakage Detective Agent',
        description: 'Compares actual activity to recorded time, identifies patterns of under-recording by lawyer and matter type.',
        purpose: 'Identify and recover lost revenue',
        estimatedTimeSavings: '$10-50K recovered monthly',
        complexity: 'advanced',
        suggestedCategory: 'billing-revenue',
        suggestedTrigger: 'Weekly analysis',
        dataAccessPreview: ['All activity logs', 'Time entries', 'Historical patterns'],
      },
      {
        id: 'proposal-3',
        name: 'WIP Shepherd Agent',
        description: 'Chases aged unbilled time, prepares partner narratives, triggers billing workflows.',
        purpose: 'Keep WIP moving and bills going out on time',
        estimatedTimeSavings: '2-4 hours per week',
        complexity: 'simple',
        suggestedCategory: 'billing-revenue',
        suggestedTrigger: 'Weekly on Monday',
        dataAccessPreview: ['Unbilled time', 'Matter budgets', 'Billing history'],
      },
    ];
  }

  // Default proposals for generic requests
  return [
    {
      id: 'proposal-1',
      name: 'Custom Workflow Agent',
      description: 'A tailored agent designed to address your specific challenge with automated monitoring and intelligent actions.',
      purpose: 'Automate repetitive tasks and surface important information',
      estimatedTimeSavings: '2-4 hours per week',
      complexity: 'moderate',
      suggestedCategory: 'custom',
      suggestedTrigger: 'Configurable',
      dataAccessPreview: ['Relevant matter data', 'Documents', 'Activity logs'],
    },
    {
      id: 'proposal-2',
      name: 'Intelligence Monitor Agent',
      description: 'Continuously monitors your area of concern and alerts you to changes or issues requiring attention.',
      purpose: 'Stay informed without constant manual checking',
      estimatedTimeSavings: '1-2 hours per day',
      complexity: 'simple',
      suggestedCategory: 'custom',
      suggestedTrigger: 'Continuous',
      dataAccessPreview: ['Monitoring targets', 'Alert thresholds'],
    },
  ];
}

export default function AgentGenesisPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [proposals, setProposals] = useState<AgentProposal[]>([]);
  const [showGuide, setShowGuide] = useState(false);

  const handleGenerate = async (problemDescription: string) => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      const generatedProposals = generateMockProposals(problemDescription);
      setProposals(generatedProposals);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectProposal = (proposal: AgentProposal) => {
    // Navigate to builder with proposal data
    const params = new URLSearchParams({
      name: proposal.name,
      description: proposal.description,
      category: proposal.suggestedCategory,
      source: 'genesis',
    });
    router.push(`/autopilot/new/builder?${params.toString()}`);
  };

  const handleSelectTemplate = (template: AgentTemplate) => {
    // Navigate to builder with template data
    const params = new URLSearchParams({
      template: template.id,
      source: 'template',
    });
    router.push(`/autopilot/new/builder?${params.toString()}`);
  };

  // Temporary guide until we create the proper one
  const agentEvolutionGuide = {
    featureId: "agent-evolution",
    title: "Agent Evolution",
    tagline: "Build intelligent agents that learn and adapt to your practice",
    overview: "Agent Evolution is Summit's next-generation agent builder. Describe a challenge in natural language and receive tailored agent proposals.",
    steps: [
      { step: 1, action: "Describe your challenge", detail: "Enter a description of a process or friction point in your practice." },
      { step: 2, action: "Review proposals", detail: "Summit generates tailored agent concepts for your challenge." },
      { step: 3, action: "Select and configure", detail: "Choose a proposal or template to customise." },
    ],
    useCases: [],
    tips: ["Start with templates and customise", "Be specific about what takes time"],
    relatedFeatures: [],
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Agent Evolution"
        onHelpClick={() => setShowGuide(true)}
      />

      {/* Agent Genesis Input */}
      <AgentGenesisInput onGenerate={handleGenerate} isLoading={isLoading} />

      {/* Generated Proposals */}
      {proposals.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-pearl-charcoal">
            Agent Proposals
          </h2>
          <p className="text-sm text-pearl-charcoal/60">
            Based on your challenge, here are tailored agent concepts. Select one to customise.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {proposals.map((proposal, index) => (
              <AgentProposalCard
                key={proposal.id}
                proposal={proposal}
                index={index}
                onSelect={handleSelectProposal}
              />
            ))}
          </div>
        </div>
      )}

      {/* Template Gallery */}
      <TemplateGallery onSelectTemplate={handleSelectTemplate} />

      {/* Guide */}
      <FeatureGuide
        isOpen={showGuide}
        onClose={() => setShowGuide(false)}
        guide={agentEvolutionGuide}
      />
    </div>
  );
}
```

**Step 2: Verify TypeScript compiles**

Run: `npm run build 2>&1 | head -40`
Expected: "Compiled successfully"

**Step 3: Commit**

```bash
git add app/autopilot/new/
git commit -m "feat(autopilot): add Agent Genesis page with proposals and templates"
```

---

### Task 7: Create Builder Components Directory

**Files:**
- Create: `components/autopilot/builder/index.ts`
- Create: `components/autopilot/builder/AgentIdentityForm.tsx`
- Create: `components/autopilot/builder/PersonalitySliders.tsx`

**Step 1: Create AgentIdentityForm component**

Create `components/autopilot/builder/AgentIdentityForm.tsx`:

```typescript
"use client";

import { Bot } from "lucide-react";
import type { AgentCategory } from "@/lib/autopilot/types";

interface AgentIdentityFormProps {
  name: string;
  purpose: string;
  category: AgentCategory;
  onNameChange: (name: string) => void;
  onPurposeChange: (purpose: string) => void;
  onCategoryChange: (category: AgentCategory) => void;
}

const categories: { id: AgentCategory; label: string }[] = [
  { id: 'intake-triage', label: 'Intake & Triage' },
  { id: 'document-intelligence', label: 'Document Intelligence' },
  { id: 'compliance-risk', label: 'Compliance & Risk' },
  { id: 'billing-revenue', label: 'Billing & Revenue' },
  { id: 'client-communication', label: 'Client Communication' },
  { id: 'knowledge-precedent', label: 'Knowledge & Precedent' },
  { id: 'deadline-management', label: 'Deadline Management' },
  { id: 'discovery-review', label: 'Discovery & Review' },
  { id: 'custom', label: 'Custom' },
];

export function AgentIdentityForm({
  name,
  purpose,
  category,
  onNameChange,
  onPurposeChange,
  onCategoryChange,
}: AgentIdentityFormProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 pb-3 border-b border-pearl-slate/20">
        <div className="w-8 h-8 rounded-lg bg-summit-blue/10 flex items-center justify-center">
          <Bot className="w-4 h-4 text-summit-blue" />
        </div>
        <h3 className="font-semibold text-pearl-charcoal text-sm">Identity</h3>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-pearl-charcoal/60 mb-1">
            Agent Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="e.g., Morning Matter Pulse"
            className="w-full px-3 py-2 text-sm rounded-sovereign border border-pearl-slate/30 focus:outline-none focus:ring-2 focus:ring-summit-blue/20"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-pearl-charcoal/60 mb-1">
            Purpose
          </label>
          <textarea
            value={purpose}
            onChange={(e) => onPurposeChange(e.target.value)}
            placeholder="What does success look like for this agent?"
            rows={2}
            className="w-full px-3 py-2 text-sm rounded-sovereign border border-pearl-slate/30 focus:outline-none focus:ring-2 focus:ring-summit-blue/20 resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-pearl-charcoal/60 mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value as AgentCategory)}
            className="w-full px-3 py-2 text-sm rounded-sovereign border border-pearl-slate/30 focus:outline-none focus:ring-2 focus:ring-summit-blue/20 bg-white"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Create PersonalitySliders component**

Create `components/autopilot/builder/PersonalitySliders.tsx`:

```typescript
"use client";

import { Sliders } from "lucide-react";
import type { AgentPersonality } from "@/lib/autopilot/types";
import { cn } from "@/lib/utils";

interface PersonalitySlidersProps {
  personality: AgentPersonality;
  onChange: (personality: AgentPersonality) => void;
}

interface TraitSliderProps {
  label: string;
  leftLabel: string;
  rightLabel: string;
  value: 1 | 2 | 3 | 4 | 5;
  onChange: (value: 1 | 2 | 3 | 4 | 5) => void;
}

function TraitSlider({ label, leftLabel, rightLabel, value, onChange }: TraitSliderProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-pearl-charcoal">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-pearl-charcoal/50 w-20 text-right">{leftLabel}</span>
        <div className="flex-1 flex items-center gap-1">
          {([1, 2, 3, 4, 5] as const).map((level) => (
            <button
              key={level}
              onClick={() => onChange(level)}
              className={cn(
                "flex-1 h-2 rounded-full transition-all",
                level <= value
                  ? "bg-summit-blue"
                  : "bg-pearl-slate/20 hover:bg-pearl-slate/30"
              )}
            />
          ))}
        </div>
        <span className="text-[10px] text-pearl-charcoal/50 w-20">{rightLabel}</span>
      </div>
    </div>
  );
}

export function PersonalitySliders({ personality, onChange }: PersonalitySlidersProps) {
  const updateTrait = (trait: keyof AgentPersonality, value: 1 | 2 | 3 | 4 | 5) => {
    onChange({ ...personality, [trait]: value });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 pb-3 border-b border-pearl-slate/20">
        <div className="w-8 h-8 rounded-lg bg-summit-amber/10 flex items-center justify-center">
          <Sliders className="w-4 h-4 text-summit-amber" />
        </div>
        <div>
          <h3 className="font-semibold text-pearl-charcoal text-sm">Personality</h3>
          <p className="text-[10px] text-pearl-charcoal/50">How the agent behaves</p>
        </div>
      </div>

      <div className="space-y-4">
        <TraitSlider
          label="Risk Tolerance"
          leftLabel="Conservative"
          rightLabel="Assertive"
          value={personality.riskTolerance}
          onChange={(v) => updateTrait('riskTolerance', v)}
        />
        <TraitSlider
          label="Communication"
          leftLabel="Formal"
          rightLabel="Conversational"
          value={personality.communicationStyle}
          onChange={(v) => updateTrait('communicationStyle', v)}
        />
        <TraitSlider
          label="Thoroughness"
          leftLabel="Efficient"
          rightLabel="Exhaustive"
          value={personality.thoroughness}
          onChange={(v) => updateTrait('thoroughness', v)}
        />
        <TraitSlider
          label="Autonomy"
          leftLabel="Supervised"
          rightLabel="Independent"
          value={personality.autonomy}
          onChange={(v) => updateTrait('autonomy', v)}
        />
      </div>
    </div>
  );
}
```

**Step 3: Create index exports**

Create `components/autopilot/builder/index.ts`:

```typescript
export { AgentIdentityForm } from './AgentIdentityForm';
export { PersonalitySliders } from './PersonalitySliders';
```

**Step 4: Verify TypeScript compiles**

Run: `npm run build 2>&1 | head -30`
Expected: "Compiled successfully"

**Step 5: Commit**

```bash
git add components/autopilot/builder/
git commit -m "feat(autopilot): add AgentIdentityForm and PersonalitySliders components"
```

---

### Task 8: Create DataBoundaryConfig Component

**Files:**
- Create: `components/autopilot/builder/DataBoundaryConfig.tsx`
- Modify: `components/autopilot/builder/index.ts`

**Step 1: Create DataBoundaryConfig component**

Create `components/autopilot/builder/DataBoundaryConfig.tsx`:

```typescript
"use client";

import { Database } from "lucide-react";
import type { DataBoundary } from "@/lib/autopilot/types";
import { cn } from "@/lib/utils";

interface DataBoundaryConfigProps {
  boundary: DataBoundary;
  onChange: (boundary: DataBoundary) => void;
}

interface AccessRowProps {
  label: string;
  value: string;
  options: { id: string; label: string }[];
  onChange: (value: string) => void;
}

function AccessRow({ label, value, options, onChange }: AccessRowProps) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-pearl-slate/10 last:border-b-0">
      <span className="text-xs text-pearl-charcoal">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-xs px-2 py-1 rounded border border-pearl-slate/20 bg-white focus:outline-none focus:ring-1 focus:ring-summit-blue/30"
      >
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function DataBoundaryConfig({ boundary, onChange }: DataBoundaryConfigProps) {
  const updateField = <K extends keyof DataBoundary>(field: K, value: DataBoundary[K]) => {
    onChange({ ...boundary, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 pb-3 border-b border-pearl-slate/20">
        <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
          <Database className="w-4 h-4 text-emerald-600" />
        </div>
        <div>
          <h3 className="font-semibold text-pearl-charcoal text-sm">Data Access</h3>
          <p className="text-[10px] text-pearl-charcoal/50">What the agent can see</p>
        </div>
      </div>

      <div className="space-y-1">
        <AccessRow
          label="Matters"
          value={boundary.matters}
          options={[
            { id: 'all', label: 'All Matters' },
            { id: 'team', label: 'Team Matters' },
            { id: 'specific', label: 'Specific Matters' },
          ]}
          onChange={(v) => updateField('matters', v as DataBoundary['matters'])}
        />
        <AccessRow
          label="Documents"
          value={boundary.documents}
          options={[
            { id: 'full', label: 'Full Access' },
            { id: 'summarise', label: 'Summaries Only' },
            { id: 'none', label: 'No Access' },
          ]}
          onChange={(v) => updateField('documents', v as DataBoundary['documents'])}
        />
        <AccessRow
          label="Financials"
          value={boundary.financials}
          options={[
            { id: 'full', label: 'Full Access' },
            { id: 'summary', label: 'Summary Only' },
            { id: 'none', label: 'No Access' },
          ]}
          onChange={(v) => updateField('financials', v as DataBoundary['financials'])}
        />
        <AccessRow
          label="Communications"
          value={boundary.communications}
          options={[
            { id: 'both', label: 'Email & Calendar' },
            { id: 'email', label: 'Email Only' },
            { id: 'calendar', label: 'Calendar Only' },
            { id: 'none', label: 'No Access' },
          ]}
          onChange={(v) => updateField('communications', v as DataBoundary['communications'])}
        />
        <AccessRow
          label="People"
          value={boundary.people}
          options={[
            { id: 'team', label: 'Team Only' },
            { id: 'firm', label: 'Firm-wide' },
            { id: 'external', label: 'Include External' },
          ]}
          onChange={(v) => updateField('people', v as DataBoundary['people'])}
        />
        <AccessRow
          label="Precedents"
          value={boundary.precedents}
          options={[
            { id: 'full', label: 'Full Library' },
            { id: 'practice-group', label: 'Practice Group' },
          ]}
          onChange={(v) => updateField('precedents', v as DataBoundary['precedents'])}
        />
      </div>
    </div>
  );
}
```

**Step 2: Update index exports**

Update `components/autopilot/builder/index.ts`:

```typescript
export { AgentIdentityForm } from './AgentIdentityForm';
export { PersonalitySliders } from './PersonalitySliders';
export { DataBoundaryConfig } from './DataBoundaryConfig';
```

**Step 3: Verify TypeScript compiles**

Run: `npm run build 2>&1 | head -30`
Expected: "Compiled successfully"

**Step 4: Commit**

```bash
git add components/autopilot/builder/
git commit -m "feat(autopilot): add DataBoundaryConfig component"
```

---

### Task 9: Create Agent Builder Page

**Files:**
- Create: `app/autopilot/new/builder/page.tsx`

**Step 1: Create the Agent Builder page**

Create `app/autopilot/new/builder/page.tsx`:

```typescript
"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Save, Play, Rocket } from "lucide-react";
import Link from "next/link";
import { AgentIdentityForm, PersonalitySliders, DataBoundaryConfig } from "@/components/autopilot/builder";
import { AutopilotCanvas } from "@/components/autopilot/AutopilotCanvas";
import type { AgentCategory, AgentPersonality, DataBoundary, AgentStep, AgentStepEdge } from "@/lib/autopilot/types";
import { getTemplateById } from "@/lib/autopilot/templates";

const defaultPersonality: AgentPersonality = {
  riskTolerance: 3,
  communicationStyle: 3,
  thoroughness: 3,
  autonomy: 3,
};

const defaultDataBoundary: DataBoundary = {
  matters: 'team',
  documents: 'summarise',
  financials: 'none',
  communications: 'none',
  people: 'team',
  precedents: 'practice-group',
};

function BuilderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Agent state
  const [name, setName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [category, setCategory] = useState<AgentCategory>("custom");
  const [personality, setPersonality] = useState<AgentPersonality>(defaultPersonality);
  const [dataBoundary, setDataBoundary] = useState<DataBoundary>(defaultDataBoundary);
  const [steps, setSteps] = useState<AgentStep[]>([]);
  const [edges, setEdges] = useState<AgentStepEdge[]>([]);

  // Initialize from URL params
  useEffect(() => {
    const source = searchParams.get("source");

    if (source === "template") {
      const templateId = searchParams.get("template");
      if (templateId) {
        const template = getTemplateById(templateId);
        if (template) {
          setName(template.name);
          setPurpose(template.description);
          setCategory(template.category);
          setPersonality(template.defaultPersonality);
          setDataBoundary(template.defaultDataBoundary);
        }
      }
    } else if (source === "genesis") {
      setName(searchParams.get("name") || "");
      setPurpose(searchParams.get("description") || "");
      setCategory((searchParams.get("category") as AgentCategory) || "custom");
    }
  }, [searchParams]);

  const handleSave = () => {
    // TODO: Save to backend
    console.log("Saving agent:", { name, purpose, category, personality, dataBoundary });
  };

  const handleTest = () => {
    // TODO: Run in sandbox
    console.log("Testing agent in sandbox");
  };

  const handleDeploy = () => {
    // TODO: Deploy agent
    console.log("Deploying agent");
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-pearl-slate/20 bg-white">
        <div className="flex items-center gap-4">
          <Link
            href="/autopilot/new"
            className="p-2 hover:bg-pearl-warm rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-pearl-charcoal/60" />
          </Link>
          <div>
            <h1 className="text-lg font-semibold text-pearl-charcoal">
              {name || "New Agent"}
            </h1>
            <p className="text-xs text-pearl-charcoal/50">Agent Builder</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-pearl-charcoal/70 hover:text-pearl-charcoal hover:bg-pearl-warm rounded-lg transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Draft
          </button>
          <button
            onClick={handleTest}
            className="px-4 py-2 text-sm font-medium text-summit-blue hover:bg-summit-blue/10 rounded-lg transition-colors flex items-center gap-2"
          >
            <Play className="w-4 h-4" />
            Test in Sandbox
          </button>
          <button
            onClick={handleDeploy}
            className="px-4 py-2 text-sm font-medium text-white bg-summit-blue hover:bg-summit-blue/90 rounded-lg transition-colors flex items-center gap-2"
          >
            <Rocket className="w-4 h-4" />
            Activate
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Configuration */}
        <div className="w-80 border-r border-pearl-slate/20 bg-white overflow-y-auto p-4 space-y-6">
          <AgentIdentityForm
            name={name}
            purpose={purpose}
            category={category}
            onNameChange={setName}
            onPurposeChange={setPurpose}
            onCategoryChange={setCategory}
          />

          <PersonalitySliders
            personality={personality}
            onChange={setPersonality}
          />

          <DataBoundaryConfig
            boundary={dataBoundary}
            onChange={setDataBoundary}
          />
        </div>

        {/* Right Area - Workflow Canvas */}
        <div className="flex-1 bg-pearl-warm/30 overflow-hidden">
          <div className="h-full flex items-center justify-center text-pearl-charcoal/40">
            <div className="text-center">
              <p className="text-sm font-medium mb-2">Workflow Canvas</p>
              <p className="text-xs">
                Drag and drop nodes to build your agent's workflow
              </p>
              <p className="text-xs mt-4 text-pearl-charcoal/30">
                (Canvas integration coming in next phase)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AgentBuilderPage() {
  return (
    <Suspense fallback={
      <div className="h-full flex items-center justify-center">
        <div className="text-pearl-charcoal/50">Loading...</div>
      </div>
    }>
      <BuilderContent />
    </Suspense>
  );
}
```

**Step 2: Verify TypeScript compiles**

Run: `npm run build 2>&1 | head -40`
Expected: "Compiled successfully"

**Step 3: Commit**

```bash
git add app/autopilot/new/builder/
git commit -m "feat(autopilot): add Agent Builder page with configuration panels"
```

---

### Task 10: Update AutopilotAgentList with New Agent Button

**Files:**
- Modify: `components/autopilot/AutopilotAgentList.tsx`

**Step 1: Read current file**

Run: Read `components/autopilot/AutopilotAgentList.tsx` to understand current structure

**Step 2: Add New Agent button to the component**

Add a "New Agent" button that links to `/autopilot/new`. Look for the header or top section of the component and add:

```typescript
import Link from "next/link";
import { Plus } from "lucide-react";

// In the component's header section, add:
<Link
  href="/autopilot/new"
  className="px-4 py-2 text-sm font-medium text-white bg-summit-blue hover:bg-summit-blue/90 rounded-lg transition-colors flex items-center gap-2"
>
  <Plus className="w-4 h-4" />
  New Agent
</Link>
```

**Step 3: Verify TypeScript compiles**

Run: `npm run build 2>&1 | head -30`
Expected: "Compiled successfully"

**Step 4: Commit**

```bash
git add components/autopilot/AutopilotAgentList.tsx
git commit -m "feat(autopilot): add New Agent button linking to Agent Evolution"
```

---

### Task 11: Create Agent Evolution Guide Content

**Files:**
- Create: `components/future/guidance/guideContent/agentEvolutionGuide.ts`
- Modify: `components/future/guidance/guideContent/index.ts`

**Step 1: Create the guide content file**

Create `components/future/guidance/guideContent/agentEvolutionGuide.ts`:

```typescript
import type { FeatureGuide } from "../types";

export const agentEvolutionGuide: FeatureGuide = {
  featureId: "agent-evolution",
  title: "Agent Evolution",
  tagline: "Build intelligent agents that learn and adapt to your practice",

  overview: "Agent Evolution is Summit's next-generation agent builder. Describe a challenge in natural language and receive tailored agent proposals. Configure agent personality, data access, and governance controls. Deploy with confidence using sandbox testing. Watch your agents evolve through feedback and continuous learning.",

  steps: [
    {
      step: 1,
      action: "Describe your challenge",
      detail: "Enter a natural language description of a process, task, or friction point in your practice. Be specific about what takes time, what gets missed, or what needs automation."
    },
    {
      step: 2,
      action: "Review agent proposals",
      detail: "Summit generates 2-3 tailored agent concepts. Each shows estimated time savings, complexity level, and what data the agent would access. Select one to refine or choose from the template gallery."
    },
    {
      step: 3,
      action: "Configure identity and personality",
      detail: "Name your agent and set its behavioural traits: risk tolerance, communication style, thoroughness, and autonomy level. These affect how the agent operates and when it escalates to humans."
    },
    {
      step: 4,
      action: "Set data boundaries",
      detail: "Define what data the agent can access: matters, documents, financials, communications, and precedents. Clear boundaries create trust and ensure compliance."
    },
    {
      step: 5,
      action: "Build the workflow",
      detail: "Use the visual canvas to construct agent logic. Add triggers, thinking steps, actions, and control flow. Insert checkpoints where human review is needed."
    },
    {
      step: 6,
      action: "Test and deploy",
      detail: "Run your agent in sandbox mode to verify behaviour. Use shadow mode to see what it would do without taking action. Activate when confident."
    }
  ],

  useCases: [
    {
      scenario: "Building a discovery assistant",
      context: "Your team reviews thousands of documents but partners can't review everything before deadlines.",
      howItHelps: "Describe the challenge in Agent Genesis. Select 'Discovery Triage Agent'. Configure for overnight runs, partner-level summaries, and privilege-aware filtering.",
      outcome: "Critical documents surfaced by 8am daily, with full audit trail of what was reviewed."
    },
    {
      scenario: "Automating time capture",
      context: "Associates forget to log time, leading to revenue leakage.",
      howItHelps: "Describe the billing challenge. Select 'Time Reconstruction Agent'. Configure to analyse email, documents, and calendar daily.",
      outcome: "Suggested time entries delivered each evening for quick review and approval."
    },
    {
      scenario: "Creating a matter early warning system",
      context: "You want proactive alerts before matters go off track.",
      howItHelps: "Start from the 'Matter Health Monitor' template. Configure thresholds for billing delays, deadline proximity, and client communication gaps.",
      outcome: "Daily digest of matters requiring attention, ranked by commercial importance."
    }
  ],

  tips: [
    "Start with templates and customise - faster than building from scratch",
    "Use sandbox mode thoroughly before activating new agents",
    "Set conservative personality traits initially, loosen as trust builds",
    "Be specific in your challenge description for better proposals",
    "Review agent outputs regularly and provide feedback for improvement"
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
    },
    {
      featureId: "lens",
      name: "Lens",
      reason: "Document intelligence powering agent analysis"
    }
  ]
};
```

**Step 2: Update index exports**

Add to `components/future/guidance/guideContent/index.ts`:

```typescript
export { agentEvolutionGuide } from "./agentEvolutionGuide";
```

**Step 3: Update Agent Genesis page to use the proper guide**

Update `app/autopilot/new/page.tsx` to import and use the proper guide instead of the inline mock.

**Step 4: Verify TypeScript compiles**

Run: `npm run build 2>&1 | head -30`
Expected: "Compiled successfully"

**Step 5: Commit**

```bash
git add components/future/guidance/guideContent/
git commit -m "feat(autopilot): add Agent Evolution guide content"
```

---

### Task 12: Final Integration and Testing

**Step 1: Run full build**

Run: `npm run build`
Expected: Build completes successfully

**Step 2: Start dev server and test manually**

Run: `npm run dev`

Test the following flows:
1. Navigate to `/autopilot` - verify "New Agent" button appears
2. Click "New Agent" - should go to `/autopilot/new`
3. Enter a challenge description and click "Generate Ideas"
4. Verify proposals appear
5. Click a proposal - should go to builder page
6. Verify builder page shows correct prefilled data
7. Test template gallery selection
8. Verify personality sliders work
9. Verify data boundary selectors work

**Step 3: Final commit**

```bash
git add -A
git commit -m "feat(autopilot): complete Agent Evolution Phase 1 MVP"
```

---

## Summary

This implementation plan covers Phase 1 (Foundation MVP) of Agent Evolution:

| Task | Description | Files |
|------|-------------|-------|
| 1 | Type definitions | `lib/autopilot/types.ts` |
| 2 | Template library | `lib/autopilot/templates.ts` |
| 3-4 | Genesis components | `components/autopilot/genesis/*` |
| 5 | Template gallery | `components/autopilot/genesis/*` |
| 6 | Genesis page | `app/autopilot/new/page.tsx` |
| 7-8 | Builder components | `components/autopilot/builder/*` |
| 9 | Builder page | `app/autopilot/new/builder/page.tsx` |
| 10 | Agent list update | `components/autopilot/AutopilotAgentList.tsx` |
| 11 | Guide content | `components/future/guidance/guideContent/*` |
| 12 | Integration testing | Manual verification |

**Routes created:**
- `/autopilot/new` - Agent Genesis page
- `/autopilot/new/builder` - Agent Builder page

**Next phases** (not in this plan):
- Phase 2: Full AI-powered proposal generation, governance config
- Phase 3: Approval workflows, audit trails, sandbox modes
- Phase 4: Multi-agent collaboration, delegation chains
- Phase 5: Feedback capture, evolution proposals, versioning
