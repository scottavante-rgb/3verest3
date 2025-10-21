'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { MagnifyingGlass, Lightning } from 'phosphor-react';
import { SummitResponse } from './SummitResponse';

interface SearchResponse {
  query: string;
  answer: string;
  timestamp: string;
}

interface ChatHistory {
  id: string;
  query: string;
  answer: string;
  timestamp: string;
}

const AISearchBox = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<SearchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const fullText = '3verest\'s 2030 platform is built entirely on Ai.';

  // Typing animation effect
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setPlaceholder(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch('/api/ai/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: inputValue }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to get response from Summit');
      }

      const newResponse = {
        query: inputValue,
        answer: data.data.answer,
        timestamp: new Date().toISOString(),
      };

      setResponse(newResponse);

      // Add to chat history
      setChatHistory((prev) => [
        {
          id: Date.now().toString(),
          ...newResponse,
        },
        ...prev,
      ]);
    } catch (err) {
      console.error('AI Search Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to connect to Summit AI');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setResponse(null);
    setError(null);
    setInputValue('');
    inputRef.current?.focus();
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    inputRef.current?.focus();
    // Auto-submit after a brief delay
    setTimeout(() => {
      const form = inputRef.current?.form;
      if (form) {
        form.requestSubmit();
      }
    }, 100);
  };

  const handleHistoryItemClick = (item: ChatHistory) => {
    setResponse({
      query: item.query,
      answer: item.answer,
      timestamp: item.timestamp,
    });
    setShowHistory(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
      className="w-full max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="relative">
        <motion.div
          animate={{
            scale: isFocused ? 1.02 : 1,
            boxShadow: isFocused 
              ? '0 0 20px rgba(0, 255, 194, 0.3)' 
              : 'none',
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="relative"
        >
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <motion.div
              animate={{
                opacity: isFocused ? 1 : 0.6,
                scale: isFocused ? 1.1 : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              <MagnifyingGlass size={20} weight="bold" className="text-[#00FFC2]" />
            </motion.div>
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="w-full h-12 sm:h-14 md:h-16 pl-10 sm:pl-12 pr-16 sm:pr-20 py-3 sm:py-4 text-white placeholder-white/50 bg-black/30 backdrop-blur-xl border border-[#00FFC2]/20 focus:border-[#00FFC2]/60 focus:outline-none focus:ring-0 transition-all duration-300 text-base md:text-lg rounded-full shadow-[0_0_30px_rgba(0,255,194,0.1)]"
          />
          
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05, x: 2 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full bg-gradient-to-br from-[#00FFC2] to-[#00D4A0] hover:shadow-[0_0_20px_rgba(0,255,194,0.5)] transition-all duration-300 group relative overflow-hidden"
            >
              {/* Pulse effect on hover */}
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 2, opacity: [0, 0.3, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              />

              <motion.div
                animate={{
                  x: isFocused ? [0, 2, 0] : 0,
                }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Lightning size={20} weight="fill" className="text-black relative z-10" />
              </motion.div>
            </motion.button>
          </div>
        </motion.div>
        
        {/* Animated glow effect */}
        <motion.div
          animate={{
            opacity: isFocused ? 0.8 : 0.3,
            scale: isFocused ? 1.02 : 1,
          }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-gradient-to-r from-[#00FFC2]/30 via-[#00D4FF]/20 to-[#00FFC2]/30 blur-2xl -z-10 rounded-full"
        />
      </form>

      {/* Helper text */}
      {!response && !isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-4 text-center"
        >
          <span className="text-white/40 text-sm tracking-wide">
            Powered by <span className="text-[#00FFC2]/70 font-semibold">Altitude Ai</span>, an 3verest Futures Project.
          </span>
        </motion.div>
      )}

      {/* Error message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center"
        >
          {error}
        </motion.div>
      )}

      {/* Response */}
      {(response || isLoading) && (
        <SummitResponse
          query={response?.query || inputValue}
          answer={response?.answer || ''}
          isLoading={isLoading}
          onClose={handleClear}
          onSuggestionClick={handleSuggestionClick}
        />
      )}

      {/* Previous Chats */}
      {chatHistory.length > 0 && !response && !isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 max-w-3xl mx-auto"
        >
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center justify-between w-full px-4 py-2 text-sm text-white/60 hover:text-white/90 transition-colors"
          >
            <span className="tracking-wide">Previous Chats ({chatHistory.length})</span>
            <motion.span
              animate={{ rotate: showHistory ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              ▼
            </motion.span>
          </button>

          {showHistory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 space-y-2"
            >
              {chatHistory.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleHistoryItemClick(item)}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full text-left p-4 rounded-lg glass-panel hover:border-[#00FFC2]/30 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-lg bg-[#00FFC2]/10 group-hover:bg-[#00FFC2]/20 transition-colors flex-shrink-0">
                      <Lightning size={16} weight="fill" className="text-[#00FFC2]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white/90 font-medium truncate">
                        {item.query}
                      </p>
                      <p className="text-xs text-white/40 mt-1">
                        {new Date(item.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default AISearchBox;
