"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface WorldSignatureProps {
  /**
   * Color of the signature lines
   * @default "#00FFC2"
   */
  color?: string;
  /**
   * Opacity of the signature
   * @default 0.2
   */
  opacity?: number;
  /**
   * Width of the SVG
   * @default 800
   */
  width?: number;
  /**
   * Height of the SVG
   * @default 400
   */
  height?: number;
  /**
   * Animation duration in seconds
   * @default 8
   */
  duration?: number;
  /**
   * Enable sequential arc animation
   * @default true
   */
  animate?: boolean;
}

/**
 * WORLD SIGNATURE
 * Minimal glowing world map SVG for footer
 * Represents 3verest's global presence
 */
export function WorldSignature({
  color = "#00FFC2",
  opacity = 0.2,
  width = 800,
  height = 400,
  duration = 8,
  animate = true,
}: WorldSignatureProps) {
  const [shouldAnimate, setShouldAnimate] = useState(animate);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setShouldAnimate(!mediaQuery.matches && animate);

    const handleChange = (e: MediaQueryListEvent) => {
      setShouldAnimate(!e.matches && animate);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [animate]);

  return (
    <div className="w-full max-w-4xl mx-auto opacity-20">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        style={{ opacity }}
        aria-hidden="true"
      >
        {/* Main arc - North America to Europe */}
        <motion.path
          d="M100,200 Q400,50 700,200"
          stroke={color}
          strokeWidth="0.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            shouldAnimate
              ? {
                  pathLength: 1,
                  opacity: [0.2, 0.6, 0.2],
                }
              : { pathLength: 1, opacity: 0.2 }
          }
          transition={{
            pathLength: { duration: 2, ease: "easeInOut" },
            opacity: {
              duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0,
            },
          }}
        />

        {/* Second arc - Europe to Asia */}
        <motion.path
          d="M700,200 Q900,100 1100,250"
          stroke={color}
          strokeWidth="0.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            shouldAnimate
              ? {
                  pathLength: 1,
                  opacity: [0.2, 0.6, 0.2],
                }
              : { pathLength: 1, opacity: 0.2 }
          }
          transition={{
            pathLength: { duration: 2, ease: "easeInOut", delay: 0.5 },
            opacity: {
              duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            },
          }}
        />

        {/* Third arc - Trans-Pacific */}
        <motion.path
          d="M-50,250 Q200,120 450,220"
          stroke={color}
          strokeWidth="0.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            shouldAnimate
              ? {
                  pathLength: 1,
                  opacity: [0.2, 0.6, 0.2],
                }
              : { pathLength: 1, opacity: 0.2 }
          }
          transition={{
            pathLength: { duration: 2, ease: "easeInOut", delay: 1 },
            opacity: {
              duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4,
            },
          }}
        />

        {/* Fourth arc - Southern Hemisphere */}
        <motion.path
          d="M300,300 Q500,380 700,300"
          stroke={color}
          strokeWidth="0.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            shouldAnimate
              ? {
                  pathLength: 1,
                  opacity: [0.2, 0.6, 0.2],
                }
              : { pathLength: 1, opacity: 0.2 }
          }
          transition={{
            pathLength: { duration: 2, ease: "easeInOut", delay: 1.5 },
            opacity: {
              duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 6,
            },
          }}
        />

        {/* Connection nodes */}
        {[
          { cx: 100, cy: 200 },
          { cx: 400, cy: 50 },
          { cx: 700, cy: 200 },
          { cx: 500, cy: 220 },
          { cx: 300, cy: 300 },
        ].map((node, index) => (
          <motion.circle
            key={index}
            cx={node.cx}
            cy={node.cy}
            r="2"
            fill={color}
            initial={{ opacity: 0, scale: 0 }}
            animate={
              shouldAnimate
                ? {
                    opacity: [0, 0.6, 0],
                    scale: [0, 1.2, 1],
                  }
                : { opacity: 0.4, scale: 1 }
            }
            transition={{
              duration: duration / 2,
              repeat: Infinity,
              delay: index * 0.4,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

/**
 * MINIMAL WORLD SIGNATURE
 * Simplified version with fewer arcs
 */
export function MinimalWorldSignature() {
  return (
    <div className="w-full max-w-3xl mx-auto opacity-15">
      <svg viewBox="0 0 600 300" className="w-full h-auto" aria-hidden="true">
        <motion.path
          d="M50,150 Q300,50 550,150"
          stroke="#00FFC2"
          strokeWidth="0.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            pathLength: { duration: 2, ease: "easeInOut" },
            opacity: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
        <motion.path
          d="M100,200 Q300,280 500,200"
          stroke="#00FFC2"
          strokeWidth="0.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            pathLength: { duration: 2, ease: "easeInOut", delay: 0.5 },
            opacity: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            },
          }}
        />
      </svg>
    </div>
  );
}

/**
 * NETWORK PULSE SIGNATURE
 * Abstract network visualization
 */
export function NetworkPulseSignature() {
  const nodes = [
    { x: 100, y: 100 },
    { x: 250, y: 80 },
    { x: 400, y: 120 },
    { x: 550, y: 90 },
    { x: 175, y: 180 },
    { x: 325, y: 200 },
    { x: 475, y: 170 },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto opacity-20">
      <svg viewBox="0 0 650 280" className="w-full h-auto" aria-hidden="true">
        {/* Connection lines */}
        {nodes.map((node, i) =>
          nodes.slice(i + 1).map((targetNode, j) => {
            const distance = Math.sqrt(
              Math.pow(targetNode.x - node.x, 2) +
                Math.pow(targetNode.y - node.y, 2)
            );
            if (distance < 250) {
              return (
                <motion.line
                  key={`${i}-${j}`}
                  x1={node.x}
                  y1={node.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke="#00FFC2"
                  strokeWidth="0.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: 1,
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{
                    pathLength: { duration: 1.5, ease: "easeInOut" },
                    opacity: {
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeInOut",
                    },
                  }}
                />
              );
            }
            return null;
          })
        )}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.circle
            key={i}
            cx={node.x}
            cy={node.y}
            r="3"
            fill="#00FFC2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
}
