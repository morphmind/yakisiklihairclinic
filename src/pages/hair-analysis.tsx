import React, { useState } from 'react';
import { Phone, Mail, Instagram, Facebook, Youtube, MessageCircle, ChevronDown } from 'lucide-react';
import { useContext } from 'react';
import { HairAnalysisFormData } from '@/types';
import { useTranslation } from '@/hooks/useTranslation';
import { LocaleContext } from '@/contexts/LocaleContext';
import { locales } from '@/config/locales';
import { submitAnalysis } from '@/utils/submitAnalysis';
import { ProgressHeader } from '@/components/hair-analysis/ProgressHeader';
import { DoctorFeedback } from '@/components/hair-analysis/DoctorFeedback';
import { PersonalInfoStep } from '@/components/hair-analysis/steps/PersonalInfoStep';
import { AgeRangeStep } from '@/components/hair-analysis/steps/AgeRangeStep';
import { HairLossStep } from '@/components/hair-analysis/steps/HairLossStep';
import { DurationStep } from '@/components/hair-analysis/steps/DurationStep';
import { PreviousTransplantStep } from '@/components/hair-analysis/steps/PreviousTransplantStep';
import { PreviousTransplantDetailsStep } from '@/components/hair-analysis/steps/PreviousTransplantDetailsStep';
import { MedicalHistoryStep } from '@/components/hair-analysis/steps/MedicalHistoryStep';
import { PhotosStep } from '@/components/hair-analysis/steps/PhotosStep';
import { FinalStep } from '@/components/hair-analysis/steps/FinalStep';
import { stepProgress, doctorInfo, stepIds } from '@/components/hair-analysis/constants';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';

const steps = [
  { id: stepIds.personal },
  { id: stepIds.ageRange },
  { id: stepIds.hairLoss },
  { id: stepIds.duration },
  { id: stepIds.previous },
  { id: stepIds.previousDetails },
  { id: stepIds.medical },
  { id: stepIds.photos },
  { id: stepIds.final },
];

const initialFormData: HairAnalysisFormData = {
  fullName: '',
  email: '',
  phone: '',
  age: null,
  gender: '' as 'male' | 'female' | 'other',
  country: '',
  hairLossType: '',
  hairLossDuration: '',
  hairLossStability: '',
  familyHistory: false,
  medicalConditions: [],
  medications: [],
  previousTransplants: null,
  previousTransplantDetails: '',
  preferredTechnique: '',
  budgetRange: '',
  timeframe: '',
  photos: {},
};

