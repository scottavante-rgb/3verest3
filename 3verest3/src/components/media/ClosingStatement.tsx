'use client';

import { motion } from 'framer-motion';

const ClosingStatement = () => {
  return (
    <section className="relative py-32 px-4 sm:px-6 md:px-8 overflow-hidden">
      {/* Deep Blue Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F1C29] via-[#0A0F1A] to-[#000000]" />

      {/* Rotating Glyph Watermark */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center opacity-5"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        <div className="text-[20rem] font-display font-bold text-white">
          3
        </div>
      </motion.div>

      {/* Halo Glow Effect */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0, 174, 239, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white leading-tight tracking-tight mb-8"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          3verest is where healthcare cloud finds its altitude — sovereign, connected, and human-first.
        </motion.h2>

        {/* Subtle Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="h-[2px] w-40 bg-gradient-to-r from-transparent via-[#00AEEF]/60 to-transparent mx-auto mt-12"
        />

        {/* Breathing Animation on Text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          animate={{
            opacity: [1, 0.9, 1],
          }}
          style={{
            transition: 'opacity 4s ease-in-out infinite',
          }}
          className="mt-16"
        >
          <p className="text-white/40 text-sm uppercase tracking-widest">
            The Sovereign Future
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ClosingStatement;
