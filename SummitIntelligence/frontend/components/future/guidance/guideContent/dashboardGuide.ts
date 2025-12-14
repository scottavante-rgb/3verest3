import type { FeatureGuide } from "../types";

export const dashboardGuide: FeatureGuide = {
  featureId: "dashboard",
  title: "Summit Dashboard",
  tagline: "Your command centre for legal intelligence",

  overview: "The Dashboard is your home base in Summit. It shows your active matters, pending tasks, recent activity, and quick access to all Summit capabilities. The Northstar AI assistant is always available here to help you navigate and find information.",

  steps: [
    {
      step: 1,
      action: "Review your matters",
      detail: "The matter selector shows your active matters. Select a matter to load its context across all Summit tools."
    },
    {
      step: 2,
      action: "Check pending items",
      detail: "See tasks requiring attention, upcoming deadlines, and items awaiting your review. Click any item to jump directly to it."
    },
    {
      step: 3,
      action: "Ask Northstar",
      detail: "Use the Northstar chat to ask questions about your matters, search for information, or get help navigating Summit."
    },
    {
      step: 4,
      action: "Access Summit tools",
      detail: "Quick links take you to Lens (documents), Dossier (drafting), Oracle (analytics), Panorama (timeline), and other tools."
    },
    {
      step: 5,
      action: "Review recent activity",
      detail: "See recent documents, searches, and actions across your matters. Quickly resume where you left off."
    }
  ],

  useCases: [
    {
      scenario: "Starting your day",
      context: "You're beginning work and need to see what requires attention.",
      howItHelps: "Dashboard shows pending tasks, upcoming deadlines, and recent activity. Prioritise your day based on what's most urgent.",
      outcome: "Focused start with clear priorities and no missed items."
    },
    {
      scenario: "Quick matter lookup",
      context: "A client calls and you need to quickly understand the current matter status.",
      howItHelps: "Select the matter from the picker and ask Northstar 'What's the current status?' It summarises recent activity and pending items.",
      outcome: "Instant matter context for confident client conversations."
    },
    {
      scenario: "Finding something from last week",
      context: "You remember working on something but can't find it.",
      howItHelps: "Recent activity shows your work history. Scroll back or ask Northstar 'What was I working on Tuesday regarding discovery?'",
      outcome: "Quick retrieval of past work without searching through folders."
    }
  ],

  tips: [
    "Northstar has context about your selected matter—ask it questions naturally",
    "Pin frequently used matters for quick access",
    "Keyboard shortcuts speed up navigation—press ? to see them",
    "Recent activity is personal to you, not shared with the team",
    "Dashboard widgets can be customised in Settings"
  ],

  relatedFeatures: [
    {
      featureId: "lens",
      name: "Summit Lens",
      reason: "Deep document search from the dashboard"
    },
    {
      featureId: "microscope",
      name: "Microscope",
      reason: "Track your activity and team workload"
    }
  ]
};
