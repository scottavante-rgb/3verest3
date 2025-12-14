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
