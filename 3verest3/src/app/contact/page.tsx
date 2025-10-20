'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';
import { EnvelopeSimple, InstagramLogo, MapPin, Phone } from 'phosphor-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
    }
  },
};

const ContactPage = () => {
  const { scrollYProgress } = useScroll();
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5],
    ['#f0fffb', '#ffffff']
  );

  return (
    <motion.div className="relative min-h-screen overflow-x-hidden" style={{ backgroundColor }}>
      {/* Navigation */}
      <Navigation />

      <main className="py-32 px-8 md:px-16 lg:px-24 flex flex-col items-center justify-center">
        <div className="max-w-5xl w-full">
          {/* Hero Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-32 text-center"
          >
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-serif tracking-tight leading-tight mb-8"
              style={{ fontFamily: 'var(--font-playfair)', color: '#0B0C0D' }}
            >
              Let's build the future
              <br />
              together.
            </h1>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-[2px] w-40 bg-gradient-to-r from-transparent via-[#00FFC2]/50 to-transparent mx-auto"
            />
          </motion.div>

          {/* Contact Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
            {/* Email Card */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                boxShadow: '0 20px 60px rgba(0, 170, 136, 0.15)',
              }}
              transition={{ duration: 0.3 }}
              className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-100 transition-all duration-300"
            >
              <div className="flex items-start gap-6">
                <motion.div
                  className="p-4 rounded-2xl bg-[#00FFC2]/10"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <EnvelopeSimple size={32} weight="light" className="text-[#00aa88]" />
                </motion.div>
                <div className="flex-1">
                  <h3
                    className="text-2xl font-serif mb-2"
                    style={{ fontFamily: 'var(--font-playfair)', color: '#0B0C0D' }}
                  >
                    Email Us
                  </h3>
                  <p className="text-gray-600 mb-4">
                    For inquiries, partnerships, or support
                  </p>
                  <a
                    href="mailto:hello@3verest.cloud"
                    className="text-[#00aa88] hover:text-[#00FFC2] transition-colors duration-200 text-lg font-medium"
                  >
                    hello@3verest.cloud
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Instagram Card */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                boxShadow: '0 20px 60px rgba(0, 170, 136, 0.15)',
              }}
              transition={{ duration: 0.3 }}
              className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-100 transition-all duration-300"
            >
              <div className="flex items-start gap-6">
                <motion.div
                  className="p-4 rounded-2xl bg-[#00FFC2]/10"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <InstagramLogo size={32} weight="light" className="text-[#00aa88]" />
                </motion.div>
                <div className="flex-1">
                  <h3
                    className="text-2xl font-serif mb-2"
                    style={{ fontFamily: 'var(--font-playfair)', color: '#0B0C0D' }}
                  >
                    Follow Us
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Stay updated with our latest news
                  </p>
                  <a
                    href="https://instagram.com/3verestcloud"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00aa88] hover:text-[#00FFC2] transition-colors duration-200 text-lg font-medium"
                  >
                    @3verestcloud
                  </a>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Office Locations */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32 mt-16">
            {/* London Office */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                boxShadow: '0 20px 60px rgba(0, 170, 136, 0.15)',
              }}
              transition={{ duration: 0.3 }}
              className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-100 transition-all duration-300"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="p-3 rounded-2xl bg-[#00FFC2]/10"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MapPin size={28} weight="light" className="text-[#00aa88]" />
                  </motion.div>
                  <h3
                    className="text-2xl font-serif"
                    style={{ fontFamily: 'var(--font-playfair)', color: '#0B0C0D' }}
                  >
                    London
                  </h3>
                </div>
                <div className="text-gray-600 leading-relaxed">
                  <p>63 St Mary Axe</p>
                  <p>Floor 2</p>
                  <p>London EC3A 8AA</p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Phone size={18} weight="light" className="text-[#00aa88]" />
                  <a
                    href="tel:+442032869870"
                    className="text-[#00aa88] hover:text-[#00FFC2] transition-colors duration-200 font-medium"
                  >
                    +44 (0)20 3286 9870
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Los Angeles Office */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                boxShadow: '0 20px 60px rgba(0, 170, 136, 0.15)',
              }}
              transition={{ duration: 0.3 }}
              className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-100 transition-all duration-300"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="p-3 rounded-2xl bg-[#00FFC2]/10"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MapPin size={28} weight="light" className="text-[#00aa88]" />
                  </motion.div>
                  <h3
                    className="text-2xl font-serif"
                    style={{ fontFamily: 'var(--font-playfair)', color: '#0B0C0D' }}
                  >
                    Los Angeles
                  </h3>
                </div>
                <div className="text-gray-600 leading-relaxed">
                  <p>201 Wilshire Blvd</p>
                  <p>Ste A34</p>
                  <p>Santa Monica</p>
                  <p>CA 90401</p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Phone size={18} weight="light" className="text-[#00aa88]" />
                  <a
                    href="tel:+14243721422"
                    className="text-[#00aa88] hover:text-[#00FFC2] transition-colors duration-200 font-medium"
                  >
                    +1 424 372 1422
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Sydney Office */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                boxShadow: '0 20px 60px rgba(0, 170, 136, 0.15)',
              }}
              transition={{ duration: 0.3 }}
              className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-100 transition-all duration-300"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="p-3 rounded-2xl bg-[#00FFC2]/10"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MapPin size={28} weight="light" className="text-[#00aa88]" />
                  </motion.div>
                  <h3
                    className="text-2xl font-serif"
                    style={{ fontFamily: 'var(--font-playfair)', color: '#0B0C0D' }}
                  >
                    Sydney
                  </h3>
                </div>
                <div className="text-gray-600 leading-relaxed">
                  <p>9-13 Bronte Road</p>
                  <p>Level 1</p>
                  <p>Bondi Junction</p>
                  <p>NSW 2022</p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Phone size={18} weight="light" className="text-[#00aa88]" />
                  <a
                    href="tel:+61290904838"
                    className="text-[#00aa88] hover:text-[#00FFC2] transition-colors duration-200 font-medium"
                  >
                    +61 (0)2 9090 4838
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Berlin Office */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                boxShadow: '0 20px 60px rgba(0, 170, 136, 0.15)',
              }}
              transition={{ duration: 0.3 }}
              className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-100 transition-all duration-300"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="p-3 rounded-2xl bg-[#00FFC2]/10"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MapPin size={28} weight="light" className="text-[#00aa88]" />
                  </motion.div>
                  <h3
                    className="text-2xl font-serif"
                    style={{ fontFamily: 'var(--font-playfair)', color: '#0B0C0D' }}
                  >
                    Berlin
                  </h3>
                </div>
                <div className="text-gray-600 leading-relaxed">
                  <p>Kurfürstendamm 195</p>
                  <p>3rd Floor</p>
                  <p>10707 Berlin</p>
                  <p>Germany</p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Phone size={18} weight="light" className="text-[#00aa88]" />
                  <a
                    href="tel:+61290904838"
                    className="text-[#00aa88] hover:text-[#00FFC2] transition-colors duration-200 font-medium"
                  >
                    +61 (0) 2 9090 4838
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bookend Line */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-40 text-center"
          >
            <motion.h2
              className="text-4xl md:text-6xl font-serif leading-tight tracking-tight"
              style={{ fontFamily: 'var(--font-playfair)', color: '#0B0C0D' }}
              animate={{
                opacity: [1, 0.95, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              Partnership is where
              <br />
              technology becomes real.
            </motion.h2>
            <motion.div
              className="relative w-32 h-[2px] mx-auto mt-8 overflow-hidden"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00FFC2] to-transparent blur-[1px]"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </motion.div>
  );
};

export default ContactPage;
