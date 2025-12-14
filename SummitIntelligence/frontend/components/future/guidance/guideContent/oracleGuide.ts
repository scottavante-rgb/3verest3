import type { FeatureGuide } from "../types";

export const oracleGuide: FeatureGuide = {
  featureId: "oracle",
  title: "Summit Oracle",
  tagline: "Strategic intelligence and predictive analytics for legal matters",

  overview: "Oracle is Summit's analytical intelligence layer. It provides diagnostic analysis of current matter state, predictive insights for case trajectories, and strategic recommendations based on historical patterns and comparable matters. Oracle transforms raw data into actionable legal intelligence.",

  steps: [
    {
      step: 1,
      action: "Select your analysis mode",
      detail: "Choose between Diagnostic (current state analysis), Predictive (outcome forecasting), or Strategic (recommendation engine) based on what intelligence you need."
    },
    {
      step: 2,
      action: "Review matter context",
      detail: "Oracle automatically pulls relevant matter data, timeline, parties, and document summaries to inform its analysis. Verify the context is complete."
    },
    {
      step: 3,
      action: "Examine insights",
      detail: "Review the generated insights, risk assessments, and recommendations. Each insight is linked to supporting evidence from your matter documents."
    },
    {
      step: 4,
      action: "Drill into specifics",
      detail: "Click on any insight to see the underlying analysis, comparable cases, and confidence levels. Oracle shows its reasoning transparently."
    },
    {
      step: 5,
      action: "Export or share",
      detail: "Export insights to briefing documents, share with team members, or integrate findings into your matter strategy documents."
    }
  ],

  useCases: [
    {
      scenario: "Assessing litigation risk",
      context: "You need to advise a client on whether to proceed with litigation or settle.",
      howItHelps: "Oracle's Diagnostic mode analyses the current matter state, identifies strengths and weaknesses, and Predictive mode forecasts likely outcomes based on comparable cases.",
      outcome: "Data-driven risk assessment with confidence intervals and supporting precedents for client advice."
    },
    {
      scenario: "Preparing for mediation",
      context: "You're approaching a mediation and need to understand the other party's likely positions.",
      howItHelps: "Strategic mode analyses opposing party patterns, historical settlement ranges, and recommends negotiation strategies based on matter specifics.",
      outcome: "Informed mediation strategy with fallback positions and predicted counterparty behaviour."
    },
    {
      scenario: "Partner review of matter portfolio",
      context: "Monthly review of active matters to identify issues requiring attention.",
      howItHelps: "Oracle surfaces matters with elevated risk scores, approaching deadlines, or deviating from expected trajectories across your portfolio.",
      outcome: "Proactive matter management with early warning indicators before problems escalate."
    }
  ],

  tips: [
    "Oracle's predictions improve with more matter data—ensure documents and events are up to date",
    "Confidence percentages indicate analysis reliability; lower confidence means more human judgment needed",
    "Compare Oracle's analysis against your professional judgment—it's a tool, not a replacement",
    "Strategic recommendations are starting points for discussion, not prescriptive instructions",
    "Historical comparables are anonymised from firm precedent and public records"
  ],

  relatedFeatures: [
    {
      featureId: "lens",
      name: "Summit Lens",
      reason: "Deep document analysis that feeds Oracle's insights"
    },
    {
      featureId: "panorama",
      name: "Panorama",
      reason: "Visual matter timeline that Oracle analyses"
    }
  ]
};
