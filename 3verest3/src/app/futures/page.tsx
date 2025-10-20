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
      subtitle: 'The 3verest KVM Virtualisation Platform',
      idea: '3verest is building its own KVM based virtualisation platform, a complete reimagining of how workloads are orchestrated in healthcare environments. Free from third party licensing models, it is a system of total control designed for medical imaging, diagnostics, and regulated workloads. It is faster, lighter, and sovereign to the core, purpose built for performance, transparency, and independence. Born from the 3verest Lab, this platform represents our pursuit of total autonomy in cloud infrastructure.',
      benefit: 'Partners gain a cloud foundation that is unshackled, with predictable economics and zero reliance on legacy platforms like VMware. Customers experience faster provisioning, deeper telemetry, and the ability to scale across regions without external dependencies. For healthcare OEMs, it means a private cloud environment that delivers public cloud agility with the certainty and security of private infrastructure. The 3verest KVM layer becomes the quiet engine behind every deployment, powering the next decade of sovereign healthcare innovation.',
      video: '/videos/kvm.mp4',
      gradient: 'from-[#00FFC2]/20 via-[#00D4FF]/10 to-transparent',
    },
    {
      icon: Database,
      title: 'Data Reengineered for Velocity and Density.',
      subtitle: 'The 3verest Storage Engine',
      idea: 'We are developing a new storage platform that breaks the barriers of traditional performance and density. Built on NVMe over Fabric, adaptive tiering, and intelligent erasure coding, it is engineered to handle the velocity of medical imaging and the scale of research grade datasets. Every byte is treated as sovereign, fast, and alive, moving intelligently across tiers for cost, speed, and resilience. Within the 3verest Lab, this is where we push boundaries, rethinking how data should live and move in the modern healthcare ecosystem.',
      benefit: 'Healthcare organisations and software vendors will access blistering performance with hospital grade resilience, capable of managing terabytes to petabytes seamlessly. It enables faster study retrievals, higher throughput, and lower latency across continents. For our OEM partners, this means no compromise, the ability to deliver imaging, AI analysis, and cloud archiving without delay or data drift. 3verest Storage Engine transforms the act of storing data into a competitive advantage, one measured in milliseconds and trust.',
      video: '/videos/storage.mp4',
      gradient: 'from-[#00D4FF]/20 via-[#00FFC2]/10 to-transparent',
    },
    {
      icon: Globe,
      title: 'The Edge is Expanding.',
      subtitle: 'The Edge Cloud Evolution',
      idea: '3verest Edge Cloud is evolving beyond simple presence into a GPU enabled, compute rich sovereign micro region. Each node will host advanced compute and storage, capable of AI inference, rendering, and data residency with extreme resilience. These edge zones will bring intelligence and speed within reach of every hospital, research site, and diagnostic facility, reducing dependency on central regions. The 3verest Lab is where this vision is being designed and refined, a network of sovereign edge regions that bring the future of healthcare computing closer to the point of care.',
      benefit: 'OEMs and national healthcare providers can deploy their applications closer to the point of care, ensuring sub second latency and regulatory compliant sovereignty. It enables AI models to run locally at the edge, interpreting scans, accelerating diagnostics, and maintaining performance even during network interruptions. This is cloud not as a distant resource but as a trusted companion that lives beside every healthcare operation. Edge Cloud by 3verest represents the final frontier of speed, resilience, and sovereignty.',
      video: '/videos/edge.mp4',
      gradient: 'from-[#00FFC2]/20 via-[#00D4FF]/10 to-transparent',
    },
    {
      icon: Brain,
      title: 'Our Operating System for the Enterprise.',
      subtitle: 'The Altitude AI Platform',
      idea: 'Altitude AI is 3verest\'s most ambitious internal platform, twelve months in development and growing every day. It serves as a sovereign AI powered operating layer across the entire company, bringing together finance, operations, sales, billing, contracts, analytics, and support into one fluid, intelligent system. It is the bridge between human teams and autonomous agents, where workflows are learned, optimised, and executed with precision. The 3verest Lab continues to evolve Altitude with every iteration, turning insight into automation and redefining how a cloud company operates.',
      benefit: 'For partners, Altitude ensures speed, accuracy, and total visibility. Quotes, deployments, billing, and support requests will be handled by AI agents that operate continuously, reducing response times and friction. For customers, it means more predictable service, greater transparency, and human support that is amplified by intelligence. Altitude will become the unseen AI copilot that keeps the 3verest ecosystem running, a sovereign ERP for a sovereign cloud company. And as it evolves, its intelligence will shape how we work, how we think, and how we deliver excellence at scale.',
      video: '/videos/ai.mp4',
      gradient: 'from-[#00D4FF]/20 via-[#00FFC2]/10 to-transparent',
    },
    {
      icon: Sparkle,
      title: 'Opening the Cloud to Intelligence.',
      subtitle: 'AI and LLM Services for Customers',
      idea: 'The next evolution of 3verest is to open our sovereign AI infrastructure to our customers, enabling them to deploy, fine tune, and run AI and LLM workloads directly within their own sovereign regions. This includes secure healthcare tuned models, private vector search, and multimodal AI for clinical, research, and operational use. The 3verest Lab team is already working with early partners to refine these capabilities, ensuring every model runs with the same precision and trust that defines our cloud.',
      benefit: 'For healthcare software companies, this means they can integrate intelligence into their applications without sending data beyond their borders. For hospitals and research groups, it unlocks the ability to analyse, summarise, and predict from their own datasets privately, ethically, and locally. No hyperscaler dependency. No egress fees. Only pure, sovereign intelligence built on infrastructure that understands healthcare. 3verest becomes not just a platform for hosting but a platform for thinking, learning, and advancing.',
      video: '/videos/llm.mp4',
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
          className="relative min-h-screen py-32 px-4 sm:px-8 md:px-20"
        >
          {/* Gradient Background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`} />

          <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
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
              <p className="text-sm uppercase tracking-widest text-[#00FFC2]/70 mb-4 font-light">
                {project.subtitle}
              </p>

              {/* Title */}
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-serif text-white mb-8 leading-tight"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                {project.title}
              </h2>

              {/* The Idea */}
              <div className="mb-8">
                <h3 className="text-base uppercase tracking-widest text-[#00FFC2]/90 mb-3 font-semibold">
                  The Idea
                </h3>
                <p className="text-base sm:text-lg text-white/70 leading-relaxed font-light">
                  {project.idea}
                </p>
              </div>

              {/* The Benefit */}
              <div>
                <h3 className="text-base uppercase tracking-widest text-[#00FFC2]/90 mb-3 font-semibold">
                  The Benefit to Our Partners and Customers
                </h3>
                <p className="text-base sm:text-lg text-white/70 leading-relaxed font-light">
                  {project.benefit}
                </p>
              </div>
            </motion.div>

            {/* Right: Video */}
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="relative group"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="rounded-2xl shadow-2xl w-full h-auto object-cover border border-white/10"
                style={{
                  filter: 'brightness(0.9) contrast(1.1)',
                }}
              >
                <source src={project.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {/* Mint overlay on hover */}
              <div className="absolute inset-0 rounded-2xl bg-[#00FFC2]/0 group-hover:bg-[#00FFC2]/5 transition-all duration-500 pointer-events-none" />
            </motion.div>
          </div>
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
            Every project within 3verest Futures is a declaration of independence, of innovation, of intent.
            At the 3verest Lab, our mission is constant improvement to find better, faster, and more intelligent ways to deliver cloud for our partners and customers.
            We are building a future where every layer of the stack, from silicon to system to intelligence, is sovereign, healthcare optimised, and human in its purpose.
            This is the decade of self determination for cloud.
            And it is being built, piece by piece, right here at 3verest.
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
