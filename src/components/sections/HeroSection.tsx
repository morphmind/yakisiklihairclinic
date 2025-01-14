import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Award, Calendar, CheckCircle, Sprout, Play, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useTranslation } from '@/hooks/useTranslation'

export function HeroSection() {
  const { t } = useTranslation()
  const [hoveredStat, setHoveredStat] = useState<number | null>(null)

  const stats = [
    {
      label: t.home.hero.stats.operations,
      value: '15K+',
      icon: CheckCircle,
      gradient: 'from-green-500/10 to-emerald-500/10',
      iconColor: 'text-emerald-500',
    },
    {
      label: t.home.hero.stats.growth,
      value: '99%',
      icon: Sprout,
      gradient: 'from-blue-500/10 to-indigo-500/10',
      iconColor: 'text-blue-500',
    },
    {
      label: t.home.hero.stats.experience,
      value: '12+',
      icon: Calendar,
      gradient: 'from-purple-500/10 to-pink-500/10',
      iconColor: 'text-purple-500',
    },
    {
      label: t.home.hero.stats.awards,
      value: '25+',
      icon: Award,
      gradient: 'from-amber-500/10 to-orange-500/10',
      iconColor: 'text-amber-500',
    },
  ]

  return (
    <div className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center pt-16 md:pt-12 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

      {/* Content */}
      <div className="container relative z-10 px-4 md:px-6">
        <div className="max-w-[85rem] mx-auto">
          <div className="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-12 lg:items-center">
            {/* Left Content */}
            <div className="lg:col-span-4">
              {/* Badge Premium */}
              <div className="badge-hero mb-4">
                <span className="badge-dot" />
                <span className="badge-text">
                  {t.home.hero.badge || 'Premium Saç Ekimi Merkezi'}
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="block font-bold text-3xl md:text-5xl lg:text-6xl lg:leading-tight xl:text-7xl xl:leading-tight text-foreground">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-secondary">
                  {t.home.hero.title.highlight}
                </span>
                <span className="block mt-1 lg:mt-3">
                  <span className="text-foreground">
                    {t.home.hero.title.main}
                  </span>
                </span>
              </h1>

              {/* Subheading */}
              <p className="mt-4 md:mt-6 text-base md:text-lg text-muted-foreground lg:text-xl">
                {t.home.hero.description}
              </p>

              {/* CTA Buttons */}
              <div className="mt-6 md:mt-8 lg:mt-10 grid gap-3 w-full sm:inline-flex">
                <Link to="/hair-analysis">
                  <Button
                    size="lg"
                    className={cn(
                      "w-full sm:w-auto relative group overflow-hidden",
                      "bg-primary hover:bg-primary/90 text-white",
                      "h-12 sm:h-14 text-base sm:text-lg px-6 sm:px-8"
                    )}
                  >
                    <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-primary group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary to-secondary border-2 border-primary group-hover:bg-primary"></span>
                    <span className="relative flex items-center justify-center gap-2">
                      {t.home.hero.cta.analysis}
                      <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className={cn(
                    "w-full sm:w-auto relative group",
                    "h-12 sm:h-14 text-base sm:text-lg px-6 sm:px-8",
                    "border-2 hover:bg-primary/5"
                  )}
                  onClick={() => window.open('https://wa.me/905360344866', '_blank')}
                >
                  <span className="relative flex items-center justify-center gap-2">
                    {t.home.hero.cta.whatsapp}
                    <Play className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </div>
            </div>

            {/* Right Content - Stats */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="grid gap-4 mt-8 lg:mt-0">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="relative"
                    onMouseEnter={() => setHoveredStat(index)}
                    onMouseLeave={() => setHoveredStat(null)}
                  >
                    <div
                      className={cn(
                        "relative p-4 rounded-2xl transition-all duration-300",
                        "bg-gradient-to-r border border-border/50",
                        hoveredStat === index ? stat.gradient : "from-transparent to-transparent",
                        hoveredStat === index ? "scale-[1.02]" : "hover:scale-[1.01]"
                      )}
                    >
                      <div className="flex items-center gap-x-5">
                        <div
                          className={cn(
                            "flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center",
                            "bg-white shadow-sm",
                            hoveredStat === index ? stat.iconColor : "text-primary"
                          )}
                        >
                          <stat.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-foreground">
                            {stat.value}
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {stat.label}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Stats */}
            <div className="mt-6 grid grid-cols-2 gap-3 lg:hidden">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className={cn(
                    "relative overflow-hidden rounded-xl p-4 text-center",
                    "bg-background border border-border/50",
                    "hover:bg-accent/5 transition-all duration-300"
                  )}
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2",
                      "bg-primary/5",
                      stat.iconColor
                    )}
                  >
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <p className="text-xs text-muted-foreground font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
