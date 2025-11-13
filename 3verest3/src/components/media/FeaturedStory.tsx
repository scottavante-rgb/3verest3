'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

const FeaturedStory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const story = {
    image: '/3cko.png',
    tag: 'Announcement',
    headline: '3verest announces 3cko: the new voice in healthcare',
    summary:
      'Sydney, 13 November 2025. 3verest today announced the launch of 3cko, a sovereign medical voice solution that marks a significant expansion of the company\'s Future Labs program.',
    body: `Sydney, 13 November 2025

3verest today announced the launch of 3cko, a sovereign medical voice solution that marks a significant expansion of the company's Future Labs program and its commitment to building the next generation of healthcare technology.

3cko represents a new chapter for clinical transcription and real time medical audio services. Built within the 3verest sovereign cloud, and positioned directly beside customer workloads, 3cko delivers exceptionally low latency, high fidelity transcription and a medical vocabulary engine shaped by clinical practice. It is purpose built for radiology, pathology and wider healthcare environments where accuracy, privacy and immediacy matter.

As a voice application, 3cko is designed to be simple, elegant and invisible. Clinicians activate it with a single action. The service captures spoken notes and observations, processes them securely within the sovereign cloud, and returns clean, contextually aware text ready to be placed into reports, worklists or clinical systems. No data leaves the sovereign boundary and no external AI services are used. 3cko is healthcare first in both intention and execution.

The performance of 3cko is enabled by a fully controlled technology stack. It runs inside 3verest regions, close to PACS, RIS, reporting platforms and clinical datasets. This proximity allows the system to understand medical language with precision, adapt to local terminology, and deliver transcription at a speed that feels instantaneous. The result is a voice solution that becomes part of the clinical rhythm rather than a separate tool.

3verest is currently working with a small control group of partners who are integrating the 3cko SDK and API into their applications. This measured approach ensures that early adopters influence the refinement of the platform, shaping capabilities, feedback loops and the broader medical vocabulary engine. More information on this partner program will be released as 3cko moves through its phased introduction.

Scott Crawford, Founder and CEO of 3verest, said that 3cko reflects the natural evolution of the company's vision.

"Our in house AI capability and our sovereign cloud foundation make services like 3cko not only possible, but logical. Healthcare deserves technology that is crafted for its reality. Real time voice is a natural extension of the trusted infrastructure we already run for radiology, pathology and wider clinical systems."

3cko will be available as a standalone service and as an integrated feature within platforms that build on the 3verest sovereign cloud. More technical information, product guidance and partner pathways will be added to the 3verest Futures 2030 program in the coming weeks.

For further information, please contact 3verest.`,
    readTime: '4 min read',
    date: '13 November 2025',
    region: 'Sydney, Australia',
  };

  return (
    <>
      <section className="pt-2 pb-12 md:pt-4 md:pb-16 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-8 rounded-3xl overflow-hidden"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Image Side */}
          <motion.div
            className="relative h-64 md:h-full min-h-[400px] overflow-hidden"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src={story.image}
              alt={story.headline}
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Content Side */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <motion.div
              className="inline-block px-4 py-2 rounded-full bg-[#00AEEF]/20 text-[#00AEEF] text-xs font-medium tracking-wide uppercase mb-6 w-fit"
            >
              {story.tag}
            </motion.div>

            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6 leading-tight"
              whileHover={{ letterSpacing: '0.02em' }}
              transition={{ duration: 0.3 }}
            >
              {story.headline}
            </motion.h2>

            <p className="text-lg text-white/70 mb-8 leading-relaxed">
              {story.summary}
            </p>

            <motion.button
              onClick={() => setIsModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full bg-[#00AEEF] hover:bg-[#32F5C8] text-white font-medium tracking-wide uppercase transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(0,174,239,0.5)] w-fit"
            >
              Read Story
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 overflow-y-auto"
            onClick={() => setIsModalOpen(false)}
          >
            <div className="min-h-screen flex items-start justify-center p-4 pt-20">
              <motion.div
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
                {/* Close Button - Top Right */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all"
                >
                  ✕
                </button>

              {/* Modal Content */}
              <div className="p-8 md:p-12">
                {/* Metadata Chips */}
                <div className="flex flex-wrap gap-3 mb-8">
                  <span className="px-4 py-2 rounded-full bg-[#00AEEF]/20 text-[#00AEEF] text-xs font-medium uppercase">
                    {story.tag}
                  </span>
                  <span className="px-4 py-2 rounded-full bg-white/10 text-white/70 text-xs font-medium uppercase">
                    {story.region}
                  </span>
                  <span className="px-4 py-2 rounded-full bg-white/10 text-white/70 text-xs font-medium uppercase">
                    {story.date}
                  </span>
                  <span className="px-4 py-2 rounded-full bg-white/10 text-white/70 text-xs font-medium uppercase">
                    {story.readTime}
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                  {story.headline}
                </h2>

                <div className="prose prose-invert prose-lg max-w-none">
                  <p className="text-white/80 leading-relaxed text-lg whitespace-pre-line" style={{ lineHeight: '1.8' }}>
                    {story.body}
                  </p>
                </div>
              </div>
            </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FeaturedStory;
