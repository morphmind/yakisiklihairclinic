import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { 
  Plane, 
  Hotel, 
  Crown, 
  HeartHandshake,
  Clock,
  Stethoscope,
  Syringe,
  Bed,
  MessageCircle,
  Phone,
  Calendar,
  ChevronRight,
  Car,
  UserCheck,
  HeadsetIcon,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function PatientExperienceSection() {
  const { t } = useTranslation();
  const [hoveredStep, setHoveredStep] = React.useState<number | null>(null);
  const [hoveredService, setHoveredService] = React.useState<string | null>(null);
  
  const treatmentSteps = [
    {
      icon: Stethoscope,
      gradient: 'from-primary/10 to-primary/5',
      iconColor: 'text-primary',
      bgColor: 'bg-primary/5',
      borderColor: 'border-primary/10'
    },
    {
      icon: Plane,
      gradient: 'from-secondary/10 to-secondary/5',
      iconColor: 'text-secondary',
      bgColor: 'bg-secondary/5',
      borderColor: 'border-secondary/10'
    },
    {
      icon: Syringe,
      gradient: 'from-primary/10 to-primary/5',
      iconColor: 'text-primary',
      bgColor: 'bg-primary/5',
      borderColor: 'border-primary/10'
    },
    {
      icon: Bed,
      gradient: 'from-secondary/10 to-secondary/5',
      iconColor: 'text-secondary',
      bgColor: 'bg-secondary/5',
      borderColor: 'border-secondary/10'
    }
  ];

  const services = [
    {
      id: 'vip',
      icon: Crown,
      gradient: 'from-primary/10 to-primary/5',
      iconColor: 'text-primary',
      bgColor: 'bg-primary/5',
      borderColor: 'border-primary/10'
    },
    {
      id: 'accommodation',
      icon: Hotel,
      gradient: 'from-secondary/10 to-secondary/5',
      iconColor: 'text-secondary',
      bgColor: 'bg-secondary/5',
      borderColor: 'border-secondary/10'
    },
    {
      id: 'transfer',
      icon: Car,
      gradient: 'from-primary/10 to-primary/5',
      iconColor: 'text-primary',
      bgColor: 'bg-primary/5',
      borderColor: 'border-primary/10'
    },
    {
      id: 'support',
      icon: HeadsetIcon,
      gradient: 'from-secondary/10 to-secondary/5',
      iconColor: 'text-secondary',
      bgColor: 'bg-secondary/5',
      borderColor: 'border-secondary/10'
    }
  ];

  return (
    <div className="relative py-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

      <div className="container relative z-10">
        <div className="grid gap-16">
          {/* Treatment Process */}
          <div className="space-y-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-3">
                <Clock className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-medium text-primary">{t.home.experience.process.badge}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.home.experience.process.title}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.home.experience.process.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {treatmentSteps.map((step, index) => {
                const stepData = t.home.experience.process.steps[index];
                return (
                <div 
                  key={index}
                  className="group relative h-full"
                  onMouseEnter={() => setHoveredStep(index)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  <div className={cn(
                    "relative overflow-hidden rounded-xl h-full transition-all duration-300",
                    "bg-gradient-to-br border",
                    step.gradient,
                    step.borderColor,
                    hoveredStep === index ? "scale-[1.02] shadow-lg" : "hover:scale-[1.01]",
                    hoveredStep === index ? "bg-opacity-10" : "bg-opacity-5"
                  )}>
                    {/* Mobile Layout */}
                    <div className="flex items-start gap-4 p-4 lg:hidden">
                      <div className="flex-shrink-0">
                        <div className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center",
                          step.bgColor,
                          step.iconColor
                        )}>
                          <step.icon className="w-6 h-6" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-base font-semibold">{stepData.title}</h3>
                          <div className={cn(
                            "w-5 h-5 rounded-full flex items-center justify-center text-xs",
                            step.bgColor,
                            step.iconColor
                          )}>
                            {index + 1}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {stepData.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Desktop Layout */}
                    <div className="hidden lg:block p-6">
                      {/* Step Number */}
                      <div className="absolute top-4 right-4">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center",
                          step.bgColor,
                          "font-semibold text-sm",
                          step.iconColor
                        )}>
                          {index + 1}
                        </div>
                      </div>

                      {/* Icon */}
                      <div className="mb-4">
                        <div className={cn(
                          "w-14 h-14 rounded-xl flex items-center justify-center",
                          step.bgColor,
                          step.iconColor
                        )}>
                          <step.icon className="w-7 h-7" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex flex-col h-[calc(100%-80px)]">
                        <h3 className="text-lg font-semibold mb-2">
                          {stepData.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                          {stepData.description}
                        </p>
                      </div>
                    </div>

                    {/* Hover Effect Line */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </div>
                </div>
              )})}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-secondary" />
                <span className="text-xs font-medium text-secondary">{t.home.experience.services.badge}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.home.experience.services.title}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.home.experience.services.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="group relative h-full"
                  onMouseEnter={() => setHoveredService(service.id)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  <div className={cn(
                    "relative overflow-hidden rounded-xl p-6 h-full transition-all duration-300",
                    "bg-gradient-to-br border",
                    service.gradient,
                    service.borderColor,
                    hoveredService === service.id ? "scale-[1.02] shadow-lg" : "hover:scale-[1.01]",
                    hoveredService === service.id ? "bg-opacity-10" : "bg-opacity-5"
                  )}>
                    {/* Mobile Layout */}
                    <div className="flex lg:hidden items-start gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                        service.bgColor,
                        service.iconColor
                      )}>
                        <service.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">
                          {t.home.experience.services.items[service.id].title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {t.home.experience.services.items[service.id].description}
                        </p>
                        <ul className="space-y-2">
                          {t.home.experience.services.items[service.id].features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {/* Desktop Layout */}
                    <div className="hidden lg:block">
                      <div className={cn(
                        "w-14 h-14 rounded-xl flex items-center justify-center mb-6",
                        service.bgColor,
                        service.iconColor
                      )}>
                        <service.icon className="w-7 h-7" />
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                          {t.home.experience.services.items[service.id].title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {t.home.experience.services.items[service.id].description}
                        </p>
                        <ul className="space-y-2.5">
                          {t.home.experience.services.items[service.id].features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2.5 text-sm">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Support CTA */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/90 border border-primary/10">
            <div className="absolute inset-0 bg-grid-white/5" />
            <div className="relative p-8 sm:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm mb-6">
                  <HeartHandshake className="w-3.5 h-3.5 text-white" />
                  <span className="text-xs font-medium text-white">{t.home.experience.support.badge}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  {t.home.experience.support.title}
                </h3>
                <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                  {t.home.experience.support.description}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto h-12 px-8 text-base gap-2 bg-white text-primary hover:bg-white/90 shadow-lg font-medium dark:bg-white dark:text-primary dark:hover:bg-white/90"
                    onClick={() => window.open('https://wa.me/905360344866', '_blank')}
                  >
                    <MessageCircle className="w-4 h-4" />
                    {t.home.experience.support.cta.whatsapp}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto h-12 px-8 text-base gap-2 border-white/20 bg-white/10 text-white hover:bg-white/20 shadow-lg font-medium"
                    onClick={() => window.location.href = '/contact'}
                  >
                    <Calendar className="w-4 h-4" />
                    {t.home.experience.support.cta.schedule}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto h-12 px-8 text-base gap-2 border-white/20 bg-white/10 text-white hover:bg-white/20 shadow-lg font-medium"
                    onClick={() => window.open('tel:+905360344866', '_blank')}
                  >
                    <Phone className="w-4 h-4" />
                    {t.home.experience.support.cta.call}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}