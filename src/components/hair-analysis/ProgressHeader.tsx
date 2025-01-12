import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useTranslation } from '@/hooks/useTranslation';

interface ProgressHeaderProps {
  currentStep: number;
  totalSteps: number;
  progress: number;
  onBack: () => void;
  onNext?: () => void;
  title: string;
  description: string;
}

export function ProgressHeader({
  currentStep,
  totalSteps,
  progress,
  onBack,
  onNext,
  title,
  description,
}: ProgressHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className="mb-20">
      <div className="w-full mb-8">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={onBack}
            className={`text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 ${
              currentStep === 0 ? 'invisible' : ''
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            {t.hairAnalysis.navigation.back}
          </button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentStep
                    ? 'bg-primary scale-125'
                    : index < currentStep
                    ? 'bg-primary/40'
                    : 'bg-border'
                }`}
              />
            ))}
          </div>
          <button
            onClick={onNext}
            className={`text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 ${
              currentStep === totalSteps - 1 ? 'invisible' : ''
            }`}
          >
            {t.hairAnalysis.navigation.next}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <Progress value={progress} className="h-0.5" />
      </div>

      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent mb-4 sm:mb-6 leading-[1.3] sm:leading-[1.4]">{title}</h2>
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-xl mx-auto">{description}</p>
      </div>
    </div>
  );
}