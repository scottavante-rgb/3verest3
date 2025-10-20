'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/theme-context';

interface GradientBridgeProps {
  position?: 'top' | 'bottom';
  className?: string;
}

export default function GradientBridge({ position = 'bottom', className = '' }: GradientBridgeProps) {
  const { theme } = useTheme();

  const gradientClass = position === 'bottom'
    ? 'bg-gradient-to-b from-[#00FFC2]/10 to-transparent'
    : 'bg-gradient-to-t from-[#00FFC2]/10 to-transparent';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
      className={`h-24 ${gradientClass} absolute ${position === 'bottom' ? 'bottom-0' : 'top-0'} left-0 right-0 pointer-events-none z-10 ${className}`}
      style={{
        mixBlendMode: theme === 'dark' ? 'lighten' : 'multiply',
      }}
    />
  );
}
