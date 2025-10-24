'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
}

interface CookieConsentContextType {
  showConsent: boolean;
  showManagePreferences: boolean;
  preferences: CookiePreferences;
  hasConsented: boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  savePreferences: (prefs: CookiePreferences) => void;
  openManagePreferences: () => void;
  closeManagePreferences: () => void;
  openCookieSettings: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

const STORAGE_KEY = '3verest_cookie_consent';
const PREFERENCES_KEY = '3verest_cookie_preferences';

const defaultPreferences: CookiePreferences = {
  essential: true,
  analytics: false,
  functional: false,
  marketing: false,
};

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [showConsent, setShowConsent] = useState(false);
  const [showManagePreferences, setShowManagePreferences] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    // Check if user has already consented
    const consentStatus = localStorage.getItem(STORAGE_KEY);
    const savedPreferences = localStorage.getItem(PREFERENCES_KEY);

    if (consentStatus === 'true') {
      setHasConsented(true);
      if (savedPreferences) {
        setPreferences(JSON.parse(savedPreferences));
      }
    } else {
      // Show consent banner if no consent has been given
      setShowConsent(true);
    }
  }, []);

  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      analytics: true,
      functional: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem(STORAGE_KEY, 'true');
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(allAccepted));
    setHasConsented(true);
    setShowConsent(false);
  };

  const rejectNonEssential = () => {
    const essentialOnly: CookiePreferences = {
      essential: true,
      analytics: false,
      functional: false,
      marketing: false,
    };
    setPreferences(essentialOnly);
    localStorage.setItem(STORAGE_KEY, 'true');
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(essentialOnly));
    setHasConsented(true);
    setShowConsent(false);
  };

  const savePreferences = (prefs: CookiePreferences) => {
    const updatedPrefs = { ...prefs, essential: true }; // Ensure essential is always true
    setPreferences(updatedPrefs);
    localStorage.setItem(STORAGE_KEY, 'true');
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updatedPrefs));
    setHasConsented(true);
    setShowConsent(false);
    setShowManagePreferences(false);
  };

  const openManagePreferences = () => {
    setShowManagePreferences(true);
  };

  const closeManagePreferences = () => {
    setShowManagePreferences(false);
  };

  const openCookieSettings = () => {
    setShowConsent(true);
  };

  return (
    <CookieConsentContext.Provider
      value={{
        showConsent,
        showManagePreferences,
        preferences,
        hasConsented,
        acceptAll,
        rejectNonEssential,
        savePreferences,
        openManagePreferences,
        closeManagePreferences,
        openCookieSettings,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
}
