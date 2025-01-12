import React from 'react';
import { History, AlertCircle } from 'lucide-react';
import { HairAnalysisFormData } from '@/types';
import { useTranslation } from '@/hooks/useTranslation';

interface PreviousTransplantStepProps {
  formData: HairAnalysisFormData;
  setFormData: (data: HairAnalysisFormData) => void;
  onNext: () => void;
}

export function PreviousTransplantStep({ formData, setFormData, onNext }: PreviousTransplantStepProps) {
  const { t } = useTranslation();

  const handleSelect = (value: boolean) => {
    setFormData({ ...formData, previousTransplants: value });
    if (value) {
      onNext(); // Go to Previous Transplant Details
    } else {
      onNext();
      onNext(); // Skip Previous Transplant Details and go to Medical History
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      <div
        onClick={() => handleSelect(true)}
        className={`group relative overflow-hidden rounded-xl p-8 transition-all duration-300 bg-background hover:bg-accent ${
          formData.previousTransplants === true
            ? 'ring-2 ring-primary shadow-lg'
            : 'hover:shadow-md border border-border'
        }`}
      >
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <History className="w-6 h-6 text-primary" />
            </div>
            <div className={`w-3 h-3 rounded-full transition-colors ${
              formData.previousTransplants === true
                ? 'bg-primary shadow-glow'
                : 'bg-border'
            }`} />
          </div>

          <h3 className="text-2xl font-bold text-foreground mb-2">
            {t.hairAnalysis.steps.previous.options.yes.title}
          </h3>
          <p className="text-muted-foreground">
            {t.hairAnalysis.steps.previous.options.yes.description}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </div>
      
      <div
        onClick={() => handleSelect(false)}
        className={`group relative overflow-hidden rounded-xl p-8 transition-all duration-300 bg-background hover:bg-accent ${
          formData.previousTransplants === false
            ? 'ring-2 ring-primary shadow-lg'
            : 'hover:shadow-md border border-border'
        }`}
      >
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-primary" />
            </div>
            <div className={`w-3 h-3 rounded-full transition-colors ${
              formData.previousTransplants === false
                ? 'bg-primary shadow-glow'
                : 'bg-border'
            }`} />
          </div>

          <h3 className="text-2xl font-bold text-foreground mb-2">
            {t.hairAnalysis.steps.previous.options.no.title}
          </h3>
          <p className="text-muted-foreground">
            {t.hairAnalysis.steps.previous.options.no.description}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </div>
    </div>
  );
}