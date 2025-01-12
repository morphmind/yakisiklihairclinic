import { useState } from 'react';
import { LocaleConfig } from '@/types';

export function useCurrency() {
  const [selectedCurrency, setSelectedCurrency] = useState<LocaleConfig['currency']>(() => {
    const saved = localStorage.getItem('selectedCurrency');
    return saved ? JSON.parse(saved) : null;
  });

  const updateCurrency = (currency: LocaleConfig['currency']) => {
    setSelectedCurrency(currency);
    localStorage.setItem('selectedCurrency', JSON.stringify(currency));
  };

  return { selectedCurrency, updateCurrency };
}
