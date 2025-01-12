import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { 
  Microscope, 
  Gem, 
  ChevronRight,
  Sparkles, 
  Syringe,
  Scissors,
  CircleDot,
  UserCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function TreatmentsSection() {
  const { t } = useTranslation();
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);

  const treatments = [
    {
      id: 'hair',
      icon: Scissors,
      image: 'https://glokalizm.com/yakisikli/img/treatments/hair-transplant.png',
      gradient: 'from-primary/10 via-primary/5 to-transparent',
      iconGradient: 'from-primary to-primary/80',
      path: '/treatments/hair-transplant'
    },
    {
      id: 'afro',
      icon: UserCheck,
      image: 'https://glokalizm.com/yakisikli/img/treatments/afro-hair-transplant.png',
      gradient: 'from-primary/10 via-primary/5 to-transparent',
      iconGradient: 'from-primary to-primary/80',
      path: '/treatments/afro-hair-transplant'
    },
    {
      id: 'women',
      icon: UserCheck,
      image: 'https://glokalizm.com/yakisikli/img/treatments/women-hair-transplant.png',
      gradient: 'from-primary/10 via-primary/5 to-transparent',
      iconGradient: 'from-primary to-primary/80',
      path: '/treatments/women-hair-transplant'
    },
    {
      id: 'beard',
      icon: Scissors,
      image: 'https://glokalizm.com/yakisikli/img/treatments/beard-transpant.png',
      gradient: 'from-primary/10 via-primary/5 to-transparent',
      iconGradient: 'from-primary to-primary/80',
      path: '/treatments/beard-transplant'
    },
    {
      id: 'eyebrow',
      icon: Scissors,
      image: 'https://glokalizm.com/yakisikli/img/treatments/eyebrown-transplant.png',
      gradient: 'from-primary/10 via-primary/5 to-transparent',
      iconGradient: 'from-primary to-primary/80',
      path: '/treatments/eyebrow-transplant'
    }
  ];

  const technologies = [
    {
      id: 'microSapphire',
      icon: Gem,
      image: 'https://glokalizm.com/yakisikli/img/technologies/micro-sapphire.jpg',
      gradient: 'from-secondary/10 via-secondary/5 to-transparent',
      iconGradient: 'from-secondary to-secondary/80',
      path: '/technologies/micro-sapphire'
    },
    {
      id: 'dhi',
      icon: Microscope,
      image: 'https://glokalizm.com/yakisikli/img/technologies/dhi.jpg',
      gradient: 'from-secondary/10 via-secondary/5 to-transparent',
      iconGradient: 'from-secondary to-secondary/80',
      path: '/technologies/dhi'
    },
    {
      id: 'sapphireFue',
      icon: Sparkles,
      image: 'https://glokalizm.com/yakisikli/img/technologies/sapphire-fue.jpg',
      gradient: 'from-secondary/10 via-secondary/5 to-transparent',
      iconGradient: 'from-secondary to-secondary/80',
      path: '/technologies/sapphire-fue'
    },
    {
      id: 'needleFree',
      icon: Syringe,
      image: 'https://glokalizm.com/yakisikli/img/technologies/needle-free.jpg',
      gradient: 'from-secondary/10 via-secondary/5 to-transparent',
      iconGradient: 'from-secondary to-secondary/80',
      path: '/technologies/needle-free'
    }
  ];

  const navData = t.header.navigation.hairTransplant;

  return (
    <div className="relative py-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

      <div className="container relative z-10">
        <div className="grid gap-12">
          {/* Treatments Section */}
          <div className="space-y-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-3">
                <CircleDot className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-medium text-primary">{navData.treatments.title}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">{navData.treatments.title}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.treatments.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {treatments.map((item) => {
                const itemData = navData.treatments[item.id as keyof typeof navData.treatments];
                const optionData = t.treatments.options[item.id as keyof typeof t.treatments.options];
                return (
                  <a
                    key={item.id}
                    href={item.path}
                    className="group relative block"
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div className={cn(
                      "relative overflow-hidden rounded-xl transition-all duration-500",
                      "bg-gradient-to-br border border-border/50",
                      hoveredItem === item.id ? "scale-[1.02] shadow-lg" : "hover:scale-[1.01]"
                    )}>
                      {/* Image with Gradient Overlay */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <div className={cn(
                          "absolute inset-0 bg-gradient-to-t z-10 transition-opacity duration-500",
                          item.gradient,
                          hoveredItem === item.id ? "opacity-30" : "opacity-60"
                        )} />
                        <img
                          src={item.image}
                          alt={itemData}
                          className={cn(
                            "w-full h-full object-cover transition-transform duration-1000",
                            hoveredItem === item.id ? "scale-110" : "scale-100"
                          )}
                        />
                      </div>
                      
                      {/* Title Bar */}
                      <div className="p-4 border-t border-border/50">
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-semibold truncate flex-1 mr-3">
                            {optionData?.title}
                          </h3>
                          <ChevronRight className={cn(
                            "w-5 h-5 text-muted-foreground transition-transform flex-shrink-0",
                            hoveredItem === item.id ? "translate-x-1" : ""
                          )} />
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Technologies Section */}
          <div className="space-y-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/5 border border-secondary/10 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-secondary" />
                <span className="text-xs font-medium text-secondary">{navData.technologies.title}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">{navData.technologies.title}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.treatments.techniques.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {technologies.map((item) => {
                const itemData = navData.technologies[item.id as keyof typeof navData.technologies];
                const techData = t.treatments.technologies[item.id as keyof typeof t.treatments.technologies];
                return (
                  <a
                    key={item.id}
                    href={item.path}
                    className="group relative block"
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div className={cn(
                      "relative overflow-hidden rounded-xl transition-all duration-500",
                      "bg-gradient-to-br border border-border/50",
                      hoveredItem === item.id ? "scale-[1.02] shadow-lg" : "hover:scale-[1.01]"
                    )}>
                      <div className="p-5">
                        {/* Icon and Title */}
                        <div className="flex items-center gap-3 mb-3">
                          <div className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center",
                            item.gradient,
                            item.iconColor
                          )}>
                            <item.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-base font-semibold">
                              {techData?.title}
                            </h3>
                          </div>
                        </div>
                        
                        {/* Description */}
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {techData?.description}
                        </p>
                        
                        {/* Learn More Link */}
                        <div className="flex items-center text-sm text-primary font-medium">
                          <span>{t.treatments.cta.learn}</span>
                          <ChevronRight className={cn(
                            "w-4 h-4 ml-1 transition-transform",
                            hoveredItem === item.id ? "translate-x-1" : ""
                          )} />
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}