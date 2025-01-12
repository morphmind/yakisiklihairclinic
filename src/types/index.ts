// Language types
export type Language = 'en' | 'tr' | 'de' | 'ru' | 'ar' | 'es' | 'fr';

// Common types for the application
export interface LocaleConfig {
  code: Language;
  name: string;
  currency: {
    code: string;
    symbol: string;
  };
  direction: 'ltr' | 'rtl';
  flag: string;
}

export interface WeatherData {
  temp: number;
  condition: string;
  icon: string;
  description: string;
  humidity: number;
  windSpeed: number;
}

export interface MetaData {
  title: string;
  description: string;
  keywords: string[];
}

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

export interface HairAnalysisFormData {
  // Personal Information
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number | null;
  ageRange?: {
    min: number;
    max: number | null;
  };
  gender: 'male' | 'female' | 'other';
  country: string;

  // Hair Loss Information
  hairLossType: 'crown' | 'frontal' | 'overall' | 'temples' | 'other' | null;
  hairLossDuration: 'less-than-1' | '1-to-3' | '3-to-5' | 'more-than-5' | null;
  hairLossStability: 'stable' | 'progressive' | 'unsure';
  familyHistory: boolean;
  
  // Medical Background
  medicalConditions: string[];
  medications: string[];
  previousTransplants: boolean;
  previousTransplantDetails?: string;
  
  // Treatment Preferences
  preferredTechnique?: 'fue' | 'dhi' | 'unsure';
  budgetRange: 'economy' | 'standard' | 'premium';
  timeframe: 'asap' | '1-3-months' | '3-6-months' | 'flexible';
  
  // Photos
  photos: Record<string, File>;
}
