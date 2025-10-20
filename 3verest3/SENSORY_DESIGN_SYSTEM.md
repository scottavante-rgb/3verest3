# 3VEREST SENSORY DESIGN LAYER SYSTEM

A comprehensive cinematic design system built with Framer Motion, Canvas, and TailwindCSS for creating premium, sovereign digital experiences.

## 🎯 Overview

The Sensory Design Layer transforms the 3verest website into a premium, cinematic, and sensorial digital experience. It consists of six coordinated systems that give the brand depth, light, and presence.

## 📦 Components

### 1. Ambient Light Field (`/components/ui/AmbientLight.tsx`)

Adds depth and motion to dark pages with drifting mint gradients.

```tsx
import { AmbientLight, DualAmbientLight, RadialPulseLight } from '@/components/ui/AmbientLight';

// Single drifting light
<AmbientLight
  intensity={0.4}
  duration={60}
  color="#00FFC2"
  position="30% 40%"
/>

// Two light sources
<DualAmbientLight />

// Pulsing stationary light
<RadialPulseLight position="50% 50%" />
```

**Features:**
- GPU-accelerated background gradients
- Respects `prefers-reduced-motion`
- Customizable color, intensity, position
- Multiple variants for different use cases

---

### 2. Particle Halo System (`/components/effects/ParticleHalo.tsx`)

Ambient mint particle field with connection lines.

```tsx
import { ParticleHalo, MinimalParticleField, DenseParticleHalo } from '@/components/effects/ParticleHalo';

// Standard particle field
<ParticleHalo
  particleCount={40}
  maxSpeed={0.05}
  connectionDistance={100}
/>

// Minimal version (20 particles)
<MinimalParticleField />

// Dense version (60 particles)
<DenseParticleHalo />
```

**Features:**
- Canvas-based rendering
- Auto-pauses after 15s idle
- Disabled on mobile for performance
- GPU-optimized with `desynchronized` context

---

### 3. Reactive Surfaces (CSS in `globals.css`)

Glass panels that respond to cursor and hover.

```tsx
// Basic glass panel
<div className="glass-panel">
  Content
</div>

// Light theme variant
<div className="glass-panel-light">
  Content
</div>

// With cursor tracking (add JS)
<div
  className="glass-panel"
  onMouseMove={(e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.background =
      `radial-gradient(circle at ${x}px ${y}px, rgba(0,255,194,0.05), rgba(255,255,255,0.02) 80%)`;
  }}
>
  Content
</div>
```

**CSS Classes:**
- `.glass-panel` - Dark theme glass surface
- `.glass-panel-light` - Light theme glass surface
- `.ambient-glow` - Subtle mint glow
- `.shine` - Hover shine effect
- `.gradient-text-mint` - Mint gradient text

---

### 4. Typography Intelligence (`/components/animations/typography.tsx`)

Kinetic text components with scroll-based animations.

```tsx
import {
  KineticHeadline,
  HighlightText,
  AnimatedText,
  GradientText,
  RevealText,
  TypewriterText,
  ScrollScaleText
} from '@/components/animations/typography';

// Font weight changes on scroll
<KineticHeadline as="h1" minWeight={400} maxWeight={700}>
  Sovereign Cloud. Reinvented.
</KineticHeadline>

// Mint underline reveal
<p>
  This is <HighlightText>important</HighlightText> text.
</p>

// Character-by-character animation
<AnimatedText staggerDelay={0.03}>
  3VEREST
</AnimatedText>

// Gradient fill
<GradientText from="#00FFC2" to="#00D4FF">
  Intelligent Infrastructure
</GradientText>

// Fade up on scroll
<RevealText delay={0.2}>
  <p>Body copy that reveals...</p>
</RevealText>

// Typewriter effect
<TypewriterText
  text="Building sovereign systems..."
  speed={50}
  cursor={true}
/>

// Scales based on scroll
<ScrollScaleText minScale={0.8} maxScale={1}>
  Sticky hero text
</ScrollScaleText>
```

**CSS Classes:**
- `.highlight` - Mint underline animation
- `.kinetic-headline` - Font weight variation
- `.gradient-text-mint` - Gradient text fill

---

### 5. Brand Signals

#### Micro-Manifesto Lines (`/components/ui/Bookend.tsx`)

```tsx
import {
  Bookend,
  ManifestoSection,
  ManifestoDivider,
  HeroBookend,
  SideBookend,
  MANIFESTO_LINES,
  RandomManifesto
} from '@/components/ui/Bookend';

// Single line
<Bookend text="Every byte has intent." position="top" delay={0.2} />

// Multiple lines with stagger
<ManifestoSection
  lines={[
    "Sovereign by design.",
    "Human by purpose.",
    "Quiet systems. Loud impact."
  ]}
/>

// Section divider
<ManifestoDivider text="The future is sovereign." />

// Hero section
<HeroBookend
  text="INTELLIGENT INFRASTRUCTURE"
  subtext="Sovereign by Design"
/>

// Vertical sidebar
<SideBookend text="Innovation with Intention" side="left" />

// Random manifesto
<RandomManifesto />

// Use predefined lines
<Bookend text={MANIFESTO_LINES.sovereignty} />
```

