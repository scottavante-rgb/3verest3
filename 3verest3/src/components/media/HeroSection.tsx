'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const HeroSection = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; targetX: number; targetY: number }>>([]);
  const filters = ['All', 'Announcements', 'Features', 'Events', 'Summit AI'];

  useEffect(() => {
    // Generate particles only on client side after component mounts
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      targetX: Math.random() * window.innerWidth,
      targetY: Math.random() * window.innerHeight,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section className="relative min-h-[30vh] flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 overflow-hidden pt-24 pb-8">
      {/* Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-[#1A1F2E] to-[#0A0F1A]"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      {/* Drifting Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-[#00AEEF] rounded-full opacity-30"
            initial={{
              x: particle.x,
              y: particle.y,
            }}
            animate={{
              x: particle.targetX,
              y: particle.targetY,
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4 tracking-tight"
        >
          Stories from the Edge of Healthcare Cloud.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-base sm:text-lg md:text-xl text-white/80 mb-6 max-w-3xl mx-auto"
        >
          The world's most trusted foundation for medical data — told one milestone at a time.
        </motion.p>

        {/* Filter Chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex flex-wrap gap-2 justify-center"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide uppercase transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-[#00AEEF] text-white shadow-lg shadow-[#00AEEF]/50'
                  : 'bg-white/10 text-white/70 hover:bg-white/20 backdrop-blur-md'
              }`}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
