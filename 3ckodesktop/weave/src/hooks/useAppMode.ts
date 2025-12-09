import { useApp } from "../context";

export function useAppMode() {
  const { currentMode, setCurrentMode } = useApp();

  const isChat = currentMode === "chat";
  const isAgentic = currentMode === "agentic";
  const isVR = currentMode === "vr";

  return {
    mode: currentMode,
    setMode: setCurrentMode,
    isChat,
    isAgentic,
    isVR,
  };
}
