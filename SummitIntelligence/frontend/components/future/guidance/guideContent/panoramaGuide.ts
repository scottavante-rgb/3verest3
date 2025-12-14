import type { FeatureGuide } from "../types";

export const panoramaGuide: FeatureGuide = {
  featureId: "panorama",
  title: "Summit Panorama",
  tagline: "Visual matter timeline and relationship mapping",

  overview: "Panorama is Summit's visual intelligence layer. It presents your matter as an interactive timeline showing events, documents, parties, and their relationships. See the complete picture of a matter at a glance, identify patterns, and navigate complex fact scenarios visually.",

  steps: [
    {
      step: 1,
      action: "Open the matter timeline",
      detail: "The main timeline shows all events chronologically. Documents, communications, meetings, and key dates are displayed with visual indicators."
    },
    {
      step: 2,
      action: "Explore relationships",
      detail: "Click any entity to see its connections. Panorama shows how parties, documents, and events relate to each other."
    },
    {
      step: 3,
      action: "Filter and focus",
      detail: "Use filters to show only specific event types, parties, or date ranges. Focus on the slice of the timeline relevant to your current work."
    },
    {
      step: 4,
      action: "Add annotations",
      detail: "Mark important events, add notes, and create issue tracks. Annotations help team members understand the significance of timeline elements."
    },
    {
      step: 5,
      action: "Export visualisations",
      detail: "Export timeline views for inclusion in briefs, client presentations, or internal memos. Multiple format options available."
    }
  ],

  useCases: [
    {
      scenario: "Understanding a complex transaction",
      context: "You're advising on a matter involving multiple transactions over years with various parties.",
      howItHelps: "Panorama displays all transactions chronologically, showing when parties entered and exited, and how different agreements relate.",
      outcome: "Clear visual understanding of transaction sequence and party relationships."
    },
    {
      scenario: "Preparing a chronology for trial",
      context: "You need to present the sequence of events clearly to a court or tribunal.",
      howItHelps: "Filter to relevant events, add annotations explaining legal significance, and export a clean timeline for inclusion in materials.",
      outcome: "Professional chronology backed by document references for each event."
    },
    {
      scenario: "Identifying witness knowledge",
      context: "You need to understand what each witness knew and when for deposition preparation.",
      howItHelps: "Filter by party to see all events and documents associated with that witness. See when they received information and participated in events.",
      outcome: "Focused deposition preparation with clear understanding of witness involvement."
    }
  ],

  tips: [
    "Events are auto-extracted from documents—verify accuracy for key dates",
    "Colour coding indicates event types: filings, communications, transactions, etc.",
    "Zoom in/out to see different time granularities",
    "Issue tracks let you group events by theme or legal issue",
    "Timeline exports include hyperlinks to source documents when viewing digitally"
  ],

  relatedFeatures: [
    {
      featureId: "lens",
      name: "Summit Lens",
      reason: "Search documents directly from timeline events"
    },
    {
      featureId: "oracle",
      name: "Summit Oracle",
      reason: "Oracle analyses timeline patterns for predictions"
    }
  ]
};
