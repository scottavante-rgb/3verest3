'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/ui/navigation';
import Hero from '@/components/ui/hero';
import Footer from '@/components/ui/footer';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="min-h-screen bg-black text-white overflow-x-hidden"
    >
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <Hero />

      {/* Bookend Line */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true }}
        className="relative py-32 px-8"
      >
        <div className="max-w-[1600px] mx-auto text-center">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight tracking-tight px-4"
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
            The world does not need another cloud.
            <br />
            It needs a conscience.
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
        </div>
      </motion.section>

      {/* Footer */}
      <Footer />
    </motion.div>
  );
}
