"use client";

import { useState } from "react";
import Link from "next/link";
import { PlusIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import type { Agent, AutopilotFlow } from "@/lib/autopilot/types";
import { cn } from "@/lib/utils";
import { generateAgentFlow } from "@/lib/autopilot/agentFlows";

interface Props {
  selectedAgentId: string | null;
  onSelectAgent: (agent: Agent, flow: AutopilotFlow) => void;
}

// Mock agent catalogue
const mockAgents: Agent[] = [
  {
    id: "agent-intake-triage",
    orgId: "org-1",
    name: "Matter Intake & Triage",
    description: "Transform raw instructions into structured matters. Extracts type, jurisdiction, urgency.",
    ownerUserId: "user-partner-1",
    visibilityScope: "org",
    status: "active",
    estimatedSgi: 18.5,
    dataBoundary: { jurisdictions: ["NSW", "VIC", "QLD"] },
    privilegeProfile: { requiresApproval: false },
    runtimeConfig: { category: "Legal Precision" },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "agent-discovery-evidence",
    orgId: "org-1",
    name: "Discovery & Evidence",
    description: "Ingests documents, creates entity maps and timelines. Cuts review time by 80%.",
    ownerUserId: "user-senior-associate",
    visibilityScope: "team",
    status: "active",
    estimatedSgi: 45.2,
    dataBoundary: { privilegeTagging: true },
    privilegeProfile: { requiresApproval: true },
    runtimeConfig: { category: "Legal Precision" },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "agent-contract-intelligence",
    orgId: "org-1",
    name: "Contract Red-Flag",
    description: "Highlights indemnities, termination traps, regulatory obligations in seconds.",
    ownerUserId: "user-partner-2",
    visibilityScope: "org",
    status: "active",
    estimatedSgi: 32.8,
    dataBoundary: {},
    privilegeProfile: { requiresApproval: false },
    runtimeConfig: { category: "Legal Precision" },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "agent-billing-forensics",
    orgId: "org-1",
    name: "Billing Forensics",
    description: "Cross-checks time entries against activity. Recovers 5-12% lost billing.",
    ownerUserId: "user-partner-1",
    visibilityScope: "org",
    status: "active",
    estimatedSgi: 56.7,
    dataBoundary: {},
    privilegeProfile: { requiresApproval: true },
    runtimeConfig: { category: "Operational" },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "agent-compliance-sentinel",
    orgId: "org-1",
    name: "Compliance Sentinel",
    description: "Monitors for anomalies, privilege risks, missed deadlines.",
    ownerUserId: "user-partner-1",
    visibilityScope: "org",
    status: "active",
    estimatedSgi: 38.9,
    dataBoundary: {},
    privilegeProfile: { requiresApproval: false },
    runtimeConfig: { category: "Compliance" },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function AutopilotAgentList({ selectedAgentId, onSelectAgent }: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAgents = mockAgents.filter((agent) =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-500";
      case "testing":
        return "bg-summit-amber";
      case "draft":
        return "bg-sovereign-slate/30";
      default:
        return "bg-sovereign-slate/20";
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-sovereign-slate/20">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-sovereign-ink">Agent Library</h3>
          <Link
            href="/autopilot/new"
            className="p-1.5 rounded-sovereign bg-summit-amber text-white hover:bg-summit-gold transition-colors"
            title="Create New Agent"
          >
            <PlusIcon className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-sovereign-ink/30" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search agents..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-sovereign border border-sovereign-slate/30 bg-sovereign-warm/30 focus:outline-none focus:ring-2 focus:ring-summit-amber/20 focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Agent List */}
      <div className="flex-1 overflow-y-auto">
        {filteredAgents.map((agent) => (
          <button
            key={agent.id}
            onClick={() => {
              const flow = generateAgentFlow(agent);
              onSelectAgent(agent, flow);
            }}
            className={cn(
              "w-full text-left px-4 py-3 border-b border-sovereign-slate/10 hover:bg-sovereign-warm/50 transition-colors",
              selectedAgentId === agent.id && "bg-summit-amber/5 border-l-2 border-l-summit-amber"
            )}
          >
            <div className="flex items-start justify-between gap-2 mb-1">
              <div className="text-xs font-medium text-sovereign-ink leading-snug">
                {agent.name}
              </div>
              <div className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1", getStatusColor(agent.status))} />
            </div>
            <div className="text-[10px] text-sovereign-ink/50 leading-relaxed line-clamp-2 mb-1.5">
              {agent.description}
            </div>
            {agent.estimatedSgi && (
              <div className="text-[9px] text-summit-amber font-medium">
                +{agent.estimatedSgi} SGI
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Footer Stats */}
      <div className="p-3 border-t border-sovereign-slate/20 bg-sovereign-warm/30">
        <div className="flex items-center justify-between text-[9px]">
          <span className="text-sovereign-ink/50">{filteredAgents.length} agents</span>
          <span className="text-emerald-600">
            {filteredAgents.filter((a) => a.status === "active").length} active
          </span>
        </div>
      </div>
    </div>
  );
}
