import type { FeatureGuide } from "../types";

export const agentEvolutionGuide: FeatureGuide = {
  featureId: "agent-evolution",
  title: "Agent Evolution",
  tagline: "Build intelligent agents that learn and adapt to your practice",

  overview: "Agent Evolution is Summit's next-generation agent builder. Describe a challenge in natural language and receive tailored agent proposals. Configure agent personality, data access, and governance controls. Deploy with confidence using sandbox testing. Watch your agents evolve through feedback and continuous learning.",

  steps: [
    {
      step: 1,
      action: "Describe your challenge",
      detail: "Enter a natural language description of a process, task, or friction point in your practice. Be specific about what takes time, what gets missed, or what needs automation."
    },
    {
      step: 2,
      action: "Review agent proposals",
      detail: "Summit generates 2-3 tailored agent concepts. Each shows estimated time savings, complexity level, and what data the agent would access. Select one to refine or choose from the template gallery."
    },
    {
      step: 3,
      action: "Configure identity and personality",
      detail: "Name your agent and set its behavioural traits: risk tolerance, communication style, thoroughness, and autonomy level. These affect how the agent operates and when it escalates to humans."
    },
    {
      step: 4,
      action: "Set data boundaries",
      detail: "Define what data the agent can access: matters, documents, financials, communications, and precedents. Clear boundaries create trust and ensure compliance."
    },
    {
      step: 5,
      action: "Build the workflow",
      detail: "Use the visual canvas to construct agent logic. Add triggers, thinking steps, actions, and control flow. Insert checkpoints where human review is needed."
    },
    {
      step: 6,
      action: "Test and deploy",
      detail: "Run your agent in sandbox mode to verify behaviour. Use shadow mode to see what it would do without taking action. Activate when confident."
    }
  ],

  useCases: [
    {
      scenario: "Building a discovery assistant",
      context: "Your team reviews thousands of documents but partners can't review everything before deadlines.",
      howItHelps: "Describe the challenge in Agent Genesis. Select 'Discovery Triage Agent'. Configure for overnight runs, partner-level summaries, and privilege-aware filtering.",
      outcome: "Critical documents surfaced by 8am daily, with full audit trail of what was reviewed."
    },
    {
      scenario: "Automating time capture",
      context: "Associates forget to log time, leading to revenue leakage.",
      howItHelps: "Describe the billing challenge. Select 'Time Reconstruction Agent'. Configure to analyse email, documents, and calendar daily.",
      outcome: "Suggested time entries delivered each evening for quick review and approval."
    },
    {
      scenario: "Creating a matter early warning system",
      context: "You want proactive alerts before matters go off track.",
      howItHelps: "Start from the 'Matter Health Monitor' template. Configure thresholds for billing delays, deadline proximity, and client communication gaps.",
      outcome: "Daily digest of matters requiring attention, ranked by commercial importance."
    }
  ],

  tips: [
    "Start with templates and customise - faster than building from scratch",
    "Use sandbox mode thoroughly before activating new agents",
    "Set conservative personality traits initially, loosen as trust builds",
    "Be specific in your challenge description for better proposals",
    "Review agent outputs regularly and provide feedback for improvement"
  ],

  relatedFeatures: [
    {
      featureId: "autopilot",
      name: "Autopilot",
      reason: "View and manage all your deployed agents"
    },
    {
      featureId: "oracle",
      name: "Oracle",
      reason: "Agents can use Oracle's analytical capabilities"
    },
    {
      featureId: "lens",
      name: "Lens",
      reason: "Document intelligence powering agent analysis"
    }
  ]
};
