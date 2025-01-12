import { en } from './locales/en';
import { tr } from './locales/tr';
import { Language } from '@/types';

export const translations = {
  en,
  tr,
} as const;

export type TranslationKey = keyof typeof translations;

export function getTranslation(lang: Language) {
  return translations[lang as TranslationKey] || translations.en;
}

export type Translation = typeof translations.en;
