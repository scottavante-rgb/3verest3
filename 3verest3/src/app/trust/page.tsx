'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  FileText,
  Envelope,
  CheckCircle,
  Clock,
  ArrowLeft
} from 'phosphor-react';
import { fadeUp } from '@/components/animations/motion';

interface Certification {
  title: string;
  description: string;
}

interface PipelineCertification extends Certification {
  targetDate: string;
}

const currentCertifications: Certification[] = [
  {
    title: 'ISO 27001',
    description: 'Information Security Management System (ISMS)',
  },
  {
    title: 'NHS DSPT',
    description: 'Data Security and Protection Toolkit (UK)',
  },
  {
    title: 'SOC 2 Type II',
    description: 'Service Organisation Control – Security, Availability, Confidentiality',
  },
  {
    title: 'CSA STAR Level 1',
    description: 'Cloud Security Alliance – Security, Trust & Assurance Registry',
  },
  {
    title: 'NHS HSCN',
    description: 'Health and Social Care Network (UK)',
  },
  {
    title: 'GAIA-X',
    description: 'EU Cloud Infrastructure Compliance Framework',
  },
  {
    title: 'Cyber Essentials Plus',
    description: 'UK Government-Assured Security Standard',
  },
  {
    title: 'GDPR Compliance',
    description: 'General Data Protection Regulation – Multi-region Adherence',
  },
];

const pipelineCertifications: PipelineCertification[] = [
  {
    title: 'ISO 27018',
    description: 'Cloud Privacy for Personally Identifiable Information',
    targetDate: 'Target Q4-2025',
  },
  {
    title: 'CSA STAR Level 2',
    description: 'Third-Party Certification for Data Security and Protection',
    targetDate: 'Target Q4-2025',
  },
  {
    title: 'HDS (France)',
    description: 'Data Security and Compliance',
    targetDate: 'Target Q1-2026',
  },
  {
    title: 'BSI C5 (Germany)',
    description: 'Cloud Computing Compliance Controls Catalogue',
    targetDate: 'Target Q1-2026',
  },
  {
    title: 'SecNum Cloud (France)',
    description: 'French Secure Cloud Compliance Framework',
    targetDate: 'Target Q2-2026',
  },
  {
    title: 'IRAP (Australia)',
    description: 'Government Health Cloud Compliance',
    targetDate: 'Target Q2-2026',
  },
  {
    title: 'NIS 2 Directive (EU)',
    description: 'EU-wide Cybersecurity Legislation',
    targetDate: 'Target Q2-2026',
  },
];

const policies = [
  { title: 'Acceptable Use Policy (AUP)', href: '/3verest AUP.pdf' },
  { title: 'Service Level Agreement (SLA)', href: '/3verest SLA.pdf' },
  { title: 'Data Processing Addendum (DPA)', href: '/3verest DPA.pdf' },
  { title: 'Sustainability Statement', href: '/sustainability' },
  { title: 'Privacy Policy', href: '/privacy' },
];

