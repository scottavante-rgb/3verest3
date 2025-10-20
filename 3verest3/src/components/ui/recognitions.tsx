'use client';

import { motion } from 'framer-motion';

const Recognitions = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.2 }}
      className="flex flex-col items-center justify-center w-full py-8 bg-transparent text-white"
    >
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
        {/* Award 1 */}
        <div className="flex items-center gap-3 text-center">
          {/* Left Laurel */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
            <path d="M8 3 C5 7,5 13,8 17 M8 17 C7 18,6 19,5 20" />
          </svg>
          <div>
            <p className="font-serif text-lg md:text-xl" style={{ fontFamily: 'var(--font-playfair)' }}>Chosen by</p>
            <p className="text-xs tracking-widest uppercase opacity-80">Global Imaging OEMs</p>
          </div>
          {/* Right Laurel (mirrored) */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 transform scale-x-[-1]">
            <path d="M8 3 C5 7,5 13,8 17 M8 17 C7 18,6 19,5 20" />
          </svg>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-10 bg-white/10"></div>

        {/* Award 2 */}
        <div className="flex items-center gap-3 text-center">
          {/* Left Laurel */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
            <path d="M8 3 C5 7,5 13,8 17 M8 17 C7 18,6 19,5 20" />
          </svg>
          <div>
            <p className="font-serif text-lg md:text-xl" style={{ fontFamily: 'var(--font-playfair)' }}>Global Health Cloud</p>
            <p className="text-xs tracking-widest uppercase opacity-80">Innovator 2025</p>
          </div>
          {/* Right Laurel (mirrored) */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 transform scale-x-[-1]">
            <path d="M8 3 C5 7,5 13,8 17 M8 17 C7 18,6 19,5 20" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

export default Recognitions;
