"use client";

import { useEffect, useRef, useState } from "react";

interface ParticleHaloProps {
  /**
   * Number of particles to render
   * @default 40
   */
  particleCount?: number;
  /**
   * Maximum speed of particle drift
   * @default 0.05
   */
  maxSpeed?: number;
  /**
   * Distance at which to draw connection lines
   * @default 100
   */
  connectionDistance?: number;
  /**
   * Particle color (rgba)
   * @default "rgba(0,255,194,0.12)"
   */
  color?: string;
  /**
   * Shadow blur amount
   * @default 8
   */
  shadowBlur?: number;
  /**
   * Idle timeout in seconds before pausing animation
   * @default 15
   */
  idleTimeout?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

/**
 * PARTICLE HALO SYSTEM
 * Ambient mint particle field with connection lines
 * Auto-pauses after idle period for performance
 * GPU-accelerated canvas rendering
 */
export function ParticleHalo({
  particleCount = 40,
  maxSpeed = 0.05,
  connectionDistance = 100,
  color = "rgba(0,255,194,0.12)",
  shadowBlur = 8,
  idleTimeout = 15,
}: ParticleHaloProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const [isIdle, setIsIdle] = useState(false);
  const idleTimerRef = useRef<NodeJS.Timeout>();
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setShouldRender(!mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setShouldRender(!e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    // Disable on mobile for performance
    const isMobile = window.innerWidth < 768;
    if (isMobile || !shouldRender) {
      setShouldRender(false);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: true,
      desynchronized: true, // GPU optimization
    });
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * maxSpeed,
        vy: (Math.random() - 0.5) * maxSpeed,
        radius: Math.random() * 1.5 + 0.5,
      }));
    };
    initParticles();

    // Reset idle timer on user activity
    const resetIdleTimer = () => {
      setIsIdle(false);
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      idleTimerRef.current = setTimeout(() => {
        setIsIdle(true);
      }, idleTimeout * 1000);
    };

    // Listen for user activity
    const events = ["mousemove", "mousedown", "keydown", "scroll", "touchstart"];
    events.forEach((event) => {
      window.addEventListener(event, resetIdleTimer);
    });
    resetIdleTimer(); // Start timer

    // Animation loop
    const animate = () => {
      if (isIdle) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowBlur = shadowBlur;
        ctx.shadowColor = color;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.3;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = color.replace(/[\d.]+\)$/g, `${opacity})`);
            ctx.lineWidth = 0.5;
            ctx.shadowBlur = 0;
            ctx.stroke();
          }
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      events.forEach((event) => {
        window.removeEventListener(event, resetIdleTimer);
      });
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [
    particleCount,
    maxSpeed,
    connectionDistance,
    color,
    shadowBlur,
    idleTimeout,
    isIdle,
    shouldRender,
  ]);

  if (!shouldRender) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        mixBlendMode: "screen",
        opacity: isIdle ? 0.5 : 1,
        transition: "opacity 2s ease-out",
      }}
      aria-hidden="true"
    />
  );
}

/**
 * MINIMAL PARTICLE FIELD
 * Lighter version with fewer particles for subtle backgrounds
 */
export function MinimalParticleField() {
  return (
    <ParticleHalo
      particleCount={20}
      maxSpeed={0.03}
      connectionDistance={80}
      color="rgba(0,255,194,0.08)"
      shadowBlur={6}
    />
  );
}

/**
 * DENSE PARTICLE HALO
 * More particles and connections for hero sections
 */
export function DenseParticleHalo() {
  return (
    <ParticleHalo
      particleCount={60}
      maxSpeed={0.07}
      connectionDistance={120}
      color="rgba(0,255,194,0.15)"
      shadowBlur={10}
    />
  );
}
