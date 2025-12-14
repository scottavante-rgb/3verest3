import type { FeatureGuide } from "../types";

export const signalGuide: FeatureGuide = {
  featureId: "signal",
  title: "Summit Signal",
  tagline: "Silent desktop capture that feeds your billing intelligence",

  overview: "Summit Signal is a lightweight desktop application that observes your work activity and sends structured signals to Microscope. It captures application focus, document access, and communication patterns without recording content. Signal is privacy-first by design—metadata only, with explicit sensitivity controls.",

  steps: [
    {
      step: 1,
      action: "Install Signal on your workstation",
      detail: "Download and install the Signal desktop application. It runs silently in the system tray, requiring minimal resources. Initial setup takes about 2 minutes."
    },
    {
      step: 2,
      action: "Configure capture preferences",
      detail: "Set your preferences for what Signal captures: application focus, document metadata, calendar integration, communication patterns. Exclude sensitive applications or folders as needed."
    },
    {
      step: 3,
      action: "Work normally",
      detail: "Signal runs invisibly in the background. It observes which applications you use, which documents you access, and timestamps your activity. No keylogging, no screen capture, no content recording."
    },
    {
      step: 4,
      action: "Review in Microscope",
      detail: "Captured activity appears in Microscope as raw events, then grouped into activity segments. You can see what Signal observed and how it was classified."
    },
    {
      step: 5,
      action: "Correct and learn",
      detail: "When you edit activity in Microscope, those corrections are sent back to Signal as learning signals. Over time, classification accuracy improves based on your patterns."
    }
  ],

  useCases: [
    {
      scenario: "Capturing billable research time",
      context: "You spend 2 hours researching case law across Westlaw, LexisNexis, and internal precedent systems.",
      howItHelps: "Signal captures each application focus event with timestamps. Microscope groups these into a 'Legal Research' activity segment spanning the full duration, linked to the matter you were working on.",
      outcome: "Research time that would otherwise be lost or estimated is captured accurately with evidence of which resources were used."
    },
    {
      scenario: "Multi-matter day tracking",
      context: "You work on 5 different matters throughout the day, switching frequently between documents and emails.",
      howItHelps: "Signal tracks every application switch with matter context inferred from document names and email subjects. Microscope shows a clear timeline of which matter received attention when.",
      outcome: "End-of-day time entry becomes verification rather than reconstruction. No more guessing how long you spent on each matter."
    },
    {
      scenario: "Protecting privileged work",
      context: "You're working on a sensitive internal investigation that shouldn't be visible to regular billing processes.",
      howItHelps: "Mark specific applications, folders, or matters as sensitive in Signal preferences. Activity is still captured but flagged for restricted visibility in Microscope and Ledger.",
      outcome: "Sensitive work is tracked for your records but protected from standard billing visibility per firm policy."
    },
    {
      scenario: "Working across devices",
      context: "You start work on your office desktop, continue on your laptop at a client site, then finish at home.",
      howItHelps: "Signal runs on each device, sending events to your unified Microscope timeline. Events are merged chronologically regardless of source device.",
      outcome: "Complete picture of your workday regardless of where or on what device the work happened."
    }
  ],

  tips: [
    "Signal captures metadata, not content—document names and email subjects, not the text inside",
    "The system tray icon shows green when Signal is running and connected to Summit",
    "Pause Signal temporarily via the system tray for personal tasks, then resume when ready",
    "Check Microscope weekly to verify activity is being captured correctly—early corrections improve accuracy faster",
    "Signal uses minimal system resources—typically less than 50MB memory and negligible CPU"
  ],

  relatedFeatures: [
    {
      featureId: "microscope",
      name: "Microscope",
      reason: "See how your captured activity is grouped and classified"
    },
    {
      featureId: "ledger",
      name: "Summit Ledger",
      reason: "Convert captured activity into billing entries"
    }
  ]
};
