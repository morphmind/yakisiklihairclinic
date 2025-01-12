import { useContext } from 'react';
import { LocaleContext } from '@/contexts/LocaleContext';
import { getTranslation } from '@/i18n';

export function useTranslation() {
  const { currentLocale } = useContext(LocaleContext);
  const t = getTranslation(currentLocale.code);
  return { t };
}
