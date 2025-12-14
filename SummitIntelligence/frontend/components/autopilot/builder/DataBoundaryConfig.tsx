"use client";

import { Database } from "lucide-react";
import type { DataBoundary } from "@/lib/autopilot/types";

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
