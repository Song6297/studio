
'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';

import en from '@/locales/en.json';
import kn from '@/locales/kn.json';
import hi from '@/locales/hi.json';
import ta from '@/locales/ta.json';
import ml from '@/locales/ml.json';

const translations: Record<string, any> = { en, kn, hi, ta, ml };

export const languages = [
  { code: 'en', name: 'English' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'ml', name: 'മലയാളം' },
];

interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string, options?: Record<string, string | number>) => string;
  currentLang: { code: string; name: string };
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState('en');
  const [currentLang, setCurrentLang] = useState(languages[0]);

  useEffect(() => {
    const selectedLang = languages.find(l => l.code === language) || languages[0];
    setCurrentLang(selectedLang);
  }, [language]);

  const t = useCallback((key: string, options?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let result = translations[language];
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) {
        // Fallback to English if translation not found
        let fallbackResult = translations['en'];
        for (const fk of keys) {
          fallbackResult = fallbackResult?.[fk];
        }
        return fallbackResult || key;
      }
    }

    if (typeof result === 'string' && options) {
      return Object.entries(options).reduce((acc, [key, value]) => {
        return acc.replace(`{{${key}}}`, String(value));
      }, result);
    }
    
    return result || key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, currentLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
