import React from 'react';
import { HairAnalysisFormData } from '@/types';
import { useTranslation } from '@/hooks/useTranslation';
import { AlertTriangle, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface MedicalHistoryStepProps {
  formData: HairAnalysisFormData;
  setFormData: (data: HairAnalysisFormData) => void;
  onNext: () => void;
}

interface MedicalQuestion {
  id: string;
  title: string;
  answer: boolean | null;
  details?: string;
}

export function MedicalHistoryStep({ formData, setFormData, onNext }: MedicalHistoryStepProps) {
  const { t } = useTranslation();
  const [questions, setQuestions] = React.useState<MedicalQuestion[]>([
    { id: 'allergies', title: t.hairAnalysis.steps.medical.allergies.title, answer: null },
    { id: 'conditions', title: t.hairAnalysis.steps.medical.conditions.title, answer: null },
    { id: 'medications', title: t.hairAnalysis.steps.medical.medications.title, answer: null },
  ]);

  const handleAnswer = (id: string, answer: boolean) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, answer, details: answer ? q.details : '' } : q
    ));
    
    if (answer) {
      // Scroll to the textarea after a short delay
      setTimeout(() => {
        document.querySelector(`#${id}-details`)?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'center'
        });
      }, 300);
    }
  };

  const handleDetails = (id: string, details: string) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, details } : q
    ));
  };

  const handleSubmit = () => {
    setFormData({
      ...formData,
      medicalConditions: [questions.find(q => q.id === 'conditions')?.details || ''],
      medications: [questions.find(q => q.id === 'medications')?.details || ''],
      allergies: [questions.find(q => q.id === 'allergies')?.details || ''],
    });
    onNext();
  };

  return (
    <div className="space-y-8">
      {questions.map((question) => (
        <div key={question.id} className="space-y-4 bg-background rounded-xl p-4 sm:p-6 border border-border">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold">{question.title}</h3>
              <span className="text-sm text-muted-foreground">
                ({t.hairAnalysis.steps.medical.optional})
              </span>
            </div>
            <div className="flex gap-2 sm:ml-auto">
              <Button
                type="button"
                variant={question.answer === true ? "default" : "outline"}
                className="flex-1 sm:w-24"
                onClick={() => handleAnswer(question.id, true)}
              >
                <Check className="w-4 h-4 mr-2" />
                {t.hairAnalysis.steps.medical.buttons.yes}
              </Button>
              <Button
                type="button"
                variant={question.answer === false ? "default" : "outline"}
                className="flex-1 sm:w-24"
                onClick={() => handleAnswer(question.id, false)}
              >
                <X className="w-4 h-4 mr-2" />
                {t.hairAnalysis.steps.medical.buttons.no}
              </Button>
            </div>
          </div>

          {question.answer && (
            <Textarea
              id={`${question.id}-details`}
              value={question.details || ''}
              onChange={(e) => handleDetails(question.id, e.target.value)}
              placeholder={t.hairAnalysis.steps.medical[question.id as keyof typeof t.hairAnalysis.steps.medical].placeholder}
              className="min-h-[100px]"
            />
          )}
        </div>
      ))}

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