"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AmbientLightProps {
  /**
   * Intensity of the light effect (0-1)
   * @default 0.4
   */
  intensity?: number;
  /**
   * Duration of one complete cycle in seconds
   * @default 60
   */
  duration?: number;
  /**
   * Color of the ambient light
   * @default "#00FFC2" (mint)
   */
  color?: string;
  /**
   * Starting position as percentage (e.g., "30% 40%")
   * @default "30% 40%"
   */
  position?: string;
  /**
   * Blur amount in pixels
   * @default "128px"
   */
  blur?: string;
  /**
   * Size of the gradient circle
   * @default "circle"
   */
  shape?: "circle" | "ellipse";
}

/**
 * AMBIENT LIGHT FIELD
 * Adds depth and motion to dark pages with drifting mint gradient
 * GPU-accelerated, respects prefers-reduced-motion
 */
export function AmbientLight({
  intensity = 0.4,
  duration = 60,
  color = "#00FFC2",
  position = "30% 40%",
  blur = "128px",
  shape = "circle",
}: AmbientLightProps) {
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    // Respect user's motion preferences
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setShouldAnimate(!mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setShouldAnimate(!e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Convert hex color to rgba
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  };

  const lightColor = hexToRgba(color, intensity * 0.3);

  return (
    <motion.div
      initial={{ backgroundPosition: "0% 50%" }}
      animate={
        shouldAnimate
          ? {
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }
          : {}
      }
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        backgroundImage: `radial-gradient(${shape} at ${position}, ${lightColor}, transparent 70%)`,
        backgroundSize: "200% 200%",
        filter: `blur(${blur})`,
        opacity: intensity,
        willChange: shouldAnimate ? "background-position" : "auto",
      }}
      className="absolute inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}

/**
 * DUAL AMBIENT LIGHT
 * Two drifting light sources for more dynamic backgrounds
 */
export function DualAmbientLight() {
  return (
    <>
      <AmbientLight
        position="30% 40%"
        duration={60}
        intensity={0.4}
        color="#00FFC2"
      />
      <AmbientLight
        position="70% 60%"
        duration={80}
        intensity={0.3}
        color="#00D4FF"
        blur="160px"
      />
    </>
  );
}

/**
 * RADIAL PULSE LIGHT
 * Stationary light with subtle pulsing effect
 */
export function RadialPulseLight({
  position = "50% 50%",
  color = "#00FFC2",
}: {
  position?: string;
  color?: string;
}) {
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setShouldAnimate(!mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setShouldAnimate(!e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0.3 }}
      animate={
        shouldAnimate
          ? {
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.1, 1],
            }
          : { opacity: 0.3 }
      }
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        backgroundImage: `radial-gradient(circle at ${position}, ${color}20, transparent 60%)`,
        filter: "blur(100px)",
      }}
      className="absolute inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
