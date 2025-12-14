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
