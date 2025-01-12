import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import HairAnalysis from './pages/hair-analysis';
import { LocaleProvider } from './contexts/LocaleContext';
import { Currency } from './types';
import { useCurrency } from './hooks/useCurrency';
import { HeroSection } from './components/sections/HeroSection';
import { WhyUsSection } from './components/sections/WhyUsSection';
import { TreatmentsSection } from './components/sections/TreatmentsSection';
import { PatientExperienceSection } from './components/sections/PatientExperienceSection';
import { GallerySection } from './components/sections/GallerySection';
import { PricingSection } from './components/sections/PricingSection';
import { SectionDivider } from './components/ui/section-divider';
import { Toaster } from './components/ui/toaster';
import { useTheme } from './hooks/useTheme';

function App() {
  const { selectedCurrency, updateCurrency } = useCurrency();
  const { theme } = useTheme();

  // Update theme class on document root
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <LocaleProvider>
      <Router>
        <div className="min-h-screen">
          <Routes>
            {/* Hair Analysis Page */}
            <Route path="/hair-analysis" element={<HairAnalysis />} />
            
            {/* Home Page */}
            <Route path="/" element={
              <div className="min-h-screen bg-background">
                {/* Header */}
                <Header
                  selectedCurrency={selectedCurrency}
                  onCurrencyChange={updateCurrency}
                />

                {/* Hero Section */}
                <HeroSection />
                <SectionDivider pattern="waves" />

                {/* Why Us Section */}
                <WhyUsSection />
                <SectionDivider pattern="dots" />

                {/* Treatments Section */}
                <TreatmentsSection />
                <SectionDivider pattern="waves" />

                {/* Gallery Section */}
                <GallerySection />
                <SectionDivider pattern="waves" />

                {/* Pricing Section */}
                <PricingSection />
                <SectionDivider pattern="dots" />

                {/* Patient Experience Section */}
                <PatientExperienceSection />
              </div>
            } />
          </Routes>
        </div>

        {/* Toast Notifications */}
        <Toaster />
      </Router>
    </LocaleProvider>
  );
}

export default App;
