'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from '@/contexts/theme-context';

export default function CursorGlow() {
  const [isInteractive, setIsInteractive] = useState(false);
  const { theme } = useTheme();
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 20);
      cursorY.set(e.clientY - 20);

      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, input, [role="button"]');
      setIsInteractive(!!interactive);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="pointer-events-none fixed z-50 hidden md:block"
      style={{
        left: cursorXSpring,
        top: cursorYSpring,
      }}
    >
      <motion.div
        className="h-10 w-10 rounded-full blur-xl transition-colors duration-500"
        style={{
          backgroundColor: isInteractive ? '#00FFC2' : (theme === 'dark' ? '#00FFC2' : '#666666'),
        }}
        animate={{
          opacity: isInteractive ? (theme === 'dark' ? 0.3 : 0.3) : (theme === 'dark' ? 0 : 0),
          scale: isInteractive ? 1 : 0.5,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
    </motion.div>
  );
}
