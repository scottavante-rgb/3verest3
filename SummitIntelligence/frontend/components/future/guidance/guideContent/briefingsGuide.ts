import type { FeatureGuide } from "../types";

export const briefingsGuide: FeatureGuide = {
  featureId: "briefings",
  title: "Morning Briefings",
  tagline: "Start every day knowing exactly what needs attention",

  overview: "Your personalised daily intelligence summary, generated automatically at 6am. Instead of checking multiple systems and scrolling through emails, you see a single view of urgent deadlines, overnight developments, today's priorities, and strategic opportunities—synthesised from your entire matter portfolio.",

  steps: [
    {
      step: 1,
      action: "Arrive at your briefing",
      detail: "The briefing is your default landing page when you log in. It's also delivered via email at your preferred time (configurable in Settings). Critical items trigger mobile push notifications."
    },
    {
      step: 2,
      action: "Check priority alerts",
      detail: "If something requires immediate attention—an expiring limitation period, a filing deadline today, a critical client matter—it appears as a red banner at the top. These alerts are never buried."
    },
    {
      step: 3,
      action: "Review today's focus",
      detail: "The three most important actions for your day appear as cards. Each shows what needs to be done, why it's important, and a button to go directly to that matter. These are prioritised based on deadline urgency and matter value."
    },
    {
      step: 4,
      action: "Scan overnight changes",
      detail: "Everything that happened since you last logged in: documents filed, correspondence received, court orders made. Each item links to the relevant document or matter. No more morning email archaeology."
    },
    {
      step: 5,
      action: "Monitor limitation periods",
      detail: "A rolling 90-day view of upcoming limitation periods across your portfolio. Items change colour as they approach: green (60+ days), amber (30-60 days), red (under 30 days)."
    }
  ],

  useCases: [
    {
      scenario: "Catching a critical deadline after a busy week",
      context: "You've spent the week in a trial. It's Friday morning and you've barely looked at your other matters. Somewhere in your portfolio is a limitation period issue you discussed with a client three months ago.",
      howItHelps: "Your Friday briefing shows a red priority alert: 'Limitation period expires in 3 days: Chen Contract Dispute.' The alert includes the matter reference, limitation type (contract - 6 year), and a direct link to the matter. Below, your Today's Focus shows 'File Statement of Claim - Chen Contract Dispute' as the #1 priority.",
      outcome: "Despite being consumed by the trial, you don't miss the limitation. You delegate urgent drafting to a junior and the claim is filed with a day to spare."
    },
    {
      scenario: "Discovering overnight developments before a client call",
      context: "You have a 9am call with the general counsel of a major client about a significant dispute. You left the office at 7pm; it's now 8:30am.",
      howItHelps: "Your briefing shows under 'What Changed Overnight': 'Respondent filed submissions - Crawford v Meridian (11:47 PM via eLodgment).' You click through and see the submissions have been uploaded to the matter. There's also a note: 'Opposition Analysis available - 6 weaknesses identified.'",
      outcome: "In 15 minutes, you've skimmed the submissions and reviewed the weakness analysis. Your 9am call with the GC includes substantive commentary on what the other side has argued and initial thoughts on reply—impressive responsiveness that strengthens the client relationship."
    },
    {
      scenario: "Managing a heavy hearing week",
      context: "It's Monday morning. You know you have multiple hearings this week but can't remember the sequence or what preparation remains incomplete.",
      howItHelps: "The 'Court Dates This Week' section shows all four hearings in chronological order: Tuesday 10:30 Directions (Chen), Wednesday 9:30 Mediation (Pacific Holdings), Thursday 10:00 Hearing Day 1 (Smith), Friday 2:00 Callover (Harrison). Today's Focus shows the specific preparation tasks due today for each.",
      outcome: "You work through preparation systematically based on the chronological priority. Nothing is missed, nothing is duplicated, and you can see the full week's shape at a glance."
    },
    {
      scenario: "Returning from leave",
      context: "You've been on leave for two weeks. You return to 847 unread emails and no idea what's happened across your 23 active matters.",
      howItHelps: "Your briefing shows a summary of the last 14 days (configurable). Major changes are highlighted: 2 matters have settled, 1 new matter has been assigned, 4 court orders have been made, and 3 matters have significant correspondence requiring response. Priority alerts show 2 items needing immediate attention.",
      outcome: "Instead of spending half a day reading emails chronologically, you go directly to the matters requiring urgent attention. The email backlog becomes manageable because you know which threads actually matter."
    }
  ],

  tips: [
    "Configure your email delivery time in Settings—some practitioners prefer 5am to review before leaving home, others prefer 8am for office arrival",
    "Push notifications can be configured for critical items only (limitation periods, filing deadlines) to avoid notification fatigue",
    "The Oracle Insights section surfaces patterns across your portfolio—these are strategic observations, not urgent items, so review them when you have thinking time",
    "Click 'View Past Briefings' to access historical briefings—useful for reconstructing what you knew and when"
  ],

  relatedFeatures: [
    {
      featureId: "meeting-prep",
      name: "Meeting Preparation",
      reason: "Your briefing shows today's meetings; click through for detailed preparation notes"
    },
    {
      featureId: "governance",
      name: "AI Governance",
      reason: "Governance alerts appear in your briefing when AI decisions need your review"
    }
  ]
};
