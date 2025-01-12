import React from 'react';
import { HairAnalysisFormData } from '@/types';
import { useTranslation } from '@/hooks/useTranslation';
import { Calendar } from 'lucide-react';

interface AgeRangeStepProps {
  formData: HairAnalysisFormData;
  setFormData: (data: HairAnalysisFormData) => void;
  onNext: () => void;
}

const ageRanges = [
  { min: 20, max: 30 },
  { min: 30, max: 40 },
  { min: 40, max: 50 },
  { min: 50, max: 60 },
  { min: 60, max: null }, // 60+
];

export function AgeRangeStep({ formData, setFormData, onNext }: AgeRangeStepProps) {
  const { t } = useTranslation();

  const handleSelect = (min: number, max: number | null) => {
    setFormData({ ...formData, ageRange: { min, max } });
    onNext();
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {ageRanges.map(({ min, max }) => (
        <button
          key={`${min}-${max}`}
          onClick={() => handleSelect(min, max)}
          className={`group relative overflow-hidden rounded-xl p-6 transition-all duration-300 bg-background hover:bg-accent ${
            formData.ageRange?.min === min
              ? 'ring-2 ring-primary shadow-lg'
              : 'hover:shadow-md border border-border'
          }`}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div className={`w-3 h-3 rounded-full transition-colors ${
                formData.ageRange?.min === min
                  ? 'bg-primary shadow-glow'
                  : 'bg-border'
              }`} />
            </div>

            <h3 className="text-2xl font-bold text-foreground mb-2">
              {max ? `${min}-${max}` : `${min}+`}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t.hairAnalysis.steps.ageRange.options[
                max ? 'range' : 'above'
              ].replace('{min}', min.toString()).replace('{max}', max?.toString() || '')}
            </p>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
        </button>
      ))}
    </div>
  );
}