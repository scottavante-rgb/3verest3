import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppMode } from "../../hooks/useAppMode";
import { StandardFlatView } from "./StandardFlatView";
import { VRPreviewView } from "./VRPreviewView";
import "./ViewModeContainer.css";

export function ViewModeContainer() {
  const { isVR } = useAppMode();

  return (
    <div className="view-mode-container">
      <AnimatePresence mode="wait">
        {isVR ? (
          <motion.div
            key="vr"
            className="view-mode-container__view view-mode-container__view--vr"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <VRPreviewView />
          </motion.div>
        ) : (
          <motion.div
            key="standard"
            className="view-mode-container__view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <StandardFlatView />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
