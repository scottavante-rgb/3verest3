"use client";

import { Clock, ChevronRight, Bot } from "lucide-react";
import type { AgentTemplate } from "@/lib/autopilot/types";
import { cn } from "@/lib/utils";

interface TemplateCardProps {
  template: AgentTemplate;
  onSelect: (template: AgentTemplate) => void;
}

// Icon mapping for template icons
const iconMap: Record<string, React.ReactNode> = {
  'file-search': <Bot className="w-5 h-5" />,
  'calendar-clock': <Bot className="w-5 h-5" />,
  'search': <Bot className="w-5 h-5" />,
  'file-text': <Bot className="w-5 h-5" />,
  'clipboard-check': <Bot className="w-5 h-5" />,
  'users': <Bot className="w-5 h-5" />,
  'clock': <Bot className="w-5 h-5" />,
  'dollar-sign': <Bot className="w-5 h-5" />,
  'trending-down': <Bot className="w-5 h-5" />,
  'shield': <Bot className="w-5 h-5" />,
  'alert-triangle': <Bot className="w-5 h-5" />,
  'activity': <Bot className="w-5 h-5" />,
};

export function TemplateCard({ template, onSelect }: TemplateCardProps) {
  const complexityColors = {
    simple: "bg-emerald-50 text-emerald-700",
    moderate: "bg-amber-50 text-amber-700",
    advanced: "bg-rose-50 text-rose-700",
  };

  return (
    <div
      className="pearl-card p-5 hover:shadow-lg transition-all cursor-pointer group border-2 border-transparent hover:border-summit-blue/20"
      onClick={() => onSelect(template)}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-summit-blue/10 flex items-center justify-center text-summit-blue flex-shrink-0">
          {iconMap[template.iconId] || <Bot className="w-5 h-5" />}
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
