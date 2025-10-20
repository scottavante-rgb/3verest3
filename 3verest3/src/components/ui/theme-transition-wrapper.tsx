'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTheme } from '@/contexts/theme-context';
import { ReactNode } from 'react';

interface ThemeTransitionWrapperProps {
  children: ReactNode;
}

export default function ThemeTransitionWrapper({ children }: ThemeTransitionWrapperProps) {
  const { theme, isTransitioning } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      {/* Mint Overlay Transition */}
      <AnimatePresence>
        {isTransitioning && !shouldReduceMotion && (
          <motion.div
            initial={{ scale: 0, opacity: 0.4 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle, rgba(0, 255, 194, 0.1) 0%, transparent 70%)',
            }}
          >
            <div className="w-full h-full bg-[#00FFC2]/10 rounded-full blur-3xl" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Theme Content Wrapper */}
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={shouldReduceMotion ? {} : { opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={shouldReduceMotion ? {} : { opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`${theme === 'dark' ? 'dark-theme' : 'light-theme'} min-h-screen will-animate`}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
