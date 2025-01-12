import { Language, LocaleConfig } from '../types';
import { defaultLocale, locales } from '../config/locales';

/**
 * Detects the user's preferred language based on browser settings and location
 * @returns The detected language code
 */
export function detectUserLanguage(): Language {
  // Get browser language
  const browserLang = navigator.language.split('-')[0] as Language;
  
  // Check if browser language is supported
  const isSupported = locales.some(locale => locale.code === browserLang);
  
  return isSupported ? browserLang : defaultLocale.code;
}

/**
 * Gets locale configuration for a given language code
 * @param code Language code
 * @returns Locale configuration
 */
export function getLocaleConfig(code: Language): LocaleConfig {
  return locales.find(locale => locale.code === code) || defaultLocale;
}

/**
 * Formats a date according to the given locale
 * @param date Date to format
 * @param locale Locale code
 * @returns Formatted date string
 */
export function formatDate(date: Date, locale: Language): string {
  return new Intl.DateTimeFormat(locale).format(date);
}