import type { FeatureGuide } from "../types";

export const oppositionGuide: FeatureGuide = {
  featureId: "opposition",
  title: "Opposition Analysis",
  tagline: "Find the weaknesses before they find yours",

  overview: "Upload your opponent's submissions, affidavits, or pleadings and Summit identifies logical gaps, unsupported assertions, contradictions with prior positions, and vulnerable legal arguments. Each finding includes the specific paragraph, relevant prior statements, and suggested approaches for exploitation at hearing or in reply submissions.",

  steps: [
    {
      step: 1,
      action: "Upload the document",
      detail: "Drag and drop the opponent's filing into the upload zone, or click to browse. PDF and Word formats are supported. For best results, use text-based PDFs rather than scanned images."
    },
    {
      step: 2,
      action: "Wait for analysis",
      detail: "Summit analyses the document against four weakness categories. This typically takes 30-60 seconds depending on document length. A progress indicator shows analysis status."
    },
    {
      step: 3,
      action: "Review the findings",
      detail: "Weaknesses appear as cards on the left, sorted by severity. Click any card to highlight the relevant passage in the document viewer on the right. Each card shows the weakness type, confidence score, and citation."
    },
    {
      step: 4,
      action: "Examine contradictions",
      detail: "For contradiction findings, Summit displays both the current statement and the prior inconsistent position with full citations. This creates a ready-made basis for cross-examination or submission."
    },
    {
      step: 5,
      action: "Action the findings",
      detail: "Use 'Add to Brief' to save a finding to your matter notes. Use 'Flag' to mark for senior review. Use 'Dismiss' if the finding isn't relevant to your strategy."
    }
  ],

  useCases: [
    {
      scenario: "Preparing reply submissions under time pressure",
      context: "You receive the respondent's submissions in a Federal Court commercial matter at 4pm Friday. Reply submissions are due Monday. The document is 45 pages with 127 paragraphs.",
      howItHelps: "Upload immediately. Within 60 seconds, Summit identifies 8 potential weaknesses including a direct contradiction between paragraph 34 (claiming no knowledge of the defect) and the respondent's own project manager's affidavit at paragraph 12 (documenting monthly inspection reviews). You now have a prioritised list of issues to address in reply.",
      outcome: "Instead of reading 45 pages sequentially hoping to spot issues, you go directly to the 8 highest-value paragraphs. Your reply submissions specifically address each weakness with pinpoint citations to the contradictory material."
    },
    {
      scenario: "Cross-examination preparation",
      context: "You're preparing to cross-examine the plaintiff's key witness in a professional negligence claim. The witness has filed three affidavits over 18 months of litigation, plus given evidence at an interlocutory hearing.",
      howItHelps: "Upload all affidavits and the interlocutory transcript. Summit cross-references statements across documents, flagging where the witness's account has shifted—dates that have changed, details that have been added or omitted, characterisations that have evolved.",
      outcome: "You enter the witness box with a chronological list of inconsistencies, each with precise citations. When the witness gives an answer inconsistent with their earlier evidence, you can immediately direct them to the prior statement."
    },
    {
      scenario: "Summary judgment application",
      context: "You're considering a summary judgment application in a contract dispute. The defendant's defence runs to 30 pages but you suspect much of it is bare denial without proper basis.",
      howItHelps: "Upload the defence. Summit identifies paragraphs containing assertions without evidentiary support—claims about industry practice with no expert evidence, allegations of oral representations with no particulars, causation assertions with no explanation of mechanism.",
      outcome: "Your summary judgment submissions methodically address each unsupported assertion, demonstrating the defendant has no real prospect of success on multiple elements of their defence. The court grants summary judgment on liability."
    },
    {
      scenario: "Tribunal hearing preparation",
      context: "You're appearing in VCAT on a domestic building dispute. The builder has filed submissions relying heavily on a Building Appeals Board decision, arguing it supports their position on defect rectification.",
      howItHelps: "Summit analyses the submissions and flags the authority reliance as 'Vulnerable Argument'—the cited decision is actually distinguishable on its facts (residential vs commercial) and the ratio supports the owner's position on the standard of workmanship.",
      outcome: "At hearing, you're prepared to distinguish the authority the builder relies on, and you cite the passages from the same decision that actually support your client's case."
    }
  ],

  tips: [
    "Upload all related documents together for the same matter—Summit can identify contradictions across documents, not just within a single filing",
    "The confidence score indicates how certain the AI is about the finding. High-confidence findings (85%+) are usually clear wins; lower scores may require your professional judgment",
    "Use the filter dropdown to focus on specific weakness types—for example, show only contradictions when preparing cross-examination",
    "Dismissed findings aren't deleted—they move to a 'Dismissed' tab in case you want to revisit them later"
  ],

  relatedFeatures: [
    {
      featureId: "simulate",
      name: "Argument Simulation",
      reason: "After identifying opponent weaknesses, stress-test your own arguments"
    },
    {
      featureId: "judicial",
      name: "Judicial Mapping",
      reason: "Understand how your judge typically responds to the types of weaknesses you've identified"
    }
  ]
};
