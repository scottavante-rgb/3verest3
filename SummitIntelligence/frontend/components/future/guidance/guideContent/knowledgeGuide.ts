import type { FeatureGuide } from "../types";

export const knowledgeGuide: FeatureGuide = {
  featureId: "knowledge",
  title: "Knowledge Marketplace",
  tagline: "Buy expertise, sell experience",

  overview: "Access curated practice intelligence from specialist practitioners—playbooks for specific court procedures, clause libraries with risk annotations, regulatory compliance checklists, and anonymised settlement data. Or monetise your own expertise by creating and selling Knowledge Packs to other firms.",

  steps: [
    {
      step: 1,
      action: "Browse the marketplace",
      detail: "Search by keyword or browse by category: Litigation Playbooks, Clause Libraries, Regulatory Checklists, State-Specific Guides, Costs Precedents, Settlement Data. Filter by practice area, jurisdiction, or price range."
    },
    {
      step: 2,
      action: "Review pack details",
      detail: "Each pack has a detail page showing: full contents list, sample material (where available), provider credentials and verification status, user ratings and reviews, update history. Read what's included before purchasing."
    },
    {
      step: 3,
      action: "Purchase and access",
      detail: "Click 'Buy' to purchase. Content is delivered instantly to your Summit account. Purchases are billed to your firm's monthly Summit invoice. No separate payment processing required."
    },
    {
      step: 4,
      action: "Apply purchased knowledge",
      detail: "Purchased content integrates with relevant Summit features. Playbook strategies inform matter recommendations. Clause library entries appear in drafting suggestions. Checklist items populate compliance workflows."
    },
    {
      step: 5,
      action: "Contribute your expertise",
      detail: "Click 'Sell Your Knowledge' to begin creating a Knowledge Pack. Follow the guided process to structure your expertise, ensure proper anonymisation, and set pricing. Summit reviews submissions for quality before publication."
    }
  ],

  useCases: [
    {
      scenario: "Entering a new practice area",
      context: "Your firm is taking on a Fair Work Commission unfair dismissal matter. You've never run one before. The solicitor assigned has employment law knowledge but no FWC procedural experience.",
      howItHelps: "Purchase 'Fair Work Commission Unfair Dismissal Playbook' ($1,200) from a specialist employment firm. The playbook covers: conciliation preparation, evidence strategies, timing considerations, and common procedural traps. It includes template documents adapted for FWC requirements.",
      outcome: "Instead of learning by making mistakes, you benefit from hundreds of prior matters. The solicitor follows a proven process. The matter runs smoothly despite being the firm's first in this jurisdiction."
    },
    {
      scenario: "Pricing a settlement",
      context: "You're advising a plaintiff in a personal injury matter. The defendant has made a settlement offer. The client asks: 'Is this a good offer compared to similar cases?'",
      howItHelps: "Purchase 'Personal Injury Settlement Benchmarks (NSW)' ($5,000) containing anonymised settlement data from 500+ matters. Filter by injury type, liability position, and age of plaintiff. See settlement ranges at different stages (pre-litigation, post-filing, at trial door).",
      outcome: "You advise the client with data: 'Settlements for comparable injuries at this stage range from $X to $Y. The offer is at the lower end but within range given the liability dispute.' The client makes an informed decision."
    },
    {
      scenario: "Accelerating clause drafting",
      context: "You're drafting a shareholders agreement for a startup. You could draft from first principles, or you could adapt your firm's precedent from 2018, but neither approach captures current market practice.",
      howItHelps: "Purchase 'SHA & Shareholders Agreement Clause Library' ($1,200) containing 180 clauses with current market variations, risk annotations, and guidance on which version suits which situation. Includes drag-along, tag-along, anti-dilution, and vesting provisions with multiple options.",
      outcome: "Your draft starts from contemporary market practice rather than internal precedent that may be dated. Risk annotations help you advise the client on which provisions protect their interests. Drafting time decreases while quality increases."
    },
    {
      scenario: "Monetising specialist expertise",
      context: "Your firm has deep expertise in ASIC enforcement matters. You've defended 30+ clients over 10 years. Junior lawyers at other firms struggle with these matters because they're complex and unusual.",
      howItHelps: "Create an 'ASIC Enforcement Response Playbook' documenting your process: responding to compulsory notices, negotiating with investigators, preparing for examinations, dealing with enforceable undertakings. Anonymise client details. Price at $3,500.",
      outcome: "Your expertise generates passive revenue. Other firms benefit from your experience. Your firm's reputation in the market is enhanced by being a published authority in this niche. Over 12 months, 50 purchases generate $175,000."
    }
  ],

  tips: [
    "Check the 'Last Updated' date on packs. Legal procedures change; a playbook from 2021 may not reflect current practice",
    "Ratings and reviews reflect other practitioners' experience. Read reviews for specific feedback on pack utility",
    "Some packs offer firm-wide licenses (all users) vs individual licenses (single user). Confirm licensing before purchase for teams",
    "When selling, focus on procedural expertise rather than substantive law. Firms buy playbooks for process knowledge they lack, not legal analysis they could do themselves"
  ],

  relatedFeatures: [
    {
      featureId: "intelligence",
      name: "Intelligence Metrics",
      reason: "Your accumulated institutional knowledge could become a Knowledge Pack"
    },
    {
      featureId: "governance",
      name: "AI Governance",
      reason: "Purchased Knowledge Packs are tracked in your governance framework"
    }
  ]
};
