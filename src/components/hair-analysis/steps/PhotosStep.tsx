import React from 'react';
import { Camera, Upload, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HairAnalysisFormData } from '@/types';
import { useTranslation } from '@/hooks/useTranslation';

interface PhotosStepProps {
  formData: HairAnalysisFormData;
  setFormData: (data: HairAnalysisFormData) => void;
  onNext: () => void;
}

interface PhotoUpload {
  file: File | null;
  preview: string | null;
}

const photoTypes = [
  { id: 'front', label: 'Front View', description: 'Clear photo of your hairline' },
  { id: 'top', label: 'Top View', description: 'Shows crown area clearly' },
  { id: 'sides', label: 'Side Views', description: 'Both left and right sides' },
  { id: 'back', label: 'Back View', description: 'Shows donor area' },
];

export function PhotosStep({ formData, setFormData, onNext }: PhotosStepProps) {
  const { t } = useTranslation();
  const [photos, setPhotos] = React.useState<Record<string, PhotoUpload>>({});
  const fileInputRefs = React.useRef<Record<string, HTMLInputElement | null>>({});
  const [selectedFile, setSelectedFile] = React.useState<{ id: string; file: File } | null>(null);

  React.useEffect(() => {
    if (selectedFile) {
      const { id, file } = selectedFile;
      const reader = new FileReader();
      const photoFiles = { ...formData.photos };
      photoFiles[id] = file;
      setFormData({ ...formData, photos: photoFiles });
      
      reader.onloadend = () => {
        setPhotos(prev => ({
          ...prev,
          [id]: {
            file,
            preview: reader.result as string,
          }
        }));
      };
      reader.readAsDataURL(file);
      setSelectedFile(null);
    }
  }, [selectedFile, formData, setFormData]);

  const handleFileSelect = (id: string, file: File) => {
    if (file) {
      setSelectedFile({ id, file });
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {photoTypes.map((type) => (
          <div key={type.id} className="bg-background rounded-xl p-6 border border-border">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={el => fileInputRefs.current[type.id] = el}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect(type.id, file);
              }}
            />
            <div className="flex flex-col items-center text-center">
              {photos[type.id]?.preview ? (
                <div className="relative w-full aspect-square mb-4 rounded-lg overflow-hidden">
                  <img
                    src={photos[type.id].preview!}
                    alt={type.label}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => fileInputRefs.current[type.id]?.click()}
                        className="bg-white/10 backdrop-blur-sm"
                      >
                        {t.hairAnalysis.steps.photos.changePhoto}
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          setPhotos(prev => {
                            const newPhotos = { ...prev };
                            const updatedFormPhotos = { ...formData.photos };
                            delete newPhotos[type.id];
                            delete updatedFormPhotos[type.id];
                            setFormData({ ...formData, photos: updatedFormPhotos });
                            return newPhotos;
                          });
                        }}
                        className="bg-white/10 backdrop-blur-sm"
                      >
                        {t.hairAnalysis.steps.photos.deletePhoto}
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <Camera className="h-12 w-12 text-muted-foreground mb-4" />
              )}
              <h3 className="text-lg font-medium text-foreground mb-2">{type.label}</h3>
              <p className="text-sm text-muted-foreground mb-4">{type.description}</p>
              <span className="text-sm text-muted-foreground mb-2">({t.hairAnalysis.steps.photos.optional})</span>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => fileInputRefs.current[type.id]?.click()}
              >
                <Upload className="h-4 w-4" />
                {t.hairAnalysis.steps.photos.uploadButton}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={onNext}
        className="w-full bg-primary hover:bg-primary/90 text-white"
        type="button"
      >
        {t.hairAnalysis.navigation.next}
      </Button>
    </div>
  );
}
