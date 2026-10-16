import React, { createContext, useContext, useState, useEffect } from 'react';
import mrDict from './mr.json';
import hiDict from './hi.json';
import enDict from './en.json';
import { Language, LocalizedText } from '../../types';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  getLocalized: (obj?: Partial<LocalizedText> | null, customLang?: Language) => string;
}

const dictionaries: Record<Language, Record<string, string>> = {
  mr: mrDict as Record<string, string>,
  hi: hiDict as Record<string, string>,
  en: enDict as Record<string, string>,
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Check URL path first (e.g. /mr, /hi, /en)
    if (typeof window !== 'undefined') {
      const pathLang = window.location.pathname.split('/')[1];
      if (pathLang === 'mr' || pathLang === 'hi' || pathLang === 'en') {
        return pathLang as Language;
      }
      const saved = localStorage.getItem('dcbody_lang');
      if (saved === 'mr' || saved === 'hi' || saved === 'en') {
        return saved as Language;
      }
    }
    // Marathi is the default per specification
    return 'mr';
  });

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('dcbody_lang', newLang);
      document.documentElement.lang = newLang;
      // If path starts with language code, update URL smoothly
      const pathParts = window.location.pathname.split('/');
      if (['mr', 'hi', 'en'].includes(pathParts[1])) {
        pathParts[1] = newLang;
        const newUrl = pathParts.join('/') + window.location.search + window.location.hash;
        window.history.replaceState(null, '', newUrl);
      }
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const t = (key: string): string => {
    const currentDict = dictionaries[language];
    if (currentDict && currentDict[key]) {
      return currentDict[key];
    }
    // Fallback to English
    if (dictionaries.en && dictionaries.en[key]) {
      return dictionaries.en[key];
    }
    return key;
  };

  const getLocalized = (obj?: Partial<LocalizedText> | null, customLang?: Language): string => {
    if (!obj) return '';
    const targetLang = customLang || language;
    if (obj[targetLang] && obj[targetLang]?.trim()) {
      return obj[targetLang] as string;
    }
    // Fall back to English
    if (obj.en && obj.en.trim()) {
      return obj.en;
    }
    // Fall back to Marathi
    if (obj.mr && obj.mr.trim()) {
      return obj.mr;
    }
    // Fall back to Hindi
    if (obj.hi && obj.hi.trim()) {
      return obj.hi;
    }
    return '';
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, getLocalized }}>
      {children}
    </I18nContext.Provider>
  );
};

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
