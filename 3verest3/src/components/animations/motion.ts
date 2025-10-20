/**
 * 3VEREST MOTION UTILITIES
 * Reusable Framer Motion animation presets for consistent, cinematic motion
 * GPU-accelerated transforms for optimal performance
 */

import { Variants } from "framer-motion";

/**
 * Fade up from below with opacity
 * Use for: Cards, content blocks, CTAs
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

/**
 * Simple fade in
 * Use for: Overlays, backgrounds, subtle reveals
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1, ease: "easeOut" },
  },
};

/**
 * Scale in with fade
 * Use for: Modals, popovers, featured content
 */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

/**
 * Stagger children animations
 * Use for: Lists, grids, sequential reveals
 */
export const staggerChildren: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

/**
 * Parallax Y movement
 * Use for: Hero sections, layered content
 * @param distance - Distance to travel in pixels (default: 30)
 */
export const parallaxY = (distance: number = 30): Variants => ({
  hidden: { opacity: 0, y: distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
});

/**
 * Fade through mint accent
 * Use for: Brand moments, featured highlights
 */
export const fadeThroughMint: Variants = {
  hidden: {
    opacity: 0,
    backgroundColor: "rgba(0,255,194,0.1)",
  },
  visible: {
    opacity: 1,
    backgroundColor: "transparent",
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

/**
 * Typography headline reveal
 * Use for: Page titles, section headers
 */
export const headlineVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    letterSpacing: "-0.03em",
  },
  visible: {
    opacity: 1,
    y: 0,
    letterSpacing: "0em",
    transition: { duration: 1, ease: "easeOut" },
  },
};

/**
 * Slide in from left
 * Use for: Navigation, sidebars
 */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

/**
 * Slide in from right
 * Use for: Side panels, secondary content
 */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

/**
 * Blur reveal
 * Use for: Image galleries, media content
 */
export const blurReveal: Variants = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

/**
 * Rotate in
 * Use for: Icons, badges, micro-interactions
 */
export const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -10, scale: 0.9 },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/**
 * Expanding line
 * Use for: Dividers, progress indicators
 */
export const expandLine: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1, ease: "easeOut" },
  },
};

/**
 * Draw SVG path
 * Use for: Icons, illustrations
 */
export const drawPath: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.5, ease: "easeInOut" },
  },
};

/**
 * Pulse glow effect
 * Use for: Active states, attention grabbers
 */
export const pulseGlow: Variants = {
  hidden: { opacity: 0.5, scale: 1 },
  visible: {
    opacity: [0.5, 1, 0.5],
    scale: [1, 1.02, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

/**
 * Viewport animation defaults
 * Apply to motion elements for scroll-triggered animations
 */
export const viewportDefaults = {
  once: true,
  amount: 0.3,
  margin: "-100px",
};

/**
 * Transition presets
 */
export const transitions = {
  smooth: { duration: 0.8, ease: "easeOut" },
  snappy: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  slow: { duration: 1.2, ease: "easeOut" },
  spring: { type: "spring", stiffness: 100, damping: 15 },
  bounce: { type: "spring", stiffness: 300, damping: 20 },
};

/**
 * Easing curves
 */
export const easings = {
  easeOut: [0.4, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
  easeInOut: [0.4, 0, 0.2, 1],
  sharp: [0.4, 0, 0.6, 1],
  smooth: [0.25, 0.1, 0.25, 1],
};
