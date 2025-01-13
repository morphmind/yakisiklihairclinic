import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { SuccessStoryForm } from './success-story-form';

interface SuccessStoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: any;
  onSuccess?: () => void;
}

export function SuccessStoryDialog({ 
  open, 
  onOpenChange, 
  initialData,
  onSuccess 
}: SuccessStoryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {initialData?.id ? 'Başarı Hikayesi Düzenle' : 'Yeni Başarı Hikayesi'}
          </DialogTitle>
        </DialogHeader>
        <SuccessStoryForm
          initialData={initialData}
          onSuccess={() => {
            onOpenChange(false);
            if (onSuccess) onSuccess();
          }}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}