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
