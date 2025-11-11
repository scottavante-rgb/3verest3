'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

interface TimelineEvent {
  id: number;
  year: string;
  title: string;
  description: string;
  lat?: number;
  lng?: number;
}

const TimelineBand = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeEvent, setActiveEvent] = useState<number | null>(null);

  const events: TimelineEvent[] = [
    {
      id: 1,
      year: '2025',
      title: 'Global Expansion Announcement',
      description: 'Major expansion across European and North American markets, bringing sovereign healthcare cloud infrastructure to new regions.',
      lat: 52.52,
      lng: 13.405,
    },
    {
      id: 2,
      year: '2025',
      title: 'New Strategic Partnerships',
      description: 'Collaboration with leading healthcare providers and technology partners to deliver next-generation medical imaging solutions.',
      lat: 51.5074,
      lng: -0.1278,
    },
    {
      id: 3,
      year: '2024',
      title: 'Future Labs Launch',
      description: 'Introduction of 3verest Future Labs, advancing AI-driven healthcare innovation and sovereign infrastructure research.',
      lat: 45.5017,
      lng: -73.5673,
    },
    {
      id: 4,
      year: '2023',
      title: 'OEM Collaborations Established',
      description: 'Strategic partnerships with major OEM vendors, enhancing our sovereign cloud ecosystem with integrated solutions.',
      lat: -33.8688,
      lng: 151.2093,
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 md:px-8 overflow-hidden bg-gradient-to-b from-[#0A0F1A] to-[#0F1C29]">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-display font-bold text-white mb-4 text-center"
      >
        Living Timeline
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-white/70 text-center mb-16 text-lg"
      >
        Years of Innovation
      </motion.p>

      {/* Timeline Container */}
      <div className="relative">
        {/* Parallax Map Background */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, #00AEEF 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
          initial={{ scale: 1 }}
          whileInView={{ scale: 1.1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
        />

        {/* Horizontal Scroll Timeline */}
        <div
          ref={scrollRef}
          className="relative flex gap-8 overflow-x-auto pb-8 px-4 scroll-smooth"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(0, 174, 239, 0.3) rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Timeline Line */}
          <div className="absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00AEEF]/30 to-transparent" />

          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative flex-shrink-0 w-80"
            >
              {/* Timeline Node */}
              <div className="flex flex-col items-center mb-6">
                <motion.div
                  className={`w-4 h-4 rounded-full border-2 border-[#00AEEF] transition-all duration-300 cursor-pointer ${
                    activeEvent === event.id
                      ? 'bg-[#00AEEF] shadow-lg shadow-[#00AEEF]/50 scale-150'
                      : 'bg-[#0F1C29]'
                  }`}
                  whileHover={{ scale: 1.5, boxShadow: '0 0 20px rgba(0, 174, 239, 0.8)' }}
                  onClick={() => setActiveEvent(activeEvent === event.id ? null : event.id)}
                />
                <div className="w-0.5 h-12 bg-gradient-to-b from-[#00AEEF]/50 to-transparent mt-2" />
              </div>

              {/* Event Card */}
              <motion.div
                className="rounded-2xl p-6 transition-all duration-300 cursor-pointer"
                style={{
                  background: activeEvent === event.id
                    ? 'rgba(0, 174, 239, 0.1)'
                    : 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(16px)',
                  border: `1px solid ${activeEvent === event.id ? 'rgba(0, 174, 239, 0.5)' : 'rgba(255, 255, 255, 0.1)'}`,
                  boxShadow: activeEvent === event.id
                    ? '0 0 40px rgba(0, 174, 239, 0.3)'
                    : '0 10px 40px rgba(0, 0, 0, 0.25)',
                }}
                whileHover={{ y: -4 }}
                onClick={() => setActiveEvent(activeEvent === event.id ? null : event.id)}
              >
                {/* Year Badge */}
                <div className="inline-block px-4 py-2 rounded-full bg-[#00AEEF]/20 text-[#00AEEF] text-sm font-bold mb-4">
                  {event.year}
                </div>

                {/* Thumbnail Placeholder */}
                <div className="w-full h-32 rounded-lg bg-gradient-to-br from-[#00AEEF]/20 to-[#32F5C8]/20 mb-4 flex items-center justify-center">
                  <span className="text-white/30 text-xs">Thumbnail</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-display font-bold text-white mb-2">
                  {event.title}
                </h3>

                {/* Description */}
                <p className="text-white/70 text-sm leading-relaxed">
                  {event.description}
                </p>

                {/* Coordinates (if available) */}
                {event.lat && event.lng && (
                  <div className="mt-4 text-xs text-[#00AEEF]/70 font-mono">
                    {event.lat.toFixed(2)}°, {event.lng.toFixed(2)}°
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Scroll Hint */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-center mt-8 text-white/50 text-sm"
        >
          ← Scroll to explore timeline →
        </motion.div>
      </div>
    </section>
  );
};

export default TimelineBand;
