'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

interface MediaCard {
  id: number;
  image: string;
  tag: string;
  headline: string;
  summary: string;
  body: string;
  date?: string;
  region?: string;
  readTime?: string;
}

const MediaMosaicGrid = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const mediaCards: MediaCard[] = [
    {
      id: 1,
      image: '/german.jpg',
      tag: 'Announcement',
      headline: '3verest Expands Its Sovereign Healthcare Cloud in Germany, Appoints Rainer Herzog as Managing Director',
      summary: 'Berlin | 10 November 2025. 3verest announces a major expansion with three sovereign healthcare cloud capsules across Germany and the opening of its new Berlin office.',
      body: `Berlin | 10 November 2025

3verest has announced a major expansion of its European operations with the activation of three sovereign healthcare cloud capsules across Germany and the opening of its new Berlin office, reinforcing the company's commitment to one of Europe's most advanced and strategically important healthcare markets.

The expansion positions Germany as a central hub in 3verest's Europe 2030 vision, a network of sovereign, AI-ready cloud regions purpose-built for healthcare, connecting innovation, data, and compliance across the continent.

"Germany is fast becoming the benchmark for sovereign cloud adoption in healthcare," said Scott Crawford, CEO and Founder of 3verest. "Our investment here reflects a long-term commitment to sovereignty, trust, and innovation. With our new Berlin base and three operational cloud capsules, we are building the digital infrastructure that will power the next decade of European healthcare."

A Stronger, Smarter Cloud for German Healthcare

The three new sovereign cloud capsules, located in Frankfurt, Munich, and Berlin, are each engineered specifically for healthcare imaging, data, and AI workloads. They provide region-locked sovereignty, sub-150 millisecond access performance, and 99.999% uptime, with full compliance under GDPR, BSI-C5, and emerging EU AI Act frameworks.

Each site integrates with 3verest's Summit AI layer, an adaptive intelligence framework that blends large language model reasoning with task-specific expert systems, allowing German healthcare organisations to automate workflows, accelerate reporting, and derive insight from data without ever leaving national boundaries.

The expansion also includes the establishment of 3verest's new European headquarters in Berlin, located in the heart of the city's innovation district. The Berlin office will serve as a centre for engineering, compliance, and customer success, supporting 3verest's rapidly growing network of European partners.

Leadership and Vision

As part of the expansion, Rainer Herzog has been appointed as Managing Director for Germany. With over 25 years of leadership experience in digital health, cybersecurity, and medical technology, Herzog will lead 3verest's German operations and partner engagement strategy.

"Germany represents the perfect intersection of healthcare innovation, engineering precision, and regulatory excellence," said Herzog. "3verest's sovereign cloud model fits perfectly with the needs of German healthcare providers and technology partners, offering total control, transparency, and trust."

Under Herzog's leadership, 3verest will continue to strengthen partnerships with leading healthcare OEMs, imaging networks, and government stakeholders, delivering infrastructure that is both sovereign and scalable.

A Foundation for the Future

Each 3verest capsule operates as a self-contained sovereign region, built on high-performance AMD EPYC compute, NVMe-based storage, and a non-oversubscribed spine-leaf network. The architecture delivers diagnostic-grade performance while maintaining regional autonomy, a key differentiator in healthcare's regulatory landscape.

"Our mission in Germany goes beyond technology," added Crawford. "We are building trust, the kind of trust that healthcare depends on. 3verest gives organisations the ability to innovate boldly, knowing their data, their compliance, and their sovereignty are protected at every layer."

This expansion marks the latest milestone in 3verest's broader European growth plan, following established operations in the United Kingdom, France, and the Netherlands, with further regional deployments planned in Italy and the Nordics in 2026.

3verest: Where Healthcare Cloud Finds Its Altitude

3verest delivers end-to-end managed cloud solutions purpose-built for healthcare, from infrastructure and migration to security, AI, and operations. Each environment is designed, built, and supported by 3verest's global team, combining sovereign infrastructure with concierge-level management.

Berlin Office
3verest GmbH
Jaegerstraße 54, Berlin 10117, Germany

Media Enquiries
+49 178 534 0067
press@3verest.com

3verest builds the sovereign foundations on which the future of healthcare will run.`,
      date: '10 November 2025',
      region: 'Berlin, Germany',
      readTime: '5 min read',
    },
  ];

  const getTagColor = (tag: string) => {
    const colors: { [key: string]: string } = {
      Announcement: 'bg-[#00AEEF]/20 text-[#00AEEF]',
      Feature: 'bg-[#32F5C8]/20 text-[#32F5C8]',
      Event: 'bg-purple-500/20 text-purple-400',
      'Summit AI': 'bg-orange-500/20 text-orange-400',
    };
    return colors[tag] || 'bg-white/20 text-white/70';
  };

  return (
    <>
      <section className="py-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-display font-bold text-white mb-16 text-center"
        >
          Latest Stories
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mediaCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`relative rounded-2xl overflow-hidden cursor-pointer ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.25)',
              }}
              onClick={() => setExpandedCard(card.id)}
            >
              {/* Image */}
              <div
                className={`relative ${
                  index === 0 ? 'h-96' : 'h-56'
                } overflow-hidden`}
              >
                <Image
                  src={card.image}
                  alt={card.headline}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase mb-3 ${getTagColor(
                    card.tag
                  )}`}
                >
                  {card.tag}
                </motion.div>

                <motion.h3
                  initial={{ y: 10, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className={`font-display font-bold text-white mb-3 ${
                    index === 0 ? 'text-2xl md:text-3xl' : 'text-xl'
                  }`}
                >
                  {card.headline}
                </motion.h3>

                <p className="text-white/70 text-sm leading-relaxed">
                  {card.summary}
                </p>

                <motion.button
                  whileHover={{ x: 4 }}
                  className="mt-4 text-[#00AEEF] hover:text-[#32F5C8] font-medium text-sm uppercase tracking-wide transition-colors"
                >
                  Read Story →
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Expanded Story Modal */}
      <AnimatePresence>
        {expandedCard !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 overflow-y-auto"
            onClick={() => setExpandedCard(null)}
          >
            <div className="min-h-screen flex items-start justify-center p-4 pt-20">
            {mediaCards
              .filter((card) => card.id === expandedCard)
              .map((card) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.3 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-[#0F1C29] rounded-3xl max-w-4xl w-full mb-20 overflow-hidden relative"
                  style={{
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  {/* Modal Header Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.headline}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Close Button - Top Right */}
                  <button
                    onClick={() => setExpandedCard(null)}
                    className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all"
                  >
                    ✕
                  </button>

                  {/* Modal Content */}
                  <div className="p-8 md:p-12">
                    {/* Metadata Chips */}
                    <div className="flex flex-wrap gap-3 mb-8">
                      <span className={`px-4 py-2 rounded-full text-xs font-medium uppercase ${getTagColor(card.tag)}`}>
                        {card.tag}
                      </span>
                      {card.region && (
                        <span className="px-4 py-2 rounded-full bg-white/10 text-white/70 text-xs font-medium uppercase">
                          {card.region}
                        </span>
                      )}
                      {card.date && (
                        <span className="px-4 py-2 rounded-full bg-white/10 text-white/70 text-xs font-medium uppercase">
                          {card.date}
                        </span>
                      )}
                      {card.readTime && (
                        <span className="px-4 py-2 rounded-full bg-white/10 text-white/70 text-xs font-medium uppercase">
                          {card.readTime}
                        </span>
                      )}
                    </div>

                    <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                      {card.headline}
                    </h2>

                    <div className="prose prose-invert prose-lg max-w-none">
                      <p className="text-white/80 leading-relaxed text-lg whitespace-pre-line" style={{ lineHeight: '1.8' }}>
                        {card.body}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MediaMosaicGrid;
