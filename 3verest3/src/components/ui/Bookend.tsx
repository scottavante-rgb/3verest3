"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface BookendProps {
  /**
   * The manifesto line to display
   */
  text: string;
  /**
   * Position of the bookend
   * @default "top"
   */
  position?: "top" | "bottom" | "left" | "right";
  /**
   * Delay before animation starts (in seconds)
   * @default 0
   */
  delay?: number;
  /**
   * Custom className
   */
  className?: string;
}

/**
 * BOOKEND
 * Micro-manifesto lines that appear on scroll
 * Use at section breaks and major transitions
 */
export function Bookend({
  text,
  position = "top",
  delay = 0,
  className = "",
}: BookendProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsInView(true), delay * 1000);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const positionClasses = {
    top: "justify-start items-start",
    bottom: "justify-end items-end",
    left: "justify-start items-start",
    right: "justify-end items-end",
  };

  return (
    <div
      ref={ref}
      className={`flex ${positionClasses[position]} w-full ${className}`}
    >
      <div
        className={`manifesto-line ${isInView ? "in-view" : ""}`}
        style={{
          transitionDelay: `${delay}s`,
        }}
      >
        {text}
      </div>
    </div>
  );
}

/**
 * MANIFESTO SECTION
 * Collection of manifesto lines with staggered reveal
 */
export function ManifestoSection({
  lines,
  className = "",
}: {
  lines: string[];
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={`space-y-4 ${className}`}
    >
      {lines.map((line, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 1,
                delay: index * 0.2,
                ease: "easeOut",
              },
            },
          }}
          className="manifesto-line in-view"
        >
          {line}
        </motion.div>
      ))}
    </motion.div>
  );
}

/**
 * DIVIDER WITH MANIFESTO
 * Section divider with centered manifesto line
 */
export function ManifestoDivider({
  text,
  showLine = true,
}: {
  text: string;
  showLine?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5 }}
      className="relative flex items-center justify-center py-12 md:py-20"
    >
      {showLine && (
        <>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00FFC2]/30 to-transparent"
          />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00FFC2]/10 to-transparent blur-sm"
          />
        </>
      )}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative px-8 bg-[var(--color-dark-bg)] dark:bg-[var(--color-dark-bg)] z-10"
      >
        <span className="manifesto-line in-view">{text}</span>
      </motion.div>
    </motion.div>
  );
}

/**
 * HERO BOOKEND
 * Large manifesto statement for hero sections
 */
export function HeroBookend({
  text,
  subtext,
  className = "",
}: {
  text: string;
  subtext?: string;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={`text-center space-y-4 ${className}`}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1.2, ease: "easeOut" },
          },
        }}
        className="text-sm md:text-base tracking-[0.3em] uppercase text-[#00FFC2]/70 font-light"
      >
        {text}
      </motion.div>
      {subtext && (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1.2, delay: 0.2, ease: "easeOut" },
            },
          }}
          className="text-xs tracking-[0.2em] uppercase text-[#00FFC2]/40"
        >
          {subtext}
        </motion.div>
      )}
    </motion.div>
  );
}

/**
 * SIDE BOOKEND
 * Vertical manifesto line for sidebars
 */
export function SideBookend({
  text,
  side = "left",
}: {
  text: string;
  side?: "left" | "right";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className={`absolute top-1/2 -translate-y-1/2 ${
        side === "left" ? "left-0 -rotate-90" : "right-0 rotate-90"
      } origin-center`}
    >
      <span className="manifesto-line in-view whitespace-nowrap">{text}</span>
    </motion.div>
  );
}

/**
 * PRE-DEFINED MANIFESTO LINES
 * Curated collection of 3verest manifesto statements
 */
export const MANIFESTO_LINES = {
  sovereignty: "Every byte has intent.",
  purpose: "Sovereign by design. Human by purpose.",
  impact: "Quiet systems. Loud impact.",
  trust: "Built on trust. Proven by action.",
  intelligence: "Intelligent infrastructure. Sovereign choice.",
  future: "The future is sovereign.",
  privacy: "Privacy is not a feature. It's a foundation.",
  healthcare: "Healthcare data deserves sovereignty.",
  innovation: "Innovation with intention.",
  security: "Security through transparency.",
  global: "Global reach. Local sovereignty.",
  performance: "Performance meets principle.",
};

/**
 * RANDOM MANIFESTO
 * Display a random manifesto line
 */
export function RandomManifesto({ className = "" }: { className?: string }) {
  const lines = Object.values(MANIFESTO_LINES);
  const randomLine = lines[Math.floor(Math.random() * lines.length)];

  return <Bookend text={randomLine} className={className} />;
}
