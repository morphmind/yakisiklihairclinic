import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/useToast';
import { supabase } from '@/lib/supabase';
import { Dropzone } from '@/components/ui/dropzone';
import { compressImage } from '@/utils/imageCompression';
import { ImagePlus, Loader2, AlertCircle, Upload } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface SuccessStoryFormProps {
  onSuccess?: () => void;
  initialData?: any;
  onCancel?: () => void;
}

export function SuccessStoryForm({ onSuccess, initialData, onCancel }: SuccessStoryFormProps) {
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    type: initialData?.type || '',
    status: initialData?.status || 'published',
    language: initialData?.language || 'en',
    before_image: initialData?.before_image || '',
    after_image: initialData?.after_image || '',
    timeframe: initialData?.timeframe || '',
    grafts: initialData?.grafts || '',
    age: initialData?.age || '',
    video_id: initialData?.video_id || '',
    patient_name: initialData?.patient_name || '',
    patient_country: initialData?.patient_country || '',
    rating: initialData?.rating || '5',
    testimonial: initialData?.testimonial || '',
  });

  const [uploadProgress, setUploadProgress] = React.useState<{
    before?: number;
    after?: number;
  }>({});

  const handleImageUpload = async (file: File, type: 'before' | 'after') => {
    try {
      // Compress image before upload
      const compressedFile = await compressImage(file);

      const fileExt = file.name.split('.').pop();
      const fileName = `${type}_${Date.now()}.${fileExt}`;
      const filePath = `success-stories/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('images')
        .upload(filePath, compressedFile, {
          cacheControl: '3600',
          upsert: false,
          onUploadProgress: (progress) => {
            const percent = (progress.loaded / progress.total) * 100;
            setUploadProgress(prev => ({
              ...prev,
              [type]: percent
            }));
          }
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      setFormData(prev => ({
        ...prev,
        [`${type}_image`]: publicUrl
      }));

      toast({
        title: "Başarılı",
        description: "Fotoğraf yüklendi",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Hata",
        description: error.message,
      });
    } finally {
      setUploadProgress(prev => ({
        ...prev,
        [type]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate required fields
      const requiredFields = [
        'type',
        'status',
        'language',
        'before_image',
        'after_image',
        'timeframe',
        'grafts',
        'age',
        'patient_name',
        'patient_country',
        'rating',
        'testimonial'
      ];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Lütfen zorunlu alanları doldurun: ${missingFields.join(', ')}`);
      }

      // Validate numeric fields
      if (parseInt(formData.grafts) < 0 || parseInt(formData.grafts) > 10000) {
        throw new Error('Greft sayısı 0-10000 arasında olmalıdır');
      }

      if (parseInt(formData.age) < 18 || parseInt(formData.age) > 100) {
        throw new Error('Yaş 18-100 arasında olmalıdır');
      }

      if (parseInt(formData.rating) < 1 || parseInt(formData.rating) > 5) {
        throw new Error('Değerlendirme 1-5 arasında olmalıdır');
      }

      // Convert numeric fields
      const numericData = {
        ...formData,
        grafts: parseInt(formData.grafts),
        age: parseInt(formData.age),
        rating: parseInt(formData.rating),
      };

      console.log('Processed data:', numericData);

      let result;
      if (initialData?.id) {
        // Update existing story
        const { error: updateError, data: updateData } = await supabase
          .from('success_stories')
          .update(numericData)
          .match({ id: initialData.id });

        if (updateError) { 
          console.error('Update error:', updateError);
          throw updateError;
        }

        // Fetch the updated record
        const { data: fetchedData, error: fetchError } = await supabase
          .from('success_stories')
          .select('*')
          .eq('id', initialData.id)
          .single();

        if (fetchError) {
          console.error('Fetch error:', fetchError);
          throw fetchError;
        }

        console.log('Updated data:', fetchedData);
      } else {
        // Insert new story
        const { error: insertError, data } = await supabase
          .from('success_stories')
          .insert([numericData])
          .select()
          .single();

        if (insertError) throw insertError;

        if (!data) {
          throw new Error('Veri eklenemedi. Lütfen tekrar deneyin.');
        }

        console.log('Inserted data:', data);
      }

      toast({
        title: "Başarılı",
        description: initialData?.id 
          ? "Başarı hikayesi güncellendi"
          : "Yeni başarı hikayesi eklendi",
      });

      // Ensure parent component is notified after successful update
      if (onSuccess) {
        setTimeout(() => onSuccess(), 100); // Small delay to ensure state updates
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Hata",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Image Preview */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Öncesi Fotoğraf</Label>
          <Dropzone
            onDrop={(files) => handleImageUpload(files[0], 'before')}
            disabled={!!uploadProgress.before}
            className="aspect-[4/3]"
          >
            {formData.before_image ? (
              <div className="relative w-full h-full">
                <img 
                  src={formData.before_image} 
                  alt="Before preview" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://placehold.co/600x400?text=Resim+Yüklenemedi';
                  }}
                />
                {uploadProgress.before !== undefined && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Progress value={uploadProgress.before} className="w-1/2 h-2" />
                  </div>
                )}
              </div>
            ) : null}
          </Dropzone>
        </div>
        <div className="space-y-2">
          <Label>Sonrası Fotoğraf</Label>
          <Dropzone
            onDrop={(files) => handleImageUpload(files[0], 'after')}
            disabled={!!uploadProgress.after}
            className="aspect-[4/3]"
          >
            {formData.after_image ? (
              <div className="relative w-full h-full">
                <img 
                  src={formData.after_image} 
                  alt="After preview" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://placehold.co/600x400?text=Resim+Yüklenemedi';
                  }}
                />
                {uploadProgress.after !== undefined && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Progress value={uploadProgress.after} className="w-1/2 h-2" />
                  </div>
                )}
              </div>
            ) : null}
          </Dropzone>
        </div>
      </div>

      {/* URL Inputs */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Öncesi Fotoğraf URL</Label>
          <Input
            type="url"
            value={formData.before_image}
            onChange={(e) => setFormData(prev => ({ ...prev, before_image: e.target.value }))}
            placeholder="https://example.com/before.jpg"
          />
        </div>
        <div className="space-y-2">
          <Label>Sonrası Fotoğraf URL</Label>
          <Input
            type="url"
            value={formData.after_image}
            onChange={(e) => setFormData(prev => ({ ...prev, after_image: e.target.value }))}
            placeholder="https://example.com/after.jpg"
          />
        </div>
      </div>

      {/* URL Format Alert */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Fotoğraf URL'leri https:// ile başlamalı ve doğrudan resim dosyasına işaret etmelidir. (örn: .jpg, .png)
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Durum</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Durum seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="published">Yayında</SelectItem>
              <SelectItem value="draft">Taslak</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Dil</Label>
          <Select
            value={formData.language}
            onValueChange={(value) => setFormData(prev => ({ ...prev, language: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Dil seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="tr">Türkçe</SelectItem>
              <SelectItem value="de">Deutsch</SelectItem>
              <SelectItem value="ru">Русский</SelectItem>
              <SelectItem value="ar">العربية</SelectItem>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>İşlem Tipi</Label>
          <Select
            value={formData.type}
            onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="İşlem tipini seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hair">Saç Ekimi</SelectItem>
              <SelectItem value="afro">Afro Saç Ekimi</SelectItem>
              <SelectItem value="women">Kadınlarda Saç Ekimi</SelectItem>
              <SelectItem value="beard">Sakal Ekimi</SelectItem>
              <SelectItem value="eyebrow">Kaş Ekimi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Zaman Dilimi</Label>
          <Select
            value={formData.timeframe}
            onValueChange={(value) => setFormData(prev => ({ ...prev, timeframe: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Zaman dilimini seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month3">3 Ay</SelectItem>
              <SelectItem value="month6">6 Ay</SelectItem>
              <SelectItem value="month12">12 Ay</SelectItem>
              <SelectItem value="final">Final Sonuç</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Greft Sayısı</Label>
          <Input
            type="number"
            value={formData.grafts}
            onChange={(e) => setFormData(prev => ({ ...prev, grafts: e.target.value }))}
            placeholder="4000"
          />
        </div>

        <div className="space-y-2">
          <Label>Yaş</Label>
          <Input
            type="number"
            value={formData.age}
            onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
            placeholder="35"
          />
        </div>

        <div className="space-y-2">
          <Label>Hasta Adı</Label>
          <Input
            value={formData.patient_name}
            onChange={(e) => setFormData(prev => ({ ...prev, patient_name: e.target.value }))}
            placeholder="John Doe"
          />
        </div>

        <div className="space-y-2">
          <Label>Ülke</Label>
          <Input
            value={formData.patient_country}
            onChange={(e) => setFormData(prev => ({ ...prev, patient_country: e.target.value }))}
            placeholder="United Kingdom"
          />
        </div>

        <div className="space-y-2">
          <Label>Video ID (Opsiyonel)</Label>
          <Input
            value={formData.video_id}
            onChange={(e) => setFormData(prev => ({ ...prev, video_id: e.target.value }))}
            placeholder="YouTube video ID"
          />
        </div>

        <div className="space-y-2">
          <Label>Değerlendirme (1-5)</Label>
          <Select
            value={formData.rating.toString()}
            onValueChange={(value) => setFormData(prev => ({ ...prev, rating: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Değerlendirme seçin" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5].map(rating => (
                <SelectItem key={rating} value={rating.toString()}>
                  {rating} Yıldız
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label>Hasta Yorumu</Label>
          <Textarea
            value={formData.testimonial}
            onChange={(e) => setFormData(prev => ({ ...prev, testimonial: e.target.value }))}
            placeholder="Hasta deneyimini buraya girin..."
            className="min-h-[100px]"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            İptal
          </Button>
        )}
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {initialData?.id ? 'Güncelle' : 'Kaydet'}
        </Button>
      </div>
    </form>
  );
}