#### World Map Signature (`/components/ui/WorldSignature.tsx`)

```tsx
import {
  WorldSignature,
  MinimalWorldSignature,
  NetworkPulseSignature
} from '@/components/ui/WorldSignature';

// Full world signature
<WorldSignature
  color="#00FFC2"
  opacity={0.2}
  duration={8}
  animate={true}
/>

// Minimal version
<MinimalWorldSignature />

// Network visualization
<NetworkPulseSignature />
```

#### Mint Ripple Effects (`/components/animations/Ripple.tsx`)

```tsx
import {
  RippleProvider,
  useRipple,
  RippleButton,
  createClickRipple
} from '@/components/animations/Ripple';

// Global ripple provider (wrap app)
<RippleProvider color="rgba(0,255,194,0.15)" duration={1000}>
  <App />
</RippleProvider>

// Use hook for specific elements
const MyComponent = () => {
  const rippleProps = useRipple({ color: "rgba(0,255,194,0.2)" });

  return (
    <button {...rippleProps}>
      Click me
      {rippleProps.rippleElements}
    </button>
  );
};

// Pre-built button
<RippleButton rippleColor="rgba(0,255,194,0.2)">
  Click me
</RippleButton>

// Programmatic ripple
onClick={(e) => {
  createClickRipple(e.clientX, e.clientY, {
    color: "rgba(0,255,194,0.2)",
    duration: 1000,
  });
}}
```

---

### 6. Motion Utilities (`/components/animations/motion.ts`)

Reusable Framer Motion animation presets.

```tsx
import {
  fadeUp,
  fadeIn,
  scaleIn,
  staggerChildren,
  parallaxY,
  fadeThroughMint,
  headlineVariant,
  slideInLeft,
  slideInRight,
  blurReveal,
  rotateIn,
  expandLine,
  drawPath,
  pulseGlow,
  viewportDefaults,
  transitions,
  easings
} from '@/components/animations/motion';

// Fade up animation
<motion.div variants={fadeUp} initial="hidden" whileInView="visible">
  Content
</motion.div>

// Stagger children
<motion.section variants={staggerChildren} initial="hidden" whileInView="visible">
  <motion.div variants={fadeUp}>Item 1</motion.div>
  <motion.div variants={fadeUp}>Item 2</motion.div>
  <motion.div variants={fadeUp}>Item 3</motion.div>
</motion.section>

// Parallax
<motion.div variants={parallaxY(50)} initial="hidden" whileInView="visible">
  Parallax content
</motion.div>

// Custom transition
<motion.div
  animate={{ opacity: 1 }}
  transition={transitions.spring}
>
  Content
</motion.div>

// Custom easing
<motion.div
  animate={{ x: 100 }}
  transition={{ duration: 0.8, ease: easings.smooth }}
>
  Content
</motion.div>
```

---

## 🎨 CSS Utilities

### Glass Effects
- `.glass-panel` - Reactive glass surface (dark)
- `.glass-panel-light` - Reactive glass surface (light)
- `.glass-effect` - Static glass background
- `.glass-nav` - Navigation glass effect

### Typography
- `.highlight` - Mint underline animation
- `.highlight.in-view` - Triggered state
- `.kinetic-headline` - Font weight variation
- `.gradient-text-mint` - Gradient text
- `.manifesto-line` - Micro-manifesto styling
- `.manifesto-line.in-view` - Triggered state

### Effects
- `.ripple` - Ripple animation
- `.ambient-glow` - Mint glow effect
- `.shine` - Shine on hover
- `.gpu-accelerated` - GPU hints

### Performance
- `.will-animate` - will-change optimization
- Respects `@media (prefers-reduced-motion: reduce)`

---

## 🚀 Performance Hooks (`/hooks/usePerformance.ts`)

```tsx
import {
  useIdleDetection,
  useReducedMotion,
  useMobileDetection,
  useGPUAcceleration,
  useIntersectionObserver,
  usePerformanceMonitor,
  useBatteryStatus,
  useDebounce,
  useThrottle,
  useAdaptiveQuality,
  usePerformanceLogger
} from '@/hooks/usePerformance';

// Detect idle state
const isIdle = useIdleDetection(15000); // 15 seconds

// Check motion preference
const shouldReduceMotion = useReducedMotion();

// Mobile detection
const isMobile = useMobileDetection(768);

// GPU check
const hasGPU = useGPUAcceleration();

// Intersection observer
const [ref, isInView] = useIntersectionObserver({ threshold: 0.3 });

// Monitor FPS
const performanceLevel = usePerformanceMonitor(); // "high" | "medium" | "low"

// Battery status
const { level, charging, shouldReduceEffects } = useBatteryStatus();

// Adaptive quality (combines all hooks)
const quality = useAdaptiveQuality();
// Returns: {
//   isIdle, shouldReduceMotion, isMobile, hasGPU,
//   performanceLevel, lowBattery,
//   enableParticles, enableAmbientLight, enableRipples,
//   animationDuration, particleCount
// }

// Performance logging
usePerformanceLogger("MyComponent");
```

