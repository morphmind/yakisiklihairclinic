import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { LocaleContext } from '@/contexts/LocaleContext';
import { supabase } from '@/lib/supabase';
import { VideoModal } from '@/components/ui/video-modal';
import { useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  ChevronRight,
  MessageCircle,
  Star,
  Quote,
  ArrowRight,
  ArrowLeft,
  Play,
  Sparkles
} from 'lucide-react';

interface SliderState {
  position: number;
  isDragging: boolean;
}

export function GallerySection() {
  const { t } = useTranslation();
  const { currentLocale } = useContext(LocaleContext);
  const [cases, setCases] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredCase, setHoveredCase] = useState<number | null>(null);
  const [sliderPosition, setSliderPosition] = useState<Record<number, number>>({});
  const [isDragging, setIsDragging] = useState<Record<number, boolean>>({});
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const sliderRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Subscribe to realtime changes
  useEffect(() => {
    // Subscribe to success_stories table changes
    const channel = supabase
      .channel('success_stories_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'success_stories',
          filter: 'status=eq.published'
        },
        (payload) => {
          console.log('Realtime change received:', payload);
          // Handle different types of changes
          switch (payload.eventType) {
            case 'INSERT':
              setCases(prev => [payload.new, ...prev]);
              break;
            case 'UPDATE':
              setCases(prev => prev.map(story => 
                story.id === payload.new.id ? payload.new : story
              ));
              break;
            case 'DELETE':
              setCases(prev => prev.filter(story => story.id !== payload.old.id));
              break;
            default:
              // Fallback to full refresh if needed
              fetchStories();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Fetch success stories from Supabase
  const fetchStories = async () => {
    try {
      if (!supabase) {
        console.error('Supabase client not initialized');
        return;
      }
      setLoading(true);
      
      const { data, error } = await supabase
        .from('success_stories')
        .select('*')
        .eq('status', 'published') 
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      if (!data) {
        console.log('No data returned from Supabase');
        setCases([]);
        return;
      }

      // Transform data to match component structure
      const transformedData = data.map(story => ({
        id: story.id,
        type: story.type,
        beforeImage: story.before_image,
        afterImage: story.after_image,
        timeframe: story.timeframe,
        grafts: story.grafts,
        age: story.age,
        testimonial: {
          videoId: story.video_id,
          name: story.patient_name,
          country: story.patient_country,
          rating: story.rating,
          text: story.testimonial
        }
      }));

      setCases(transformedData);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching stories:', err);
      setError(err.message);
      setCases([]); // Reset cases on error
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  React.useEffect(() => {
    fetchStories();
  }, [currentLocale.code]);

  const filters = [
    { id: 'all', icon: Sparkles },
    { id: 'hair', icon: ChevronRight },
    { id: 'afro', icon: ChevronRight },
    { id: 'women', icon: ChevronRight },
    { id: 'beard', icon: ChevronRight },
    { id: 'eyebrow', icon: ChevronRight },
  ];

  const filteredCases = activeFilter === 'all' 
    ? cases 
    : cases.filter(c => c.type === activeFilter);

  // Calculate pagination
  const totalPages = Math.ceil(filteredCases.length / itemsPerPage);
  const paginatedCases = filteredCases.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to first page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  // Initialize slider states for visible cases only when filteredCases changes
  useEffect(() => {
    const newPositions: Record<number, number> = {};
    const newDragging: Record<number, boolean> = {};
    
    filteredCases.forEach(item => {
      newPositions[item.id] = sliderPosition[item.id] ?? 50;
      newDragging[item.id] = isDragging[item.id] ?? false;
    });
    
    setSliderPosition(newPositions);
    setIsDragging(newDragging);
  }, [filteredCases.map(item => item.id).join(',')]);

  const handleMouseDown = (e: React.MouseEvent, caseId: number) => {
    e.preventDefault(); // Prevent text selection while dragging
    setIsDragging(prev => ({
      ...prev,
      [caseId]: true
    }));
    handleMouseMove(e, caseId);
  };

  const handleMouseMove = (e: React.MouseEvent, caseId: number) => {
    e.preventDefault(); // Prevent text selection while dragging
    const sliderRef = sliderRefs.current[caseId];

    if (!isDragging[caseId] || !sliderRef) return;

    const rect = sliderRef.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;

    setSliderPosition(prev => ({
      ...prev,
      [caseId]: percentage
    }));
  };

  const handleTouchStart = (e: React.TouchEvent, caseId: number) => {
    e.preventDefault();
    setIsDragging(prev => ({
      ...prev,
      [caseId]: true
    }));
    handleTouchMove(e, caseId);
  };

  const handleTouchMove = (e: React.TouchEvent, caseId: number) => {
    e.preventDefault();
    const sliderRef = sliderRefs.current[caseId];
    
    if (!isDragging[caseId] || !sliderRef) return;

    const touch = e.touches[0];
    const rect = sliderRef.getBoundingClientRect();
    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;

    setSliderPosition(prev => ({
      ...prev,
      [caseId]: percentage
    }));
  };

  const handleMouseUp = (caseId: number) => {
    setIsDragging(prev => ({
      ...prev,
      [caseId]: false
    }));
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      Object.keys(isDragging).forEach(id => {
        handleMouseUp(Number(id));
      });
    };
    
    const handleGlobalMouseMove = (e: MouseEvent) => {
      Object.keys(isDragging).forEach(id => {
        if (isDragging[Number(id)]) {
          handleMouseMove(e as unknown as React.MouseEvent, Number(id));
        }
      });
    };

    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('mouseleave', handleGlobalMouseUp);
    document.addEventListener('mousemove', handleGlobalMouseMove);

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('mouseleave', handleGlobalMouseUp);
      document.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [isDragging]);

  return (
    <div className="relative py-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="badge-stories mb-3 text-purple-500 dark:text-purple-400">
            <Star className="badge-icon text-purple-500" />
            <span className="badge-text text-purple-500">{t.treatments.gallery.title}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.treatments.gallery.title}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t.treatments.gallery.description}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? 'default' : 'outline'}
              className={cn(
                "h-10 gap-2",
                activeFilter === filter.id && "bg-primary text-primary-foreground"
              )}
              onClick={() => setActiveFilter(filter.id)}
            >
              <filter.icon className="w-4 h-4" />
              {t.treatments.gallery.filters[filter.id as keyof typeof t.treatments.gallery.filters]}
            </Button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center text-destructive">
            <p>{error}</p>
          </div>
        ) : cases.length === 0 ? (
          <div className="text-center text-muted-foreground">
            <p>Henüz başarı hikayesi eklenmemiş.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {paginatedCases.map((item) => (
              <div
                key={item.id}
                className="group relative"
                onMouseEnter={() => setHoveredCase(item.id)}
                onMouseLeave={() => setHoveredCase(null)}
              >
                <div className={cn(
                  "relative overflow-hidden rounded-xl transition-all duration-500",
                  "bg-gradient-to-br border border-border/50",
                  hoveredCase === item.id ? "scale-[1.02] shadow-lg" : "hover:scale-[1.01]"
                )}>
                  {/* Before/After Slider */}
                  <div 
                    ref={el => sliderRefs.current[item.id] = el}
                    className="relative aspect-[4/3] cursor-ew-resize"
                    onMouseDown={e => handleMouseDown(e, item.id)}
                    onTouchStart={e => handleTouchStart(e, item.id)}
                    onTouchMove={e => handleTouchMove(e, item.id)}
                    onTouchEnd={() => handleMouseUp(item.id)}
                    style={{ touchAction: 'none', overflow: 'hidden' }}
                  >
                    {/* Before Image */}
                    <div className="absolute inset-0">
                      <img
                        src={item.beforeImage}
                        alt="Before"
                        className="w-full h-full object-cover"
                        draggable="false"
                      />
                    </div>

                    {/* After Image */}
                    <div 
                      className="absolute inset-0 overflow-hidden transition-all duration-75"
                      style={{ clipPath: `inset(0 ${100 - (sliderPosition[item.id] ?? 50)}% 0 0)` }}
                    >
                      <img
                        src={item.afterImage}
                        alt="After"
                        className="absolute inset-0 w-full h-full object-cover"
                        draggable="false" 
                      />
                    </div>

                    {/* Slider Handle */}
                    <div 
                      className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize z-10 transition-all duration-75 shadow-[0_0_10px_rgba(0,0,0,0.3)]"
                      style={{ left: `${sliderPosition[item.id] ?? 50}%` }}
                    >
                      <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center">
                        <div className="flex gap-0.5">
                          <ArrowLeft className="w-3 h-3 text-primary" />
                          <ArrowRight className="w-3 h-3 text-primary" />
                        </div>
                        <div className="absolute inset-0 border-2 border-white/50 rounded-full animate-pulse" />
                      </div>
                    </div>

                    {/* Labels */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-sm text-sm font-medium text-white border border-white/20 shadow-lg">
                        {t.treatments.gallery.labels.before}
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 z-10">
                      <div className="px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-sm text-sm font-medium text-white border border-white/20 shadow-lg">
                        {t.treatments.gallery.labels.after}
                      </div>
                    </div>

                    {/* Info Overlay */}
                    <div className={cn(
                      "absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent",
                      "transition-opacity duration-300",
                      hoveredCase === item.id ? "opacity-100" : "opacity-0"
                    )}>
                      <div className="flex items-center justify-between text-white">
                        <div>
                          <div className="text-sm font-medium mb-1">
                            {t.treatments.gallery.timeframes[item.timeframe as keyof typeof t.treatments.gallery.timeframes]}
                          </div>
                          <div className="text-xs text-white/80">
                            {item.grafts} Grafts • Age {item.age}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: item.testimonial.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Testimonial */}
                  <div className="p-4 border-t border-border/50">
                    <div className="flex items-start gap-3">
                      <Quote className="w-8 h-8 text-primary/20" />
                      <div>
                        <p className="text-sm text-muted-foreground italic mb-2">
                          "{item.testimonial.text}"
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{item.testimonial.name}</span>
                            <span className="text-sm text-muted-foreground">{item.testimonial.country}</span>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 gap-2"
                            onClick={() => setActiveVideo(item.testimonial.videoId)}
                          >
                            <Play className="w-3.5 h-3.5" />
                            <span className="text-xs">{t.treatments.gallery.labels.watchStory}</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mb-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={cn(
                    "w-8 h-8",
                    currentPage === page && "bg-primary text-primary-foreground"
                  )}
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white w-full sm:w-auto h-12 px-8 text-base"
            onClick={() => window.location.href = '/hair-analysis'}
          >
            {t.treatments.gallery.cta.analyze}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto h-12 px-8 text-base gap-2"
            onClick={() => window.open('https://wa.me/905360344866', '_blank')}
          >
            <MessageCircle className="w-4 h-4" />
            {t.treatments.gallery.cta.whatsapp}
          </Button>
        </div>

      </div>
      
      {/* Video Modal */}
      <VideoModal
        videoId={activeVideo || ''}
        isOpen={!!activeVideo}
        onClose={() => setActiveVideo(null)}
        onExternalClick={() => {
          window.open(`https://www.youtube.com/watch?v=${activeVideo}`, '_blank');
          setActiveVideo(null);
        }}
        translations={{
          watchOnYoutube: t.treatments.gallery.labels.watchOnYoutube,
          cta: {
            whatsapp: t.treatments.gallery.cta.whatsapp,
            schedule: t.treatments.gallery.cta.schedule,
            call: t.treatments.gallery.cta.call
          }
        }}
      />
    </div>
  );
}