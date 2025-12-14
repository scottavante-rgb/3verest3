import type { FeatureGuide } from "../types";

export const integrationsGuide: FeatureGuide = {
  featureId: "integrations",
  title: "Integrations",
  tagline: "Connect your technology stack",

  overview: "Summit integrates with your existing legal technology platforms—practice management systems, document management, court filing portals, research databases, and search providers. Instead of replacing your current systems, Summit becomes an intelligence layer that unifies them, eliminating data silos and enabling seamless workflows.",

  steps: [
    {
      step: 1,
      action: "View connected systems",
      detail: "The top section shows all active integrations with status indicators (connected/syncing/error), last sync time, and record counts. Green dots indicate healthy connections; orange indicates sync delays; red indicates connection issues."
    },
    {
      step: 2,
      action: "Add a new integration",
      detail: "Browse available integrations by category (Practice Management, Court Filing, Searches, Document Management, Research). Click 'Connect' on any integration to begin setup."
    },
    {
      step: 3,
      action: "Authenticate",
      detail: "Most integrations use OAuth—you'll be redirected to the target system to grant access permissions. Summit never stores your passwords for external systems."
    },
    {
      step: 4,
      action: "Configure sync settings",
      detail: "After connection, configure what data flows between systems. Default settings work for most firms but you can customise field mappings, sync frequency, and data scope."
    },
    {
      step: 5,
      action: "Monitor sync activity",
      detail: "The activity log shows recent sync events with success/failure status. Failed syncs include diagnostic information. Set up email alerts for sync failures in Settings."
    }
  ],

  useCases: [
    {
      scenario: "Connecting LEAP for matter synchronisation",
      context: "Your firm uses LEAP for practice management. You want Summit to have access to matter information without manual data entry.",
      howItHelps: "Connect the LEAP integration. Summit automatically imports matter details, client information, and key dates. When you create a new matter in LEAP, it appears in Summit within minutes. Time entries in LEAP flow into Summit's Task Economics analysis.",
      outcome: "No duplicate data entry. Matter information stays synchronised. Summit features like Task Economics work automatically because time recording data flows from LEAP."
    },
    {
      scenario: "Court filing with eLodgment integration",
      context: "You're filing documents in the Federal Court. Currently you download from your document management system, log into eLodgment separately, and manually upload.",
      howItHelps: "With eLodgment integration, documents prepared in Summit can be filed directly. The integration handles format validation, captures filing timestamps, and updates matter records automatically. Filing confirmations appear in your Morning Briefing.",
      outcome: "Filing becomes a single-click action. No downloading, re-uploading, or manual record-keeping. Confirmation that documents were accepted appears in Summit and syncs back to your practice management system."
    },
    {
      scenario: "Unified search results",
      context: "You conduct legal research across multiple platforms—Westlaw AU, LexisNexis, Jade, AustLII. Running the same search across four systems wastes time.",
      howItHelps: "Connect your research subscriptions. When you research a legal issue in Summit, it can query across all connected databases simultaneously, returning unified results with source attribution. Results are saved to the matter automatically.",
      outcome: "One search, multiple sources. Results are deduplicated and ranked. Research is automatically linked to the matter rather than sitting in separate browser histories."
    },
    {
      scenario: "InfoTrack search synchronisation",
      context: "You order property searches, company searches, and other products through InfoTrack. Results arrive in your InfoTrack account but aren't automatically connected to matters in your other systems.",
      howItHelps: "Connect InfoTrack. When search results are delivered, they automatically attach to the relevant matter in Summit. Search costs flow to matter disbursements. The Morning Briefing notes when ordered searches have been delivered.",
      outcome: "Search results appear in the matter without manual downloading and uploading. Disbursement tracking is automatic. Nothing gets lost between InfoTrack and your matter files."
    }
  ],

  tips: [
    "Start with your practice management system—this provides the matter backbone that other integrations build upon",
    "Check sync logs weekly initially. Once you're confident integrations are working reliably, move to exception-based monitoring",
    "Sync frequency can be adjusted. Real-time sync uses more resources but ensures current data. Hourly sync is sufficient for most purposes",
    "If a sync fails, check the diagnostic message. Common issues include expired authentication tokens (re-authenticate) or permission changes in the source system"
  ],

  relatedFeatures: [
    {
      featureId: "briefings",
      name: "Morning Briefings",
      reason: "Integrated data sources feed into your daily briefing"
    },
    {
      featureId: "economics",
      name: "Task Economics",
      reason: "Time recording from practice management integrations powers task analysis"
    }
  ]
};
