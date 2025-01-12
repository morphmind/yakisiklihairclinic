import React from 'react';
import { HairAnalysisFormData } from '@/types';
import { useTranslation } from '@/hooks/useTranslation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Check, Lock, Shield, UserCheck } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/useToast';
import { countries } from '@/config/countries';

interface FinalStepProps {
  formData: HairAnalysisFormData;
  setFormData: (data: HairAnalysisFormData) => void;
  onSubmit: () => void;
}

export function FinalStep({ formData, setFormData, onSubmit }: FinalStepProps) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [selectedPhoneCode, setSelectedPhoneCode] = React.useState('+90'); // Default to Turkey
  
  // Find country by phone code and update country selection
  React.useEffect(() => {
    const country = countries.find(c => c.phoneCode === selectedPhoneCode);
    if (country) {
      setFormData(prev => ({ ...prev, country: country.code }));
    }
  }, [selectedPhoneCode, setFormData]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.country) {
      toast({
        variant: "error",
        title: t.hairAnalysis.toast.error.title,
        description: t.hairAnalysis.toast.error.requiredFields,
      });
      setIsSubmitting(false);
      return;
    }

    try {
      await onSubmit(t);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="space-y-8">
        {/* Name Fields */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>{t.hairAnalysis.steps.final.firstName}</Label>
            <Input
              required
              type="text"
              value={formData.firstName || ''}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              placeholder={t.hairAnalysis.steps.final.firstNamePlaceholder}
            />
          </div>
          <div className="space-y-2">
            <Label>{t.hairAnalysis.steps.final.lastName}</Label>
            <Input
              required
              type="text"
              value={formData.lastName || ''}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              placeholder={t.hairAnalysis.steps.final.lastNamePlaceholder}
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label>{t.hairAnalysis.steps.final.email}</Label>
          <Input
            required
            type="email"
            value={formData.email || ''}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder={t.hairAnalysis.steps.final.emailPlaceholder}
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label>{t.hairAnalysis.steps.final.phone}</Label>
          <div className="flex gap-2">
            <Select
              defaultValue="+90"
              value={selectedPhoneCode}
              onValueChange={(value) => setSelectedPhoneCode(value)}
            >
              <SelectTrigger className="w-[120px] px-3">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    <span className="text-base">{countries.find(c => c.phoneCode === selectedPhoneCode)?.flag}</span>
                    <span className="text-sm">{selectedPhoneCode}</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem
                    key={country.code}
                    value={country.phoneCode}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{country.flag}</span>
                      <span className="text-sm">{country.phoneCode}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              required
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => {
                const phoneNumber = e.target.value.replace(/[^0-9]/g, '');
                setFormData({ ...formData, phone: phoneNumber });
              }}
              placeholder={t.hairAnalysis.steps.final.phonePlaceholder}
              className="flex-1"
            />
          </div>
        </div>

        {/* Country */}
        <div className="space-y-2">
          <Label>{t.hairAnalysis.steps.final.country}</Label>
          <Select
            value={formData.country}
            onValueChange={(value) => setFormData({ ...formData, country: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder={t.hairAnalysis.steps.final.countryPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Features */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/5">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Check className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">{t.hairAnalysis.steps.final.features.free}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/5">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Lock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">{t.hairAnalysis.steps.final.features.secure}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/5">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">{t.hairAnalysis.steps.final.features.expert}</p>
            </div>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="rounded-lg bg-muted/50 p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-muted-foreground mt-0.5" />
            <p className="text-sm text-muted-foreground">
              {t.hairAnalysis.steps.final.privacyNotice}
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          onClick={() => handleSubmit()}
          className="w-full bg-primary hover:bg-primary/90 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? t.hairAnalysis.steps.final.submitting : t.hairAnalysis.steps.final.submit}
        </Button>
      </div>
    </div>
  );
}