/**
 * 3VEREST PERFORMANCE OPTIMIZATION HOOKS
 * Utilities for managing animations, idle states, and performance
 */

import { useEffect, useState, useCallback, useRef } from "react";

/**
 * USE IDLE DETECTION
 * Detects user inactivity and pauses heavy animations
 *
 * @param timeout - Idle timeout in milliseconds (default: 15000)
 * @returns isIdle - Boolean indicating if user is idle
 */
export function useIdleDetection(timeout: number = 15000): boolean {
  const [isIdle, setIsIdle] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const resetIdleTimer = useCallback(() => {
    setIsIdle(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsIdle(true);
    }, timeout);
  }, [timeout]);

  useEffect(() => {
    const events = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
      "wheel",
    ];

    events.forEach((event) => {
      window.addEventListener(event, resetIdleTimer);
    });

    resetIdleTimer(); // Initialize timer

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetIdleTimer);
      });
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [resetIdleTimer]);

  return isIdle;
}

/**
 * USE REDUCED MOTION
 * Checks user's motion preference
 *
 * @returns shouldReduceMotion - Boolean indicating if motion should be reduced
 */
export function useReducedMotion(): boolean {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setShouldReduceMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setShouldReduceMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return shouldReduceMotion;
}

/**
 * USE MOBILE DETECTION
 * Detects if user is on mobile device
 *
 * @returns isMobile - Boolean indicating if device is mobile
 */
export function useMobileDetection(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  return isMobile;
}

/**
 * USE GPU ACCELERATION CHECK
 * Detects if GPU acceleration is available
 *
 * @returns hasGPU - Boolean indicating if GPU acceleration is available
 */
export function useGPUAcceleration(): boolean {
  const [hasGPU, setHasGPU] = useState(true);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    if (!gl) {
      setHasGPU(false);
      console.warn("GPU acceleration not available");
    }
  }, []);

  return hasGPU;
}

/**
 * USE INTERSECTION OBSERVER
 * Lazy load and trigger animations when element enters viewport
 *
 * @param options - IntersectionObserver options
 * @returns [ref, isInView] - Ref to attach to element and visibility state
 */
export function useIntersectionObserver(
  options: IntersectionObserverInit = {}
): [React.RefObject<HTMLElement | null>, boolean] {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return [ref, isInView];
}

/**
 * USE PERFORMANCE MONITOR
 * Monitors FPS and adjusts animation quality
 *
 * @returns performanceLevel - "high" | "medium" | "low"
 */
export function usePerformanceMonitor(): "high" | "medium" | "low" {
  const [performanceLevel, setPerformanceLevel] = useState<
    "high" | "medium" | "low"
  >("high");
  const frameTimesRef = useRef<number[]>([]);
  const lastFrameTimeRef = useRef<number>(performance.now());

  useEffect(() => {
    let animationFrameId: number;

    const checkPerformance = () => {
      const now = performance.now();
      const frameDuration = now - lastFrameTimeRef.current;
      lastFrameTimeRef.current = now;

      frameTimesRef.current.push(frameDuration);

      // Keep only last 60 frames
      if (frameTimesRef.current.length > 60) {
        frameTimesRef.current.shift();
      }

      // Calculate average FPS
      if (frameTimesRef.current.length === 60) {
        const avgFrameTime =
          frameTimesRef.current.reduce((a, b) => a + b, 0) /
          frameTimesRef.current.length;
        const fps = 1000 / avgFrameTime;

        if (fps >= 50) {
          setPerformanceLevel("high");
        } else if (fps >= 30) {
          setPerformanceLevel("medium");
        } else {
          setPerformanceLevel("low");
        }
      }

      animationFrameId = requestAnimationFrame(checkPerformance);
    };

    animationFrameId = requestAnimationFrame(checkPerformance);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return performanceLevel;
}

/**
 * USE BATTERY STATUS
 * Reduces animations when battery is low
 *
 * @returns { level, charging, shouldReduceEffects }
 */
export function useBatteryStatus(): {
  level: number;
  charging: boolean;
  shouldReduceEffects: boolean;
} {
  const [status, setStatus] = useState({
    level: 1,
    charging: true,
    shouldReduceEffects: false,
  });

  useEffect(() => {
    if ("getBattery" in navigator) {
      interface BatteryManager {
        level: number;
        charging: boolean;
        addEventListener: (event: string, callback: () => void) => void;
        removeEventListener: (event: string, callback: () => void) => void;
      }

      interface NavigatorWithBattery extends Navigator {
        getBattery: () => Promise<BatteryManager>;
      }

      (navigator as NavigatorWithBattery).getBattery().then((battery: BatteryManager) => {
        const updateBatteryStatus = () => {
          const level = battery.level;
          const charging = battery.charging;
          const shouldReduceEffects = level < 0.2 && !charging;

          setStatus({ level, charging, shouldReduceEffects });
        };

        updateBatteryStatus();
        battery.addEventListener("levelchange", updateBatteryStatus);
        battery.addEventListener("chargingchange", updateBatteryStatus);

        return () => {
          battery.removeEventListener("levelchange", updateBatteryStatus);
          battery.removeEventListener("chargingchange", updateBatteryStatus);
        };
      });
    }
  }, []);

  return status;
}

/**
 * USE DEBOUNCE
 * Debounces a value
 *
 * @param value - Value to debounce
 * @param delay - Delay in milliseconds
 * @returns debouncedValue
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * USE THROTTLE
 * Throttles a callback function
 *
 * @param callback - Function to throttle
 * @param delay - Delay in milliseconds
 * @returns throttledCallback
 */
export function useThrottle<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number
): T {
  const lastRan = useRef(Date.now());

  return useCallback(
    ((...args: unknown[]) => {
      if (Date.now() - lastRan.current >= delay) {
        callback(...args as Parameters<T>);
        lastRan.current = Date.now();
      }
    }) as T,
    [callback, delay]
  );
}

/**
 * USE ADAPTIVE QUALITY
 * Combines all performance hooks to provide adaptive quality settings
 *
 * @returns qualitySettings - Object with performance-aware settings
 */
export function useAdaptiveQuality() {
  const isIdle = useIdleDetection();
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useMobileDetection();
  const hasGPU = useGPUAcceleration();
  const performanceLevel = usePerformanceMonitor();
  const { shouldReduceEffects: lowBattery } = useBatteryStatus();

  const enableParticles =
    !isMobile &&
    !shouldReduceMotion &&
    !lowBattery &&
    performanceLevel !== "low";

  const enableAmbientLight =
    !shouldReduceMotion && !lowBattery && performanceLevel !== "low";

  const enableRipples = !shouldReduceMotion && performanceLevel !== "low";

  const animationDuration =
    performanceLevel === "low"
      ? 0.4
      : performanceLevel === "medium"
      ? 0.6
      : 0.8;

  const particleCount =
    performanceLevel === "high" ? 40 : performanceLevel === "medium" ? 20 : 0;

  return {
    isIdle,
    shouldReduceMotion,
    isMobile,
    hasGPU,
    performanceLevel,
    lowBattery,
    enableParticles,
    enableAmbientLight,
    enableRipples,
    animationDuration,
    particleCount,
  };
}

/**
 * PERFORMANCE LOGGER
 * Logs performance metrics for debugging
 */
export function usePerformanceLogger(componentName: string) {
  useEffect(() => {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;

      if (duration > 16.67) {
        // More than 1 frame at 60fps
        console.warn(
          `[Performance] ${componentName} took ${duration.toFixed(2)}ms to render`
        );
      }
    };
  }, [componentName]);
}
