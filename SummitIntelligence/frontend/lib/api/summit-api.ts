/**
 * Summit API Client
 * Communicates with the FastAPI backend services
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_SUMMIT_API_URL || "http://localhost:8000";
const LLM_API_URL = process.env.NEXT_PUBLIC_LLM_API_URL || "http://localhost:8001";
const AGENT_API_URL = process.env.NEXT_PUBLIC_AGENT_API_URL || "http://localhost:8002";
const ANALYTICS_API_URL = process.env.NEXT_PUBLIC_ANALYTICS_API_URL || "http://localhost:8003";

// Default timeout values (in milliseconds)
const DEFAULT_TIMEOUT_MS = 30000; // 30 seconds for standard requests
const LLM_TIMEOUT_MS = 120000; // 120 seconds for LLM requests (can be slow)

type FetchOptions = RequestInit & {
  token?: string;
  timeout?: number;
};

/**
 * Custom error class for timeout errors
 */
export class TimeoutError extends Error {
  constructor(message = "Request timed out") {
    super(message);
    this.name = "TimeoutError";
  }
}

/**
 * Create an AbortController with timeout
 */
function createTimeoutController(timeoutMs: number): { controller: AbortController; timeoutId: NodeJS.Timeout } {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  return { controller, timeoutId };
}

async function fetchAPI<T>(url: string, options: FetchOptions = {}): Promise<T> {
  const { token, timeout = DEFAULT_TIMEOUT_MS, ...fetchOptions } = options;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  // Create timeout controller
  const { controller, timeoutId } = createTimeoutController(timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
      signal: controller.signal,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: "Unknown error" }));
      throw new Error(error.detail || `HTTP ${response.status}`);
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new TimeoutError(`Request to ${url} timed out after ${timeout}ms`);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

// ============================================
// ORGANISATION & USER
// ============================================

export interface Organisation {
  id: string;
  name: string;
  slug: string;
  domain: string | null;
  sovereign_mode: boolean;
  subscription_tier: string;
  settings: Record<string, unknown>;
}

export interface User {
  id: string;
  org_id: string;
  email: string;
  full_name: string;
  role: string;
  department: string | null;
  jurisdictions: string[];
  is_active: boolean;
}

export async function getOrganisation(token: string): Promise<Organisation> {
  return fetchAPI(`${API_BASE_URL}/api/v1/organisation`, { token });
}

export async function getCurrentUser(token: string): Promise<User> {
  return fetchAPI(`${API_BASE_URL}/api/v1/users/me`, { token });
}

export async function getUsers(token: string): Promise<User[]> {
  return fetchAPI(`${API_BASE_URL}/api/v1/users`, { token });
}

// ============================================
// MATTERS
// ============================================

export interface MatterSummary {
  id: string;
  org_id: string;
  code: string;
  name: string;
  matter_type: string;
  status: string;
  jurisdiction: string;
  compliance_state: string;
  risk_score: number;
  client_name: string | null;
}

export interface MatterDetail extends MatterSummary {
  description: string | null;
  court_reference: string | null;
  privilege_class: string;
  billing_type: string;
  budget_total: number | null;
  budget_used: number;
  estimated_value: number | null;
  open_date: string | null;
  next_deadline: string | null;
  metadata: Record<string, unknown>;
  team: MatterTeamMember[];
  parties: MatterParty[];
}

export interface MatterTeamMember {
  id: string;
  matter_id: string;
  user_id: string;
  team_role: string;
  billable_rate: number | null;
  users?: {
    full_name: string;
    email: string;
    role: string;
  };
}

export interface MatterParty {
  id: string;
  matter_id: string;
  party_type: string;
  name: string;
  role: string | null;
  contact_email: string | null;
}

export interface ListMattersParams {
  status?: string;
  matter_type?: string;
  limit?: number;
  offset?: number;
}

export async function getMatters(
  token: string,
  params: ListMattersParams = {}
): Promise<MatterSummary[]> {
  const searchParams = new URLSearchParams();
  if (params.status) searchParams.set("status", params.status);
  if (params.matter_type) searchParams.set("matter_type", params.matter_type);
  if (params.limit) searchParams.set("limit", params.limit.toString());
  if (params.offset) searchParams.set("offset", params.offset.toString());

  const query = searchParams.toString();
  return fetchAPI(`${API_BASE_URL}/api/v1/matters${query ? `?${query}` : ""}`, { token });
}

export async function getMatter(token: string, matterId: string): Promise<MatterDetail> {
  return fetchAPI(`${API_BASE_URL}/api/v1/matters/${matterId}`, { token });
}

