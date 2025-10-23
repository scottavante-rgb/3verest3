'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';
import Link from 'next/link';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
    }
  },
};

const partners = [
  'GE Healthcare',
  'Siemens Healthineers',
  'Agfa Healthcare',
  'Intelerad',
  'AptVision',
  'Mach7 Technologies',
  'Fidem Interopt',
  'Finao',
  'Sectra',
  'TeraRecon',
  'Philips Healthcare',
  'Modern Cloud',
  'CrowdIT',
  'Nordic Global',
  'Indica Labs',
  'BridgeHead Software',
];

const caseStudies = [
  {
    headline: 'OneWell Beck, London',
    summary: 'OneWell Beck is one of London\'s most forward-thinking diagnostic and outpatient healthcare providers. 3verest designed, built, and manages their complete digital environment from imaging through to administrative systems, hosted entirely within the 3verest private cloud.',
    scope: [
      'Complete system hosting and infrastructure management',
      'Imaging, reporting, and RIS/PACS integration',
      'Security, compliance, and disaster recovery',
      'Continuous performance analytics'
    ],
    result: '99.99% uptime and a 40% improvement in system performance. Internal IT overhead reduced by half, allowing focus to return to patient care.'
  },
  {
    headline: 'Australian Defence Force Global Imaging Infrastructure',
    summary: 'The Australian Defence Force relies on 3verest to host and manage its global imaging infrastructure. 3verest hosts the joint venture between Lumus, Bupa, and the ADF for the imaging of all ADF personnel, providing a single sovereign platform that connects, protects, and delivers imaging securely across the country.',
    scope: [
      'Global imaging platform architecture and deployment',
      'Multi-region sovereign data hosting and replication',
      'High-availability disaster recovery',
      'End-to-end system management, security, and compliance'
    ],
    result: 'Unified global imaging environment, high availability, and sovereign control. A living example of trust and technological excellence.'
  }
];

const PartnersPage = () => {
  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{
        background: 'linear-gradient(180deg, #0B0C0D 0%, #1a1d24 50%, #0B0C0D 100%)'
      }}
    >
      {/* Navigation */}
      <Navigation />

      <main>
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="relative min-h-screen flex items-center justify-center px-6 sm:px-8 md:px-12 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #1a1d24 0%, #0f1419 50%, #1a2332 100%)'
          }}
        >
          {/* Subtle animated lighting */}
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <div className="relative max-w-6xl mx-auto text-center z-10">
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif tracking-tight mb-8"
              style={{
                fontFamily: 'var(--font-playfair)',
                color: '#ffffff'
              }}
            >
              We build with the best.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="text-xl sm:text-2xl md:text-3xl font-light leading-relaxed max-w-4xl mx-auto"
              style={{
                color: '#b0b8c1',
                letterSpacing: '0.01em'
              }}
            >
              Behind every cloud region, every deployment, and every innovation sits a partnership built on trust, precision, and shared purpose.
            </motion.p>
          </div>
        </motion.section>

        {/* Partners Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-32 px-6 sm:px-8 md:px-12"
          style={{ backgroundColor: '#12151a' }}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-20 text-center"
            >
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-serif mb-8 tracking-tight"
                style={{
                  fontFamily: 'var(--font-playfair)',
                  color: '#ffffff'
                }}
              >
                Our Partners
              </h2>
              <p
                className="text-xl md:text-2xl font-light leading-relaxed max-w-3xl mx-auto"
                style={{ color: '#9ca3af' }}
              >
                Every partnership at 3verest represents shared values and a commitment to excellence.
                <br />
                Together, these organisations form the foundation of global healthcare innovation.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
            >
              {partners.map((partner, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.05,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  className="group"
                >
                  <div
                    className="text-center py-8 px-6 rounded-lg transition-all duration-300"
                    style={{
                      backgroundColor: '#1a1d24',
                      border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    <p
                      className="text-lg md:text-xl font-light tracking-wide transition-all duration-300 group-hover:brightness-125"
                      style={{
                        color: '#d1d5db',
                        letterSpacing: '0.05em'
                      }}
                    >
                      {partner}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="h-px w-64 mx-auto"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent)'
          }}
        />

        {/* Case Studies Section */}
        <section className="py-32 px-6 sm:px-8 md:px-12">
          <div className="max-w-5xl mx-auto space-y-32">
            {caseStudies.map((study, index) => (
              <motion.article
                key={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                className="space-y-8"
              >
                <h3
                  className="text-3xl md:text-4xl lg:text-5xl font-serif tracking-tight mb-6"
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    color: '#ffffff'
                  }}
                >
                  {study.headline}
                </h3>

                <p
                  className="text-lg md:text-xl leading-relaxed font-light"
                  style={{ color: '#b0b8c1', lineHeight: '1.8' }}
                >
                  {study.summary}
                </p>

                <div className="space-y-4 pt-4">
                  <h4
                    className="text-lg md:text-xl font-light tracking-wider uppercase"
                    style={{
                      color: '#9ca3af',
                      letterSpacing: '0.15em'
                    }}
                  >
                    Scope
                  </h4>
                  <ul className="space-y-3">
                    {study.scope.map((item, i) => (
                      <li
                        key={i}
                        className="text-base md:text-lg font-light flex items-start"
                        style={{ color: '#b0b8c1' }}
                      >
                        <span className="mr-3 mt-1.5" style={{ color: '#3b82f6' }}>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6">
                  <h4
                    className="text-lg md:text-xl font-light tracking-wider uppercase mb-4"
                    style={{
                      color: '#9ca3af',
                      letterSpacing: '0.15em'
                    }}
                  >
                    Result
                  </h4>
                  <p
                    className="text-lg md:text-xl leading-relaxed font-light"
                    style={{ color: '#ffffff', lineHeight: '1.8' }}
                  >
                    {study.result}
                  </p>
                </div>

                {index < caseStudies.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="h-px w-32 mx-auto mt-20"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent)'
                    }}
                  />
                )}
              </motion.article>
            ))}
          </div>
        </section>

        {/* Closing Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative min-h-screen flex items-center justify-center px-6 sm:px-8 md:px-12"
          style={{
            background: 'linear-gradient(135deg, #1a1d24 0%, #0f1419 50%, #1a2332 100%)'
          }}
        >
          <div className="max-w-5xl mx-auto text-center">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif tracking-tight mb-8"
              style={{
                fontFamily: 'var(--font-playfair)',
                color: '#ffffff'
              }}
            >
              Partnerships power everything we do.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl sm:text-2xl md:text-3xl font-light leading-relaxed mb-16"
              style={{
                color: '#b0b8c1',
                lineHeight: '1.8'
              }}
            >
              Every system we build, every problem we solve, and every cloud we deploy begins with people: engineers, clinicians, innovators aligned under one purpose to make healthcare technology sovereign, seamless, and human.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-4 rounded-sm font-light tracking-wider uppercase transition-all duration-300"
                  style={{
                    backgroundColor: 'transparent',
                    border: '1px solid #3b82f6',
                    color: '#ffffff',
                    letterSpacing: '0.15em',
                    fontSize: '0.875rem'
                  }}
                >
                  Become a Partner
                </motion.button>
              </Link>

              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-4 rounded-sm font-light tracking-wider uppercase transition-all duration-300"
                  style={{
                    backgroundColor: '#3b82f6',
                    border: '1px solid #3b82f6',
                    color: '#ffffff',
                    letterSpacing: '0.15em',
                    fontSize: '0.875rem'
                  }}
                >
                  Talk to Us
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PartnersPage;