---

## 🎯 Design Tokens (CSS Variables)

```css
/* Colors */
--color-mint: #00FFC2;
--color-mint-dark: #00D4A0;
--color-mint-light: #66FFD9;
--color-cyan: #00D4FF;
--color-dark-bg: #0A0F14;
--color-dark-bg-alt: #0D1117;
--color-light-bg: #F9FFFC;
--color-light-bg-alt: #F5FAF8;

/* Durations */
--duration-fast: 300ms;
--duration-normal: 500ms;
--duration-slow: 700ms;
--duration-slower: 1000ms;

/* Easing */
--ease-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);

/* Glass Effects */
--glass-opacity: 0.04;
--glass-border: rgba(255, 255, 255, 0.1);
--glass-blur: 24px;

/* Glows */
--glow-mint: 0 0 60px rgba(0, 255, 194, 0.1);
--glow-mint-strong: 0 0 80px rgba(0, 255, 194, 0.2);
--glow-mint-subtle: 0 0 40px rgba(0, 255, 194, 0.05);
```

---

## 📁 File Structure

```
/components
  /ui
    AmbientLight.tsx          # Ambient light gradients
    WorldSignature.tsx        # Footer world map
    Bookend.tsx              # Micro-manifesto lines
    theme-transition-wrapper.tsx  # Theme transitions
    sensory-index.ts         # UI exports
  /effects
    ParticleHalo.tsx         # Canvas particle system
    index.ts                 # Effects exports
  /animations
    motion.ts                # Motion presets
    typography.tsx           # Typography components
    Ripple.tsx              # Ripple effects
    index.ts                # Animation exports
/hooks
  usePerformance.ts          # Performance utilities
/app
  globals.css               # Sensory design CSS
```

---

## 🎬 Usage Examples

### Dark Page with Full Sensory Layer

```tsx
import { AmbientLight } from '@/components/ui/AmbientLight';
import { ParticleHalo } from '@/components/effects/ParticleHalo';
import { KineticHeadline, HighlightText } from '@/components/animations/typography';
import { Bookend } from '@/components/ui/Bookend';

export default function SovereigntyPage() {
  return (
    <div className="relative min-h-screen bg-[var(--color-dark-bg)]">
      {/* Ambient layer */}
      <AmbientLight intensity={0.4} position="30% 40%" />
      <ParticleHalo particleCount={40} />

      {/* Content */}
      <main className="relative z-10">
        <Bookend text="Every byte has intent." position="top" />

        <KineticHeadline as="h1" className="text-6xl">
          <HighlightText>Sovereign</HighlightText> Infrastructure
        </KineticHeadline>

        <div className="glass-panel p-8 mt-12">
          Content here
        </div>
      </main>
    </div>
  );
}
```

### Light Page with Subtle Effects

```tsx
import { RevealText, GradientText } from '@/components/animations/typography';
import { ManifestoDivider } from '@/components/ui/Bookend';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--color-light-bg)]">
      <main>
        <RevealText>
          <h1 className="text-5xl font-bold">
            About <GradientText>3verest</GradientText>
          </h1>
        </RevealText>

        <div className="glass-panel-light p-8 mt-8">
          Content
        </div>

        <ManifestoDivider text="Sovereign by design. Human by purpose." />
      </main>
    </div>
  );
}
```

### Footer with World Signature

```tsx
import { WorldSignature } from '@/components/ui/WorldSignature';
import { ManifestoSection, MANIFESTO_LINES } from '@/components/ui/Bookend';

export function Footer() {
  return (
    <footer className="py-20 bg-[var(--color-dark-bg)]">
      <ManifestoSection
        lines={[
          MANIFESTO_LINES.sovereignty,
          MANIFESTO_LINES.purpose,
          MANIFESTO_LINES.impact
        ]}
      />

      <WorldSignature className="mt-12" />
    </footer>
  );
}
```

---

## ⚡ Performance Guidelines

1. **Particles**: Disabled on mobile automatically
2. **Idle State**: Heavy animations pause after 15s
3. **GPU Acceleration**: All transforms use `translate3d`
4. **Reduced Motion**: Respects user preferences
5. **Battery**: Reduces effects when battery < 20%
6. **FPS Monitoring**: Adapts quality based on performance

### Performance Budget
- **Target**: CPU usage < 5% for all animations
- **Particle limit**: 40 on desktop, 0 on mobile
- **Idle timeout**: 15 seconds
- **Frame rate**: 60fps target, degrades gracefully

---

## 🎨 Design Philosophy

> The Sensory Layer transforms 3verest into a sovereign cinematic system. Dark pages feel infinite, illuminated by mint intelligence. Light pages feel tactile, humane, and open. Every gradient, pulse, and ripple reinforces the same truth: **3verest is alive. It listens, adapts, and breathes like the intelligent infrastructure it represents.**

---

## 📚 Additional Resources

- Framer Motion: https://www.framer.com/motion/
- TailwindCSS v4: https://tailwindcss.com/
- Canvas Performance: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas
- Reduced Motion: https://web.dev/prefers-reduced-motion/

---

**Built with intention. Designed for sovereignty.**
