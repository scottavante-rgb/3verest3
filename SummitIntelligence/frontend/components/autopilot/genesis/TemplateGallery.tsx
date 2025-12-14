"use client";

import { useState } from "react";
import { LayoutGrid } from "lucide-react";
import type { AgentTemplate } from "@/lib/autopilot/types";
import { agentTemplates, getTemplatesByCategory } from "@/lib/autopilot/templates";
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
