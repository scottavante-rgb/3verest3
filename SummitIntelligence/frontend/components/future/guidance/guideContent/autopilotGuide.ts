import type { FeatureGuide } from "../types";

export const autopilotGuide: FeatureGuide = {
  featureId: "autopilot",
  title: "Summit Autopilot",
  tagline: "Autonomous AI agents for routine legal operations",

  overview: "Autopilot deploys AI agents that handle routine legal tasks autonomously. From document processing to deadline monitoring, these agents work continuously in the background. Every action is logged, reversible, and subject to your configured guardrails.",

  steps: [
    {
      step: 1,
      action: "Browse available agents",
      detail: "Explore the agent library organised by category: document processing, compliance, research, monitoring, and custom agents."
    },
    {
      step: 2,
      action: "Configure agent parameters",
      detail: "Set the agent's scope, triggers, and boundaries. Define which matters it operates on and what actions require human approval."
    },
    {
      step: 3,
      action: "Activate the agent",
      detail: "Deploy the agent with a test run first. Agents start in supervised mode where you approve each action before they run autonomously."
    },
    {
      step: 4,
      action: "Monitor performance",
      detail: "Track agent activity, success rates, and exceptions. The dashboard shows what each agent has done and any issues requiring attention."
    },
    {
      step: 5,
      action: "Refine and expand",
      detail: "Adjust agent behaviour based on performance. Expand successful agents to more matters or create custom agents for your workflows."
    }
  ],

  useCases: [
    {
      scenario: "Automated document classification",
      context: "New documents arrive constantly and need to be categorised and filed correctly.",
      howItHelps: "Deploy a classification agent that reads incoming documents, determines their type and relevance, and files them to the appropriate matter with correct metadata.",
      outcome: "Documents organised automatically with consistent classification, freeing paralegal time for higher-value work."
    },
    {
      scenario: "Deadline monitoring",
      context: "Critical deadlines across multiple matters need constant tracking.",
      howItHelps: "A monitoring agent tracks court dates, filing deadlines, and limitation periods. It sends escalating alerts as deadlines approach and flags conflicts.",
      outcome: "Never miss a deadline with proactive monitoring and team notifications."
    },
    {
      scenario: "Regulatory change tracking",
      context: "You need to stay current with regulatory changes affecting client matters.",
      howItHelps: "A research agent monitors regulatory sources, identifies relevant changes, and alerts you to updates that may affect active matters.",
      outcome: "Proactive client advice on regulatory changes without manual monitoring."
    }
  ],

  tips: [
    "Start agents in supervised mode until you're confident in their behaviour",
    "All agent actions are logged with full audit trail for compliance",
    "Set clear boundaries—agents only operate within their defined scope",
    "Review exception reports regularly to catch edge cases",
    "Custom agents can be built from templates or from scratch"
  ],

  relatedFeatures: [
    {
      featureId: "governance",
      name: "AI Governance",
      reason: "Monitor and control agent compliance and behaviour"
    },
    {
      featureId: "microscope",
      name: "Microscope",
      reason: "Track agent activity in the activity timeline"
    }
  ]
};
