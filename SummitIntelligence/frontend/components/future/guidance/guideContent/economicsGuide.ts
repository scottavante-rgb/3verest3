import type { FeatureGuide } from "../types";

export const economicsGuide: FeatureGuide = {
  featureId: "economics",
  title: "Task Economics",
  tagline: "See where your time actually goes—and where it should go",

  overview: "Legal work isn't monolithic. Some tasks require partner judgment; others follow patterns that junior staff or AI can handle. The Task Taxonomy Engine analyses how work is allocated on each matter and surfaces opportunities to reallocate tasks to more appropriate (and cost-effective) resources—improving both profitability and professional development.",

  steps: [
    {
      step: 1,
      action: "Select a matter",
      detail: "Choose from your active matters or search by name/reference. The analysis requires time recording data, so matters with minimal recorded time will have less useful breakdowns."
    },
    {
      step: 2,
      action: "Review the tier breakdown",
      detail: "The donut chart shows time allocation across four tiers: Bespoke (senior judgment), Standardised (pattern-based), Systematised (rule-based), and Commoditised (outsource/automate). Healthy matters typically show 15-25% Bespoke."
    },
    {
      step: 3,
      action: "Check the optimisation alert",
      detail: "If Summit identifies significant reallocation opportunities, an alert summarises the finding—for example, '280 hours at SA rates could be handled by AI at 12% of cost.' Click for detailed recommendations."
    },
    {
      step: 4,
      action: "Expand task details",
      detail: "Click any tier to see specific tasks, hours allocated, current assignee, and (where applicable) suggested reallocation. Red highlights indicate misallocation—senior resources on junior work."
    },
    {
      step: 5,
      action: "Model fee scenarios",
      detail: "For fixed-fee matters, see profitability projections under current vs optimised allocation. For hourly matters, see how task reallocation would affect realisation rates."
    }
  ],

  useCases: [
    {
      scenario: "Scoping a fixed-fee tender",
      context: "You're responding to a tender for a commercial dispute. The client wants a fixed fee. You need to scope accurately to price profitably without being uncompetitive.",
      howItHelps: "Analyse similar completed matters to see how work actually broke down. A comparable dispute shows: 18% Bespoke (strategy, hearings, settlement), 35% Standardised (discovery, witness preparation), 25% Systematised (correspondence, deadline management), 22% Commoditised (bundling, pagination). You can estimate hours by tier and apply appropriate rates.",
      outcome: "Your fixed fee is built on actual data from comparable matters, not optimistic estimates. You include AI-assisted discovery review in your approach, reducing the Standardised component and allowing a competitive price with healthy margin."
    },
    {
      scenario: "Partner discussion about matter profitability",
      context: "A matter has significantly exceeded budget. The partner wants to understand what happened before discussing with the client.",
      howItHelps: "The Task Economics view shows the matter has 52% of time in Standardised tasks (discovery review and document analysis) but these were performed by senior associates rather than being delegated or AI-assisted. The donut chart shows an inverted pyramid—too much senior time on pattern-based work.",
      outcome: "The partner can see specifically where the matter went off-track. The conversation with the client can include commitments about how future phases will be managed differently. The firm learns a lesson about supervision and delegation."
    },
    {
      scenario: "Making the case for AI investment",
      context: "You're presenting to the partnership about investing in AI tools. You need concrete numbers, not abstract benefits.",
      howItHelps: "Run the analysis across 50 completed matters. Aggregate data shows 34% of firm time goes to Standardised tasks (discovery, due diligence, research). If AI assistance could reduce that by 40%, the firm saves X hours annually. At blended rates, that's $Y in recovered capacity or, if you maintain billing, improved realisation.",
      outcome: "The partnership presentation includes specific dollar figures derived from actual firm data. The investment case is concrete: 'Last year we recorded 12,000 hours on document review. This technology could reduce that to 7,200 hours while improving quality.'"
    },
    {
      scenario: "Graduate training and development",
      context: "Your HR team asks why graduates aren't getting enough substantive work. They seem to be doing administrative tasks while senior associates do work that could be delegated.",
      howItHelps: "The Resource Allocation table across multiple matters shows graduates are allocated only 8% of matter time (vs industry benchmark 15%). Senior associates show 48% (vs benchmark 25%). The specific task breakdown shows SAs doing discovery review, basic research, and chronology preparation—work that could develop graduates.",
      outcome: "You have data-driven evidence for a conversation about delegation practices. The firm adjusts supervision practices, improving graduate development while freeing SA capacity for higher-value work."
    }
  ],

  tips: [
    "The four tiers aren't value judgments—Bespoke isn't 'better' than Commoditised. The goal is matching work to appropriate resources",
    "Don't aim for 0% Commoditised. Some administrative work is unavoidable. The question is whether partners are doing it",
    "Compare similar matters to establish baselines. A complex litigation will have different tier ratios than a standard conveyance",
    "Review economics monthly during active matters, not just at completion. Early intervention prevents budget blowouts"
  ],

  relatedFeatures: [
    {
      featureId: "intelligence",
      name: "Intelligence Metrics",
      reason: "Task economics data feeds into firm-wide intelligence about work patterns"
    },
    {
      featureId: "briefings",
      name: "Morning Briefings",
      reason: "Matters with significant task allocation issues appear in your briefing alerts"
    }
  ]
};
