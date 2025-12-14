import type { FeatureGuide } from "../types";

export const dossierGuide: FeatureGuide = {
  featureId: "dossier",
  title: "Summit Dossier",
  tagline: "AI-assisted legal document drafting with evidence integration",

  overview: "Dossier is Summit's intelligent drafting assistant. It helps you create legal documents by suggesting content, integrating evidence from your matter, and ensuring consistency with firm precedents. Every suggestion is grounded in your actual case materials.",

  steps: [
    {
      step: 1,
      action: "Choose your document type",
      detail: "Select from briefs, motions, letters, memos, contracts, or other templates. Dossier loads relevant structure and firm style guides."
    },
    {
      step: 2,
      action: "Outline your structure",
      detail: "Build your document outline with key arguments or sections. Dossier suggests logical flow based on document type and matter context."
    },
    {
      step: 3,
      action: "Draft with AI assistance",
      detail: "Write sections with AI suggestions. Dossier offers completions, alternative phrasings, and relevant precedent language from firm documents."
    },
    {
      step: 4,
      action: "Integrate evidence",
      detail: "Pull in evidence from Lens searches. Dossier formats citations correctly and maintains links to source documents."
    },
    {
      step: 5,
      action: "Review and finalise",
      detail: "Run compliance checks, verify citations, and export in your preferred format. Dossier flags potential issues before finalisation."
    }
  ],

  useCases: [
    {
      scenario: "Drafting a motion for summary judgment",
      context: "You need to prepare a motion with supporting evidence from depositions and documents.",
      howItHelps: "Start with the motion template, outline your arguments, and Dossier suggests relevant evidence from your matter. It formats citations and maintains the argument structure.",
      outcome: "First draft completed in a fraction of the time with evidence properly integrated."
    },
    {
      scenario: "Client advice letter",
      context: "You need to summarise complex legal analysis for a client in accessible language.",
      howItHelps: "Dossier helps translate legal concepts into client-friendly language while maintaining accuracy. It suggests structure for clear communication.",
      outcome: "Professional client communication that balances clarity with precision."
    },
    {
      scenario: "Contract review and markup",
      context: "You're reviewing a contract and need to suggest amendments.",
      howItHelps: "Dossier compares against firm precedents, flags non-standard clauses, and suggests alternative language based on your firm's preferred positions.",
      outcome: "Consistent contract review with firm-standard amendments suggested automatically."
    }
  ],

  tips: [
    "Always review AI suggestions—Dossier assists but doesn't replace professional judgment",
    "Use the evidence integration feature to ensure claims are properly supported",
    "Firm templates include house style and formatting—customise as needed",
    "Track changes are preserved for partner review",
    "Export to Word, PDF, or keep in Dossier for collaborative editing"
  ],

  relatedFeatures: [
    {
      featureId: "lens",
      name: "Summit Lens",
      reason: "Find and integrate evidence into your drafts"
    },
    {
      featureId: "knowledge",
      name: "Knowledge",
      reason: "Access firm precedents and templates"
    }
  ]
};