// ============================================
// MATTER SOURCES
// ============================================

export interface MatterSource {
  id: string;
  matter_id: string;
  source_type: string;
  source_name: string;
  privilege_class: string;
  document_date: string | null;
  author: string | null;
  page_count: number | null;
  tags: string[];
  summary: string | null;
}

export async function getMatterSources(
  token: string,
  matterId: string,
  sourceType?: string
): Promise<MatterSource[]> {
  const params = sourceType ? `?source_type=${sourceType}` : "";
  return fetchAPI(`${API_BASE_URL}/api/v1/matters/${matterId}/sources${params}`, { token });
}

export async function getSource(
  token: string,
  matterId: string,
  sourceId: string
): Promise<MatterSource & { extracted_text?: string }> {
  return fetchAPI(`${API_BASE_URL}/api/v1/matters/${matterId}/sources/${sourceId}`, { token });
}

// ============================================
// MATTER EVENTS
// ============================================

export interface MatterEvent {
  id: string;
  matter_id: string;
  event_type: string;
  title: string;
  event_date: string;
  is_deadline: boolean;
  is_completed: boolean;
}

export async function getMatterEvents(
  token: string,
  matterId: string,
  includeCompleted = true
): Promise<MatterEvent[]> {
  const params = `?include_completed=${includeCompleted}`;
  return fetchAPI(`${API_BASE_URL}/api/v1/matters/${matterId}/events${params}`, { token });
}

export async function getUpcomingDeadlines(
  token: string,
  days = 30
): Promise<(MatterEvent & { matters: { code: string; name: string } })[]> {
  return fetchAPI(`${API_BASE_URL}/api/v1/deadlines?days=${days}`, { token });
}

// ============================================
// SEARCH
// ============================================

export interface SearchQuery {
  query: string;
  matter_id?: string;
  filters?: Record<string, unknown>;
  limit?: number;
}

export interface SearchResults {
  matters: Array<{
    id: string;
    code: string;
    name: string;
    matter_type: string;
    status: string;
  }>;
  sources: Array<{
    id: string;
    matter_id: string;
    source_name: string;
    source_type: string;
    summary: string | null;
  }>;
  query: string;
}

export async function search(token: string, query: SearchQuery): Promise<SearchResults> {
  return fetchAPI(`${API_BASE_URL}/api/v1/search`, {
    method: "POST",
    body: JSON.stringify(query),
    token,
  });
}

// ============================================
// ANALYTICS & SGI
// ============================================

export interface SGISnapshot {
  sgi_score: number;
  time_saved_hours: number;
  cost_avoided_usd: number;
  accuracy_improvement: number;
  throughput_gain: number;
  compliance_score: number;
  breakdown: Record<string, number>;
  trend?: number;
}

export interface SGIHistory {
  snapshot_date: string;
  sgi_score: number;
  time_saved_hours: number;
  cost_avoided_usd: number;
}

export async function getSGI(token: string): Promise<SGISnapshot> {
  return fetchAPI(`${API_BASE_URL}/api/v1/analytics/sgi`, { token });
}

export async function getSGIHistory(token: string, days = 30): Promise<SGIHistory[]> {
  return fetchAPI(`${API_BASE_URL}/api/v1/analytics/sgi/history?days=${days}`, { token });
}

// ============================================
// AGENTS
// ============================================

export interface AgentDefinition {
  id: string;
  org_id: string;
  name: string;
  description: string;
  agent_type: string;
  icon: string | null;
  status: string;
  capabilities: string[];
  config: Record<string, unknown>;
  trigger_type: string;
  visibility_scope: string;
}

export interface AgentRun {
  id: string;
  agent_id: string;
  matter_id: string | null;
  status: string;
  input_data: Record<string, unknown>;
  output_data: Record<string, unknown>;
  started_at: string | null;
  completed_at: string | null;
  error: string | null;
}

export async function getAgents(token: string, status?: string): Promise<AgentDefinition[]> {
  const params = status ? `?status=${status}` : "";
  return fetchAPI(`${API_BASE_URL}/api/v1/agents${params}`, { token });
}

export async function getAgent(token: string, agentId: string): Promise<AgentDefinition> {
  return fetchAPI(`${API_BASE_URL}/api/v1/agents/${agentId}`, { token });
}

export async function getAgentRuns(token: string, agentId: string): Promise<AgentRun[]> {
  return fetchAPI(`${API_BASE_URL}/api/v1/agents/${agentId}/runs`, { token });
}

