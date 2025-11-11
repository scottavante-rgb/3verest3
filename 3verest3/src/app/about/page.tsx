'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';
import WorldMap from '@/components/ui/world-map';
import { BackgroundLines } from '@/components/ui/background-lines';
import Link from 'next/link';

const fadeUp = {
  hidden: { opacity: 0, y: 40, scale: 1.03 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
    }
  },
};

const AboutPage = () => {
  const { scrollYProgress } = useScroll();
  const textDrift = useTransform(scrollYProgress, [0, 1], ['0%', '1%']);

  const sections = [
    {
      headline: 'Founded in 2017',
      body: [
        "3verest was born from a singular conviction: that healthcare, technology, and artificial intelligence must work together to serve humanity's most critical needs.",
        "We are passionate about healthcare because it touches every life. We are passionate about technology because it can transform care. We are passionate about AI because it can unlock insights that save lives. And we are passionate about our partners because together, we build systems worthy of the trust placed in them.",
        "Since 2017, we have been on a mission to create sovereign cloud infrastructure that honors these commitments.",
      ],
    },
    {
      headline: 'Why We Exist',
      body: [
        "We built 3verest because the world's most vital data, the information that holds our bodies, our identities, and our futures, has been entrusted to systems that were never built to protect it.",
        "For us, sovereignty isn't about isolation or nationalism; it's about trust. It's about ensuring that healthcare, the most human of all sciences, operates within the moral and technical boundaries that respect the people it serves.",
        'We exist to make that possible.',
      ],
    },
    {
      headline: "What's Important to Us",
      body: [
        'We believe that true innovation begins with restraint. That technology should serve clarity, not complexity.',
        'We care about precision, integrity, and the quiet confidence that comes from knowing every decision has been thought through, from the molecules in our machines to the ethics in our algorithms.',
        'We are obsessed with detail, not because it looks good, but because it builds trust.',
      ],
    },
    {
      headline: "What We're Passionate About",
      body: [
        'We are passionate about making technology invisible. When infrastructure disappears, care becomes visible.',
        'We want doctors and radiologists to think less about servers and more about patients, to feel supported by systems that understand them.',
        'Every day we ask the same question: how can we make complexity feel effortless?',
      ],
    },
    {
      headline: 'The Pursuit of Clarity',
      body: [
        'In an age that worships speed, we value stillness. We believe clarity comes from space - the space to think, to question, to build with intention.',
        'Our work is not rushed. It is engineered, discussed, argued, and refined. We find beauty in precision, not performance.',
        'Because when clarity leads, progress follows.',
      ],
    },
    {
      headline: 'The Sovereign Responsibility',
      body: [
        'Sovereignty is not a marketing term; it is a responsibility. It demands that we respect laws, cultures, and the invisible borders that define nations and people.',
        'To us, sovereignty means ensuring that a hospital in Berlin, Sydney, or Montreal knows its data is subject only to its own laws.',
        "It's about dignity - digital dignity - the right to self-determination in the age of machines.",
      ],
    },
    {
      headline: 'Technology with a Conscience',
      body: [
        "We don't believe in neutrality. Every line of code carries intent. Our technology is not detached from ethics; it is shaped by them.",
        'We measure success not by scale, but by sincerity, by how faithfully our systems serve the people who rely on them.',
        'We build software with conscience, because conscience is what turns engineering into purpose.',
      ],
    },
    {
      headline: 'The Human Horizon',
      body: [
        'We see a world where technology and humanity move together, not in competition, but in partnership. Where healthcare systems are not overwhelmed by data, but guided by it.',
        'Where AI understands responsibility as deeply as it understands pattern.',
        "The horizon we work toward is not a machine-made future. It's a human one.",
      ],
    },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ backgroundColor: '#f0fffb' }}>
      {/* Navigation */}
      <Navigation />

      <main className="py-32 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 flex flex-col items-center justify-center">
        <div className="max-w-5xl w-full">
          {/* Hero Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16 text-center"
          >
            <h1
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif tracking-tight leading-tight mb-8"
              style={{ fontFamily: 'var(--font-playfair)', color: '#0B0C0D' }}
            >
              We build infrastructure
              <br />
              worthy of trust.
            </h1>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-[2px] w-40 bg-gradient-to-r from-transparent via-[#00FFC2]/50 to-transparent mx-auto"
            />
          </motion.div>

          {/* Call-to-Action Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mb-32 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/the-difference/partners">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 rounded-full bg-gray-900 text-white hover:bg-[#00D6A3] transition-all duration-300 text-sm font-medium tracking-wide uppercase shadow-lg hover:shadow-xl"
              >
                Partners & Case Studies
              </motion.button>
            </Link>

            <Link href="/trust">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 rounded-full bg-gray-900 text-white hover:bg-[#00D6A3] transition-all duration-300 text-sm font-medium tracking-wide uppercase shadow-lg hover:shadow-xl"
              >
                Trust & Compliance
              </motion.button>
            </Link>
          </motion.div>

          {sections.map((section, index) => (
            <div key={index}>
              <motion.section
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                className="mb-32"
              >
                <motion.div style={{ x: textDrift }}>
                  <h2
                    className="text-4xl md:text-5xl font-serif tracking-tight mb-8"
                    style={{ fontFamily: 'var(--font-playfair)', color: '#0B0C0D' }}
                  >
                    {section.headline}
                  </h2>
                  <div className="space-y-8">
                    {section.body.map((paragraph, i) => (
                      <p
                        key={i}
                        className="text-xl md:text-2xl leading-relaxed font-light"
                        style={{ color: '#3a3a3a', lineHeight: '1.8' }}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </motion.div>
              </motion.section>

              {/* Mint Divider - only between sections, not after last */}
              {index < sections.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="h-[2px] w-32 bg-gradient-to-r from-transparent via-[#00FFC2]/40 to-transparent mx-auto my-24"
                />
              )}
            </div>
          ))}

          {/* Final Closing Space */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-40 text-center"
          >
            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#00FFC2]/60 to-transparent mx-auto" />
          </motion.div>
        </div>

        {/* World Map Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-32 w-full"
        >
          <div className="max-w-6xl mx-auto text-center px-8 mb-16">
            <h2
              className="text-4xl md:text-5xl font-serif tracking-tight mb-6"
              style={{ fontFamily: 'var(--font-playfair)', color: '#0B0C0D' }}
            >
              Global Sovereign Infrastructure
            </h2>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-light" style={{ color: '#3a3a3a', lineHeight: '1.8' }}>
              19 sovereign cloud locations across four continents. Each region operates independently,
              ensuring data remains within jurisdictional boundaries while delivering global performance.
            </p>
          </div>
          <div className="relative w-full max-w-4xl mx-auto h-64 md:h-80 lg:h-96 bg-[#F5F7F5] rounded-2xl shadow-lg overflow-hidden">
            <BackgroundLines />
            <WorldMap
              dots={[
              // Australia
              {
                start: { lat: -33.8688, lng: 151.2093 }, // Sydney
                end: { lat: -37.8136, lng: 144.9631 }, // Melbourne
              },
              {
                start: { lat: -37.8136, lng: 144.9631 }, // Melbourne
                end: { lat: -31.9505, lng: 115.8605 }, // Perth
              },
              // North America West to East
              {
                start: { lat: 34.0522, lng: -118.2437 }, // Los Angeles
                end: { lat: 41.8781, lng: -87.6298 }, // Chicago
              },
              {
                start: { lat: 41.8781, lng: -87.6298 }, // Chicago
                end: { lat: 33.7490, lng: -84.3880 }, // Atlanta
              },
              {
                start: { lat: 33.7490, lng: -84.3880 }, // Atlanta
                end: { lat: 45.5017, lng: -73.5673 }, // Montreal
              },
              {
                start: { lat: 45.5017, lng: -73.5673 }, // Montreal
                end: { lat: 43.6532, lng: -79.3832 }, // Toronto
              },
              // Europe
              {
                start: { lat: 51.5074, lng: -0.1278 }, // London
                end: { lat: 53.4808, lng: -2.2426 }, // Manchester
              },
              {
                start: { lat: 51.5074, lng: -0.1278 }, // London
                end: { lat: 48.8566, lng: 2.3522 }, // Paris
              },
              {
                start: { lat: 48.8566, lng: 2.3522 }, // Paris
                end: { lat: 52.5200, lng: 13.4050 }, // Berlin
              },
              {
                start: { lat: 52.5200, lng: 13.4050 }, // Berlin
                end: { lat: 53.5511, lng: 9.9937 }, // Hamburg
              },
              {
                start: { lat: 52.5200, lng: 13.4050 }, // Berlin
                end: { lat: 48.1351, lng: 11.5820 }, // Munich
              },
              {
                start: { lat: 52.5200, lng: 13.4050 }, // Berlin
                end: { lat: 50.1109, lng: 8.6821 }, // Frankfurt
              },
              {
                start: { lat: 52.5200, lng: 13.4050 }, // Berlin
                end: { lat: 52.3676, lng: 4.9041 }, // Amsterdam
              },
              // Transatlantic
              {
                start: { lat: 43.6532, lng: -79.3832 }, // Toronto
                end: { lat: 51.5074, lng: -0.1278 }, // London
              },
              // Middle East connection
              {
                start: { lat: 51.5074, lng: -0.1278 }, // London
                end: { lat: 25.2048, lng: 55.2708 }, // Dubai
              },
              // Asia-Pacific connection
              {
                start: { lat: 25.2048, lng: 55.2708 }, // Dubai
                end: { lat: 1.3521, lng: 103.8198 }, // Singapore
              },
              {
                start: { lat: -33.8688, lng: 151.2093 }, // Sydney
                end: { lat: 1.3521, lng: 103.8198 }, // Singapore
              },
            ]}
            />
          </div>
        </motion.section>

        {/* Bookend Line */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="py-32 px-8"
        >
          <div className="max-w-5xl mx-auto text-center">
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
              Our story begins with belief.
              <br />
              And ends with intent.
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

          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutPage;
