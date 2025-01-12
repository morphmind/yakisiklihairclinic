import { LocaleConfig } from '../types';

export const locales: LocaleConfig[] = [
  { code: 'en', name: 'EN', direction: 'ltr', flag: '🇬🇧', currency: { code: 'GBP', symbol: '£' } },
  { code: 'tr', name: 'TR', direction: 'ltr', flag: '🇹🇷', currency: { code: 'TRY', symbol: '₺' } },
  { code: 'de', name: 'DE', direction: 'ltr', flag: '🇩🇪', currency: { code: 'EUR', symbol: '€' } },
  { code: 'ru', name: 'RU', direction: 'ltr', flag: '🇷🇺', currency: { code: 'RUB', symbol: '₽' } },
  { code: 'ar', name: 'AR', direction: 'rtl', flag: '🇦🇪', currency: { code: 'AED', symbol: 'د.إ' } },
  { code: 'es', name: 'ES', direction: 'ltr', flag: '🇪🇸', currency: { code: 'EUR', symbol: '€' } },
  { code: 'fr', name: 'FR', direction: 'ltr', flag: '🇫🇷', currency: { code: 'EUR', symbol: '€' } },
];

export const defaultLocale: LocaleConfig = locales[0];
export const secondaryLocale: LocaleConfig = locales[1];
