import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './pages/admin/login';
import AdminDashboard from './pages/admin/dashboard';
import Header from './components/layout/Header';
import HairAnalysis from './pages/hair-analysis';
import { LocaleProvider } from './contexts/LocaleContext';
import { Currency } from './types';
import { useCurrency } from './hooks/useCurrency';
import { HeroSection } from './components/sections/HeroSection';
import { WhyUsSection } from './components/sections/WhyUsSection';
import { TreatmentsSection } from './components/sections/TreatmentsSection';
import { PriceCalculator } from './components/sections/PriceCalculator';
import { PatientExperienceSection } from './components/sections/PatientExperienceSection';
import { GallerySection } from './components/sections/GallerySection';
import { SectionDivider } from './components/ui/section-divider';
import { Toaster } from './components/ui/toaster';
import { useTheme } from './hooks/useTheme';
import { LocaleContext } from './contexts/LocaleContext';
import { getLocalizedSEO, updateMetaTags } from './utils/seo';

function App() {
  const { selectedCurrency, updateCurrency } = useCurrency();
  const { theme } = useTheme();
  const { currentLocale } = useContext(LocaleContext);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  // Update meta tags when language changes
  useEffect(() => {
    const seoConfig = getLocalizedSEO(currentLocale);
    updateMetaTags(seoConfig);
  }, [currentLocale]);

  return (
    <LocaleProvider>
      <Router>
        <div className="min-h-screen">
          <Routes>
            <Route path="/hair-analysis" element={<HairAnalysis />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/" element={
              <div className="min-h-screen bg-background">
                <Header
                  selectedCurrency={selectedCurrency}
                  onCurrencyChange={updateCurrency}
                />
                <HeroSection />
                <SectionDivider pattern="waves" />
                <WhyUsSection />
                <SectionDivider pattern="dots" />
                <TreatmentsSection />
                <SectionDivider pattern="waves" />
                <GallerySection />
                <SectionDivider pattern="waves" />
                <PriceCalculator />
                <SectionDivider pattern="waves" />
                <PatientExperienceSection />
              </div>
            } />
          </Routes>
        </div>
        <Toaster />
      </Router>
    </LocaleProvider>
  );
}

export default App;