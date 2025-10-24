'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCookieConsent } from '@/contexts/cookie-consent-context';
import { useState } from 'react';
import { Shield, BarChart3, Settings, Target, Check } from 'lucide-react';

export function CookieConsent() {
  const {
    showConsent,
    showManagePreferences,
    preferences,
    acceptAll,
    rejectNonEssential,
    savePreferences,
    openManagePreferences,
    closeManagePreferences,
  } = useCookieConsent();

  const [localPreferences, setLocalPreferences] = useState(preferences);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSavePreferences = () => {
    savePreferences(localPreferences);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  const cookieTypes = [
    {
      id: 'essential' as const,
      icon: Shield,
      title: 'Essential Cookies',
      description: 'Required for the site to function properly',
      required: true,
    },
    {
      id: 'analytics' as const,
      icon: BarChart3,
      title: 'Analytics Cookies',
      description: 'Help us improve site performance',
      required: false,
    },
    {
      id: 'functional' as const,
      icon: Settings,
      title: 'Functional Cookies',
      description: 'Enable enhanced features and personalisation',
      required: false,
    },
    {
      id: 'marketing' as const,
      icon: Target,
      title: 'Marketing Cookies',
      description: 'Allow us to offer relevant content and experiences',
      required: false,
    },
  ];

  return (
    <>
      {/* Primary Consent Modal */}
      <AnimatePresence>
        {showConsent && !showManagePreferences && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center pointer-events-none"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm pointer-events-auto"
              onClick={() => {}}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 pointer-events-auto"
            >
              <h2 className="text-3xl font-light text-[#222] mb-4 tracking-tight">
                Your Privacy, Respected.
              </h2>

              <p className="text-base text-[#666] leading-relaxed mb-8 font-light">
                At 3verest, we believe trust begins with transparency. We use cookies to improve your experience,
                analyse usage, and support essential site operations. You can accept all cookies, reject non-essential ones,
                or manage your preferences at any time. Your privacy and your choice matter to us.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={acceptAll}
                  className="flex-1 px-6 py-3 bg-[#00FFC2] text-[#222] rounded-lg font-medium text-sm uppercase tracking-wider transition-all hover:bg-[#00E5AD] hover:shadow-lg hover:shadow-[#00FFC2]/20"
                >
                  Accept All
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={rejectNonEssential}
                  className="flex-1 px-6 py-3 bg-gray-100 text-[#666] rounded-lg font-medium text-sm uppercase tracking-wider transition-all hover:bg-gray-200"
                >
                  Reject Non-Essential
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={openManagePreferences}
                  className="flex-1 px-6 py-3 border-2 border-[#E0E0E0] text-[#666] rounded-lg font-medium text-sm uppercase tracking-wider transition-all hover:border-[#00FFC2] hover:text-[#222]"
                >
                  Manage Preferences
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Manage Preferences Modal */}
      <AnimatePresence>
        {showManagePreferences && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm pointer-events-auto"
              onClick={closeManagePreferences}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 pointer-events-auto max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-3xl font-light text-[#222] mb-4 tracking-tight">
                Manage Cookie Preferences
              </h2>

              <p className="text-base text-[#666] leading-relaxed mb-8 font-light">
                You control your privacy. Choose which types of cookies you&apos;re comfortable with — you can update these settings anytime.
              </p>

              {/* Cookie Type Toggles */}
              <div className="space-y-4 mb-8">
                {cookieTypes.map((type) => {
                  const Icon = type.icon;
                  const isEnabled = localPreferences[type.id];

                  return (
                    <div
                      key={type.id}
                      className="flex items-start gap-4 p-4 border border-[#E0E0E0] rounded-lg hover:border-[#00FFC2] transition-colors"
                    >
                      <div className="flex-shrink-0 mt-1">
                        <Icon className="w-5 h-5 text-[#666]" strokeWidth={1.5} />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-[#222] mb-1">
                          {type.title}
                        </h3>
                        <p className="text-sm text-[#666] font-light">
                          {type.description}
                        </p>
                        {type.required && (
                          <p className="text-xs text-[#999] mt-1 italic">Always active</p>
                        )}
                      </div>

                      {/* Toggle Switch */}
                      <button
                        onClick={() => {
                          if (!type.required) {
                            setLocalPreferences(prev => ({
                              ...prev,
                              [type.id]: !prev[type.id]
                            }));
                          }
                        }}
                        disabled={type.required}
                        className={`relative flex-shrink-0 w-12 h-6 rounded-full transition-colors ${
                          isEnabled ? 'bg-[#00FFC2]' : 'bg-gray-200'
                        } ${type.required ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        <motion.div
                          animate={{ x: isEnabled ? 24 : 2 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                        />
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSavePreferences}
                  className="flex-1 px-6 py-3 bg-[#00FFC2] text-[#222] rounded-lg font-medium text-sm uppercase tracking-wider transition-all hover:bg-[#00E5AD] hover:shadow-lg hover:shadow-[#00FFC2]/20"
                >
                  Save Preferences
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={closeManagePreferences}
                  className="flex-1 px-6 py-3 border-2 border-[#E0E0E0] text-[#666] rounded-lg font-medium text-sm uppercase tracking-wider transition-all hover:border-gray-300"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Toast */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-white rounded-lg shadow-xl px-6 py-4 flex items-center gap-3 border border-[#E0E0E0]"
          >
            <div className="w-5 h-5 bg-[#00FFC2] rounded-full flex items-center justify-center">
              <Check className="w-3 h-3 text-white" strokeWidth={3} />
            </div>
            <p className="text-sm text-[#222] font-medium">
              Your privacy settings have been updated.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
