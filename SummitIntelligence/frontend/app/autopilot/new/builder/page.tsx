"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Save, Play, Rocket, Workflow } from "lucide-react";
import Link from "next/link";
import { AgentIdentityForm, PersonalitySliders, DataBoundaryConfig } from "@/components/autopilot/builder";
import type { AgentCategory, AgentPersonality, DataBoundary } from "@/lib/autopilot/types";
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
    alert("Agent draft saved! (Backend integration coming soon)");
  };

  const handleTest = () => {
    // TODO: Run in sandbox
    console.log("Testing agent in sandbox");
    alert("Sandbox testing coming soon!");
  };

  const handleDeploy = () => {
    // TODO: Deploy agent
    console.log("Deploying agent");
    alert("Agent deployment coming soon!");
  };

  return (
    <div className="h-full flex flex-col bg-pearl-warm/20">
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
        <div className="flex-1 bg-gradient-to-br from-pearl-warm/30 to-pearl-warm/50 overflow-hidden flex items-center justify-center">
          <div className="text-center max-w-md px-8">
            <div className="w-16 h-16 rounded-2xl bg-summit-blue/10 flex items-center justify-center mx-auto mb-6">
              <Workflow className="w-8 h-8 text-summit-blue" />
            </div>
            <h3 className="text-lg font-semibold text-pearl-charcoal mb-2">
              Workflow Canvas
            </h3>
            <p className="text-sm text-pearl-charcoal/60 mb-4">
              The visual workflow builder will appear here. Drag and drop triggers,
              thinking steps, actions, and control nodes to design your agent's logic.
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white rounded-lg border border-pearl-slate/20">
                <div className="w-6 h-6 rounded bg-amber-100 flex items-center justify-center mx-auto mb-2">
                  <span>⚡</span>
                </div>
                <span className="text-pearl-charcoal/70">Triggers</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-pearl-slate/20">
                <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center mx-auto mb-2">
                  <span>🧠</span>
                </div>
                <span className="text-pearl-charcoal/70">Think</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-pearl-slate/20">
                <div className="w-6 h-6 rounded bg-green-100 flex items-center justify-center mx-auto mb-2">
                  <span>⚙️</span>
                </div>
                <span className="text-pearl-charcoal/70">Actions</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-pearl-slate/20">
                <div className="w-6 h-6 rounded bg-purple-100 flex items-center justify-center mx-auto mb-2">
                  <span>🔀</span>
                </div>
                <span className="text-pearl-charcoal/70">Control</span>
              </div>
            </div>
            <p className="text-xs text-pearl-charcoal/40 mt-6">
              Canvas integration coming in Phase 2
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AgentBuilderPage() {
  return (
    <Suspense fallback={
      <div className="h-full flex items-center justify-center bg-pearl-warm/20">
        <div className="text-pearl-charcoal/50">Loading builder...</div>
      </div>
    }>
      <BuilderContent />
    </Suspense>
  );
}
