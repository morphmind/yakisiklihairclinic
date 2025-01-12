import React, { createContext, useState, useEffect } from 'react';
import { LocaleConfig } from '@/types';
import { detectUserLanguage, getLocaleConfig } from '@/utils/locale';

interface LocaleContextType {
  currentLocale: LocaleConfig;
  setCurrentLocale: (locale: LocaleConfig) => void;
}

export const LocaleContext = createContext<LocaleContextType>({
  currentLocale: getLocaleConfig(detectUserLanguage()),
  setCurrentLocale: () => {},
});

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [currentLocale, setCurrentLocale] = useState<LocaleConfig>(() => {
    const detectedLanguage = detectUserLanguage();
    return getLocaleConfig(detectedLanguage);
  });

  useEffect(() => {
    document.documentElement.dir = currentLocale.direction;
    document.documentElement.lang = currentLocale.code;
  }, [currentLocale]);

  return (
    <LocaleContext.Provider value={{ currentLocale, setCurrentLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}