export async function startAgentRun(
  token: string,
  agentId: string,
  matterId?: string,
  inputData: Record<string, unknown> = {}
): Promise<{ run_id: string; status: string; message: string }> {
  return fetchAPI(`${AGENT_API_URL}/api/v1/agents/${agentId}/run`, {
    method: "POST",
    body: JSON.stringify({
      agent_id: agentId,
      matter_id: matterId,
      input_data: inputData,
    }),
    token,
  });
}

// ============================================
// LLM ORCHESTRATOR
// ============================================

export type TaskType =
  | "analysis"
  | "drafting"
  | "research"
  | "summarization"
  | "extraction"
  | "classification"
  | "qa";

export interface CompletionRequest {
  task_type: TaskType;
  prompt: string;
  system_prompt?: string;
  context?: Array<{ role: string; content: string }>;
  matter_id?: string;
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
  metadata?: Record<string, unknown>;
}

export interface CompletionResponse {
  content: string;
  model: string;
  usage: {
    input_tokens: number;
    output_tokens: number;
    total_tokens: number;
  };
  latency_ms: number;
}

export interface RAGRequest {
  query: string;
  matter_id: string;
  task_type?: TaskType;
  top_k?: number;
  similarity_threshold?: number;
  include_sources?: boolean;
  stream?: boolean;
}

export interface RAGResponse extends CompletionResponse {
  context_chunks_used: number;
  sources?: Array<{
    source_id: string;
    source_name: string;
    similarity: number;
    excerpt: string;
  }>;
}

export async function complete(token: string, request: CompletionRequest): Promise<CompletionResponse> {
  return fetchAPI(`${LLM_API_URL}/api/v1/complete`, {
    method: "POST",
    body: JSON.stringify(request),
    token,
    timeout: LLM_TIMEOUT_MS, // LLM requests can take longer
  });
}

export async function ragQuery(token: string, request: RAGRequest): Promise<RAGResponse> {
  return fetchAPI(`${LLM_API_URL}/api/v1/rag`, {
    method: "POST",
    body: JSON.stringify(request),
    token,
    timeout: LLM_TIMEOUT_MS, // LLM requests can take longer
  });
}

export function streamComplete(
  token: string,
  request: CompletionRequest,
  onChunk: (content: string) => void,
  onDone: () => void,
  onError: (error: Error) => void,
  timeout: number = LLM_TIMEOUT_MS
): () => void {
  const controller = new AbortController();

  // Set up timeout for the entire streaming operation
  const timeoutId = setTimeout(() => {
    controller.abort();
    onError(new TimeoutError(`Streaming request timed out after ${timeout}ms`));
  }, timeout);

  fetch(`${LLM_API_URL}/api/v1/complete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...request, stream: true }),
    signal: controller.signal,
  })
    .then(async (response) => {
      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({ detail: "Unknown error" }));
        throw new Error(errorBody.detail || `HTTP ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value, { stream: true });
        const lines = text.split("\n").filter((line) => line.startsWith("data: "));

        for (const line of lines) {
          try {
            const data = JSON.parse(line.slice(6));
            if (data.error) {
              throw new Error(data.error);
            }
            if (data.content) {
              onChunk(data.content);
            }
            if (data.done) {
              clearTimeout(timeoutId);
              onDone();
              return;
            }
          } catch (parseError) {
            // Skip malformed lines but continue processing
            console.warn("Failed to parse streaming response line:", line);
          }
        }
      }
      clearTimeout(timeoutId);
    })
    .catch((error) => {
      clearTimeout(timeoutId);
      if (error.name !== "AbortError") {
        onError(error);
      }
    });

  return () => {
    clearTimeout(timeoutId);
    controller.abort();
  };
}

// ============================================
// ANALYTICS SERVICE
// ============================================

export type TimeRange = "day" | "week" | "month" | "quarter" | "year";

export interface UsageMetrics {
  total_queries: number;
  total_documents_processed: number;
  total_agent_runs: number;
  active_users: number;
  active_matters: number;
  ai_calls: number;
  tokens_used: number;
  estimated_cost_usd: number;
}

export async function getUsageMetrics(
  token: string,
  timeRange: TimeRange = "month"
): Promise<UsageMetrics> {
  return fetchAPI(`${ANALYTICS_API_URL}/api/v1/usage?time_range=${timeRange}`, { token });
}

export async function getTrends(
  token: string,
  metric: string,
  timeRange: TimeRange = "month"
): Promise<Array<{ date: string; value: number }>> {
  return fetchAPI(`${ANALYTICS_API_URL}/api/v1/analytics/trends?metric=${metric}&time_range=${timeRange}`, {
    token,
  });
}
