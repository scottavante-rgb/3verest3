'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';
import { useEffect } from 'react';

export default function TechnologyArt() {
  // Set noindex meta tag for this page
  useEffect(() => {
    const metaRobots = document.createElement('meta');
    metaRobots.name = 'robots';
    metaRobots.content = 'noindex, nofollow';
    document.head.appendChild(metaRobots);

    return () => {
      document.head.removeChild(metaRobots);
    };
  }, []);
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
      {/* Subtle blueprint grid background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.01]">
        <div className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #E0E0E0 1px, transparent 1px),
              linear-gradient(to bottom, #E0E0E0 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            className="text-5xl md:text-6xl lg:text-7xl font-light text-[#222] mb-8 tracking-tight"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Could a Cloud Be Art?
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
            className="text-lg md:text-xl text-[#666] max-w-3xl mx-auto leading-relaxed font-light mb-20"
          >
            We spend years perfecting how our infrastructure looks, feels, and performs — so maybe it's not such a wild thought.
            Our 3verest Cloud Capsules are engineered with precision, symmetry, and balance. The result is something that, in the right light,
            feels almost… artistic.
          </motion.p>

          {/* Gallery-style image display */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="relative mb-8"
          >
            <div className="bg-white p-8 md:p-12 rounded-sm shadow-2xl inline-block">
              <div className="relative">
                <Image
                  src="/art.png"
                  alt="The 3verest Stack - Conceptual Architecture Illustration"
                  width={800}
                  height={800}
                  className="w-full h-auto max-w-2xl"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Caption */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <p className="text-sm text-[#666] font-light leading-relaxed italic">
              "The 3verest Stack" — a conceptual illustration of our OpenStack, NetApp, and Altitude AI architecture.
            </p>
            <p className="text-sm text-[#999] font-light mt-2">
              We like to joke that our technology is so elegant it could hang in a gallery. Just kidding — mostly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Engineering as Craft Section */}
      <section className="relative py-32 px-6">
        {/* Blueprint gridlines background */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.02 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, #E0E0E0 0.5px, transparent 0.5px),
              linear-gradient(to bottom, #E0E0E0 0.5px, transparent 0.5px)
            `,
            backgroundSize: '40px 40px'
          }}
        />

        <div className="max-w-3xl mx-auto text-center relative">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="text-3xl md:text-4xl font-light text-[#222] mb-8 tracking-tight"
          >
            Engineering as Craft
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
            className="space-y-6 text-base md:text-lg text-[#666] leading-relaxed font-light"
          >
            <p>
              Every 3verest region, capsule, and node is a product of deliberate design — from power symmetry and cooling flow
              to orchestration logic and AI management.
            </p>

            <p>
              We approach cloud architecture the way great designers approach form: with intention, proportion, and precision.
            </p>

            <p className="text-[#444] font-normal">
              Because in healthcare, elegance isn't aesthetic — it's reliability made visible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="relative py-40 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            className="text-2xl md:text-3xl text-[#444] font-light mb-16 tracking-tight"
          >
            Some people collect art. We build it.
          </motion.p>

          {/* 3verest glyph signature */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="flex justify-center"
          >
            <svg width="120" height="120" viewBox="0 0 120 120">
              {/* Outer triangle */}
              <path
                d="M 60 30 L 95 90 L 25 90 Z"
                fill="none"
                stroke="#00FFC2"
                strokeWidth="1.5"
                opacity="0.6"
              />

              {/* Inner horizontal lines representing layers */}
              <line x1="45" y1="70" x2="75" y2="70" stroke="#00FFC2" strokeWidth="1" opacity="0.4" />
              <line x1="50" y1="80" x2="70" y2="80" stroke="#00FFC2" strokeWidth="1" opacity="0.4" />

              {/* Center dot */}
              <circle cx="60" cy="70" r="3" fill="#00FFC2" opacity="0.8" />
            </svg>
          </motion.div>
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
}
