import type { FeatureGuide } from "../types";

export const governanceGuide: FeatureGuide = {
  featureId: "governance",
  title: "AI Governance",
  tagline: "Transparency and accountability for AI-assisted legal work",

  overview: "Every AI interaction in Summit is logged, auditable, and subject to professional oversight. The Governance Dashboard shows your firm's AI governance posture through the Sovereign Governance Index (SGI), tracks compliance with relevant frameworks, and provides the audit trail that regulators, insurers, and clients increasingly expect.",

  steps: [
    {
      step: 1,
      action: "Review your SGI score",
      detail: "The overall score (0-100) reflects your firm's AI governance posture across four dimensions. Higher scores indicate stronger governance controls. The trend indicator shows whether you're improving or declining."
    },
    {
      step: 2,
      action: "Examine each dimension",
      detail: "Click any dimension card to see the contributing metrics. Data Sovereignty tracks where data is stored and processed. Model Governance tracks AI model provenance and monitoring. Audit Completeness tracks logging and oversight. Privilege Protection tracks confidentiality controls."
    },
    {
      step: 3,
      action: "Address active flags",
      detail: "Flags indicate issues requiring attention—AI recommendations awaiting solicitor review, pending model updates, upcoming audits. Click any flag to take the required action."
    },
    {
      step: 4,
      action: "Verify compliance status",
      detail: "See current compliance status against Privacy Act 1988, APPs, Law Society guidelines, and professional indemnity requirements. Each item shows last audit date and next review date."
    },
    {
      step: 5,
      action: "Review the audit log",
      detail: "Every AI decision is logged with timestamp, user, matter, input summary, output, confidence score, and whether it was reviewed by a solicitor. Click any entry for the full audit record."
    }
  ],

  useCases: [
    {
      scenario: "Professional indemnity renewal",
      context: "Your insurer asks about your firm's use of AI in legal practice. They want to understand what controls are in place and how AI-assisted work is supervised.",
      howItHelps: "Export a Governance Report from the dashboard. The report shows your SGI score history, lists all governance controls in place (data residency, model provenance, solicitor oversight rates), and provides summary statistics on AI usage across the firm. The audit log demonstrates that every AI recommendation is reviewed by a qualified practitioner.",
      outcome: "Your insurer has the documentation they need to assess risk. Your demonstrated governance framework may support more favourable premium treatment than firms with ad hoc AI usage."
    },
    {
      scenario: "Responding to a client RFP with AI questions",
      context: "A major corporate client's legal panel RFP includes questions about AI usage: 'Describe your firm's approach to AI governance, including data handling, model transparency, and professional oversight.'",
      howItHelps: "The dashboard provides concrete answers. Data Sovereignty score demonstrates Australian data residency. Model Governance shows exactly which AI models are used and their known limitations. Audit Completeness shows 100% logging with 98% solicitor review rate. You can describe specific controls rather than providing vague assurances.",
      outcome: "Your RFP response includes specific metrics and can reference your governance framework. The client sees a firm that has thought carefully about responsible AI use."
    },
    {
      scenario: "Internal partner discussion on AI risk",
      context: "The partnership meeting includes an agenda item on AI risk following industry discussion of a hypothetical AI-related malpractice claim. Partners want to understand what controls are in place.",
      howItHelps: "Present the SGI score and dimension breakdown. Show the audit trail for recent AI decisions, demonstrating that every recommendation is logged and reviewed. Walk through a specific example: 'On Tuesday, Summit suggested a weakness in opposing submissions. The log shows the input, output, confidence score, and that Sarah reviewed and approved the analysis before it was used in our reply.'",
      outcome: "Partners can see governance in action, not just in policy documents. The firm has a clear response if ever questioned about AI usage in a specific matter."
    },
    {
      scenario: "Preparing for a regulatory inquiry",
      context: "The Law Society has announced it will be reviewing AI usage across the profession. Your managing partner wants to ensure the firm is prepared if selected for review.",
      howItHelps: "The compliance status section shows alignment with Law Society AI guidelines across jurisdictions. The audit log provides evidence of professional oversight. The bias monitoring metrics demonstrate ongoing attention to fairness. Export functions allow generation of regulatory-ready documentation.",
      outcome: "If selected for review, you have documentation readily available. The SGI framework demonstrates a systematic approach to AI governance that exceeds minimum regulatory expectations."
    }
  ],

  tips: [
    "The SGI score isn't a compliance checkbox—it's a continuous measure. Aim for improvement over time rather than a specific number",
    "Review the 'Pending Solicitor Review' flag daily. AI recommendations awaiting review create governance gaps",
    "Schedule quarterly reviews of the full audit log with your technology committee to identify patterns and improvement opportunities",
    "Export compliance reports before each professional indemnity renewal to maintain a documentary record"
  ],

  relatedFeatures: [
    {
      featureId: "briefings",
      name: "Morning Briefings",
      reason: "Governance alerts requiring action appear in your daily briefing"
    },
    {
      featureId: "opposition",
      name: "Opposition Analysis",
      reason: "AI-assisted document analysis is logged in the governance audit trail"
    }
  ]
};
