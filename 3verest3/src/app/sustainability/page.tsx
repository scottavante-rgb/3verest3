'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Leaf, Lightning, Recycle, Wind } from 'phosphor-react';
import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';

export default function SustainabilityPage() {
  const router = useRouter();

  const commitments = [
    {
      icon: Lightning,
      title: '100% Renewable Energy',
      description: 'All 3verest data centers are powered by renewable energy sources, with a commitment to carbon neutrality by 2026.',
    },
    {
      icon: Wind,
      title: 'Energy Efficient Infrastructure',
      description: 'Our sovereign cloud architecture uses advanced cooling systems and energy-optimized hardware to minimize environmental impact.',
    },
    {
      icon: Recycle,
      title: 'Circular Hardware Lifecycle',
      description: 'We practice responsible hardware procurement, refurbishment, and recycling to reduce e-waste and extend equipment life.',
    },
    {
      icon: Leaf,
      title: 'Green Data Sovereignty',
      description: 'Localized data storage reduces long-distance data transmission, lowering carbon footprint while enhancing compliance.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAF9] via-[#E8F5F1] to-[#F8FAF9] dark:from-[#0A0A0A] dark:via-[#0D1F1A] dark:to-[#0A0A0A] transition-colors duration-300">
      <Navigation />

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-24 left-6 z-50"
      >
        <motion.button
          onClick={() => router.back()}
          whileHover={{ scale: 1.05, x: -2 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-white/20 hover:border-[#00D6A3] transition-all duration-300 shadow-lg group"
        >
          <ArrowLeft size={20} weight="bold" className="text-gray-700 dark:text-white/80 group-hover:text-[#00D6A3] transition-colors" />
          <span className="text-sm font-medium text-gray-700 dark:text-white/80 group-hover:text-[#00D6A3] transition-colors">Back</span>
        </motion.button>
      </motion.div>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00D6A3]/5 via-transparent to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex p-4 rounded-2xl bg-[#00D6A3]/10 mb-6"
          >
            <Leaf size={40} weight="duotone" className="text-[#00D6A3]" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-6xl font-light text-gray-900 dark:text-white tracking-tight mb-6"
          >
            Sustainability Statement
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl font-light text-[#00D6A3] mb-8"
          >
            Building a sovereign cloud that respects the planet
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg text-gray-800 dark:text-white/90 leading-relaxed font-light"
          >
            At 3verest, we believe that technological sovereignty must align with environmental responsibility. Our commitment to sustainability is woven into every aspect of our cloud infrastructure, from energy sourcing to hardware lifecycle management.
          </motion.p>
        </div>
      </section>

      {/* Our Commitments */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-light text-gray-900 dark:text-white text-center mb-16"
          >
            Our Environmental Commitments
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {commitments.map((commitment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl p-8 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-[#00D6A3]/50 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00D6A3]/0 via-[#00D6A3]/0 to-[#00D6A3]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="inline-flex p-3 rounded-xl bg-[#00D6A3]/10 mb-4 group-hover:bg-[#00D6A3]/20 transition-colors">
                    <commitment.icon size={32} weight="duotone" className="text-[#00D6A3]" />
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    {commitment.title}
                  </h3>

                  <p className="text-gray-800 dark:text-white/90 font-light leading-relaxed">
                    {commitment.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00D6A3]/5 to-transparent opacity-30" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="prose prose-lg dark:prose-invert prose-headings:font-light prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-800 dark:prose-p:text-white/90 prose-li:text-gray-800 dark:prose-li:text-white/90 prose-strong:text-gray-900 dark:prose-strong:text-white max-w-none"
          >
            <h2 className="text-center mb-12">Why Sustainability Matters to Healthcare</h2>

            <p>
              Healthcare generates significant environmental impact through data storage, processing, and transmission. As stewards of healthcare infrastructure, we have a responsibility to minimize this footprint while maximizing patient care outcomes.
            </p>

            <h3>Our Strategy</h3>
            <ul>
              <li><strong>Energy Efficiency First:</strong> Purpose-built infrastructure designed for maximum computational efficiency per watt</li>
              <li><strong>Renewable Energy Partnerships:</strong> Long-term agreements with certified renewable energy providers in every region</li>
              <li><strong>Smart Cooling Systems:</strong> Advanced liquid cooling and free-air cooling technologies to reduce energy consumption</li>
              <li><strong>Carbon Offsetting:</strong> Investment in verified carbon offset programs for unavoidable emissions</li>
              <li><strong>Transparent Reporting:</strong> Annual sustainability reports with independently audited metrics</li>
            </ul>

            <h3>Sovereignty & Sustainability</h3>
            <p>
              Data sovereignty and environmental sustainability are deeply connected. By keeping data local and reducing unnecessary cross-border transfers, we simultaneously enhance compliance and reduce carbon emissions from long-distance data transmission.
            </p>

            <h3>Continuous Improvement</h3>
            <p>
              Sustainability is not a destination but a continuous journey. We regularly assess emerging technologies, industry best practices, and regulatory frameworks to improve our environmental performance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Commitment Box */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-3xl p-8 md:p-12 backdrop-blur-xl bg-gradient-to-br from-[#00D6A3]/20 via-[#00D6A3]/10 to-transparent border border-[#00D6A3]/30 shadow-xl"
          >
            <div className="relative z-10 text-center">
              <h3 className="text-2xl md:text-3xl font-light text-gray-900 dark:text-white mb-4">
                Doing the Right Thing
              </h3>

              <p className="text-lg text-gray-800 dark:text-white/90 mb-6 font-light leading-relaxed">
                Technology should serve humanity without compromising the planet. Every decision we make—from server selection to cooling design—is guided by a simple principle: <strong>do the right thing.</strong>
              </p>

              <p className="text-base text-gray-800 dark:text-white/90 italic font-light">
                We believe that a sovereign, ethical cloud must also be a sustainable cloud. This is our commitment to healthcare, to our partners, and to future generations.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-lg text-gray-800 dark:text-white/90 mb-4 font-light">
              For questions about our sustainability initiatives or to request our annual sustainability report:
            </p>
            <a
              href="mailto:sustainability@3verest.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00D6A3] text-white font-medium hover:bg-[#00B88C] transition-colors duration-300 shadow-lg shadow-[#00D6A3]/20"
            >
              <Leaf size={20} weight="bold" />
              <span>sustainability@3verest.com</span>
            </a>
          </motion.div>
        </div>
      </section>

      <div className="h-20" />
      <Footer />
    </div>
  );
}
