// 3cko Weave HUD Theme Configuration
export const theme = {
  colors: {
    primaryNavy: "#0C121D",
    accentRed: "#EB4A49",
    glowRed: "rgba(255, 76, 76, 0.45)",
    glowBlue: "rgba(73, 118, 255, 0.35)",
    accentPurple: "#655DF6",
    textPrimary: "rgba(255, 255, 255, 0.9)",
    textSecondary: "rgba(255, 255, 255, 0.6)",
    iconStroke: "rgba(255, 255, 255, 0.7)",
    glassLayer: "rgba(255, 255, 255, 0.06)",
    statusGreen: "#10B981",
    statusAmber: "#F59E0B",
    processingBlue: "#3B82F6",
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
  },
  radii: {
    sm: "6px",
    md: "10px",
    lg: "16px",
    pill: "9999px",
  },
  shadows: {
    glow: "0 0 20px",
    elevated: "0 8px 32px rgba(0, 0, 0, 0.4)",
    inner: "inset 0 2px 4px rgba(0, 0, 0, 0.3)",
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    tracking: "0.025em",
  },
};

export const motionVariants = {
  breathe: {
    animate: {
      opacity: [0.9, 1, 0.9],
      scale: [1, 1.02, 1],
    },
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  pulse: {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8],
    },
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  press: {
    whileTap: { scale: 0.95 },
    transition: { type: "spring", stiffness: 400, damping: 17 },
  },
  glowPulse: {
    animate: {
      boxShadow: [
        "0 0 20px rgba(255, 76, 76, 0.3)",
        "0 0 30px rgba(255, 76, 76, 0.5)",
        "0 0 20px rgba(255, 76, 76, 0.3)",
      ],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  slideIn: {
    initial: { opacity: 0, y: -4 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -4 },
    transition: { duration: 0.2, ease: "easeOut" },
  },
  progressLine: {
    animate: {
      x: ["-100%", "100%"],
    },
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

// =============================================================================
// GLASS DESIGN TOKENS - 3cko Evolution
// =============================================================================

export const glassTokens = {
  // Surface layers
  surface: {
    base: "rgba(12, 18, 29, 0.95)",           // Deep navy base
    glass: "rgba(255, 255, 255, 0.06)",       // Glass layer
    glassHover: "rgba(255, 255, 255, 0.10)",
    glassActive: "rgba(255, 255, 255, 0.14)",
    elevated: "rgba(255, 255, 255, 0.08)",
  },

  // Blur values
  blur: {
    none: "blur(0px)",
    sm: "blur(8px)",
    md: "blur(16px)",
    lg: "blur(24px)",
    xl: "blur(40px)",
  },

  // Border styles
  border: {
    subtle: "1px solid rgba(255, 255, 255, 0.08)",
    medium: "1px solid rgba(255, 255, 255, 0.12)",
    glow: "1px solid rgba(255, 255, 255, 0.20)",
    active: "1px solid rgba(101, 93, 246, 0.5)",  // Purple glow
  },

  // Shadows
  shadow: {
    inset: "inset 0 1px 1px rgba(255, 255, 255, 0.05)",
    elevated: "0 8px 32px rgba(0, 0, 0, 0.4)",
    glow: "0 0 20px rgba(101, 93, 246, 0.3)",
    glowBlue: "0 0 24px rgba(59, 130, 246, 0.4)",
    glowPurple: "0 0 24px rgba(101, 93, 246, 0.4)",
  },

  // Radii
  radius: {
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    pill: "9999px",
  },

  // Message bubble colors
  bubble: {
    assistant: {
      bg: "rgba(30, 41, 59, 0.8)",
      border: "rgba(255, 255, 255, 0.06)",
      shadow: "inset 0 1px 2px rgba(0, 0, 0, 0.2)",
    },
    user: {
      bgFrom: "#3B82F6",
      bgTo: "#2563EB",
      glow: "0 0 20px rgba(59, 130, 246, 0.4)",
    },
  },

  // Mode colors
  mode: {
    chat: "#10B981",      // Green
    agentic: "#8B5CF6",   // Purple
    vr: "#06B6D4",        // Cyan
  },
} as const;

export type GlassTokens = typeof glassTokens;
