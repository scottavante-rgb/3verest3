import type { FeatureGuide } from "../types";

export const simulateGuide: FeatureGuide = {
  featureId: "simulate",
  title: "Argument Simulation",
  tagline: "Stress-test your arguments before the judge does",

  overview: "Enter your legal argument and Summit acts as a sophisticated devil's advocate, generating the strongest counterarguments opposing counsel might raise—each citing Australian authority and explaining exactly where your position is vulnerable. Better to discover weaknesses in your office than in the courtroom.",

  steps: [
    {
      step: 1,
      action: "Input your argument",
      detail: "Paste your draft submissions or key arguments into the text area. You can also select an existing document from the matter. The system works with any length—a single key submission or full written argument."
    },
    {
      step: 2,
      action: "Configure simulation settings",
      detail: "Select intensity: 'Measured' generates reasonable counterarguments; 'Robust' generates aggressive but fair challenges; 'Hostile' generates every possible attack including weak ones. Select focus areas: Facts, Law, Policy, Procedure—or all."
    },
    {
      step: 3,
      action: "Run the simulation",
      detail: "Click 'Run Simulation'. The system analyses your argument structure, identifies assertions, and generates counterarguments. This typically takes 30-90 seconds depending on argument length and complexity."
    },
    {
      step: 4,
      action: "Review counterarguments",
      detail: "Each counterargument appears as a card showing: attack type (factual, statutory, distinguishing, policy, procedural), strength rating (1-5), full text as opposing counsel might argue it, supporting Australian authority, your specific vulnerability, and a suggested response."
    },
    {
      step: 5,
      action: "Use the vulnerability map",
      detail: "The map highlights which paragraphs of your argument are most exposed. High-risk paragraphs appear in red. Focus your preparation time on defending these sections."
    }
  ],

  useCases: [
    {
      scenario: "Preparing for oral argument in the Court of Appeal",
      context: "You're appearing in the Victorian Court of Appeal next week. You've drafted your outline of argument but want to anticipate the bench's questions.",
      howItHelps: "Input your outline and run simulation at 'Robust' intensity. Summit generates 9 counterarguments including a statutory construction attack on your interpretation of s 18 of the Australian Consumer Law, a policy argument about commercial certainty that you hadn't considered, and identification of tension between paragraphs 23 and 31 of your outline.",
      outcome: "You revise paragraph 31 to eliminate the internal tension. You prepare specific responses to the statutory construction and policy points. At the hearing, when Kaye JA raises the commercial certainty concern, you're ready with a nuanced response rather than being caught flat-footed."
    },
    {
      scenario: "Reality-checking advice before a client meeting",
      context: "You're about to meet a client to advise that they have a strong case. Before telling them that, you want to pressure-test your analysis.",
      howItHelps: "Run your draft advice through simulation at 'Hostile' intensity. Summit identifies 4 factual weaknesses in the causation chain that you'd minimised, a 2019 Court of Appeal decision that limits the authority you were relying on, and a procedural timing issue you hadn't spotted.",
      outcome: "Your advice to the client is more nuanced: strong on liability but with identified risks on causation that affect quantum. The client appreciates the balanced analysis and you avoid over-promising."
    },
    {
      scenario: "Preparing a summary judgment application",
      context: "You're drafting submissions for a summary judgment application. You need to anticipate the defendant's response even though they haven't filed opposing submissions yet.",
      howItHelps: "Input your draft submissions. Summit generates the counterarguments the defendant is likely to raise: disputed facts that create a triable issue, authorities that could be distinguished, and procedural objections about timing. Each counterargument includes the response you should pre-emptively include.",
      outcome: "Your submissions address likely objections before they're raised. The defendant's actual response raises fewer surprises because you've already mapped the territory. The judge sees a complete analysis that engages with potential weaknesses."
    },
    {
      scenario: "Junior solicitor development",
      context: "A junior solicitor has drafted submissions for your review. Rather than just marking them up, you want to teach them how to self-critique their work.",
      howItHelps: "Have the junior run their draft through simulation. They receive immediate feedback on vulnerabilities in their argument. The specific counterarguments show them exactly where their reasoning is weak or their authorities are distinguishable.",
      outcome: "The junior learns to anticipate counterarguments as a standard part of drafting. They revise their own work before submitting it for review. Your review time decreases because the obvious issues have already been addressed."
    }
  ],

  tips: [
    "Start with 'Robust' intensity. 'Hostile' generates comprehensive attacks but includes weak arguments you wouldn't actually face",
    "Focus on high-strength counterarguments (4-5 stars). These are the attacks most likely to succeed if raised",
    "The suggested responses are starting points, not final answers. Use them to structure your thinking, then refine in your own voice",
    "Run simulation iteratively: draft → simulate → revise → simulate again. Each round strengthens your argument"
  ],

  relatedFeatures: [
    {
      featureId: "opposition",
      name: "Opposition Analysis",
      reason: "Analyse the other side's actual arguments after simulating attacks on yours"
    },
    {
      featureId: "judicial",
      name: "Judicial Mapping",
      reason: "Understand which types of arguments your judge finds persuasive"
    }
  ]
};
