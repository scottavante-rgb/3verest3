import type { FeatureGuide } from "../types";

export const lensGuide: FeatureGuide = {
  featureId: "lens",
  title: "Summit Lens",
  tagline: "Intelligent document analysis and evidence discovery",

  overview: "Lens is Summit's document intelligence engine. It reads, understands, and connects information across your matter documents. Search naturally, extract key facts, identify contradictions, and surface evidence that matters—all with full citation to source documents.",

  steps: [
    {
      step: 1,
      action: "Enter your query",
      detail: "Ask questions in natural language about your matter documents. Lens understands legal context and terminology without requiring exact keyword matches."
    },
    {
      step: 2,
      action: "Review search results",
      detail: "Results are ranked by relevance with excerpts highlighted. Each result shows the source document, page, and confidence score."
    },
    {
      step: 3,
      action: "Examine document context",
      detail: "Click any result to see the full document context. Lens highlights the relevant passages and shows related content nearby."
    },
    {
      step: 4,
      action: "Build evidence chains",
      detail: "Pin important findings to build a collection. Lens can identify connections between pinned items and suggest related documents."
    },
    {
      step: 5,
      action: "Export findings",
      detail: "Export your findings with full citations, ready for inclusion in briefs, memos, or client communications."
    }
  ],

  useCases: [
    {
      scenario: "Finding key admissions in discovery",
      context: "You've received thousands of documents in discovery and need to find admissions relevant to your claims.",
      howItHelps: "Search for concepts like 'acknowledgment of breach' or 'awareness of defect'—Lens finds semantically relevant passages even without exact wording.",
      outcome: "Key evidence identified in hours rather than weeks of manual review."
    },
    {
      scenario: "Contradiction detection",
      context: "You suspect a witness's deposition contradicts their earlier statements.",
      howItHelps: "Lens can compare statements across documents and surface potential inconsistencies with citations to both sources.",
      outcome: "Impeachment ammunition with precise document references for cross-examination."
    },
    {
      scenario: "Building a chronology",
      context: "You need to establish when parties knew certain facts for a timeline.",
      howItHelps: "Search for date references and knowledge statements. Lens extracts and orders temporal references across the document set.",
      outcome: "Defensible chronology with every date linked to source documentation."
    }
  ],

  tips: [
    "Use natural language queries—'When did the defendant first learn about the defect?' works better than keyword searches",
    "The confidence score indicates how well the result matches your query; review lower-confidence results for unexpected connections",
    "Pin documents as you find them to build your evidence collection",
    "Lens searches across all documents in the matter—use filters to narrow if needed",
    "All citations include document name, page number, and paragraph for easy verification"
  ],

  relatedFeatures: [
    {
      featureId: "dossier",
      name: "Dossier",
      reason: "Draft documents using evidence found in Lens"
    },
    {
      featureId: "oracle",
      name: "Summit Oracle",
      reason: "Oracle's analysis is powered by Lens document understanding"
    }
  ]
};
