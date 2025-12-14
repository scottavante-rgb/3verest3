import type { FeatureGuide } from "../types";

export const judicialGuide: FeatureGuide = {
  featureId: "judicial",
  title: "Judicial Mapping",
  tagline: "Data-informed litigation strategy",

  overview: "Access statistical analysis of judicial decision-making patterns based on published judgments. See how specific judges approach different application types, matter categories, and procedural issues. Every insight links to supporting judgments so you can verify the analysis and cite the underlying authority.",

  steps: [
    {
      step: 1,
      action: "Select or search for a judge",
      detail: "Use the dropdown to browse by court and registry, or type a name in the search field. The system covers all Federal Court judges, state Supreme and District/County Court judges, and key tribunal members."
    },
    {
      step: 2,
      action: "Review the profile summary",
      detail: "The header shows appointment date, total judgments analysed, and key statistics: average time to judgment, settlement rate (matters resolved before judgment), appeal reversal rate, and reserved judgment percentage."
    },
    {
      step: 3,
      action: "Examine application outcomes",
      detail: "The bar chart shows grant rates for common applications—summary judgment, interlocutory injunctions, strike out, security for costs, discovery disputes. Sample sizes are shown so you can assess statistical reliability."
    },
    {
      step: 4,
      action: "Filter by your matter type",
      detail: "Select your practice area from the dropdown. Statistics recalculate to show this judge's tendencies specifically for that matter type—commercial litigation patterns may differ from IP or migration."
    },
    {
      step: 5,
      action: "Read the insights",
      detail: "AI-generated insights highlight specific tendencies with confidence scores. Each insight links to the supporting judgments—click through to read the actual decisions on AustLII or the Federal Court website."
    }
  ],

  useCases: [
    {
      scenario: "Deciding whether to bring an interlocutory injunction",
      context: "Your client wants urgent injunctive relief to restrain a former employee from using confidential information. You've been allocated Justice Jagot in the Federal Court. The matter is borderline on balance of convenience.",
      howItHelps: "Justice Jagot's profile shows she grants interlocutory injunctions in 48% of IP/confidential information matters—higher than the court average of 39%. The insights note she places significant weight on whether the applicant can demonstrate actual use of confidential information (not just possession). She typically requires an undertaking as to damages with supporting evidence of capacity to pay.",
      outcome: "You advise the client that injunctive relief is viable but you'll need evidence of actual misuse (not just theoretical risk) and a director's affidavit regarding capacity to honour the undertaking. You adjust your evidence strategy accordingly."
    },
    {
      scenario: "Preparing a summary judgment application",
      context: "You're acting for a bank in a guarantee enforcement matter. The guarantor's defence appears weak—essentially complaining about the underlying transaction without challenging the guarantee itself. The matter has been allocated to Justice Beach.",
      howItHelps: "Justice Beach grants summary judgment in 52% of banking/finance matters where the moving party can demonstrate 'no real prospect of success.' The insights show he's particularly receptive when the defence doesn't directly engage with the elements of the claim. He typically delivers judgment within 4 weeks of hearing, faster than average.",
      outcome: "You proceed with the application, structuring your submissions to emphasise how the defence fails to engage with the guarantee's express terms. You advise the client to expect a decision within a month."
    },
    {
      scenario: "Forum selection",
      context: "A dispute arises from a commercial lease in Sydney. You have a choice: Supreme Court of NSW or Federal Court (if you can establish the requisite federal jurisdiction). The amount in dispute is $2.3 million.",
      howItHelps: "You compare profiles across courts. The likely judges in the Supreme Court Commercial List have faster average times to judgment (6.2 months vs 8.4 months) for property matters. However, the Federal Court judges show higher settlement rates (41% vs 28%), suggesting more active case management may encourage early resolution.",
      outcome: "You recommend the Supreme Court based on the client's preference for faster resolution at trial, noting the Federal Court alternative if they'd prefer to pursue settlement through more intensive case management."
    },
    {
      scenario: "Written submissions strategy",
      context: "You're preparing written submissions for a directions hearing before a judge you haven't appeared before. The registrar's staff have indicated the judge prefers short submissions but you have complex procedural issues to address.",
      howItHelps: "The judge's profile insight notes: 'Matters with written submissions under 15 pages have 34% shorter hearing times. Judge frequently references preference for concise submissions in published costs reasons.' Supporting judgments show costs criticisms for 'unnecessarily prolix' submissions.",
      outcome: "You restructure your submissions to hit the key points in 12 pages with detailed attachments for complex procedural history. At the hearing, the judge compliments the focused approach and you avoid costs criticism."
    }
  ],

  tips: [
    "Sample sizes matter—a 70% grant rate from 10 matters is less reliable than a 55% grant rate from 100 matters. Always check the (n=X) figure",
    "Statistics are from published judgments only. Ex tempore decisions and unreported matters aren't captured, which may skew some figures",
    "Insights are patterns, not predictions. Every matter turns on its own facts—use this data to inform strategy, not dictate it",
    "Click through to the supporting judgments to understand the context behind the statistics"
  ],

  relatedFeatures: [
    {
      featureId: "simulate",
      name: "Argument Simulation",
      reason: "Test your arguments against the type of counterarguments this judge typically finds persuasive"
    },
    {
      featureId: "briefings",
      name: "Morning Briefings",
      reason: "Your briefing includes judge information when you have upcoming hearings"
    }
  ]
};
