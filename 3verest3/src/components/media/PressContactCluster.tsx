'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const PressContactCluster = () => {
  const [isPressKitOpen, setIsPressKitOpen] = useState(false);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const contacts = [
    {
      region: 'Europe (Germany)',
      name: 'Rainer Herzog',
      title: 'Managing Director, 3verest Germany',
      email: 'rainer.herzog@3verest.com',
      phone: '+49 178 534 0067',
      lat: 52.52,
      lng: 13.405
    },
    {
      region: 'UK',
      name: 'Dr Ian Francis',
      title: 'Chief Medical Officer',
      email: 'Ian.francis@3verest.com',
      lat: 51.5074,
      lng: -0.1278
    },
    {
      region: 'Communications',
      name: 'Timothy Mandian',
      title: 'Communications Manager',
      email: 'timothy.mandian@3verest.com',
      lat: 40.7128,
      lng: -74.0060
    },
  ];

  const pressKitFiles = [
    {
      name: 'Logo Pack',
      format: 'README',
      size: 'Info',
      url: '/press-kit/logo-pack-readme.md',
      download: 'logo-pack-readme.md'
    },
    {
      name: 'Brand Guidelines',
      format: 'MD',
      size: 'View',
      url: '/press-kit/3verest-brand-guidelines.md',
      download: '3verest-brand-guidelines.md'
    },
    {
      name: 'Boilerplate',
      format: 'MD',
      size: 'View',
      url: '/press-kit/3verest-boilerplate.md',
      download: '3verest-boilerplate.md'
    },
    {
      name: '3IP & Summit AI Launch',
      format: 'MD',
      size: 'View',
      url: '/press-kit/press-release-3ip-summit-ai-launch.md',
      download: 'press-release-3ip-summit-ai-launch.md'
    },
    {
      name: 'Germany Expansion 2025',
      format: 'MD',
      size: 'View',
      url: '/press-kit/press-release-germany-expansion-2025.md',
      download: 'press-release-germany-expansion-2025.md'
    },
  ];

  return (
    <>
      <section className="py-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-display font-bold text-white mb-4 text-center"
        >
          Press Enquiries
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/70 text-center mb-16 text-lg max-w-2xl mx-auto"
        >
          For all media and collaboration enquiries, contact{' '}
          <a href="mailto:press@3verest.com" className="text-[#00AEEF] hover:text-[#32F5C8] transition-colors">
            press@3verest.com
          </a>
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Regional Contacts Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl p-8 md:p-10"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.25)',
            }}
          >
            <h3 className="text-2xl font-display font-bold text-white mb-6">
              Regional Contacts
            </h3>

            {/* Animated Globe Visualization */}
            <div className="relative h-48 mb-8 rounded-xl overflow-hidden bg-gradient-to-br from-[#0A0F1A] to-[#1A1F2E]">
              {/* Globe Grid */}
              <div className="absolute inset-0">
                <svg className="w-full h-full opacity-20">
                  <defs>
                    <pattern id="globe-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="10" cy="10" r="1" fill="#00AEEF" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#globe-grid)" />
                </svg>
              </div>

              {/* Markers for each region */}
              {contacts.map((contact, index) => (
                <motion.div
                  key={contact.region}
                  className="absolute w-4 h-4 rounded-full border-2 border-[#00AEEF] bg-[#00AEEF]/50"
                  style={{
                    left: `${20 + index * 25}%`,
                    top: `${30 + Math.sin(index) * 20}%`,
                  }}
                  animate={{
                    scale: hoveredRegion === contact.region ? 1.5 : 1,
                    boxShadow: hoveredRegion === contact.region
                      ? '0 0 20px rgba(0, 174, 239, 0.8)'
                      : '0 0 10px rgba(0, 174, 239, 0.3)',
                  }}
                  whileHover={{ scale: 1.5 }}
                />
              ))}
            </div>

            {/* Contact List */}
            <div className="space-y-4">
              {contacts.map((contact, index) => (
                <motion.div
                  key={contact.region}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  onHoverStart={() => setHoveredRegion(contact.region)}
                  onHoverEnd={() => setHoveredRegion(null)}
                  className="p-5 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer border border-white/0 hover:border-[#00AEEF]/50"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-[#00AEEF] font-semibold text-sm uppercase tracking-wide">{contact.region}</div>
                    <div className="w-2 h-2 rounded-full bg-[#00AEEF] mt-1" />
                  </div>
                  <div className="text-white font-medium text-lg mb-1">{contact.name}</div>
                  {contact.title && (
                    <div className="text-white/60 text-sm mb-2">{contact.title}</div>
                  )}
                  <div className="space-y-1">
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-white/70 hover:text-[#00AEEF] text-sm transition-colors block"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {contact.email}
                    </a>
                    {contact.phone && (
                      <a
                        href={`tel:${contact.phone}`}
                        className="text-white/70 hover:text-[#00AEEF] text-sm transition-colors block"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {contact.phone}
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Press Kit Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl p-8 md:p-10 flex flex-col"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.25)',
            }}
          >
            <h3 className="text-2xl font-display font-bold text-white mb-6">
              Press Resources
            </h3>

            <p className="text-white/70 mb-8 leading-relaxed">
              We welcome journalists, analysts, and collaborators shaping the future of healthcare infrastructure.
            </p>

            <motion.button
              onClick={() => setIsPressKitOpen(!isPressKitOpen)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-8 py-4 rounded-full bg-[#00AEEF] hover:bg-[#32F5C8] text-white font-medium tracking-wide uppercase transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(0,174,239,0.5)]"
            >
              {isPressKitOpen ? 'Close Press Kit' : 'Download Press Kit'}
            </motion.button>

            <AnimatePresence>
              {isPressKitOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 space-y-3 overflow-hidden"
                >
                  {pressKitFiles.map((file, index) => (
                    <motion.a
                      key={file.name}
                      href={file.url}
                      download={file.download}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-[#00AEEF]/50 group"
                    >
                      <div>
                        <div className="text-white font-medium group-hover:text-[#00AEEF] transition-colors">
                          {file.name}
                        </div>
                        <div className="text-white/60 text-sm">
                          {file.format} • {file.size}
                        </div>
                      </div>
                      <motion.div
                        className="text-[#00AEEF]"
                        whileHover={{ x: 4 }}
                      >
                        →
                      </motion.div>
                    </motion.a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default PressContactCluster;
