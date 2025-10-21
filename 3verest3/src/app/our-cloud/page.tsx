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

const OurCloudPage = () => {
  const shouldReduceMotion = useReducedMotion();

  const boxes = [
    {
      label: 'Purpose',
      content: [
        'Most clouds are built for anyone.',
        'Ours was built for something and someone very specific.',
        'Healthcare, in all its complexity, humanity, and fragility.',
        'It was not designed for scale alone.',
        'It was designed for trust.',
      ],
      textStyle: 'text-white',
      delay: 0.2,
    },
    {
      label: 'Design',
      content: [
        'Beneath the surface, it is quiet, purpose-built, sovereign by default, resilient by design.',
        'Each region runs as a capsule, self-contained, self-sufficient, and locally governed.',
        'There is no marketing veneer here. No hyperscaler noise.',
        'Just an architecture designed for one thing: to protect what matters.',
      ],
      textStyle: 'text-white',
      delay: 0.4,
    },
    {
      label: 'Craft',
      content: [
        'We do not talk much about the mechanics.',
        'Not because it is secret, but because it is sacred.',
        'Our engineers obsess over milliseconds, redundancy, and fault domains the way watchmakers think about gears.',
        'Every system, every connection, every byte has intention behind it.',
      ],
      textStyle: 'text-white',
      delay: 0.6,
      hasGrid: true,
    },
    {
      label: 'Constellation',
      content: [
        'Our cloud does not shout.',
        'It listens.',
        'It adapts.',
        'It understands that in healthcare, uptime is not convenience, it is continuity of care.',
        '',
        'When you connect to 3verest, you are not logging into infrastructure.',
        'You are stepping into a network built quietly, obsessively, and globally, one capsule, one region, one sovereign boundary at a time.',
        '',
        'And while others talk about clouds, we build constellations.',
      ],
      highlightEnd: ['Each one sovereign.', 'Each one precise.', 'Each one ours.'],
      textStyle: 'text-white',
      delay: 0.8,
    },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black">
      {/* Navigation */}
      <Navigation />

      {/* Layered Background with Particles */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0A0F14] to-[#0A1C25]" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#00FFC2]/5 to-transparent opacity-30" />

        {/* Ambient particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[
            { left: 10, top: 20 }, { left: 25, top: 60 }, { left: 40, top: 30 },
            { left: 55, top: 80 }, { left: 70, top: 15 }, { left: 85, top: 45 },
            { left: 15, top: 75 }, { left: 35, top: 10 }, { left: 50, top: 90 },
            { left: 65, top: 25 }, { left: 80, top: 70 }, { left: 20, top: 50 },
            { left: 45, top: 5 }, { left: 60, top: 35 }, { left: 75, top: 85 },
            { left: 12, top: 40 }, { left: 30, top: 65 }, { left: 48, top: 12 },
            { left: 62, top: 55 }, { left: 78, top: 28 }, { left: 88, top: 72 },
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

      <main className="relative py-32 px-6 md:px-24">
        <div className="max-w-[1500px] mx-auto">
          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-32"
          >
            <h1
              className="text-4xl md:text-6xl lg:text-8xl font-serif font-bold text-white tracking-tight mb-8"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Our Cloud
            </h1>
            <p
              className="text-2xl md:text-3xl font-serif text-[#00FFC2] mb-6"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              There are clouds. And then there&apos;s ours.
            </p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-[2px] w-24 mx-auto bg-gradient-to-r from-transparent via-[#00FFC2] to-transparent"
            />
          </motion.div>

          {/* Four 3D Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-7xl mx-auto">
            {boxes.map((box, index) => (
              <motion.div
                key={index}
                variants={shouldReduceMotion ? {} : fadeUp}
                initial={shouldReduceMotion ? {} : 'hidden'}
                whileInView={shouldReduceMotion ? {} : 'visible'}
                viewport={{ once: true }}
                whileHover={shouldReduceMotion ? {} : {
                  scale: 1.02,
                  boxShadow: '0 0 80px rgba(0, 255, 194, 0.15)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                }}
                transition={{
                  duration: 0.7,
                  ease: 'easeOut',
                  delay: shouldReduceMotion ? 0 : box.delay,
                }}
                className="relative w-full rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl shadow-[0_0_60px_rgba(0,255,194,0.05)] p-8 md:p-10 transform-gpu perspective-[1000px] hover:shadow-[0_0_80px_rgba(0,255,194,0.08)] transition-all duration-700 ease-out"
                style={{
                  transform: 'rotateX(1deg) rotateY(1deg)',
                }}
              >
                {/* Grid overlay for Craft box */}
                {box.hasGrid && (
                  <div
                    className="absolute inset-0 opacity-5 pointer-events-none rounded-3xl"
                    style={{
                      backgroundImage: `
                        linear-gradient(#00FFC2 1px, transparent 1px),
                        linear-gradient(90deg, #00FFC2 1px, transparent 1px)
                      `,
                      backgroundSize: '40px 40px',
                    }}
                  />
                )}

                {/* Animated glow for Design box */}
                {box.label === 'Design' && (
                  <motion.div
                    className="absolute inset-0 rounded-3xl pointer-events-none"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(0, 255, 194, 0.03), transparent)',
                    }}
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                )}

                {/* Label */}
                <motion.div
                  className="mb-8"
                  whileHover={{ letterSpacing: '0.22em' }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-sm uppercase tracking-[0.2em] text-[#00FFC2]/70 font-medium">
                    {box.label}
                  </span>
                </motion.div>

                {/* Content */}
                <div className="space-y-4 relative z-10">
                  {box.content.map((line, i) => (
                    <p
                      key={i}
                      className={`text-base md:text-lg leading-relaxed tracking-tight ${box.textStyle}`}
                    >
                      {line}
                    </p>
                  ))}

                  {/* Highlighted ending for Constellation */}
                  {box.highlightEnd && (
                    <div className="mt-8 pt-6 border-t border-[#00FFC2]/10 text-center space-y-1">
                      {box.highlightEnd.map((line, i) => (
                        <motion.p
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 0.9, y: 0 }}
                          transition={{ duration: 0.8, delay: i * 0.2 }}
                          viewport={{ once: true }}
                          className="text-lg md:text-xl font-serif text-[#00FFC2] tracking-tight"
                          style={{
                            fontFamily: 'var(--font-playfair)',
                            textShadow: '0 0 20px rgba(0, 255, 194, 0.3)',
                          }}
                        >
                          {line}
                        </motion.p>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bookend Line */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-40 text-center"
          >
            <motion.h2
              className="text-4xl md:text-6xl font-serif text-white leading-tight tracking-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
              animate={{
                opacity: [1, 0.95, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              Every region. Every byte.
              <br />
              Designed for trust.
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
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default OurCloudPage;
