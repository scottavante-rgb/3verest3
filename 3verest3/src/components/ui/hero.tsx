'use client';

import { motion } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';
import AISearchBox from './aisearchbox';
import Recognitions from './recognitions';

const Hero = () => {
  const { x, y } = useMousePosition();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
          style={{
            filter: 'brightness(1.05) contrast(1.05)',
            transform: 'scale(1.01)',
          }}
          ref={(el) => {
            if (el) {
              el.playbackRate = 1.0;
              // Lazy load and play video
              const playVideo = () => {
                el.play().catch((error) => {
                  console.log('Video autoplay prevented:', error);
                });
              };

              // Use Intersection Observer for better performance
              if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                  entries.forEach(entry => {
                    if (entry.isIntersecting) {
                      playVideo();
                      observer.disconnect();
                    }
                  });
                }, { threshold: 0.25 });
                observer.observe(el);
              } else {
                playVideo();
              }
            }
          }}
        >
          <source src="/fly.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Parallax cursor effect */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(0, 255, 194, 0.1), transparent 40%)`,
        }}
      />

      {/* Main Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Main Wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="mb-4"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-white threeverest-glow" style={{ fontFamily: 'var(--font-playfair)' }}>
            Sovereign Healthcare Cloud.
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
          className="mb-12"
        >
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#00FFC2]/70 font-light tracking-wide">
            Reinvented.
          </p>
        </motion.div>

        {/* AI Search Box */}
        <AISearchBox />

        {/* Recognition Awards */}
        <Recognitions />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-3 bg-[#00FFC2] rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
