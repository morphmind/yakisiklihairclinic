import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useCurrency } from '@/hooks/useCurrency';
import { 
  Star,
  Syringe,
  Microscope,
  Crown,
  Check,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Package {
  id: 'fue' | 'dhi' | 'vip';
  title: string;
  price: number;
  popular?: boolean;
  description: string;
  icon: React.ElementType;
  gradient: string;
  iconColor: string;
  features: {
    placement: string;
    technique: string;
    items: string[];
  };
}

const packages: Package[] = [
  { 
    id: 'fue',
    title: 'FUE ALTIN',
    price: 2300,
    icon: Microscope,
    gradient: 'from-primary/10 to-primary/5',
    iconColor: 'text-primary',
    description: '(4.000 grefte kadar) + 5.500 grefte kadar megaseans için 900 €',
    features: {
      placement: 'Forseps',
      technique: 'Safir Bıçak',
      items: [
        'Dr. Yakışıklı\'nın Konsültasyonu ve Saç Çizgisi Tasarımı',
        'Tek ve Çoklu Greft Hazırlığı için HD Mikroskop',
        'Ertesi Gün Sonuç Kontrolü',
        'Kişisel Arkadaş ve Tercüman',
        '5 Yıldızlı Otel Konaklaması',
        'VIP Alım ve Transferler',
        'FotoFinder Trichoscale AI Donör Alanı Saç Analizi',
        'Oksijen Terapi Tedavisi'
      ]
    }
  },
  { 
    id: 'dhi',
    title: 'DHI SAFİR',
    price: 2990,
    popular: true,
    icon: Syringe,
    gradient: 'from-secondary/10 to-secondary/5',
    iconColor: 'text-secondary',
    description: '(4.000 grefte kadar) + 5.500 grefte kadar megaseans için 900 €',
    features: {
      placement: 'DHI İmplanter Kalemi',
      technique: 'Mikro Safir Bıçak',
      items: [
        'Dr. Yakışıklı\'nın Konsültasyonu ve Saç Çizgisi Tasarımı',
        'Tek ve Çoklu Greft Hazırlığı için HD Mikroskop',
        'Ertesi Gün Sonuç Kontrolü',
        'Kişisel Arkadaş ve Tercüman',
        '5 Yıldızlı Otel Konaklaması',
        'VIP Alım ve Transferler',
        'FotoFinder Trichoscale AI Donör Alanı Saç Analizi',
        'Oksijen Terapi Tedavisi',
        '2 Aylık Saç Güçlendirme Paketi'
      ]
    }
  },
  { 
    id: 'vip',
    title: 'VIP DHI SAFIR',
    price: 5000,
    icon: Crown, 
    gradient: 'from-amber-500/10 to-yellow-500/10',
    iconColor: 'text-amber-500',
    description: '(4.000 grefte kadar) + 5.500 grefte kadar megaseans için 1000 €',
    features: {
      placement: 'DHI İmplanter Kalemi',
      technique: 'Mikro Safir Bıçak',
      items: [
        'Dr. Yakışıklı\'nın Konsültasyonu ve Saç Çizgisi Tasarımı',
        'Dr. Yakışıklı\'nın ameliyat kesisi',
        'Tek ve Çoklu Greft Hazırlığı için HD Mikroskop',
        'Ertesi Gün Sonuç Kontrolü',
        'Kişisel Arkadaş ve Tercüman',
        '5 Yıldızlı Otel Konaklaması',
        'VIP Alım ve Transferler',
        'FotoFinder Trichoscale AI Donör Alanı Saç Analizi',
        'Oksijen Terapi Tedavisi',
        '4 Aylık Saç Güçlendirme Paketi'
      ]
    }
  }
];

export function PriceCalculator() {
  const { currentLocale } = useTranslation();
  const { t } = useTranslation();
  const { selectedCurrency } = useCurrency();
  const [hoveredPackage, setHoveredPackage] = React.useState<string | null>(null);
  
  // Reorder packages to put popular one in the middle
  const orderedPackages = packages;

  return (
    <div className="relative py-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="badge-pricing mb-3 text-amber-500 dark:text-amber-400">
            <Sparkles className="badge-icon text-amber-500" />
            <span className="badge-text text-amber-500">{t.pricing.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.pricing.title}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t.pricing.description}
          </p>
        </div>

        {/* Packages Grid */}
        <div className="relative grid lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {/* Reorder packages to put DHI in the middle */}
          {[
            packages.find(p => p.id === 'fue'),
            packages.find(p => p.id === 'dhi'),
            packages.find(p => p.id === 'vip')
          ].map((pkg) => {
            if (!pkg) return null;
            const packageData = t.pricing.packages[pkg.id];
            return (
              <div
                key={pkg.id}
                className={cn(
                  "group relative transition-all duration-300",
                  pkg.popular ? "lg:z-20" : "lg:z-10",
                  hoveredPackage === pkg.id ? "lg:scale-105" : ""
                )}
                onMouseEnter={() => setHoveredPackage(pkg.id)}
                onMouseLeave={() => setHoveredPackage(null)}
              >
                <div className={cn(
                  "relative overflow-hidden rounded-xl transition-all duration-300 h-full flex flex-col",
                  "bg-gradient-to-br border",
                  pkg.popular ? "bg-gradient-to-br from-secondary/10 via-secondary/5 to-background" : pkg.gradient,
                  pkg.popular ? "border-secondary shadow-xl" : "border-border/50",
                  hoveredPackage === pkg.id ? "shadow-xl" : "hover:shadow-lg"
                )}>
                  {/* Popular Badge */}
                  {pkg.popular && (
                    <div className="absolute -top-px left-0 right-0 flex justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 bg-secondary/20 blur-lg" />
                        <div className="relative flex items-center">
                          <div className="h-px w-12 bg-gradient-to-r from-transparent via-secondary to-transparent" />
                          <div className="relative px-4 py-1.5 bg-secondary text-white shadow-lg">
                            <div className="flex items-center gap-2">
                              <Star className="w-3.5 h-3.5 fill-white" />
                              <span className="text-xs font-semibold tracking-wide whitespace-nowrap">{packageData.popular}</span>
                              <Star className="w-3.5 h-3.5 fill-white" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Package Header */}
                  <div className="relative p-6 sm:p-8 border-b border-border/50 mt-4">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
                    </div>

                    {/* Mobile Header Layout */}
                    <div className="flex flex-col sm:block">
                      <div className={cn(
                        "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mx-0 sm:mb-8",
                        pkg.gradient,
                        pkg.iconColor
                      )}>
                        <pkg.icon className="w-7 h-7 sm:w-8 sm:h-8" />
                      </div>
                      
                      <div className="text-center sm:text-left">
                        <h3 className="text-2xl sm:text-2xl font-bold mb-2">{packageData.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto sm:max-w-none sm:mx-0">{packageData.description}</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-center sm:items-start mt-6 sm:mt-8">
                      <div className="flex items-baseline gap-2">
                        <span className={cn(
                          "text-3xl sm:text-4xl font-bold",
                          pkg.popular ? "text-secondary" : ""
                        )}>
                          {selectedCurrency?.symbol || '€'}{pkg.price}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="p-6 sm:p-8 space-y-6 sm:space-y-8 flex-1 flex flex-col">
                    {/* Technique Info */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Syringe className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                          </div>
                          <div>
                            <div className="text-sm font-medium mb-1">{t.pricing.packages.labels.placement}</div>
                            <div className="text-sm text-muted-foreground">{packageData.features.placement}</div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/5 border border-secondary/10 hover:bg-secondary/10 transition-colors">
                          <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                            <Microscope className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
                          </div>
                          <div>
                            <div className="text-sm font-medium mb-1">{t.pricing.packages.labels.technique}</div>
                            <div className="text-sm text-muted-foreground">{packageData.features.technique}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Feature List */}
                    <ul className="space-y-4 flex-1">
                      {packageData.features.items.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-primary" />
                          </div>
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <div className="space-y-4 mt-auto pt-6">
                      <Button
                        className={cn(
                          "w-full gap-3 h-12 sm:h-14 text-base font-medium text-white",
                          pkg.popular ? "bg-secondary hover:bg-secondary/90 shadow-lg shadow-secondary/20" : "bg-primary hover:bg-primary/90"
                        )}
                        onClick={() => window.open('https://wa.me/905360344866', '_blank')}
                      >
                        <MessageCircle className="w-4 h-4" />
                        {t.pricing.packages.labels.whatsapp}
                        <ArrowRight className="w-4 h-4 ml-auto" />
                      </Button>
                      <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-muted-foreground">
                        <Shield className="w-3.5 h-3.5" />
                        <span>{t.pricing.securePayment}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Graft Count Note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/5 border border-secondary/10">
            <Microscope className="w-4 h-4 text-secondary" />
            <p className="text-sm text-muted-foreground">{t.pricing.graftNote}</p>
          </div>
        </div>

        {/* Package Selection Guide */}
        <div className="mt-24 max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-primary/5 to-transparent border border-primary/10">
            <div className="absolute inset-0 bg-grid-white/5" />
            <div className="relative p-8 sm:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <div className="badge-helpchoose mb-6">
                  <Shield className="badge-icon" />
                  <span className="badge-text">{t.pricing.guide.description}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                  {t.pricing.guide.title}
                </h3>
                <div className="space-y-4 mb-8 max-w-2xl mx-auto">
                  <p className="text-base sm:text-lg text-muted-foreground">
                    {t.pricing.guide.content}
                  </p>
                  <p className="text-base sm:text-lg text-muted-foreground">
                    {t.pricing.guide.help}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto h-12 px-8 text-base gap-2 bg-primary hover:bg-primary/90 text-white shadow-lg"
                    onClick={() => window.location.href = '/hair-analysis'}
                  >
                    <MessageCircle className="w-4 h-4" />
                    {t.pricing.guide.cta.analysis}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto h-12 px-8 text-base gap-2 border-primary/20 bg-primary/5 hover:bg-primary/10 shadow-lg"
                    onClick={() => window.open('https://wa.me/905360344866', '_blank')}
                  >
                    <ArrowRight className="w-4 h-4" />
                    {t.pricing.guide.cta.contact}
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