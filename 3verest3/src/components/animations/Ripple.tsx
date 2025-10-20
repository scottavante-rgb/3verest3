"use client";

import { useEffect, useRef, useState } from "react";

interface RippleEffect {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

interface RippleProviderProps {
  children: React.ReactNode;
  /**
   * Color of the ripple effect
   * @default "rgba(0,255,194,0.15)"
   */
  color?: string;
  /**
   * Duration of the ripple animation in ms
   * @default 1000
   */
  duration?: number;
  /**
   * Size of the ripple in pixels
   * @default 100
   */
  size?: number;
  /**
   * Enable ripple effects
   * @default true
   */
  enabled?: boolean;
}

/**
 * RIPPLE PROVIDER
 * Global mint ripple effects on clicks
 * Wrap your app or specific sections with this provider
 */
export function RippleProvider({
  children,
  color = "rgba(0,255,194,0.15)",
  duration = 1000,
  size = 100,
  enabled = true,
}: RippleProviderProps) {
  const [ripples, setRipples] = useState<RippleEffect[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const rippleIdRef = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const handleClick = (e: MouseEvent) => {
      const id = rippleIdRef.current++;
      const ripple: RippleEffect = {
        id,
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now(),
      };

      setRipples((prev) => [...prev, ripple]);

      // Remove ripple after animation completes
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, duration);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [enabled, duration]);

  return (
    <div ref={containerRef} className="relative">
      {children}
      <div className="fixed inset-0 pointer-events-none z-[9999]">
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="ripple"
            style={{
              left: `${ripple.x}px`,
              top: `${ripple.y}px`,
              width: `${size}px`,
              height: `${size}px`,
              background: color,
              marginLeft: `-${size / 2}px`,
              marginTop: `-${size / 2}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

interface UseRippleOptions {
  color?: string;
  duration?: number;
  size?: number;
}

/**
 * USE RIPPLE HOOK
 * Add ripple effects to specific elements
 *
 * @example
 * const rippleProps = useRipple({ color: "rgba(0,255,194,0.2)" });
 * <button {...rippleProps}>Click me</button>
 */
export function useRipple({
  color = "rgba(0,255,194,0.15)",
  duration = 800,
  size = 100,
}: UseRippleOptions = {}) {
  const [ripples, setRipples] = useState<RippleEffect[]>([]);
  const rippleIdRef = useRef(0);

  const createRipple = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = rippleIdRef.current++;

    const ripple: RippleEffect = {
      id,
      x,
      y,
      timestamp: Date.now(),
    };

    setRipples((prev) => [...prev, ripple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, duration);
  };

  const rippleElements = ripples.map((ripple) => (
    <span
      key={ripple.id}
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${ripple.x}px`,
        top: `${ripple.y}px`,
        width: `${size}px`,
        height: `${size}px`,
        background: color,
        marginLeft: `-${size / 2}px`,
        marginTop: `-${size / 2}px`,
        transform: "scale(0)",
        animation: `rippleAnim ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`,
      }}
    />
  ));

  return {
    onClick: createRipple,
    rippleElements,
    style: { position: "relative" as const, overflow: "hidden" as const },
  };
}

interface RippleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  rippleColor?: string;
  rippleDuration?: number;
  rippleSize?: number;
}

/**
 * RIPPLE BUTTON
 * Pre-built button component with ripple effect
 */
export function RippleButton({
  children,
  rippleColor = "rgba(0,255,194,0.2)",
  rippleDuration = 600,
  rippleSize = 100,
  className = "",
  ...props
}: RippleButtonProps) {
  const { onClick, rippleElements, style } = useRipple({
    color: rippleColor,
    duration: rippleDuration,
    size: rippleSize,
  });

  return (
    <button
      {...props}
      onClick={(e) => {
        onClick(e);
        props.onClick?.(e);
      }}
      style={{ ...style, ...props.style }}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
      {rippleElements}
    </button>
  );
}

interface WaveRippleProps {
  x: number;
  y: number;
  color?: string;
  delay?: number;
}

/**
 * WAVE RIPPLE
 * Multiple concentric ripple waves
 * Use for special interactions or brand moments
 */
export function WaveRipple({
  x,
  y,
  color = "rgba(0,255,194,0.15)",
  delay = 0,
}: WaveRippleProps) {
  return (
    <>
      {[0, 150, 300].map((waveDelay) => (
        <div
          key={waveDelay}
          className="ripple"
          style={{
            left: `${x}px`,
            top: `${y}px`,
            background: color,
            animationDelay: `${delay + waveDelay}ms`,
          }}
        />
      ))}
    </>
  );
}

/**
 * CLICK RIPPLE EFFECT
 * Standalone function to create a single ripple
 * Use for programmatic ripple creation
 */
export function createClickRipple(
  x: number,
  y: number,
  options?: {
    color?: string;
    duration?: number;
    size?: number;
  }
) {
  const {
    color = "rgba(0,255,194,0.15)",
    duration = 1000,
    size = 100,
  } = options || {};

  const ripple = document.createElement("div");
  ripple.className = "ripple";
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  ripple.style.width = `${size}px`;
  ripple.style.height = `${size}px`;
  ripple.style.background = color;
  ripple.style.marginLeft = `-${size / 2}px`;
  ripple.style.marginTop = `-${size / 2}px`;

  document.body.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, duration);
}
