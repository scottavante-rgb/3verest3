'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';
import { Globe, Brain, HeartStraight } from 'phosphor-react';

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

const SovereigntyPage = () => {
  const [mintFlash, setMintFlash] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Parallax gradient shift
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  useEffect(() => {
    // Intro mint flash
    const timer = setTimeout(() => setMintFlash(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative bg-black overflow-x-hidden">
      {/* Mint Flash Intro */}
      <motion.div
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
        className="fixed inset-0 bg-[#00FFC2] pointer-events-none z-50"
        style={{ display: mintFlash ? 'block' : 'none' }}
      />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed left-0 top-0 w-[2px] h-full bg-gradient-to-b from-transparent via-[#00FFC2] to-transparent origin-top z-50"
        style={{ scaleY }}
      />

      {/* Navigation */}
      <Navigation />

      {/* Layered Background Gradient with Parallax */}
      <motion.div
        className="fixed inset-0 -z-10"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0A0F14] to-[#0A1C25]" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#00FFC2]/5 to-transparent opacity-30" />
      </motion.div>

      <main className="relative">
        {/* SECTION 1 — HERO */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="min-h-screen flex items-center justify-center px-8 py-24"
        >
          <div className="max-w-[1600px] mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-7xl md:text-8xl font-serif tracking-wide font-bold text-white mb-8"
              style={{
                fontFamily: 'var(--font-playfair)',
                textShadow: '0 0 25px rgba(0, 255, 194, 0.3)',
              }}
            >
              Sovereignty. The Foundation of Trust.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-lg md:text-2xl text-[#C5C7CA] max-w-2xl mx-auto leading-relaxed"
            >
              In healthcare, data is not just information, it&apos;s identity.
              Sovereign infrastructure ensures it remains protected, private,
              and under the rightful jurisdiction of the nations and people it serves.
            </motion.p>

            {/* Ambient particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[
                { left: 10, top: 20 }, { left: 25, top: 60 }, { left: 40, top: 30 },
                { left: 55, top: 80 }, { left: 70, top: 15 }, { left: 85, top: 45 },
                { left: 15, top: 75 }, { left: 35, top: 10 }, { left: 50, top: 90 },
                { left: 65, top: 25 }, { left: 80, top: 70 }, { left: 20, top: 50 },
                { left: 45, top: 5 }, { left: 60, top: 35 }, { left: 75, top: 85 },
              ].map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-[#00FFC2] rounded-full opacity-40"
                  style={{
                    left: `${pos.left}%`,
                    top: `${pos.top}%`,
                  }}
                  animate={{
                    y: [0, -100, 0],
                    opacity: [0.2, 0.6, 0.2],
                  }}
                  transition={{
                    duration: 10 + i * 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.section>

        {/* SECTION 2 — THE WHY */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-32 px-8 md:px-24"
        >
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              {/* Left - Quote Block */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ x: -5 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-[#00FFC2]/20 bg-white/2 backdrop-blur-sm p-8 relative group"
              >
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-0 bg-[#00FFC2]"
                  whileHover={{ width: '2px' }}
                  transition={{ duration: 0.5 }}
                />
                <p className="text-2xl md:text-3xl font-serif italic text-white leading-snug relative z-10" style={{ fontFamily: 'var(--font-playfair)' }}>
                  &ldquo;Without sovereignty, there is no security.
                  Without security, there is no trust.
                  Without trust, healthcare cannot advance.&rdquo;
                </p>
              </motion.div>

              {/* Right - Body */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <p className="text-base md:text-lg text-[#C5C7CA] leading-relaxed max-w-xl">
                  Every image, report, and medical record holds human value.
                  3verest&apos;s sovereign cloud ensures healthcare data stays where it belongs,
                  within the borders, policies, and protections of the nations that create it.
                  <br /><br />
                  This is not about isolation. It&apos;s about integrity, accountability, and dignity.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* SECTION 3 — GLOBAL CONTEXT */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-24 px-8 relative"
          style={{
            background: 'linear-gradient(to bottom, #00100E, #000000)',
          }}
        >
          {/* Animated world map grid overlay */}
          <motion.div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(#00FFC2 1px, transparent 1px),
                linear-gradient(90deg, #00FFC2 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
            animate={{
              x: [0, 10, 0],
              y: [0, 10, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Random pulsing mint dots */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-[#00FFC2] rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.05, 0.15, 0.05],
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  delay: i * 0.8,
                }}
              />
            ))}
          </div>

          <div className="max-w-[1600px] mx-auto relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-serif text-white text-center leading-snug max-w-2xl mx-auto mb-12"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              The future of healthcare infrastructure will be shaped by sovereignty.
              As nations define how data moves across borders, how AI learns,
              and how trust is governed, sovereign cloud becomes essential
              for hospitals, regulators, and innovators alike.
            </motion.p>

            {/* 3 Feature Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12 text-center max-w-5xl mx-auto py-12">
              {[
                {
                  Icon: Globe,
                  title: 'National Policy Alignment',
                  body: 'Data residency, compliance, and control within each jurisdiction.',
                  delay: 0,
                },
                {
                  Icon: Brain,
                  title: 'AI with Boundaries',
                  body: 'Training and inference that respect privacy and regulation.',
                  delay: 0.2,
                },
                {
                  Icon: HeartStraight,
                  title: 'Healthcare Without Compromise',
                  body: 'Speed, security, and scalability without crossing borders.',
                  delay: 0.4,
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: feature.delay }}
                  viewport={{ once: true }}
                >
                  <div className="flex justify-center mb-4">
                    <feature.Icon size={48} weight="thin" className="text-[#00FFC2]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 tracking-wide">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[#C5C7CA]">{feature.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* SECTION 4 — THE 3VEREST APPROACH */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-32 px-8"
        >
          <div className="max-w-[1600px] mx-auto">
            <h2
              className="text-5xl md:text-6xl font-serif tracking-wide text-center text-white mb-12"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Sovereignty Engineered.
            </h2>
            <p className="text-lg md:text-xl text-[#C5C7CA] text-center max-w-3xl mx-auto mb-16 leading-relaxed">
              3verest builds sovereign clouds region by region,
              each designed to meet local regulatory frameworks and
              national data protection standards while delivering
              the performance of a global network.
            </p>

            {/* Interactive Glass Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12 max-w-6xl mx-auto">
              {[
                {
                  title: 'Built on Sovereign Cloud Capsules',
                  body: 'Each region deploys self-contained infrastructure with local control.',
                },
                {
                  title: 'Compliant by Design',
                  body: 'Aligned with ISO27001, HIPAA, GDPR, and IRAP.',
                },
                {
                  title: 'Trusted by Nations',
                  body: 'Powering healthcare workloads across Australia, the UK, Europe, and beyond.',
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  whileHover={{
                    rotateX: 2,
                    rotateY: -2,
                    scale: 1.02,
                    borderColor: 'rgba(0, 255, 194, 0.5)',
                    boxShadow: '0 0 60px rgba(0, 255, 194, 0.12)',
                  }}
                  viewport={{ once: true }}
                  className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg p-8 shadow-[0_0_40px_rgba(0,255,194,0.05)] transition-all duration-500 ease-out"
                  style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
                >
                  <h3 className="text-xl font-semibold text-white mb-2">{card.title}</h3>
                  <p className="text-sm text-[#C5C7CA]">{card.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SovereigntyPage;
