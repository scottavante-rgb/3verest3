export type ProcessingMode = "ASR_ONLY" | "ASR_PLUS_LLM";

export type ProcessingState =
  | "idle"
  | "recording"
  | "finishing"
  | "transcribing"
  | "refining"
  | "ready"
  | "submitted"
  | "error";

export interface TranscriptionRequestPayload {
  audioBase64: string;
  mode: ProcessingMode;
  source: "web" | "desktop";
  language?: string;
  metadata?: Record<string, unknown>;
}

export interface TranscriptionResponsePayload {
  nativeTranscript: string;
  summaryTranscript?: string;
  timings: {
    asrMs: number;
    llmMs?: number;
    totalMs: number;
  };
  mode: ProcessingMode;
}

export interface TranscriptionErrorPayload {
  error: string;
  details?: unknown;
}

// =============================================================================
// APP MODE TYPES
// =============================================================================

export type AppMode = "chat" | "agentic" | "vr";

export interface ModeConfig {
  id: AppMode;
  label: string;
  icon: string;
  color: string;
}

export const MODE_CONFIGS: Record<AppMode, ModeConfig> = {
  chat: { id: "chat", label: "Chat", icon: "chat", color: "#10B981" },
  agentic: { id: "agentic", label: "Agentic", icon: "cpu", color: "#8B5CF6" },
  vr: { id: "vr", label: "VR", icon: "glasses", color: "#06B6D4" },
};

// =============================================================================
// CHAT SESSION TYPES
// =============================================================================

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  agentTrace?: AgentTrace;  // Optional agent metadata
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
  color: string;  // Session indicator color
  unreadCount: number;
}

// =============================================================================
// AGENT TYPES (for Agentic mode)
// =============================================================================

export type AgentStepStatus = "pending" | "running" | "complete" | "error";

export interface AgentStep {
  id: string;
  name: string;
  description: string;
  status: AgentStepStatus;
  startedAt?: number;
  completedAt?: number;
  output?: string;
}

export interface AgentToolCall {
  id: string;
  name: string;
  args: Record<string, unknown>;
  status: AgentStepStatus;
  result?: unknown;
  error?: string;
}

export interface AgentTrace {
  goal: string;
  steps: AgentStep[];
  toolCalls: AgentToolCall[];
  currentStepIndex: number;
  status: "idle" | "thinking" | "executing" | "complete" | "error";
}

// =============================================================================
// VR CONFIG TYPES
// =============================================================================

export interface VRConfig {
  enabled: boolean;
  headsetConnected: boolean;
  renderMode: "preview" | "stereo" | "passthrough";
  handTracking: boolean;
}

export const DEFAULT_VR_CONFIG: VRConfig = {
  enabled: false,
  headsetConnected: false,
  renderMode: "preview",
  handTracking: false,
};

// =============================================================================
// SESSION COLORS
// =============================================================================

export const SESSION_COLORS = [
  "#10B981", // Emerald
  "#3B82F6", // Blue
  "#8B5CF6", // Purple
  "#F59E0B", // Amber
  "#EF4444", // Red
] as const;
