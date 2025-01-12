import React from 'react';
import { HairAnalysisFormData } from '@/types';
import { useTranslation } from '@/hooks/useTranslation';
import { Clock, Building2, Ruler } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface PreviousTransplantDetailsStepProps {
  formData: HairAnalysisFormData;
  setFormData: (data: HairAnalysisFormData) => void;
  onNext: () => void;
}

interface TransplantDetails {
  timeframe: string;
  clinic: string;
  grafts: string;
  technique: string;
  results: string;
}

export function PreviousTransplantDetailsStep({
  formData,
  setFormData,
  onNext,
}: PreviousTransplantDetailsStepProps) {
  const { t } = useTranslation();
  const [details, setDetails] = React.useState<TransplantDetails>({
    timeframe: '',
    clinic: '',
    grafts: '',
    technique: '',
    results: '',
  });

  const options = [
    { id: 'less-than-1' },
    { id: '1-to-3' },
    { id: '3-to-5' },
    { id: 'more-than-5' },
  ];

  const handleTimeframeSelect = (id: string) => {
    setDetails({ ...details, timeframe: id });
    
    // Only scroll if there are additional details to show
    if (id) {
      setTimeout(() => {
        document.querySelector('#additional-details')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 300);
    }
  };

  const handleSubmit = () => {
    setFormData({
      ...formData,
      previousTransplantDetails: JSON.stringify(details),
    });
    onNext();
  };

  return (
    <div className="space-y-8">
      {/* Timeframe Selection */}
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-primary" />
        <Label className="text-lg font-semibold">
          {t.hairAnalysis.steps.previousDetails.timeframe.title}
        </Label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {options.map((option) => (
          <button
            type="button"
            key={option.id}
            onClick={() => handleTimeframeSelect(option.id)}
            className={`group relative overflow-hidden rounded-xl p-6 transition-all duration-300 bg-background hover:bg-accent ${
              details.timeframe === option.id
                ? 'ring-2 ring-primary shadow-lg'
                : 'hover:shadow-md border border-border'
            }`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div className={`w-3 h-3 rounded-full transition-colors ${
                  details.timeframe === option.id
                    ? 'bg-primary shadow-glow'
                    : 'bg-border'
                }`} />
              </div>

              <h3 className="text-xl font-bold text-foreground">
                {t.hairAnalysis.steps.previousDetails.timeframe.options[option.id as keyof typeof t.hairAnalysis.steps.previousDetails.timeframe.options]}
              </h3>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          </button>
        ))}
      </div>

      {/* Additional Details */}
      <div id="additional-details" className="grid gap-6">
        {/* Clinic Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            <Label className="text-lg font-semibold">
              {t.hairAnalysis.steps.previousDetails.clinic.title}
            </Label>
            <span className="text-sm text-muted-foreground ml-2">
              ({t.hairAnalysis.steps.previousDetails.optional})
            </span>
          </div>
          <Input
            value={details.clinic}
            onChange={(e) => setDetails({ ...details, clinic: e.target.value })}
            placeholder={t.hairAnalysis.steps.previousDetails.clinic.placeholder}
          />
        </div>

        {/* Number of Grafts */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-primary" />
            <Label className="text-lg font-semibold">
              {t.hairAnalysis.steps.previousDetails.grafts.title}
            </Label>
            <span className="text-sm text-muted-foreground ml-2">
              ({t.hairAnalysis.steps.previousDetails.optional})
            </span>
          </div>
          <Input
            type="number"
            value={details.grafts}
            onChange={(e) => setDetails({ ...details, grafts: e.target.value })}
            placeholder={t.hairAnalysis.steps.previousDetails.grafts.placeholder}
            className="max-w-xs"
          />
        </div>

        {/* Technique Used */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold">
            {t.hairAnalysis.steps.previousDetails.technique.title}
          </Label>
          <span className="text-sm text-muted-foreground ml-2">
            ({t.hairAnalysis.steps.previousDetails.optional})
          </span>
          <Input
            value={details.technique}
            onChange={(e) => setDetails({ ...details, technique: e.target.value })}
            placeholder={t.hairAnalysis.steps.previousDetails.technique.placeholder}
          />
        </div>

        {/* Results and Satisfaction */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold">
            {t.hairAnalysis.steps.previousDetails.results.title}
          </Label>
          <span className="text-sm text-muted-foreground ml-2">
            ({t.hairAnalysis.steps.previousDetails.optional})
          </span>
          <Textarea
            value={details.results}
            onChange={(e) => setDetails({ ...details, results: e.target.value })}
            placeholder={t.hairAnalysis.steps.previousDetails.results.placeholder}
            className="min-h-[100px]"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          className="bg-primary hover:bg-primary/90 text-white px-8"
        >
          {t.hairAnalysis.navigation.next}
        </Button>
      </div>
    </div>
  );
}
