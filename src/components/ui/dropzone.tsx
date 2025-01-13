import React from 'react';
import { cn } from '@/lib/utils';
import { Upload } from 'lucide-react';

interface DropzoneProps extends React.HTMLAttributes<HTMLDivElement> {
  onDrop: (files: FileList) => void;
  accept?: string;
  maxSize?: number;
  disabled?: boolean;
  children?: React.ReactNode;
}

export function Dropzone({
  onDrop,
  accept = 'image/*',
  maxSize = 5 * 1024 * 1024, // 5MB default
  disabled = false,
  className,
  children,
  ...props
}: DropzoneProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (disabled) return;
    
    const { files } = e.dataTransfer;
    if (files && files.length > 0) {
      const validFiles = Array.from(files).filter(file => {
        const isValidType = accept.includes('*') || accept.includes(file.type);
        const isValidSize = file.size <= maxSize;
        return isValidType && isValidSize;
      });
      
      if (validFiles.length > 0) {
        onDrop(files);
      }
    }
  };

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      onDrop(files);
    }
  };

  return (
    <div
      className={cn(
        "relative rounded-lg border-2 border-dashed transition-colors",
        isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
        disabled && "opacity-50 cursor-not-allowed",
        !disabled && "cursor-pointer",
        className
      )}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
      {...props}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleChange}
        disabled={disabled}
      />
      
      {children || (
        <div className="flex flex-col items-center justify-center p-6 text-center">
          <Upload className="h-10 w-10 text-muted-foreground mb-4" />
          <div className="text-sm">
            <span className="font-medium text-primary">Dosya yüklemek için tıklayın</span>
            <span className="text-muted-foreground"> veya sürükleyip bırakın</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            PNG, JPG veya WEBP (max. {Math.round(maxSize / 1024 / 1024)}MB)
          </p>
        </div>
      )}
    </div>
  );
}