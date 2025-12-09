import type { AgentTrace } from "./types";

export function createMockAgentTrace(goal: string): AgentTrace {
  return {
    goal,
    steps: [
      {
        id: "1",
        name: "Analyze query",
        description: "Understanding the user request",
        status: "complete",
        startedAt: Date.now() - 5000,
        completedAt: Date.now() - 4000,
      },
      {
        id: "2",
        name: "Retrieve data",
        description: "Fetching relevant medical records",
        status: "complete",
        startedAt: Date.now() - 4000,
        completedAt: Date.now() - 2000,
      },
      {
        id: "3",
        name: "Generate response",
        description: "Composing the answer",
        status: "running",
        startedAt: Date.now() - 2000,
      },
    ],
    toolCalls: [
      {
        id: "t1",
        name: "search_records",
        args: { query: "patient vitals" },
        status: "complete",
        result: { found: 12 },
      },
      {
        id: "t2",
        name: "format_output",
        args: { format: "markdown" },
        status: "running",
      },
    ],
    currentStepIndex: 2,
    status: "executing",
  };
}

export const MOCK_AGENT_TRACE = createMockAgentTrace("Summarize recent lab results");