function CertificationCard({
  cert,
  isPipeline = false
}: {
  cert: Certification | PipelineCertification;
  isPipeline?: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 ${
        isPipeline
          ? 'bg-white/40 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 hover:border-[#00D6A3]/30 hover:bg-white/60 dark:hover:bg-white/8'
          : 'bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-[#00D6A3]/50 hover:shadow-lg hover:shadow-[#00D6A3]/10'
      }`}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00D6A3]/0 via-[#00D6A3]/0 to-[#00D6A3]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className={`text-lg font-semibold tracking-tight mb-1 ${
              isPipeline
                ? 'text-gray-700 dark:text-white/70'
                : 'text-gray-900 dark:text-white'
            }`}>
              {cert.title}
            </h3>
            {isPipeline && 'targetDate' in cert && (
              <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-white/40 mb-2">
                <Clock size={14} weight="bold" />
                <span>{cert.targetDate}</span>
              </div>
            )}
          </div>
          {!isPipeline && (
            <CheckCircle
              size={24}
              weight="fill"
              className="text-[#00D6A3] flex-shrink-0 ml-3"
            />
          )}
        </div>

        {/* Description */}
        <p className={`text-sm leading-relaxed flex-1 ${
          isPipeline
            ? 'text-gray-600 dark:text-white/50'
            : 'text-gray-600 dark:text-white/60'
        }`}>
          {cert.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function TrustPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F8FAF9] dark:bg-[#0A0A0A] transition-colors duration-300">
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
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-white/20 hover:border-[#00D6A3] dark:hover:border-[#00D6A3] transition-all duration-300 shadow-lg group"
        >
          <ArrowLeft
            size={20}
            weight="bold"
            className="text-gray-700 dark:text-white/80 group-hover:text-[#00D6A3] transition-colors"
          />
          <span className="text-sm font-medium text-gray-700 dark:text-white/80 group-hover:text-[#00D6A3] transition-colors">
            Back
          </span>
        </motion.button>
      </motion.div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Ambient gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#00D6A3]/5 via-transparent to-transparent" />

        {/* Animated trust arc */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[2px]"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.3 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-[#00D6A3] to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-light text-gray-900 dark:text-white tracking-tight mb-4">
              Trust & Compliance
            </h1>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-xl md:text-2xl font-light text-[#00D6A3] mb-8 tracking-wide">
              Verified by 3verest
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-lg md:text-xl text-gray-600 dark:text-white/70 leading-relaxed max-w-3xl mx-auto font-light">
              Our certifications form the foundation of the Sovereign AI Cloud for Healthcare.
              Each one represents years of continuous audit and engineering discipline creating
              real barriers to entry and measurable trust for every partner we serve.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Current Certifications */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 dark:text-white tracking-tight mb-3">
              Current Certifications
            </h2>
            <p className="text-lg text-gray-500 dark:text-white/50 font-light">
              Held across all active 3verest regions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentCertifications.map((cert, index) => (
              <CertificationCard key={index} cert={cert} />
            ))}
          </div>
        </div>
      </section>

      {/* Pipeline Certifications */}
      <section className="py-20 px-6 relative">
        {/* Subtle alternating gradient bands */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00D6A3]/5 to-transparent opacity-30" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 dark:text-white tracking-tight mb-3">
              Certifications in Progress
            </h2>
            <p className="text-lg text-gray-500 dark:text-white/50 font-light">
              The journey continues, deepening trust across borders and jurisdictions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {pipelineCertifications.map((cert, index) => (
              <CertificationCard key={index} cert={cert} isPipeline />
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-base md:text-lg text-gray-600 dark:text-white/60 italic max-w-3xl mx-auto leading-relaxed font-light">
              These certifications are not add-ons; they are the foundation of 3verest.
              Built into our architecture from day one, they represent the unwavering commitment
              to trust, sovereignty, and compliance that defines who we are.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Policies & Governance */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#00D6A3] to-transparent mx-auto mb-8" />
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 dark:text-white tracking-tight text-center mb-12">
              Policies & Documentation
            </h2>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {policies.map((policy, index) => (
              <motion.a
                key={index}
                href={policy.href}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                className="group flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-[#00D6A3]/50 transition-all duration-300"
              >
                <FileText
                  size={20}
                  weight="duotone"
                  className="text-gray-400 dark:text-white/40 group-hover:text-[#00D6A3] transition-colors"
                />
                <span className="text-gray-700 dark:text-white/80 font-light group-hover:text-[#00D6A3] transition-colors">
                  {policy.title}
                </span>
                <div className="ml-auto w-0 group-hover:w-8 h-px bg-[#00D6A3] transition-all duration-300" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact & Verification */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl p-8 md:p-12 backdrop-blur-xl bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-lg"
          >
            {/* Glassmorphism effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#00D6A3]/10 via-transparent to-transparent" />

            <div className="relative z-10 text-center">
              <div className="inline-flex p-4 rounded-2xl bg-[#00D6A3]/10 mb-6">
                <ShieldCheck size={32} weight="duotone" className="text-[#00D6A3]" />
              </div>

              <h3 className="text-2xl md:text-3xl font-light text-gray-900 dark:text-white mb-4">
                Need formal certification documents?
              </h3>

              <p className="text-gray-600 dark:text-white/70 mb-6 font-light">
                For audit, procurement, or compliance verification, contact our Governance Team.
              </p>

              <a
                href="mailto:compliance@3verest.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00D6A3] text-white font-medium hover:bg-[#00B88C] transition-colors duration-300 shadow-lg shadow-[#00D6A3]/20"
              >
                <Envelope size={20} weight="bold" />
                <span>compliance@3verest.com</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom spacing */}
      <div className="h-20" />
    </div>
  );
}
