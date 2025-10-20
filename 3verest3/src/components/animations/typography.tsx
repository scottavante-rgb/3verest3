"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { headlineVariant } from "./motion";

interface KineticHeadlineProps {
  children: React.ReactNode;
  className?: string;
  minWeight?: number;
  maxWeight?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

/**
 * KINETIC HEADLINE
 * Typography that adjusts font weight based on scroll position
 * Use for hero headlines and major section titles
 */
export function KineticHeadline({
  children,
  className = "",
  minWeight = 400,
  maxWeight = 700,
  as = "h1",
}: KineticHeadlineProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const fontWeight = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [minWeight, maxWeight, minWeight]
  );

  const Component = motion[as] as React.ElementType;

  return (
    <Component
      ref={ref}
      variants={headlineVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      style={{
        fontVariationSettings: fontWeight.get()
          ? `"wght" ${fontWeight.get()}`
          : undefined,
      }}
      className={`kinetic-headline ${className}`}
    >
      {children}
    </Component>
  );
}

interface HighlightTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * HIGHLIGHT TEXT
 * Text with animated mint underline that reveals on scroll
 * Use for emphasis and key phrases
 */
export function HighlightText({
  children,
  className = "",
  delay = 0,
}: HighlightTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsInView(true), delay);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <span
      ref={ref}
      className={`highlight ${isInView ? "in-view" : ""} ${className}`}
    >
      {children}
    </span>
  );
}

interface AnimatedTextProps {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

/**
 * ANIMATED TEXT
 * Stagger animation for individual characters
 * Use sparingly for hero moments
 */
export function AnimatedText({
  children,
  className = "",
  delay = 0,
  staggerDelay = 0.03,
}: AnimatedTextProps) {
  const letters = children.split("");

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{
        delayChildren: delay,
        staggerChildren: staggerDelay,
      }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          style={{ display: "inline-block" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
}

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  from?: string;
  to?: string;
}

/**
 * GRADIENT TEXT
 * Text with mint gradient fill
 * Use for brand moments and CTAs
 */
export function GradientText({
  children,
  className = "",
  from = "#00FFC2",
  to = "#00D4FF",
}: GradientTextProps) {
  return (
    <span
      className={`gradient-text-mint ${className}`}
      style={{
        background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {children}
    </span>
  );
}

interface RevealTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * REVEAL TEXT
 * Text that fades and slides up on scroll
 * Use for body copy and descriptions
 */
export function RevealText({
  children,
  className = "",
  delay = 0,
}: RevealTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
}

/**
 * TYPEWRITER TEXT
 * Text that types out character by character
 * Use for loading states or special reveals
 */
export function TypewriterText({
  text,
  className = "",
  speed = 50,
  delay = 0,
  cursor = true,
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(cursor);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayText((prev) => prev + text[index]);
          index++;
        } else {
          clearInterval(interval);
          if (cursor) {
            setTimeout(() => setShowCursor(false), 500);
          }
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay, cursor]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block ml-0.5"
        >
          |
        </motion.span>
      )}
    </span>
  );
}

interface ScrollScaleTextProps {
  children: React.ReactNode;
  className?: string;
  minScale?: number;
  maxScale?: number;
}

/**
 * SCROLL SCALE TEXT
 * Text that scales based on scroll position
 * Use for sticky hero text
 */
export function ScrollScaleText({
  children,
  className = "",
  minScale = 0.8,
  maxScale = 1,
}: ScrollScaleTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [minScale, maxScale, minScale]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
