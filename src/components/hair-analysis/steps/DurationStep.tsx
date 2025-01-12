import React from 'react';
import { HairAnalysisFormData } from '@/types';
import { useTranslation } from '@/hooks/useTranslation';
import { Clock } from 'lucide-react';

interface DurationStepProps {
  formData: HairAnalysisFormData;
  setFormData: (data: HairAnalysisFormData) => void;
  onNext: () => void;
}

const options = [
  { id: 'less-than-1', min: 0, max: 1 },
  { id: '1-to-3', min: 1, max: 3 },
  { id: '3-to-5', min: 3, max: 5 },
  { id: 'more-than-5', min: 5, max: null },
] as const;

export function DurationStep({ formData, setFormData, onNext }: DurationStepProps) {
  const { t } = useTranslation();

  const handleSelect = (id: string) => {
    setFormData({ ...formData, hairLossDuration: id as any });
    onNext();
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => handleSelect(option.id)}
          className={`group relative overflow-hidden rounded-xl p-8 transition-all duration-300 bg-background hover:bg-accent ${
            formData.hairLossDuration === option.id
              ? 'ring-2 ring-primary shadow-lg'
              : 'hover:shadow-md border border-border'
          }`}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div className={`w-3 h-3 rounded-full transition-colors ${
                formData.hairLossDuration === option.id
                  ? 'bg-primary shadow-glow'
                  : 'bg-border'
              }`} />
            </div>

            <h3 className="text-2xl font-bold text-foreground mb-2">
              {option.max 
                ? `${option.min} - ${option.max} ${t.hairAnalysis.steps.duration.options.years}`
                : `${option.min}+ ${t.hairAnalysis.steps.duration.options.years}`}
            </h3>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
        </button>
      ))}
    </div>
  );
}