export default function HairAnalysis() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<HairAnalysisFormData>(initialFormData);
  const { currentLocale, setCurrentLocale } = useContext(LocaleContext);
  const { t } = useTranslation();

  const getStepConfig = (stepId: string) => {
    const config = t.hairAnalysis.steps[stepId as keyof typeof t.hairAnalysis.steps];
    if (!config) {
      console.warn(`Missing translation for step: ${stepId}`);
      return { title: '', description: '' };
    }
    return config;
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      // If we're on the Medical History step and user didn't have previous transplants
      // Skip the Previous Transplant Details step when going back
      if (currentStep === 6 && !formData.previousTransplants) {
        setCurrentStep(4); // Go back to Previous Transplant step
      } else {
        setCurrentStep(prev => prev - 1);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (t: any) => {
    try {
      // Validate required fields
      if (!formData.gender || !formData.ageRange || !formData.hairLossType || !formData.hairLossDuration) {
        alert(t.hairAnalysis.toast.error.requiredFields);
        return;
      }

      const success = await submitAnalysis(formData, t);
      if (success) {
        // Don't reset the form or show alert, as WhatsApp will open automatically
      } else {
        alert(t.hairAnalysis.toast.error.submitError);
      }
    } catch (error) {
      console.error('Error submitting analysis:', error);
      alert(t.hairAnalysis.toast.error.submitError);
    }
  };

  const getCurrentStepMessage = () => {
    const stepId = steps[currentStep].id;
    const messages = t.hairAnalysis.doctor.messages;
    const message = messages[stepId as keyof typeof messages];
    
    // If we're on the Previous Transplant Details step and no message exists,
    // use the previous transplant message
    if (stepId === 'previousDetails' && !message) {
      return messages.previousDetails;
    }
    
    // If we're on the Medical History step and no message exists,
    // use the medical message
    if (stepId === 'medical' && !message) {
      return messages.medical;
    }
    
    return message || '';
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PersonalInfoStep
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
          />
        );
      case 1:
        return (
          <AgeRangeStep
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <HairLossStep
            formData={formData}
            setFormData={setFormData}
            gender={formData.gender as 'male' | 'female'}
            onNext={handleNext}
          />
        );
      case 3:
        return (
          <DurationStep
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
          />
        );
      case 4:
        return <PreviousTransplantStep formData={formData} setFormData={setFormData} onNext={handleNext} />;
      case 5:
        return <PreviousTransplantDetailsStep formData={formData} setFormData={setFormData} onNext={handleNext} />;
      case 6:
        return <MedicalHistoryStep formData={formData} setFormData={setFormData} onNext={handleNext} />;
      case 7:
        return (
          <PhotosStep
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
          />
        );
      case 8:
        return (
          <FinalStep
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95 relative">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-primary/5 via-background to-background border-b border-border/50 py-6">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Desktop Header */}
          <div className="hidden md:block">
            <div className="flex items-center justify-between mb-6">
              <div>
                <img
                  src="https://yakisiklihairclinic.com/wp-content/uploads/2023/03/yakisikli-logo-2.png" 
                  alt="Yakisikli Hair Clinic"
                  className="h-16 w-auto transition-transform hover:scale-105"
                />
              </div>
              <div className="flex items-center gap-6">
                <a href="tel:+905360344866" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm font-medium">{t.header.contact.phone}</span>
                </a>
                <div className="flex items-center gap-4">
                  <a 
                    href="https://instagram.com/yakisiklihairclinic" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                  <a 
                    href="https://facebook.com/yakisiklihairclinic" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                  <a 
                    href="https://youtube.com/yakisiklihairclinic" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
                  >
                    <Youtube className="h-4 w-4" />
                  </a>
                  <a 
                    href="mailto:info@yakisiklihairclinic.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                  <a 
                    href="https://wa.me/902122427171" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </a>
                </div>
                <div className="h-4 w-px bg-border mx-4" />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-9 gap-2">
                      <span className="text-lg">{currentLocale.flag}</span>
                      <span className="text-sm font-medium">{currentLocale.name}</span>
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[150px]">
                    {locales.map((locale) => (
                      <DropdownMenuItem
                        key={locale.code}
                        onClick={() => setCurrentLocale(locale)}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <span className="text-base">{locale.flag}</span>
                        <span className="text-sm">{locale.name}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          
          {/* Mobile Header */}
          <div className="md:hidden space-y-4">
            <div className="flex items-center justify-between">
              <img
                src="https://yakisiklihairclinic.com/wp-content/uploads/2023/03/yakisikli-logo-2.png" 
                alt="Yakisikli Hair Clinic"
                className="h-10 w-auto"
              />
              <div className="flex items-center gap-3">
                <a href="tel:+905360344866" className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                  <Phone className="h-4 w-4 text-primary" />
                </a>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <span className="text-lg">{currentLocale.flag}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[150px]">
                    {locales.map((locale) => (
                      <DropdownMenuItem
                        key={locale.code}
                        onClick={() => setCurrentLocale(locale)}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <span className="text-base">{locale.flag}</span>
                        <span className="text-sm">{locale.name}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 pt-2">
              <a href="https://instagram.com/yakisiklihairclinic" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                <Instagram className="h-4 w-4 text-primary" />
              </a>
              <a href="https://facebook.com/yakisiklihairclinic" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                <Facebook className="h-4 w-4 text-primary" />
              </a>
              <a href="https://youtube.com/yakisiklihairclinic" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                <Youtube className="h-4 w-4 text-primary" />
              </a>
              <a href="https://wa.me/902122427171" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                <MessageCircle className="h-4 w-4 text-primary" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="text-center max-w-3xl mx-auto mt-6 pb-6">
          {currentStep === 0 && (
            <>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent mb-3">
                {t.hairAnalysis.title}
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                {t.hairAnalysis.description}
              </p>
            </>
          )}
        </div>
      </div>
      
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <ProgressHeader
          currentStep={currentStep}
          totalSteps={steps.length}
          progress={stepProgress[steps[currentStep].id as keyof typeof stepProgress]}
          onBack={handlePrevious}
          onNext={handleNext}
          title={getStepConfig(steps[currentStep].id).title}
          description={getStepConfig(steps[currentStep].id).description}
        />

        <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
          <div className="space-y-6 mb-12">
            {renderStep()}
          </div>
          
          <DoctorFeedback
            message={getCurrentStepMessage()}
            doctorInfo={doctorInfo}
          />
        </form>
      </div>
    </div>
  );
}