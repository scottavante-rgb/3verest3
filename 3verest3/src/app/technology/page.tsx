'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';

export default function Technology() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
      {/* Technical Grid Background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.015]">
        <div className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #E0E0E0 1px, transparent 1px),
              linear-gradient(to bottom, #E0E0E0 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Technical Diagram Background */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center opacity-5"
          style={{ y: heroY }}
        >
          <svg width="800" height="800" viewBox="0 0 800 800" className="max-w-4xl">
            {/* Concentric arcs */}
            {[1, 2, 3, 4, 5].map((i) => (
              <circle
                key={i}
                cx="400"
                cy="400"
                r={60 * i}
                fill="none"
                stroke="#222"
                strokeWidth="0.5"
                opacity={0.6 - (i * 0.1)}
              />
            ))}
            {/* Intersecting lines */}
            <line x1="0" y1="400" x2="800" y2="400" stroke="#222" strokeWidth="0.5" opacity="0.4" />
            <line x1="400" y1="0" x2="400" y2="800" stroke="#222" strokeWidth="0.5" opacity="0.4" />
            <line x1="100" y1="100" x2="700" y2="700" stroke="#222" strokeWidth="0.5" opacity="0.3" />
            <line x1="700" y1="100" x2="100" y2="700" stroke="#222" strokeWidth="0.5" opacity="0.3" />
          </svg>
        </motion.div>

        <motion.div
          className="relative z-10 max-w-5xl mx-auto px-6 text-center"
          style={{ opacity: heroOpacity }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            className="text-6xl md:text-7xl lg:text-8xl font-light text-[#222] mb-8 tracking-tight"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Open. Intelligent. Sovereign.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
            className="text-xl md:text-2xl text-[#666] max-w-4xl mx-auto leading-relaxed font-light"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            3verest builds its technology on open foundations. Our entire sovereign healthcare cloud is powered by OpenStack,
            strengthened by NetApp, and orchestrated by Altitude AI — a seamless union of open-source freedom, enterprise strength,
            and intelligent automation.
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-[#E0E0E0] rounded-full flex items-start justify-center p-2"
          >
            <div className="w-1.5 h-1.5 bg-[#00FFC2] rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Section 1 - OpenStack */}
      <section className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            <h2 className="text-5xl md:text-6xl font-light text-[#222] mb-12 tracking-tight">
              We Are All-In on OpenStack
            </h2>

            <div className="space-y-6 text-lg md:text-xl text-[#444] leading-relaxed font-light">
              <p>
                OpenStack is the backbone of 3verest. Our priority is OpenStack.
                We are deeply integrated into the open-source ecosystem, not as users, but as contributors and engineers.
              </p>

              <p>
                This commitment gives us full control, adaptability, and sovereignty. We refine, optimise, and extend OpenStack to deliver
                the performance, security, and transparency healthcare requires.
              </p>

              <p>
                Our approach removes dependency on hyperscalers and ensures our partners retain true ownership of their infrastructure.
              </p>
            </div>

            {/* Technical divider */}
            <div className="mt-16 relative">
              <div className="h-px bg-gradient-to-r from-transparent via-[#E0E0E0] to-transparent" />
              <div className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-4">
                <span className="text-xs text-[#999] uppercase tracking-widest">OpenStack Core Infrastructure</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2 - NetApp */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-white to-gray-50/30">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            <h2 className="text-5xl md:text-6xl font-light text-[#222] mb-12 tracking-tight">
              In Partnership with NetApp
            </h2>

            <div className="space-y-6 text-lg md:text-xl text-[#444] leading-relaxed font-light mb-12">
              <p>
                To complement our open architecture, we partner with NetApp, the global leader in storage technology.
                Together, we've engineered a unified data fabric that combines OpenStack's flexibility with NetApp's resilience and performance.
              </p>

              <p>
                This architecture delivers high-throughput access, intelligent snapshotting, and compliance at scale.
                It enables global healthcare software providers to deploy confidently, knowing their data is protected, sovereign, and always available.
              </p>
            </div>

            {/* Quote block */}
            <motion.blockquote
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="border-l-2 border-[#00FFC2] pl-8 py-4 my-16"
            >
              <p className="text-2xl md:text-3xl font-light text-[#222] italic">
                "Open innovation meets enterprise precision."
              </p>
            </motion.blockquote>

            {/* Data flow diagram */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mt-16 relative h-40 flex items-center justify-center"
            >
              <svg width="100%" height="100%" viewBox="0 0 800 160" className="max-w-3xl mx-auto">
                {/* Connection lines */}
                <motion.line
                  x1="150" y1="100" x2="350" y2="100"
                  stroke="#00FFC2"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
                <motion.line
                  x1="450" y1="100" x2="650" y2="100"
                  stroke="#00FFC2"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />

                {/* Labels - positioned above nodes */}
                <text x="75" y="70" textAnchor="middle" className="text-sm fill-[#666] font-light">OpenStack</text>
                <text x="400" y="70" textAnchor="middle" className="text-sm fill-[#222] font-medium">3verest</text>
                <text x="725" y="70" textAnchor="middle" className="text-sm fill-[#666] font-light">NetApp</text>

                {/* Nodes */}
                <circle cx="75" cy="100" r="8" fill="none" stroke="#666" strokeWidth="1.5" />
                <circle cx="400" cy="100" r="10" fill="#00FFC2" opacity="0.2" stroke="#00FFC2" strokeWidth="2" />
                <circle cx="725" cy="100" r="8" fill="none" stroke="#666" strokeWidth="1.5" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 3 - Altitude AI */}
      <section className="relative py-32 px-6 overflow-hidden">
        {/* Animated pulse background */}
        <div className="absolute inset-0 opacity-[0.03]">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#00FFC2] rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.3
              }}
            />
          ))}
        </div>

        <div className="max-w-5xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            <h2 className="text-5xl md:text-6xl font-light text-[#222] mb-12 tracking-tight">
              Intelligence at the Core
            </h2>

            <div className="space-y-6 text-lg md:text-xl text-[#444] leading-relaxed font-light">
              <p>
                Altitude is the AI platform that powers and manages 3verest. It integrates directly with OpenStack APIs,
                automating what was once manual: scaling, patching, monitoring, and performance tuning.
              </p>

              <p>
                Altitude transforms open infrastructure into a self-optimising system, one that learns, predicts, and evolves
                across every 3verest region.
              </p>

              <p>
                This is how we deliver operational excellence: not through human oversight alone, but through engineered intelligence.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 4 - The 3verest Stack */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-gray-50/30 to-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            <h2 className="text-5xl md:text-6xl font-light text-[#222] mb-20 tracking-tight text-center">
              The 3verest Stack
            </h2>

            {/* Three-column grid */}
            <div className="grid md:grid-cols-3 gap-12 md:gap-8 mb-16">
              {[
                {
                  title: 'OpenStack',
                  description: 'Sovereign, open infrastructure'
                },
                {
                  title: 'NetApp',
                  description: 'Enterprise-grade storage & resilience'
                },
                {
                  title: 'Altitude AI',
                  description: 'Predictive AI orchestration'
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative"
                >
                  <div className="border border-[#E0E0E0] p-8 rounded-sm hover:border-[#00FFC2] transition-colors duration-500 h-full">
                    <h3 className="text-2xl md:text-3xl font-light text-[#222] mb-4 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-base md:text-lg text-[#666] font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Connection lines */}
                  {index < 2 && (
                    <svg
                      className="hidden md:block absolute top-1/2 -right-4 w-8 h-24 -translate-y-1/2"
                      viewBox="0 0 32 96"
                    >
                      <line x1="0" y1="48" x2="32" y2="48" stroke="#E0E0E0" strokeWidth="1" />
                    </svg>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl md:text-2xl text-[#444] text-center font-light italic"
            >
              Together, they form the 3verest Stack — open, intelligent, sovereign.
            </motion.p>

            {/* 3verest glyph formation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.7 }}
              className="mt-16 flex justify-center"
            >
              <svg width="120" height="120" viewBox="0 0 120 120">
                <motion.path
                  d="M 60 20 L 100 100 L 20 100 Z"
                  fill="none"
                  stroke="#00FFC2"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 1 }}
                />
                <motion.circle
                  cx="60"
                  cy="73"
                  r="4"
                  fill="#00FFC2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 5 - Why It Matters */}
      <section className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            <h2 className="text-5xl md:text-6xl font-light text-[#222] mb-12 tracking-tight">
              For Healthcare, Openness Means Trust
            </h2>

            <div className="space-y-6 text-lg md:text-xl text-[#444] leading-relaxed font-light mb-12">
              <p>
                Our engineering philosophy is simple: when systems are open, transparent, and intelligent, trust follows naturally.
              </p>

              <p>
                The 3verest Stack allows healthcare OEMs and institutions to deploy globally, stay compliant, and scale without compromise.
              </p>

              <p>
                Every decision, from OpenStack to NetApp to Altitude, exists to give our partners confidence, control, and independence.
              </p>
            </div>

            {/* Quote overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative py-16 text-center"
            >
              <p className="text-3xl md:text-4xl lg:text-5xl font-light text-[#222] italic tracking-tight">
                "We don't rent clouds. We build them."
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="relative py-40 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            className="text-2xl md:text-3xl text-[#444] font-light mb-20 leading-relaxed"
          >
            Powered by OpenStack. Strengthened by NetApp. Elevated by Altitude AI.
          </motion.p>

          {/* Easter egg link */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-sm text-[#999] font-light mb-20"
          >
            Some say infrastructure can't be{' '}
            <a
              href="/technology/art"
              className="text-[#666] hover:text-[#00FFC2] transition-colors duration-300 relative group"
            >
              beautiful
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#00FFC2] group-hover:w-full transition-all duration-300" />
            </a>
            . We disagree.
          </motion.p>

          {/* 3verest glyph - morphing animation */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="flex justify-center"
          >
            <motion.svg
              width="200"
              height="200"
              viewBox="0 0 200 200"
              initial={{ rotate: 0 }}
              whileInView={{ rotate: 0 }}
            >
              {/* Outer triangle */}
              <motion.path
                d="M 100 40 L 160 160 L 40 160 Z"
                fill="none"
                stroke="#00FFC2"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />

              {/* Inner lines representing the stack */}
              <motion.line
                x1="70" y1="120" x2="130" y2="120"
                stroke="#00FFC2"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
              <motion.line
                x1="80" y1="140" x2="120" y2="140"
                stroke="#00FFC2"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.7 }}
              />

              {/* Center dot */}
              <motion.circle
                cx="100"
                cy="120"
                r="6"
                fill="#00FFC2"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.5 }}
              />
            </motion.svg>
          </motion.div>
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
}
