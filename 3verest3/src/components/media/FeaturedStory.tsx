'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

const FeaturedStory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const story = {
    image: '/3ip.png',
    tag: 'Announcement',
    headline: '3verest Unveils the World\'s First Sovereign Imaging Platform with Summit AI Intelligence',
    summary:
      'Chicago, RSNA 2025. 3verest announces the 3verest Imaging Platform (3IP), the world\'s first sovereign, intelligent, and natively interoperable foundation for medical imaging innovation.',
    body: `Chicago | 11 November 2025 | RSNA 2025

3verest, the global leader in sovereign private cloud for healthcare, today announced the launch of the 3verest Imaging Platform (3IP) at RSNA 2025 in Chicago. 3IP represents a world-class foundation for medical imaging and intelligent data management, built specifically for the demands of modern healthcare.

Born from 3verest 2030 Future Labs

The 3verest Imaging Platform was conceived within 3verest 2030 Future Labs, the company's long-term innovation program dedicated to building the next generation of healthcare infrastructure.

3IP is a sovereign, intelligent, and interoperable foundation engineered for OEMs, PACS vendors, and diagnostic software providers who power global medical imaging. It enables partners to innovate freely without hyperscaler dependency, unpredictable cost, or compliance risk.

3IP is not a product. It is the platform behind your platform, strengthening the infrastructure beneath the world's most trusted imaging systems and combining sovereignty, transparency, and diagnostic-grade performance.

A Sovereign Foundation for Imaging Innovation

3verest Imaging Platform unites control, performance, and regulatory assurance:

• Jurisdictional assurance: Region-locked sovereign zones operated by 3verest, compliant with IRAP, ISO 27001, NHS DSPT, C5, and ISR.

• Sub-second access: First-image latency target under 150 milliseconds.

• AI-ready compute: GPU clusters for reconstruction, segmentation, and inference.

• Predictive elasticity: Adaptive scaling for burst workloads.

• Transparent economics: Fixed pricing, zero egress, and no hidden API fees.

"While hyperscalers focus on scale, we focus on trust," said Scott Crawford, Founder and CEO of 3verest. "3IP gives healthcare organisations worldwide the foundation for performance, compliance, and complete control. We've built this platform to serve the most demanding imaging environments across 19 sovereign cloud locations on four continents."

Summit AI: An Independent Sovereign Intelligence Layer

Alongside the 3verest Imaging Platform, 3verest has partnered with Summit AI to introduce an additional layer of contextual, sovereign intelligence that can be applied across customers' existing healthcare environments, whether on 3IP, on-premises, or within regional sovereign clouds.

Summit AI operates on its own proprietary Mixture of Experts (MoE) and Large Language Model (LLM) architecture. It is entirely sovereign, trained and hosted within secure 3verest regions, with no public or third-party AI models involved.

This new layer transforms healthcare data into understanding. Summit AI brings contextual awareness, adaptive workflow automation, and insight generation that evolves with clinical and operational data across systems:

• Sovereign by design: All inference and learning occur within 3verest capsules; no data leaves jurisdiction.

• Contextual intelligence: Models interpret workflow, language, and clinical intent in context.

• Automation and insight: Converts imaging and operational data into structured intelligence for faster, safer decisions.

• Summit Gain Index (SGI): Quantifies measurable improvements in productivity, accuracy, compliance, and capital efficiency.

"Summit AI delivers contextual sovereign intelligence that can sit above any healthcare system," said Sheraz Bhatti, CTO of 3verest. "It brings the power of AI to where the data already lives, securely, privately, and intelligently."

Built for Those Who Build Healthcare's Future

3IP empowers technology providers to embed or co-brand sovereign imaging solutions:

• Embedded OEM: 3IP powers partner platforms invisibly.

• Co-branded editions: Sovereign-ready versions of partner products.

• Dedicated tenants: Exclusive 3IP instances for enterprise clients.

• Usage-linked licensing: Flexible models tied to SaaS growth.

Each tier includes unlimited API calls, fixed regional pricing, and full audit transparency, protecting OEM margins while ensuring commercial sovereignty.

Global Availability

3verest Imaging Platform and Summit AI's sovereign intelligence layer will begin regional rollout in Q1 2026, with initial deployments across Europe, Australia, North America, Middle East, and Asia-Pacific regions where 3verest operates sovereign cloud infrastructure.

For media enquiries, contact press@3verest.com`,
    readTime: '6 min read',
    date: '11 November 2025',
    region: 'Chicago, USA',
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
