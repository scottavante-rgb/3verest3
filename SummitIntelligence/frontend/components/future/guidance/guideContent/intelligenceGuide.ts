import type { FeatureGuide } from "../types";

export const intelligenceGuide: FeatureGuide = {
  featureId: "intelligence",
  title: "Intelligence Metrics",
  tagline: "Your firm's institutional knowledge, quantified",

  overview: "Every matter you run through Summit adds to your firm's institutional intelligence—patterns recognised, precedents indexed, insights accumulated. This dashboard shows that accumulated value: what you've built, how it's growing, and what it would cost to reconstruct elsewhere. Data gravity in action.",

  steps: [
    {
      step: 1,
      action: "Review your Intelligence Score",
      detail: "The headline number represents accumulated institutional knowledge. It grows as more matters are analysed, more documents are processed, and more patterns are discovered. The trend shows month-over-month change."
    },
    {
      step: 2,
      action: "Track growth over time",
      detail: "The growth chart shows how your Intelligence Score has compounded over the past 12 months. Steeper curves indicate periods of high matter activity or significant document ingestion."
    },
    {
      step: 3,
      action: "Examine key metrics",
      detail: "Four metrics break down the score: Matters Analysed (matters with Summit activity), Documents Ingested (total documents processed), Patterns Discovered (cross-matter insights identified), and Precedents Indexed (firm documents catalogued for reuse)."
    },
    {
      step: 4,
      action: "Understand reconstruction cost",
      detail: "The dashboard estimates the hours required to reconstruct this intelligence elsewhere, translated to a dollar figure. This represents embedded value—the switching cost of moving to another platform."
    },
    {
      step: 5,
      action: "Review recent discoveries",
      detail: "Summit surfaces patterns it discovers across your matter portfolio—settlement timing insights, judicial preferences, discovery scope correlations. These appear as they're identified, giving you firm-wide intelligence you didn't know you had."
    }
  ],

  useCases: [
    {
      scenario: "Demonstrating value to the partnership",
      context: "The partnership is reviewing technology expenditures. Someone asks whether Summit is delivering value relative to its cost.",
      howItHelps: "The Intelligence Score provides a concrete metric. The reconstruction cost estimate shows what it would take to rebuild this knowledge elsewhere: '4,200 hours at current rates = $2.1M of embedded institutional knowledge.' The recent discoveries list shows specific insights that have improved outcomes.",
      outcome: "The value conversation shifts from abstract benefits to quantified institutional asset. The firm can compare reconstruction cost against annual Summit subscription to understand the investment dynamic."
    },
    {
      scenario: "Identifying practice area development opportunities",
      context: "The managing partner wants to understand which practice areas have strong institutional knowledge and which are underdeveloped.",
      howItHelps: "The Practice Area Depth chart shows intelligence depth by area. Commercial litigation shows 89% depth (mature pattern library); Corporate/M&A shows only 34% depth (limited historical data in Summit). This suggests where the firm has competitive advantage through accumulated intelligence versus areas that are starting fresh.",
      outcome: "Strategic decisions about practice development can account for institutional knowledge assets. The firm might prioritise building M&A intelligence through deliberate matter selection and knowledge capture."
    },
    {
      scenario: "Merger or acquisition due diligence",
      context: "Your firm is considering merging with another practice. Part of the value proposition is intellectual capital—but how do you quantify the knowledge each firm brings?",
      howItHelps: "Both firms' Intelligence Scores provide comparable metrics. The practice area depth breakdown shows complementary strengths and overlaps. The reconstruction cost gives a dollar estimate of embedded knowledge value that can inform merger arithmetic.",
      outcome: "The merger conversation includes quantified intellectual capital alongside financial metrics. You can identify which firm brings stronger institutional knowledge in which practice areas."
    },
    {
      scenario: "Leveraging pattern discoveries",
      context: "You're a partner with 50 active matters. You don't have time to analyse patterns across your portfolio, but you'd benefit from knowing what the data reveals.",
      howItHelps: "Recent Discoveries surfaces patterns automatically. Summit might identify: 'Your discovery requests average 40% fewer categories than competitors with 15% higher success rate on scope disputes.' Or: 'Matters settling within 30 days of mediation achieve 12% better outcomes.'",
      outcome: "You gain portfolio-level intelligence without doing portfolio-level analysis. Patterns that would take hours to identify manually are surfaced automatically. You can adjust your practice based on what actually works."
    }
  ],

  tips: [
    "Intelligence Score is cumulative—it only grows. Even matters that don't proceed add to pattern recognition",
    "The reconstruction cost is conservative. It estimates professional hours but doesn't account for elapsed time to rebuild relationships and context",
    "Practice Area Depth percentages are relative to the deepest area in your firm. 50% means half the intelligence depth of your strongest practice",
    "Check Recent Discoveries weekly. These insights appear as Summit identifies them across your matter portfolio"
  ],

  relatedFeatures: [
    {
      featureId: "economics",
      name: "Task Economics",
      reason: "Matter-level analysis feeds into firm-wide intelligence metrics"
    },
    {
      featureId: "knowledge",
      name: "Knowledge Marketplace",
      reason: "Your accumulated intelligence could become a Knowledge Pack for other firms"
    }
  ]
};
