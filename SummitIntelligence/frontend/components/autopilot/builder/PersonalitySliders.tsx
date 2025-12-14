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
