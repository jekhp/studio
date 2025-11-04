"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import en from '@/locales/en.json';
import es from '@/locales/es.json';

type Language = 'en' | 'es';

type Translations = { [key: string]: any };

const translations: { [key in Language]: Translations } = { en, es };

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, options?: { replacements?: { [key: string]: string | number }, defaultValue?: string }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getNestedValue = (obj: any, path: string): string | undefined => {
    // Handle ':' as a delimiter
    const keys = path.includes(':') ? path.split(':') : path.split('.');
    return keys.reduce((acc, part) => acc && acc[part], obj);
};


export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'es') {
      setLanguage('es');
    }
  }, []);

  const t = useCallback((key: string, options?: { replacements?: { [key: string]: string | number }, defaultValue?: string }): string => {
    const { replacements, defaultValue } = options || {};
    let translation = getNestedValue(translations[language], key) || defaultValue || key;
    
    if (replacements) {
        Object.keys(replacements).forEach(placeholder => {
            translation = translation.replace(`{${placeholder}}`, String(replacements[placeholder]));
        });
    }

    return translation;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
