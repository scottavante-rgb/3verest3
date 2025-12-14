import type { FeatureGuide } from "../types";

export const meetingPrepGuide: FeatureGuide = {
  featureId: "meeting-prep",
  title: "Meeting Preparation",
  tagline: "Walk in briefed, every time",

  overview: "Summit monitors your calendar and automatically prepares context before scheduled meetings—client conferences, counsel briefings, internal strategy sessions. Fifteen minutes before each meeting, a preparation card appears with matter status, recent developments, suggested talking points, likely client questions, and costs position. No more scrambling to remember what happened last time.",

  steps: [
    {
      step: 1,
      action: "Connect your calendar",
      detail: "In Settings, connect your Microsoft 365 or Google Workspace calendar. Summit identifies meetings related to matters based on subject lines, attendees, and linked matter references."
    },
    {
      step: 2,
      action: "Receive automatic preparation",
      detail: "Fifteen minutes before a matter-related meeting, a preparation card appears. You'll also receive a notification directing you to the card. For back-to-back meetings, cards are generated 30 minutes before the first."
    },
    {
      step: 3,
      action: "Review the matter snapshot",
      detail: "The card header shows current matter status, next court date, risk level, and days to trial. This orients you immediately—you know where the matter stands before reading details."
    },
    {
      step: 4,
      action: "Check what's changed",
      detail: "The 'Since Last Contact' section lists everything that happened since your last interaction with this client: filings, correspondence, court orders, internal developments. Nothing is a surprise."
    },
    {
      step: 5,
      action: "Use talking points and anticipate questions",
      detail: "AI-generated talking points suggest what to cover based on recent activity. Potential client questions anticipate what the client will likely ask given the current matter state. Costs position shows WIP, last invoice, and budget status."
    }
  ],

  useCases: [
    {
      scenario: "Client conference after weeks on other matters",
      context: "You have a 10am call with a client about a dispute. You've been consumed with a trial in another matter for three weeks and haven't looked at this file since before Christmas.",
      howItHelps: "At 9:45am, the preparation card appears. You see: matter is in discovery phase, next court date is 18 December for Directions, since your last contact the respondent has filed submissions (yesterday), discovery completed with 2,340 documents received, and the expert report arrived last week. Talking points include: review opponent's submissions, discuss key discovered documents, expert evidence strategy.",
      outcome: "In 12 minutes of reading, you're fully briefed. The client call demonstrates you're across every detail despite weeks away from the file. No embarrassing 'let me just check the file' moments."
    },
    {
      scenario: "Urgent meeting request",
      context: "A client emails at 3pm asking for a 4pm call about a matter. You weren't expecting to discuss this matter today.",
      howItHelps: "Add the meeting to your calendar with the matter reference. Summit immediately generates a preparation card (for urgent meetings, generation is accelerated). By 3:45pm, you have the full brief including recent developments you might have missed.",
      outcome: "Despite zero preparation time, you take the call fully informed. The client's urgent concern about opposing counsel's letter is something you hadn't seen—but the preparation card flagged it under 'What Changed' and you read it before the call."
    },
    {
      scenario: "Counsel conference preparation",
      context: "You're conferring with senior counsel tomorrow about trial strategy. You want to ensure counsel has current information and you're prepared to address their questions.",
      howItHelps: "The preparation card shows everything counsel needs to know: matter status, recent developments, outstanding issues. The 'Potential Questions' section anticipates what counsel might ask based on the matter stage and recent activity: witness availability, expert report status, costs estimate for trial.",
      outcome: "You send counsel the preparation summary in advance. The conference is efficient because everyone starts from the same information base. You've anticipated the questions and have answers ready."
    },
    {
      scenario: "Partner review meeting",
      context: "Weekly matter review with your supervising partner. They'll ask about 8-10 matters in rapid succession. You can't prepare detailed notes for each.",
      howItHelps: "Before the meeting, review preparation cards for each matter on the agenda. Each card gives you the 30-second summary: status, recent activity, next steps, any issues. Costs information lets you address budget questions immediately.",
      outcome: "You report on each matter confidently without flipping through files. When the partner asks a detailed question, you can access the full matter in Summit while speaking. The review takes 25 minutes instead of 45."
    }
  ],

  tips: [
    "Include matter references in calendar subject lines (e.g., 'Client Call - Crawford v Meridian CRA-2024-0156'). This helps Summit match meetings to matters accurately",
    "Preparation cards are generated 15 minutes before meetings by default. Adjust this in Settings if you prefer more lead time",
    "Click 'View Full Matter' from any preparation card to access the complete matter workspace if you need more detail",
    "Meeting prep cards are saved—access 'Past Prep Cards' to see what you knew before previous meetings"
  ],

  relatedFeatures: [
    {
      featureId: "briefings",
      name: "Morning Briefings",
      reason: "Your daily briefing shows meetings for the week with preparation status"
    },
    {
      featureId: "economics",
      name: "Task Economics",
      reason: "Costs information in prep cards comes from task economics analysis"
    }
  ]
};
