'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';

const fadeUp = {
  hidden: { opacity: 0, y: 40, scale: 1.03 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
    }
  },
};

const WhatMakesUsDifferentPage = () => {
  const shouldReduceMotion = useReducedMotion();

  const differenceCards = [
    {
      title: 'Built for Healthcare',
      body: 'Not retrofitted, but purpose-built. Every element of our architecture, security, and support was designed with healthcare in mind, where performance and protection cannot be separated.',
    },
    {
      title: 'Sovereign by Design',
      body: 'Jurisdictional, ethical, and technical sovereignty built into every region. 3verest clouds operate within national boundaries while maintaining global capability, proving that sovereignty and scalability can coexist.',
    },
    {
      title: 'Managed Like a Partnership',
      body: 'We are not a self-service provider. We work like a team within your team, concierge-level stewardship, real engineers, and accountability that goes beyond SLAs.',
    },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-black via-[#0A0F14] to-[#0A1C25]">
      {/* Navigation */}
      <Navigation />

      <main className="relative py-32 px-8 md:px-24">
        <div className="max-w-[1500px] mx-auto space-y-32">

          {/* SECTION 1 — INTRODUCTION */}
          <motion.section
            variants={shouldReduceMotion ? {} : fadeUp}
            initial={shouldReduceMotion ? {} : 'hidden'}
            animate={shouldReduceMotion ? {} : 'visible'}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center"
          >
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif text-white leading-tight max-w-5xl mx-auto mb-12 px-4"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Every cloud company talks about infrastructure.
              <br />
              <span className="text-[#00FFC2]" style={{ textShadow: '0 0 40px rgba(0, 255, 194, 0.3)' }}>
                We talk about sovereignty, responsibility, and trust.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-[#C5C7CA] text-center max-w-xl mx-auto px-4">
              Because the future of cloud is not about scale, it is about integrity.
            </p>
          </motion.section>

          {/* SECTION 2 — OUR APPROACH */}
          <motion.section
            variants={shouldReduceMotion ? {} : fadeUp}
            initial={shouldReduceMotion ? {} : 'hidden'}
            whileInView={shouldReduceMotion ? {} : 'visible'}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="h-12 w-[1px] mx-auto bg-[#00FFC2]/30 mb-8" />
            <h2
              className="text-4xl md:text-5xl font-serif text-white text-center mb-8"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Our Approach
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-[#C5C7CA] text-center leading-relaxed max-w-3xl mx-auto px-4">
              3verest merges ethics, engineering, and execution.
              <br /><br />
              We design systems where responsibility is built in, not added later.
              <br /><br />
              Our architecture is sovereign by design, resilient by intent, and guided by a belief that technology must serve the people who depend on it.
              <br /><br />
              Every region, every line of code, every safeguard reflects this simple idea: trust must be engineered.
            </p>
          </motion.section>

          {/* SECTION 3 — OUR DIFFERENCE */}
          <motion.section
            variants={shouldReduceMotion ? {} : fadeUp}
            initial={shouldReduceMotion ? {} : 'hidden'}
            whileInView={shouldReduceMotion ? {} : 'visible'}
            viewport={{ once: true }}
          >
            <h2
              className="text-4xl md:text-5xl font-serif text-white text-center mb-16"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Our Difference
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-12 max-w-6xl mx-auto">
              {differenceCards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.9 }}
                  whileInView={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={shouldReduceMotion ? {} : {
                    scale: 1.03,
                    boxShadow: '0 0 60px rgba(0, 255, 194, 0.15)',
                    borderColor: 'rgba(0, 255, 194, 0.3)',
                  }}
                  transition={{
                    duration: 0.7,
                    ease: 'easeOut',
                    delay: shouldReduceMotion ? 0 : index * 0.2,
                  }}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-10 text-center transition-all duration-700 ease-out"
                >
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    {card.title}
                  </h3>
                  <p className="text-base text-[#C5C7CA] leading-relaxed">
                    {card.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* SECTION 4 — THE HUMAN ELEMENT */}
          <motion.section
            variants={shouldReduceMotion ? {} : fadeUp}
            initial={shouldReduceMotion ? {} : 'hidden'}
            whileInView={shouldReduceMotion ? {} : 'visible'}
            viewport={{ once: true }}
            className="text-center relative"
          >
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white text-center leading-tight max-w-4xl mx-auto mb-10 relative z-10 px-4"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Technology should protect people, not replace them.
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-[#C5C7CA] text-center max-w-3xl mx-auto leading-relaxed relative z-10 px-4">
              We believe that healthcare is more than data, it is humanity in motion.
              <br /><br />
              Every decision we make, from data residency to disaster recovery, is made with people in mind.
              <br /><br />
              Our systems exist to amplify human care, not abstract it.
              <br /><br />
              The closer technology gets to the patient, the more ethical it must become.
            </p>
          </motion.section>

          {/* Bookend Line */}
          <motion.section
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center py-32"
          >
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight tracking-tight max-w-4xl mx-auto px-4"
              style={{ fontFamily: 'var(--font-playfair)' }}
              animate={shouldReduceMotion ? {} : {
                opacity: [1, 0.95, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              Between hyperscale and proximity,
              <br />
              we built purpose.
            </motion.h2>
            <motion.div
              className="relative w-32 h-[2px] mx-auto mt-8 overflow-hidden"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00FFC2] to-transparent blur-[1px]"
                animate={shouldReduceMotion ? {} : {
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </motion.div>
          </motion.section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default WhatMakesUsDifferentPage;
