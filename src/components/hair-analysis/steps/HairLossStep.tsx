import React, { useState } from 'react';
import { HairAnalysisFormData } from '@/types';
import { useTranslation } from '@/hooks/useTranslation';
import { Switch } from '@/components/ui/switch';

interface HairLossStepProps {
  formData: HairAnalysisFormData;
  setFormData: (data: HairAnalysisFormData) => void;
}

export const maleOptions = [
  { 
    id: 'none', 
    images: {
      default: 'https://glokalizm.com/yakisikli/img/hairloss/men/no-hair-loss.svg',
      hover: 'https://glokalizm.com/yakisikli/img/hairloss/men/no-hair-loss-1.svg'
    }
  },
  { 
    id: 'light', 
    images: {
      default: 'https://glokalizm.com/yakisikli/img/hairloss/men/receding-hairline-light.svg',
      hover: 'https://glokalizm.com/yakisikli/img/hairloss/men/receding-hairline-light-1.svg'
    }
  },
  { 
    id: 'slight-crown', 
    images: {
      default: 'https://glokalizm.com/yakisikli/img/hairloss/men/receding-hairline-strong-crown.svg',
      hover: 'https://glokalizm.com/yakisikli/img/hairloss/men/receding-hairline-strong-crown-1.svg'
    }
  },
  { 
    id: 'strong-crown', 
    images: {
      default: 'https://glokalizm.com/yakisikli/img/hairloss/men/receding-hairline-strong-crown.svg',
      hover: 'https://glokalizm.com/yakisikli/img/hairloss/men/receding-hairline-strong-crown-1.svg'
    }
  },
  { 
    id: 'semi-bald', 
    images: {
      default: 'https://glokalizm.com/yakisikli/img/hairloss/men/semi-bald.svg',
      hover: 'https://glokalizm.com/yakisikli/img/hairloss/men/semi-bald-1.svg'
    }
  },
  { 
    id: 'bald', 
    images: {
      default: 'https://glokalizm.com/yakisikli/img/hairloss/men/bald.svg',
      hover: 'https://glokalizm.com/yakisikli/img/hairloss/men/bald-1.svg'
    }
  }
];

export const femaleOptions = [
  { 
    id: 'none', 
    images: {
      default: 'https://glokalizm.com/yakisikli/img/hairloss/women/no-hair-loss.svg',
      hover: 'https://glokalizm.com/yakisikli/img/hairloss/women/no-hair-loss-1.svg'
    }
  },
  { 
    id: 'light', 
    images: {
      default: 'https://glokalizm.com/yakisikli/img/hairloss/women/receding-hairline-light.svg',
      hover: 'https://glokalizm.com/yakisikli/img/hairloss/women/receding-hairline-light-1.svg'
    }
  },
  { 
    id: 'slight-crown', 
    images: {
      default: 'https://glokalizm.com/yakisikli/img/hairloss/women/receding-hairline-strong-crown.svg',
      hover: 'https://glokalizm.com/yakisikli/img/hairloss/women/receding-hairline-strong-crown-1.svg'
    }
  },
  { 
    id: 'strong-crown', 
    images: {
      default: 'https://glokalizm.com/yakisikli/img/hairloss/women/receding-hairline-strong-crown.svg',
      hover: 'https://glokalizm.com/yakisikli/img/hairloss/women/receding-hairline-strong-crown-1.svg'
    }
  },
  { 
    id: 'semi-bald', 
    images: {
      default: 'https://glokalizm.com/yakisikli/img/hairloss/women/semi-bald.svg',
      hover: 'https://glokalizm.com/yakisikli/img/hairloss/women/semi-bald-1.svg'
    }
  },
  { 
    id: 'bald', 
    images: {
      default: 'https://glokalizm.com/yakisikli/img/hairloss/women/bald.svg',
      hover: 'https://glokalizm.com/yakisikli/img/hairloss/women/bald-1.svg'
    }
  }
];

interface HairLossStepProps {
  formData: HairAnalysisFormData;
  setFormData: (data: HairAnalysisFormData) => void;
  gender: 'male' | 'female';
  onNext: () => void;
}

export function HairLossStep({ formData, setFormData, gender, onNext }: HairLossStepProps) {
  const { t } = useTranslation();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [viewType, setViewType] = useState<'central' | 'top'>('central');
  const options = gender === 'female' ? femaleOptions : maleOptions;
  
  const handleSelect = (id: string) => {
    setFormData({ ...formData, hairLossType: id as any });
    onNext();
  };

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="md:hidden flex items-center justify-between p-4 bg-background rounded-lg border">
        <span className="text-sm font-medium">Central perspective</span>
        <div className="flex items-center gap-3">
          <Switch
            id="view-toggle"
            checked={viewType === 'top'}
            onCheckedChange={(checked) => setViewType(checked ? 'top' : 'central')}
          />
          <span className="text-sm font-medium">Top view</span>
        </div>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            onMouseEnter={() => setHoveredId(option.id)}
            onMouseLeave={() => setHoveredId(null)}
            className={`relative bg-white rounded-xl cursor-pointer transition-all hover:shadow-md overflow-hidden group w-full ${
              formData.hairLossType === option.id ? 'ring-2 ring-primary shadow-lg' : ''
            }`}
          >
            <h3 className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-background via-background/95 to-transparent py-4 px-2 text-center">
              <span className="text-sm font-semibold text-foreground">
                {t.hairAnalysis.steps.hairLoss.options[option.id as keyof typeof t.hairAnalysis.steps.hairLoss.options]}
              </span>
            </h3>

            {/* Image Container */}
            <div className="relative pt-[60px] pb-4 px-4">
              <img
                src={viewType === 'top' ? option.images.hover : (hoveredId === option.id ? option.images.hover : option.images.default)}
                alt={t.hairAnalysis.steps.hairLoss.options[option.id as keyof typeof t.hairAnalysis.steps.hairLoss.options]}
                className="w-full h-[160px] object-contain transition-all duration-300"
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
