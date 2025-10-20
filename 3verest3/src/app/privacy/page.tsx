'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ShieldCheck } from 'phosphor-react';
import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';

export default function PrivacyPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F8FAF9] dark:bg-[#0A0A0A] transition-colors duration-300">
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
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex p-4 rounded-2xl bg-[#00D6A3]/10 mb-6"
          >
            <ShieldCheck size={40} weight="duotone" className="text-[#00D6A3]" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-6xl font-light text-gray-900 dark:text-white tracking-tight mb-4"
          >
            Privacy Policy
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-white/70 font-light"
          >
            Effective Date: January 1, 2025
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl mx-auto prose prose-lg dark:prose-invert prose-headings:font-light prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-800 dark:prose-p:text-white/90 prose-li:text-gray-800 dark:prose-li:text-white/90 prose-strong:text-gray-900 dark:prose-strong:text-white"
        >
          <h2>1. Introduction</h2>
          <p>
            At 3verest, we believe privacy is a fundamental right, not a feature. This Privacy Policy explains how we collect, use, protect, and respect your personal data in accordance with GDPR, HIPAA, and other applicable data protection regulations.
          </p>

          <h2>2. Data We Collect</h2>
          <p>We collect only the data necessary to provide our sovereign cloud services:</p>
          <ul>
            <li><strong>Account Information:</strong> Name, email address, company details, and billing information</li>
            <li><strong>Service Data:</strong> Data you store, process, or transmit through our cloud infrastructure</li>
            <li><strong>Usage Data:</strong> Service performance metrics, access logs, and security monitoring data</li>
            <li><strong>Technical Data:</strong> IP addresses, device information, and browser types for security and service optimization</li>
          </ul>

          <h2>3. How We Use Your Data</h2>
          <p>Your data is used exclusively for:</p>
          <ul>
            <li>Providing and maintaining our sovereign cloud services</li>
            <li>Ensuring security, compliance, and service integrity</li>
            <li>Billing and account management</li>
            <li>Communicating service updates and security notifications</li>
            <li>Meeting legal and regulatory obligations</li>
          </ul>

          <h2>4. Data Sovereignty & Storage</h2>
          <p>
            All customer data is stored within the jurisdiction you select. We do not transfer data across borders without explicit consent and contractual safeguards. Your data remains under your control and governance.
          </p>

          <h2>5. Data Protection & Security</h2>
          <p>We implement enterprise-grade security measures:</p>
          <ul>
            <li>End-to-end encryption at rest and in transit</li>
            <li>ISO 27001, SOC 2 Type II, and GDPR compliance</li>
            <li>Regular security audits and penetration testing</li>
            <li>Multi-factor authentication and role-based access controls</li>
            <li>24/7 security monitoring and incident response</li>
          </ul>

          <h2>6. Your Rights</h2>
          <p>Under GDPR and applicable regulations, you have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Rectify inaccurate data</li>
            <li>Request deletion of your data (right to be forgotten)</li>
            <li>Object to or restrict data processing</li>
            <li>Data portability</li>
            <li>Withdraw consent at any time</li>
          </ul>

          <h2>7. Data Retention</h2>
          <p>
            We retain your data only as long as necessary to provide services and meet legal obligations. Upon account termination, data is securely deleted within 90 days unless required for compliance or dispute resolution.
          </p>

          <h2>8. Third-Party Services</h2>
          <p>
            We do not sell or share your data with third parties for marketing purposes. Limited data may be shared with service providers (e.g., payment processors) under strict contractual obligations that meet our sovereignty standards.
          </p>

          <h2>9. Cookies & Tracking</h2>
          <p>
            We use essential cookies for service functionality and security. We do not use advertising or tracking cookies. You can manage cookie preferences in your browser settings.
          </p>

          <h2>10. Children&apos;s Privacy</h2>
          <p>
            Our services are not directed to individuals under 16. We do not knowingly collect data from children.
          </p>

          <h2>11. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy to reflect changes in our practices or legal requirements. Material changes will be communicated via email or service notifications.
          </p>

          <h2>12. Contact Us</h2>
          <p>For privacy inquiries, data requests, or concerns:</p>
          <p>
            <strong>Email:</strong> <a href="mailto:privacy@3verest.com" className="text-[#00D6A3] hover:underline">privacy@3verest.com</a><br />
            <strong>Data Protection Officer:</strong> <a href="mailto:dpo@3verest.com" className="text-[#00D6A3] hover:underline">dpo@3verest.com</a><br />
            <strong>Compliance Team:</strong> <a href="mailto:compliance@3verest.com" className="text-[#00D6A3] hover:underline">compliance@3verest.com</a>
          </p>

          <div className="mt-12 p-6 bg-[#00D6A3]/10 rounded-xl border border-[#00D6A3]/20">
            <p className="text-sm text-gray-700 dark:text-white/80 italic mb-0">
              <strong>Our Commitment:</strong> Privacy is engineered into every layer of our sovereign cloud. We believe that healthcare data deserves the highest standards of protection, transparency, and ethical stewardship.
            </p>
          </div>
        </motion.div>
      </section>

      <div className="h-20" />
      <Footer />
    </div>
  );
}
