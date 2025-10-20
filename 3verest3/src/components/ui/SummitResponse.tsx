"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Lightning, CheckCircle } from 'phosphor-react';
import { fadeUp } from '@/components/animations/motion';

interface SummitResponseProps {
  query: string;
  answer: string;
  isLoading?: boolean;
  onClose?: () => void;
  onSuggestionClick?: (suggestion: string) => void;
  isMinimized?: boolean;
  onToggleMinimize?: () => void;
}

/**
 * SUMMIT SOVEREIGN AI RESPONSE
 * Displays AI search results with 3verest branding
 */
export function SummitResponse({
  query,
  answer,
  isLoading = false,
  onClose,
  onSuggestionClick,
  isMinimized = false,
  onToggleMinimize,
}: SummitResponseProps) {
  const suggestions = [
    'GPU capabilities',
    'Compliance frameworks',
    'Edge Cloud',
    'Sovereign infrastructure',
    'Healthcare solutions',
    'Global operations',
  ];

  return (
    <AnimatePresence>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="w-full max-w-3xl mx-auto mt-8"
      >
        {/* Response Card */}
        <div className="glass-panel p-6 md:p-8 relative overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#00FFC2]/5 to-transparent pointer-events-none" />

          {/* Header */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-[#00FFC2]/10">
                <Brain size={24} weight="duotone" className="text-[#00FFC2]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  Summit
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#00FFC2]/20 text-[#00FFC2] font-normal">
                    Sovereign AI
                  </span>
                </h3>
                <p className="text-sm text-white/50">3verest Intelligence</p>
              </div>
            </div>

            {/* Query */}
            <div className="mb-6 pb-4 border-b border-white/10">
              <p className="text-sm text-white/40 mb-1">Your Question:</p>
              <p className="text-white/90 italic">&ldquo;{query}&rdquo;</p>
            </div>

            {/* Answer */}
            {isLoading ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#00FFC2]">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Lightning size={20} weight="fill" />
                  </motion.div>
                  <span className="text-sm">Summit is thinking...</span>
                </div>
                {/* Loading skeleton */}
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="h-4 bg-white/5 rounded"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            ) : (
              <div className="prose prose-invert max-w-none">
                <div className="text-white/80 leading-relaxed whitespace-pre-wrap">
                  {answer}
                </div>
              </div>
            )}

            {/* Footer */}
            {!isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 pt-4 border-t border-white/10 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-white/40">
                    <CheckCircle size={16} weight="fill" className="text-[#00FFC2]" />
                    <span>Verified from sovereign inferred knowledge base on 3verest</span>
                  </div>
                  {onClose && (
                    <button
                      onClick={onClose}
                      className="text-xs text-white/40 hover:text-white/80 transition-colors"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Powered by Altitude Ai */}
                <div className="flex items-center justify-center gap-2 text-xs text-white/30">
                  <Lightning size={14} weight="fill" className="text-[#00FFC2]/40" />
                  <span>Powered by</span>
                  <span className="text-[#00FFC2]/60 font-semibold">Altitude Ai</span>
                  <span>, an 3verest Futures Project.</span>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Suggested follow-ups */}
        {!isLoading && onSuggestionClick && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4 flex flex-wrap gap-2 justify-center"
          >
            <span className="text-xs text-white/30">Try asking about:</span>
            {suggestions.map((topic) => (
              <motion.button
                key={topic}
                onClick={() => onSuggestionClick(topic)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white/80 transition-all border border-white/10 hover:border-[#00FFC2]/30 cursor-pointer"
              >
                {topic}
              </motion.button>
            ))}
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
