import React from 'react';
import { X, ExternalLink, MessageCircle, Calendar, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface VideoModalProps {
  videoId: string;
  isOpen: boolean;
  onClose: () => void;
  onExternalClick: () => void;
  translations: {
    watchOnYoutube: string;
    cta: {
      whatsapp: string;
      schedule: string;
      call: string;
    };
  };
}

export function VideoModal({ videoId, isOpen, onClose, onExternalClick, translations }: VideoModalProps) {
  // Close modal when clicking outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Close on escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="fixed inset-4 md:inset-10 lg:inset-20 z-50">
        {/* Video Container */}
        <div className="relative w-full h-full bg-black rounded-xl overflow-hidden shadow-2xl">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white/90 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* YouTube Watch Button */}
          <button
            onClick={onExternalClick}
            className="absolute top-4 left-4 z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 hover:bg-black/70 text-white/90 hover:text-white transition-colors text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            <span>{translations.watchOnYoutube}</span>
          </button>

          {/* Video Iframe */}
          <div className="w-full h-full">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
      
      {/* CTA Buttons */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-[calc(100%-2rem)] sm:w-auto">
        <Button
          variant="outline"
          className="w-full sm:w-auto h-12 gap-2 text-base bg-black/50 backdrop-blur-sm border-white/20 text-white hover:bg-black/70 hover:text-white"
          onClick={() => window.open('https://wa.me/905360344866', '_blank')}
        >
          <MessageCircle className="w-4 h-4" />
          {translations.cta.whatsapp}
        </Button>
        <Button
          variant="outline"
          className="w-full sm:w-auto h-12 gap-2 text-base bg-black/50 backdrop-blur-sm border-white/20 text-white hover:bg-black/70 hover:text-white"
          onClick={() => window.location.href = '/hair-analysis'}
        >
          <Calendar className="w-4 h-4" />
          {translations.cta.schedule}
        </Button>
        <Button
          variant="outline"
          className="w-full sm:w-auto h-12 gap-2 text-base bg-black/50 backdrop-blur-sm border-white/20 text-white hover:bg-black/70 hover:text-white"
          onClick={() => window.open('tel:+905360344866', '_blank')}
        >
          <Phone className="w-4 h-4" />
          {translations.cta.call}
        </Button>
      </div>
    </div>
  );
}