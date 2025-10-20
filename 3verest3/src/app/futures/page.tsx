'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';
import { ArrowDown, Cpu, Database, Globe, Brain, Sparkle } from 'phosphor-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1]
    }
  },
};

const FuturesPage = () => {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const projects = [
    {
      icon: Cpu,
      title: 'Sovereignty Begins at the Hypervisor.',
      subtitle: '3verest KVM Virtualisation Platform',
      description: '3verest is building its own KVM-based virtualisation platform, designed for healthcare-grade workloads. It delivers full control over the virtual layer, faster provisioning, deep telemetry, and sovereign independence from legacy licensing. This platform will become the foundation for every 3verest cloud region, enabling precision scaling and next-generation orchestration.',
      gradient: 'from-[#00FFC2]/20 via-[#00D4FF]/10 to-transparent',
    },
    {
      icon: Database,
      title: 'Data, Re-engineered for Velocity and Density.',
      subtitle: '3verest Storage Engine',
      description: 'Our new storage platform redefines performance. Combining NVMe fabrics, distributed erasure coding, and adaptive tiering, it is optimised for high-frequency radiology and genomics workloads. Fast. Dense. Resilient. Built to keep healthcare data closer, faster, and safer than ever.',
      gradient: 'from-[#00D4FF]/20 via-[#00FFC2]/10 to-transparent',
    },
    {
      icon: Globe,
      title: 'The Edge is Expanding.',
      subtitle: 'Edge Cloud Evolution',
      description: 'By 2030, 3verest Edge will support GPU-accelerated compute and multi-tier storage across distributed sovereign nodes. Hospitals, diagnostic groups, and national healthcare systems will gain local-cloud power with extreme resilience and zero-latency AI inference. Each edge site acts as a mini-region connected, autonomous, and sovereign.',
      gradient: 'from-[#00FFC2]/20 via-[#00D4FF]/10 to-transparent',
    },
    {
      icon: Brain,
      title: 'Our Operating System for the Enterprise.',
      subtitle: 'Altitude AI Platform',
      description: 'Twelve months in development, Altitude AI is 3verest\'s internal platform, a sovereign ERP-like system that merges operations, billing, analytics, and intelligence. It brings every team, system, and workflow into one unified environment. Agents and automations will increasingly handle complex tasks, reducing friction, increasing precision, and letting human teams focus on innovation. Powered entirely by our own sovereign AI infrastructure.',
      gradient: 'from-[#00D4FF]/20 via-[#00FFC2]/10 to-transparent',
    },
    {
      icon: Sparkle,
      title: 'Opening the Cloud to Intelligence.',
      subtitle: 'AI & LLM Services for Customers',
      description: '3verest will soon extend its AI and LLM capabilities to customers, secure, healthcare-ready, and hosted entirely within sovereign regions. From natural-language data querying to custom medical model deployment, clients will be able to build, fine-tune, and serve AI applications directly on the 3verest platform. This marks the next chapter of our evolution: not just hosting the cloud, but empowering intelligence within it.',
      gradient: 'from-[#00FFC2]/20 via-[#00D4FF]/10 to-transparent',
    },
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#0D1F1A] to-[#0A0A0A] text-white overflow-x-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Hero Image Background */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/2030.png)',
              filter: 'brightness(0.4) contrast(1.1)',
            }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0A0A0A]" />

          {/* Animated Accent Gradient */}
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={shouldReduceMotion ? {} : {
              background: [
                'radial-gradient(circle at 20% 50%, rgba(0, 255, 194, 0.15) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(0, 212, 255, 0.15) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(0, 255, 194, 0.15) 0%, transparent 50%)',
              ]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>

        <motion.div
          style={shouldReduceMotion ? {} : { opacity, scale }}
          className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto"
        >
          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-[#00FFC2]/70 uppercase tracking-widest mb-8 font-light"
          >
            The Future of Sovereign Cloud Engineered, Imagined, and Built by 3verest
          </motion.p>

          {/* Main Title */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif mb-6"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            3verest Futures
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
            className="text-xl sm:text-2xl md:text-3xl text-white/70 font-light mb-16"
          >
            Our journey to 2030 where Sovereign Cloud meets Intelligent Infrastructure.
          </motion.p>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-sm text-white/40 uppercase tracking-wider">Explore the Future</span>
            <motion.div
              animate={shouldReduceMotion ? {} : { y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown size={24} className="text-[#00FFC2]" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Projects Sections */}
      {projects.map((project, index) => (
        <section
          key={index}
          className="relative min-h-screen flex items-center justify-center py-32 px-4 sm:px-6"
        >
          {/* Gradient Background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`} />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative z-10 max-w-4xl mx-auto"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex p-4 rounded-2xl bg-[#00FFC2]/10 mb-8"
            >
              <project.icon size={48} weight="duotone" className="text-[#00FFC2]" />
            </motion.div>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="text-sm uppercase tracking-widest text-[#00FFC2]/70 mb-4 font-light"
            >
              {project.subtitle}
            </motion.p>

            {/* Title */}
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-8 leading-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              {project.title}
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="text-lg sm:text-xl text-white/70 leading-relaxed font-light"
            >
              {project.description}
            </motion.p>
          </motion.div>
        </section>
      ))}

      {/* Closing Section */}
      <section className="relative min-h-screen flex items-center justify-center py-32 px-4 sm:px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          {/* Year */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-8xl sm:text-9xl font-bold text-[#00FFC2]/10 mb-8"
          >
            2030
          </motion.div>

          {/* Title */}
          <motion.h2
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl font-serif text-white mb-8"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            The Next Summit.
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="text-xl sm:text-2xl text-white/70 leading-relaxed font-light mb-12 max-w-3xl mx-auto"
          >
            Every project within 3verest Futures is more than a roadmap, it&apos;s an act of independence.
            A vision for a healthcare cloud that is self-designed, self-optimised, and self-intelligent.
          </motion.p>

          {/* CTA Button */}
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#00FFC2] to-[#00D4A0] text-black font-semibold text-lg shadow-[0_0_30px_rgba(0,255,194,0.3)] hover:shadow-[0_0_50px_rgba(0,255,194,0.5)] transition-all duration-300"
          >
            Join the Journey
          </motion.a>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="h-px w-64 mx-auto mt-20 bg-gradient-to-r from-transparent via-[#00FFC2]/30 to-transparent"
          />

          {/* Footer Text */}
          <motion.p
            variants={fadeUp}
            className="text-sm text-white/30 mt-8 font-light"
          >
            © 3verest Sovereign Cloud | Futures Program 2030
          </motion.p>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default FuturesPage;
