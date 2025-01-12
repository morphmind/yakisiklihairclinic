import React from 'react';
import { usePricingTranslation } from '@/hooks/usePricingTranslation';
import { Check, MessageCircle, Crown, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function PricingSection() {
  const t = usePricingTranslation();
  const [hoveredPackage, setHoveredPackage] = React.useState<string | null>(null);

  const packages = [
    {
      id: 'fue',
      icon: Star,
      gradient: 'from-blue-500/10 to-indigo-500/10',
      iconGradient: 'from-blue-500 to-indigo-500',
      borderGradient: 'from-blue-500/20 via-indigo-500/20 to-transparent',
      shadowColor: 'shadow-blue-500/10'
    },
    {
      id: 'dhi',
      icon: Sparkles,
      gradient: 'from-primary/10 to-secondary/10',
      iconGradient: 'from-primary to-secondary',
      borderGradient: 'from-primary/20 via-secondary/20 to-transparent',
      shadowColor: 'shadow-primary/10'
    },
    {
      id: 'vip',
      icon: Crown,
      gradient: 'from-amber-500/10 to-yellow-500/10',
      iconGradient: 'from-amber-500 to-yellow-500',
      borderGradient: 'from-amber-500/20 via-yellow-500/20 to-transparent',
      shadowColor: 'shadow-amber-500/10'
    }
  ];

  return (
    <div className="relative py-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.title}</h2>
          <p className="text-lg text-muted-foreground">{t.description}</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg) => {
            const packageData = t.packages[pkg.id as keyof typeof t.packages];
            const Icon = pkg.icon;
            
            return (
              <div
                key={pkg.id}
                className="relative"
                onMouseEnter={() => setHoveredPackage(pkg.id)}
                onMouseLeave={() => setHoveredPackage(null)}
              >
                <div className={cn(
                  "h-full relative overflow-hidden rounded-2xl transition-all duration-300",
                  "bg-gradient-to-br border border-border/50",
                  hoveredPackage === pkg.id ? `scale-[1.02] shadow-xl ${pkg.shadowColor}` : "hover:scale-[1.01]"
                )}>
                  {/* Popular Tag */}
                  {packageData.tag && (
                    <div className="absolute top-6 right-6">
                      <div className="px-3 py-1 rounded-full text-xs font-medium bg-primary text-white">
                        {packageData.tag}
                      </div>
                    </div>
                  )}

                  <div className="p-8">
                    {/* Header */}
                    <div className="mb-8">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                        `bg-gradient-to-br ${pkg.gradient}`
                      )}>
                        <Icon className={cn(
                          "w-6 h-6",
                          `text-transparent bg-clip-text bg-gradient-to-br ${pkg.iconGradient}`
                        )} />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{packageData.name}</h3>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold">{packageData.price}</span>
                      </div>
                      <div className="mt-2 space-y-1">
                        <p className="text-sm text-muted-foreground">{packageData.graftInfo}</p>
                        <p className="text-sm text-muted-foreground">{packageData.priceInfo}</p>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                        <span className="text-sm font-medium">{packageData.features.placement.label}</span>
                        <span className="text-sm">{packageData.features.placement.value}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                        <span className="text-sm font-medium">{packageData.features.incision.label}</span>
                        <span className="text-sm">{packageData.features.incision.value}</span>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="space-y-3">
                      {packageData.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className={cn(
                            "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                            `bg-gradient-to-br ${pkg.gradient}`
                          )}>
                            <Check className={cn(
                              "w-3 h-3",
                              `text-transparent bg-clip-text bg-gradient-to-br ${pkg.iconGradient}`
                            )} />
                          </div>
                          <span className="text-sm text-muted-foreground">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="p-8 pt-0">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        className={cn(
                          "w-full",
                          `bg-gradient-to-r ${pkg.iconGradient} hover:opacity-90 text-white border-0`
                        )}
                        onClick={() => window.location.href = '/hair-analysis'}
                      >
                        {t.cta.analyze}
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full gap-2"
                        onClick={() => window.open('https://wa.me/905360344866', '_blank')}
                      >
                        <MessageCircle className="w-4 h-4" />
                        {t.cta.whatsapp}
                      </Button>
                    </div>
                  </div>

                  {/* Border Gradient Effect */}
                  <div className={cn(
                    "absolute bottom-0 left-0 right-0 h-1",
                    "bg-gradient-to-r opacity-0 transition-opacity duration-300",
                    pkg.borderGradient,
                    hoveredPackage === pkg.id && "opacity-100"
                  )} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
