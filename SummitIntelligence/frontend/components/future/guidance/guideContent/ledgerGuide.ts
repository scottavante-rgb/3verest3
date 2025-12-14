import type { FeatureGuide } from "../types";

export const ledgerGuide: FeatureGuide = {
  featureId: "ledger",
  title: "Summit Ledger",
  tagline: "Convert evidence into defensible billing records",

  overview: "Ledger is your billing construction and revenue integrity workspace. It consumes contextualised activity from Microscope and converts it into approved, auditable billing entries ready for export to your practice management system. Every entry is traceable back to its evidence, and every action is logged.",

  steps: [
    {
      step: 1,
      action: "Review the Activity Timeline",
      detail: "The left panel shows all activity blocks from Microscope for the selected matter and period. Each block is colour-coded by classification and shows confidence scores. Gaps in recorded time are highlighted."
    },
    {
      step: 2,
      action: "Select blocks to create entries",
      detail: "Click on activity blocks to select them. You can select multiple blocks to merge into a single billing entry, or create entries from individual blocks. Selected blocks are highlighted with an amber ring."
    },
    {
      step: 3,
      action: "Create or add billable items",
      detail: "Click 'Create Entry' to convert selected blocks into a draft billing entry. Use 'Add Billable Item' to manually create entries for work not captured by Signal (phone calls, meetings, etc.)."
    },
    {
      step: 4,
      action: "Review and approve entries",
      detail: "Each entry shows its origin (Evidence or Manual), policy evaluation result (Pass/Warn/Flag), and export status. Edit narratives, adjust task codes, and approve entries ready for export."
    },
    {
      step: 5,
      action: "Export to billing system",
      detail: "Once entries are approved, mark them Ready for Export. In Finance mode, use 'Push to Billing System' to transmit approved entries. Track export status and retry failed exports as needed."
    }
  ],

  useCases: [
    {
      scenario: "Daily time entry review",
      context: "It's 5pm and you need to finalise today's time entries before leaving.",
      howItHelps: "Switch to Lawyer mode and filter by today's date. The timeline shows all captured activity. Quickly review proposed narratives, approve passing entries, and flag any that need adjustment. Total time: 3-5 minutes.",
      outcome: "All billable time is captured accurately with evidence-backed narratives. No more end-of-day scramble to remember what you worked on."
    },
    {
      scenario: "Partner review of team billing",
      context: "As a partner, you need to review and approve your team's time before month-end.",
      howItHelps: "Switch to Partner mode to see aggregated entries. The Review panel highlights warnings and flags requiring attention. Approve compliant entries in bulk, review exceptions individually.",
      outcome: "Team billing is reviewed efficiently with attention focused on genuine issues rather than checking every entry."
    },
    {
      scenario: "Finance export and reconciliation",
      context: "Finance needs to push approved time to the practice management system for invoicing.",
      howItHelps: "Switch to Finance mode. Filter by 'Ready' to see entries awaiting export. Use 'Push to Billing System' to transmit. Monitor for failures and retry as needed. External reference numbers confirm successful posting.",
      outcome: "Clean handoff to billing systems with full audit trail. Failed exports are visible and actionable, not silently lost."
    },
    {
      scenario: "Adding unbilled client meeting time",
      context: "You had a 45-minute client meeting that Signal couldn't capture (in-person, no device activity).",
      howItHelps: "Click 'Add Billable Item' to create a manual entry. Enter the duration, narrative, and task code. The entry is marked as Manual origin but treated equally for approval and export.",
      outcome: "All billable work is captured regardless of source, with clear visibility into what came from evidence vs manual entry."
    }
  ],

  tips: [
    "Use the export filter buttons to focus on entries at each stage: Draft, Approved, Ready, Exported, or Failed",
    "Entries with policy warnings can still be approved—the warning is advisory, human judgment is final",
    "The architectural boundary is enforced: Microscope is read-only evidence, Ledger is the only billing interface",
    "External reference numbers returned from your billing system are stored for reconciliation",
    "All actions are logged with who, when, and why—Ledger is audit-ready by default"
  ],

  relatedFeatures: [
    {
      featureId: "microscope",
      name: "Microscope",
      reason: "View the underlying activity evidence that feeds Ledger entries"
    },
    {
      featureId: "signal",
      name: "Summit Signal",
      reason: "Understand how desktop activity is captured and sent to Microscope"
    }
  ]
};
