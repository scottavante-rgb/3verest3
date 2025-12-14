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

// Temporary guide until we create the proper one
const agentEvolutionGuide = {
  featureId: "agent-evolution",
  title: "Agent Evolution",
  tagline: "Build intelligent agents that learn and adapt to your practice",
  overview: "Agent Evolution is Summit's next-generation agent builder. Describe a challenge in natural language and receive tailored agent proposals. Configure agent personality, data access, and governance controls. Deploy with confidence using sandbox testing.",
  steps: [
    { step: 1, action: "Describe your challenge", detail: "Enter a description of a process or friction point in your practice." },
    { step: 2, action: "Review proposals", detail: "Summit generates tailored agent concepts for your challenge." },
    { step: 3, action: "Select and configure", detail: "Choose a proposal or template to customise." },
    { step: 4, action: "Configure personality", detail: "Set behavioural traits like risk tolerance and communication style." },
    { step: 5, action: "Set data boundaries", detail: "Define what data the agent can access." },
    { step: 6, action: "Test and deploy", detail: "Run in sandbox mode before activating." },
  ],
  useCases: [],
  tips: ["Start with templates and customise", "Be specific about what takes time"],
  relatedFeatures: [],
};

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
