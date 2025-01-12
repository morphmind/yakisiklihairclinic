import { useContext } from 'react';
import { LocaleContext } from '@/contexts/LocaleContext';
import { tr } from '@/i18n/locales/pricing/tr';
import { en } from '@/i18n/locales/pricing/en';

const translations = {
  tr,
  en
};

export function usePricingTranslation() {
  const { currentLocale } = useContext(LocaleContext);
  return translations[currentLocale.code as keyof typeof translations] || translations.en;
}
