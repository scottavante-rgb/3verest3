'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/contexts/theme-context';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const rippleIdRef = useRef(0);
  const { theme } = useTheme();

  // Determine if we're on a light background page
  const isLightPage = pathname === '/about' || pathname === '/contact' || pathname === '/trust' || pathname === '/technology';

  // Track scroll for opacity change
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = rippleIdRef.current++;

    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 800);
  };

  const navItems = [
    { name: 'About', href: '/about' },
    { name: 'Media', href: '/media' },
    { name: 'Technology', href: '/technology' },
    { name: 'Our Cloud', href: '/our-cloud' },
    { name: 'Sovereignty', href: '/sovereignty' },
    { name: 'The Difference', href: '/what-makes-us-different' },
    { name: 'Futures 2030', href: '/futures' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl"
    >
      <div className="relative">
        <motion.div
          className="rounded-full shadow-xl px-4 sm:px-6 md:px-7 lg:px-8 border transition-all duration-700 ease-out"
          style={{
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            backgroundColor: theme === 'dark'
              ? scrolled ? 'rgba(10, 15, 20, 0.7)' : 'rgba(10, 15, 20, 0.6)'
              : scrolled ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.7)',
            borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          }}
        >
          <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0"
          >
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/dot.png"
                alt="3verest Logo"
                width={30}
                height={30}
                className="h-5 sm:h-6 md:h-6 lg:h-7 w-auto"
                style={{
                  filter: 'brightness(1.2) contrast(1.1)',
                  mixBlendMode: 'lighten',
                  background: 'transparent'
                }}
                priority
              />
              <span className={`text-base sm:text-lg font-semibold tracking-wide ${
                isLightPage ? 'text-gray-900' : 'text-white'
              }`} style={{ fontFamily: 'var(--font-montserrat)' }}>
                <span style={{ display: 'inline-block', transform: 'scaleX(-1)' }}>E</span>VEREST
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6 lg:space-x-7">
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="relative"
                >
                  <Link
                    href={item.href}
                    onClick={handleLinkClick}
                    className={`text-xs font-semibold uppercase tracking-wide transition-all duration-300 relative group block overflow-hidden ${
                      isLightPage
                        ? 'text-gray-700 hover:text-gray-900'
                        : 'text-white/80 hover:text-white'
                    }`}
                    style={{
                      transition: 'text-shadow 0.3s ease-out',
                      fontFamily: 'var(--font-inter)',
                      letterSpacing: '0.08em',
                    }}
                  >
                    <span className="relative z-10 group-hover:[text-shadow:0_0_8px_#00FFC2]">
                      {item.name}
                    </span>
                    <motion.span
                      className="absolute -bottom-1 left-1/2 h-0.5 bg-[#00FFC2] shadow-[0_0_8px_#00FFC2]"
                      initial={{ width: 0, x: '-50%' }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                    <AnimatePresence>
                      {ripples.map((ripple) => (
                        <motion.span
                          key={ripple.id}
                          className="absolute rounded-full bg-[#00FFC2]"
                          initial={{ width: 0, height: 0, opacity: 0.15, x: ripple.x, y: ripple.y }}
                          animate={{ width: 160, height: 160, opacity: 0, x: ripple.x - 80, y: ripple.y - 80 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                        />
                      ))}
                    </AnimatePresence>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex-shrink-0 ml-2 flex items-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`focus:outline-none transition-colors duration-200 p-1 ${
                isLightPage
                  ? 'text-gray-700 hover:text-gray-900 focus:text-gray-900'
                  : 'text-white/80 hover:text-white focus:text-white'
              }`}
              aria-label="Toggle menu"
            >
              <div className="flex flex-col space-y-1 w-5 h-5 justify-center">
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? 5 : 0,
                  }}
                  className="w-full h-0.5 bg-current transition-all duration-300"
                />
                <motion.span
                  animate={{
                    opacity: isMobileMenuOpen ? 0 : 1,
                  }}
                  className="w-full h-0.5 bg-current transition-all duration-300"
                />
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? -5 : 0,
                  }}
                  className="w-full h-0.5 bg-current transition-all duration-300"
                />
              </div>
            </motion.button>
          </div>
          </div>
        </motion.div>

        {/* Mobile Navigation Menu - Square box with rounded edges */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="md:hidden mt-3 rounded-xl shadow-2xl border max-w-xs sm:max-w-sm"
              style={{
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                backgroundColor: theme === 'dark'
                  ? 'rgba(10, 15, 20, 0.95)'
                  : 'rgba(255, 255, 255, 0.95)',
                borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              }}
            >
              <div className="py-2 md:py-3 px-2 md:px-3">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={`block px-4 py-3 text-xs sm:text-sm font-medium uppercase tracking-wider transition-all duration-200 rounded-lg break-words ${
                        isLightPage
                          ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/80'
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;






