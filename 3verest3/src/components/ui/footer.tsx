'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/theme-context';

const Footer = () => {
  const [isIdle, setIsIdle] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { theme } = useTheme();

  useEffect(() => {
    let idleTimer: NodeJS.Timeout;

    const resetIdleTimer = () => {
      setIsIdle(false);
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => setIsIdle(true), 5000);
    };

    window.addEventListener('mousemove', resetIdleTimer);
    window.addEventListener('scroll', resetIdleTimer);
    resetIdleTimer();

    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener('mousemove', resetIdleTimer);
      window.removeEventListener('scroll', resetIdleTimer);
    };
  }, []);

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: isIdle ? 0.98 : 1 }}
      transition={{ duration: 0.8, delay: 1.2 }}
      className="relative z-20 py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          {/* Tagline with pulsing glow */}
          <motion.div
            className="mb-8"
            animate={shouldReduceMotion ? {} : {
              opacity: [1, 0.98, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <motion.h3
              className={`text-2xl md:text-3xl font-serif mb-4 relative inline-block ${
                theme === 'light' ? 'text-gray-900' : 'text-white/90'
              }`}
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00FFC2]/20 to-transparent blur-xl"
                animate={shouldReduceMotion ? {} : {
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              <span className="relative z-10">
                Sovereignty is not a feature. It&apos;s the future.
              </span>
            </motion.h3>
          </motion.div>

          {/* Divider */}
          <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-[#00FFC2]/30 to-transparent" />

          {/* Trust & Compliance Link */}
          <motion.a
            href="/trust"
            whileHover={{ scale: 1.02 }}
            className={`inline-block text-xs font-light tracking-wider mb-4 transition-all duration-300 px-4 text-center ${
              theme === 'light'
                ? 'text-gray-500 hover:text-[#00D6A3]'
                : 'text-white/40 hover:text-[#00D6A3] hover:drop-shadow-[0_0_8px_rgba(0,214,163,0.5)]'
            }`}
          >
            <span className="hidden sm:inline">ISO 27001 • SOC 2 Type II • NHS DSPT • GDPR • HSCN • GAIA-X • CSA STAR • IRAP (pending)</span>
            <span className="sm:hidden">ISO 27001 • SOC 2 • GDPR • HSCN</span>
          </motion.a>

          {/* Copyright */}
          <p className={`text-sm font-light tracking-wide ${
            theme === 'light' ? 'text-gray-600' : 'text-white/50'
          }`}>
            © 2025 3verest | Sovereign Cloud Infrastructure for Healthcare
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;


