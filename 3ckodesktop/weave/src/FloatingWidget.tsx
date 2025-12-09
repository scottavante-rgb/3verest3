import { useCallback } from "react";
import { AppShell } from "./components/AppShell";
import { Header } from "./components/Header";
import { SessionRail } from "./components/SessionRail";
import { ViewModeContainer } from "./components/ViewModeContainer";
import { InputBar } from "./components/InputBar";
import { AgentRail } from "./components/AgentRail";
import { useAppMode } from "./hooks/useAppMode";
import { useSessions } from "./hooks/useSessions";
import { use3ckoPipeline } from "./hooks/use3ckoPipeline";
import "./FloatingWidget.css";

export default function FloatingWidget() {
  const { isAgentic } = useAppMode();
  const { activeSession, addMessage } = useSessions();

  // Existing pipeline hook for recording
  const pipeline = use3ckoPipeline();

  const handleClose = useCallback(async () => {
    try {
      // Minimize or hide window
      const { getCurrentWindow } = await import("@tauri-apps/api/window");
      const win = getCurrentWindow();
      await win.hide();
    } catch (err) {
      console.error("Failed to close window:", err);
    }
  }, []);

  const handleSubmit = useCallback(async (text: string) => {
    if (!activeSession) return;

    // Simulate assistant response (replace with actual API call)
    setTimeout(() => {
      addMessage(activeSession.id, {
        role: "assistant",
        content: `I received your message: "${text}". This is a placeholder response.`,
      });
    }, 1000);
  }, [activeSession, addMessage]);

  const handleMicClick = useCallback(() => {
    if (pipeline.state === "recording") {
      pipeline.stopRecordingAndProcess();
    } else if (pipeline.state === "idle" || pipeline.state === "ready") {
      pipeline.startRecording();
    }
  }, [pipeline]);

  return (
    <AppShell
      header={
        <Header
          onCloseClick={handleClose}
          onSettingsClick={() => console.log("Settings clicked")}
        />
      }
      sessionRail={<SessionRail />}
      agentRail={isAgentic ? <AgentRail /> : undefined}
      inputBar={
        <InputBar
          onSubmit={handleSubmit}
          onMicClick={handleMicClick}
          isRecording={pipeline.state === "recording"}
          isProcessing={
            pipeline.state === "transcribing" ||
            pipeline.state === "refining" ||
            pipeline.state === "finishing"
          }
        />
      }
    >
      <ViewModeContainer />
    </AppShell>
  );
}
