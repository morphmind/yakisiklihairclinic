import React, { useEffect } from 'react';
import { HairAnalysisFormData } from '@/types';
import { useTranslation } from '@/hooks/useTranslation';

interface PersonalInfoStepProps {
  formData: HairAnalysisFormData;
  setFormData: (data: HairAnalysisFormData) => void;
  onNext: () => void;
}

export function PersonalInfoStep({ formData, setFormData, onNext }: PersonalInfoStepProps) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div 
        onClick={() => {
          setFormData({ ...formData, gender: 'male' });
          onNext();
        }}
        className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 ${
          formData.gender === 'male' 
            ? 'ring-2 ring-primary shadow-xl' 
            : 'hover:shadow-lg'
        }`}
      >
        <img 
          src="https://glokalizm.com/yakisikli/img/men-hair-loss.png"
          alt="Male pattern hair loss"
          className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white">{t.hairAnalysis.steps.personal.options.male}</h3>
              <div className={`w-5 h-5 rounded-full border-2 transition-colors ${
            formData.gender === 'male'
              ? 'bg-primary border-primary shadow-glow'
              : 'border-white/50'
          }`} />
            </div>
          </div>
        </div>
      </div>
      
      <div
        onClick={() => {
          setFormData({ ...formData, gender: 'female' });
          onNext();
        }}
        className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 ${
          formData.gender === 'female'
            ? 'ring-2 ring-primary shadow-xl'
            : 'hover:shadow-lg'
        }`}
      >
        <img
          src="https://glokalizm.com/yakisikli/img/women-hair-loss.png"
          alt="Female pattern hair loss"
          className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white">{t.hairAnalysis.steps.personal.options.female}</h3>
              <div className={`w-5 h-5 rounded-full border-2 transition-colors ${
            formData.gender === 'female'
              ? 'bg-primary border-primary shadow-glow'
              : 'border-white/50'
          }`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
