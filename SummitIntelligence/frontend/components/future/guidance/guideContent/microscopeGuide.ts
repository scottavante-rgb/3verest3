import type { FeatureGuide } from "../types";

export const microscopeGuide: FeatureGuide = {
  featureId: "microscope",
  title: "Summit Microscope",
  tagline: "Activity intelligence and time capture for legal teams",

  overview: "Microscope is Summit's activity intelligence layer. It provides visibility into how time is spent across your team, matters, and practice areas. Combined with Signal capture, Microscope transforms raw activity into structured work segments ready for billing review.",

  steps: [
    {
      step: 1,
      action: "Review the team board",
      detail: "See your team's current activity status, active matters, and today's captured work segments. Quickly identify who's working on what."
    },
    {
      step: 2,
      action: "Examine individual timelines",
      detail: "Drill into any team member's activity timeline. See captured segments, classifications, and any gaps that may need attention."
    },
    {
      step: 3,
      action: "Review matter activity",
      detail: "View all activity across a specific matter. See which team members contributed, how time was distributed, and identify patterns."
    },
    {
      step: 4,
      action: "Adjust classifications",
      detail: "Correct any misclassified segments. Your adjustments train the system to improve future classification accuracy."
    },
    {
      step: 5,
      action: "Send to Ledger",
      detail: "Once activity is verified, approve segments for billing. They flow to Ledger where they become billable entries."
    }
  ],

  useCases: [
    {
      scenario: "Daily time review",
      context: "End of day, you need to verify that today's work is captured correctly.",
      howItHelps: "Microscope shows all captured activity segments with classifications. Quickly review, adjust any errors, and approve for billing.",
      outcome: "Complete, accurate time capture without end-of-day reconstruction guesswork."
    },
    {
      scenario: "Partner oversight",
      context: "As partner, you need visibility into team utilisation and matter progress.",
      howItHelps: "Team board shows real-time activity across your team. Drill into matters to see who's contributing what, and identify resource imbalances.",
      outcome: "Proactive team management with data-driven resource allocation."
    },
    {
      scenario: "Matter economics review",
      context: "Before billing, you need to understand where time went on a matter.",
      howItHelps: "Matter view shows complete activity breakdown by person, task type, and date. See patterns like research taking longer than expected.",
      outcome: "Informed billing decisions based on actual activity evidence."
    }
  ],

  tips: [
    "Microscope is read-only evidence—corrections here improve classification but billing happens in Ledger",
    "Activity segments are grouped by application context and work patterns",
    "Low-confidence segments are flagged for review—they need human verification",
    "Use filters to focus on specific date ranges, people, or activity types",
    "Regular review improves AI classification accuracy through feedback"
  ],

  relatedFeatures: [
    {
      featureId: "signal",
      name: "Summit Signal",
      reason: "Desktop capture that feeds activity into Microscope"
    },
    {
      featureId: "ledger",
      name: "Summit Ledger",
      reason: "Convert approved activity into billing entries"
    }
  ]
};
