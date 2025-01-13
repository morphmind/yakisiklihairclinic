import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Award, Scroll, HeartHandshake, Medal, Star, Users, UserCheck, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function WhyUsSection() {
  const { t } = useTranslation();
  const [hoveredFeature, setHoveredFeature] = React.useState<number | null>(null);

  return (
    <div className="relative py-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

      <div className="container relative z-10">
        {/* Mobile Doctor Profile Card */}
        <div className="lg:hidden mb-8">
          <div className="bg-gradient-to-br from-background to-primary/5 rounded-xl p-4 border border-border/50">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-xl overflow-hidden">
                  <img
                    src="https://glokalizm.com/yakisikli/img/doctorprofile.png"
                    alt="Dr. Mustafa Yakışıklı"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background">
                  <div className="w-1.5 h-1.5 rounded-full bg-white absolute inset-0 m-auto animate-pulse" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold truncate">Dr. Mustafa Yakışıklı</h3>
                <p className="text-sm text-muted-foreground">{t.home.hero.whyUs.doctorTitle}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {t.home.hero.whyUs.doctorDescription}
            </p>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-primary" />
                <span className="font-medium">{t.home.hero.whyUs.stats.certificates}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="font-medium">{t.home.hero.whyUs.stats.operations}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Doctor Section */}
        <div className="hidden lg:block max-w-5xl mx-auto mb-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl transform rotate-3" />
              <img
                src="https://glokalizm.com/yakisikli/img/doctorprofile.png"
                alt="Dr. Mustafa Yakışıklı"
                className="relative w-full aspect-[4/3] object-cover rounded-2xl"
              />
            </div>
            <div className="space-y-6">
              <div className="hidden lg:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10">
                <Medal className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">{t.home.hero.whyUs.doctorTitle}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold">Dr. Mustafa Yakışıklı</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.home.hero.whyUs.doctorDescription}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium whitespace-nowrap">{t.home.hero.whyUs.stats.certificates}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium whitespace-nowrap">{t.home.hero.whyUs.stats.operations}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Clinic Features & Certifications */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-16">
          {/* Clinic Features */}
          <div className="bg-gradient-to-br from-background to-primary/5 rounded-xl p-4 md:p-8 border border-border/50">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold">{t.home.hero.whyUs.clinic.title}</h3>
            </div>
            <ul className="space-y-4">
              {t.home.hero.whyUs.clinic.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-xs md:text-sm">{index + 1}</span>
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground">{feature}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Certifications */}
          <div className="bg-gradient-to-br from-background to-secondary/5 rounded-xl p-4 md:p-6 border border-border/50">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Scroll className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold">{t.home.hero.whyUs.certifications.title}</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* JCI Accreditation */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-white/5 border border-border/50">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Check className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium">{t.home.hero.whyUs.certifications.items.jci}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Joint Commission International</p>
                </div>
              </div>
              
              {/* ISO Certification */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-white/5 border border-border/50">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="font-medium">{t.home.hero.whyUs.certifications.items.iso}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Quality Management System</p>
                </div>
              </div>
              
              {/* ISHRS Membership */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-white/5 border border-border/50">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Check className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="font-medium">{t.home.hero.whyUs.certifications.items.ishrs}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">International Society of Hair Restoration Surgery</p>
                </div>
              </div>
              
              {/* TSHD Membership */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-white/5 border border-border/50">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <Check className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="font-medium">{t.home.hero.whyUs.certifications.items.tshd}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Turkish Society of Hair Restoration</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Patient Satisfaction Section */}
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-4">
              <HeartHandshake className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">{t.home.hero.whyUs.satisfaction.title}</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {/* Satisfaction Rate */}
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-4 border border-border/50 text-center">
              <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center mx-auto mb-2">
                <Star className="w-4 h-4 text-green-500" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-green-600">{t.home.hero.whyUs.satisfaction.stats.rate.value}</div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">{t.home.hero.whyUs.satisfaction.stats.rate.label}</p>
            </div>
            
            {/* Happy Patients */}
            <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-xl p-4 border border-border/50 text-center">
              <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center mx-auto mb-2">
                <UserCheck className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-blue-600">{t.home.hero.whyUs.satisfaction.stats.patients.value}</div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">{t.home.hero.whyUs.satisfaction.stats.patients.label}</p>
            </div>
            
            {/* Rating */}
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-border/50 text-center">
              <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center mx-auto mb-2">
                <Star className="w-4 h-4 text-purple-500 fill-purple-500" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-purple-600">{t.home.hero.whyUs.satisfaction.stats.rating.value}</div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">{t.home.hero.whyUs.satisfaction.stats.rating.label}</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white"
              onClick={() => window.open('/hair-analysis', '_blank')}
            >
              {t.home.hero.whyUs.satisfaction.cta}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}