import { useCallback, useState } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { UseFormReturn } from 'react-hook-form';
import { X, ImageIcon, Upload } from 'lucide-react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductFormData } from '@/types/productForm';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
  form: UseFormReturn<ProductFormData>;
}

interface UploadedImage {
  id: string;
  previewUrl: string;
  isBlob: boolean; // true if it's a local file, false if it's an external URL
}

const MAX_IMAGES = 5;
const MAX_SIZE_MB = 5;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
const ACCEPTED_TYPES = {
  'image/jpeg': ['.jpeg', '.jpg'],
  'image/png': ['.png'],
  'image/webp': ['.webp'],
  'image/gif': ['.gif'],
};

export function ImageUploader({ form }: ImageUploaderProps) {
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  
  const formImages = form.watch('images') || [];

  // Sync form images with uploadedImages on mount/change
  // This handles existing images when editing a product
  const syncFormImages = useCallback(() => {
    if (formImages.length > 0 && uploadedImages.length === 0) {
      const existingImages: UploadedImage[] = formImages.map((url, index) => ({
        id: `existing-${index}-${Date.now()}`,
        previewUrl: url,
        isBlob: false,
      }));
      setUploadedImages(existingImages);
    }
  }, [formImages, uploadedImages.length]);

  // Call sync on mount
  useState(() => {
    syncFormImages();
  });

  const updateFormImages = (images: UploadedImage[]) => {
    form.setValue('images', images.map(img => img.previewUrl), { shouldValidate: true });
  };

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    setUploadError(null);

    // Check max images limit
    const totalAfterUpload = uploadedImages.length + acceptedFiles.length;
    if (totalAfterUpload > MAX_IMAGES) {
      setUploadError(`Máximo ${MAX_IMAGES} imágenes. Podés agregar ${MAX_IMAGES - uploadedImages.length} más.`);
      // Only take files that fit
      const availableSlots = MAX_IMAGES - uploadedImages.length;
      acceptedFiles = acceptedFiles.slice(0, availableSlots);
    }

    // Handle rejected files
    if (rejectedFiles.length > 0) {
      const errors = rejectedFiles.map(rejection => {
        const error = rejection.errors[0];
        if (error.code === 'file-too-large') {
          return `"${rejection.file.name}" es muy grande (máx ${MAX_SIZE_MB}MB)`;
        }
        if (error.code === 'file-invalid-type') {
          return `"${rejection.file.name}" no es una imagen válida`;
        }
        return error.message;
      });
      setUploadError(errors.join('. '));
    }

    if (acceptedFiles.length === 0) return;

    // Create preview URLs for accepted files
    const newImages: UploadedImage[] = acceptedFiles.map(file => ({
      id: `${file.name}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      previewUrl: URL.createObjectURL(file),
      isBlob: true,
    }));

    const updatedImages = [...uploadedImages, ...newImages];
    setUploadedImages(updatedImages);
    updateFormImages(updatedImages);
  }, [uploadedImages, form]);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    maxSize: MAX_SIZE_BYTES,
    disabled: uploadedImages.length >= MAX_IMAGES,
    noClick: false,
    noKeyboard: false,
  });

  const removeImage = (id: string) => {
    const imageToRemove = uploadedImages.find(img => img.id === id);
    if (imageToRemove?.isBlob) {
      URL.revokeObjectURL(imageToRemove.previewUrl);
    }
    const updatedImages = uploadedImages.filter(img => img.id !== id);
    setUploadedImages(updatedImages);
    updateFormImages(updatedImages);
    setUploadError(null);
  };

  const isDisabled = uploadedImages.length >= MAX_IMAGES;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Fotos del producto</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="images"
          render={() => (
            <FormItem>
              <FormLabel>Imágenes *</FormLabel>
              <FormDescription>
                Agregá entre 1 y {MAX_IMAGES} fotos. La primera será la imagen principal.
              </FormDescription>
              
              {/* Drop Zone */}
              <div
                {...getRootProps()}
                className={cn(
                  "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
                  isDragActive && "border-primary bg-primary/5",
                  !isDragActive && !isDisabled && "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50",
                  isDisabled && "opacity-50 cursor-not-allowed bg-muted/30",
                  uploadError && "border-destructive"
                )}
              >
                <input {...getInputProps()} />
                
                <div className="flex flex-col items-center gap-2">
                  {isDragActive ? (
                    <>
                      <Upload className="h-10 w-10 text-primary animate-bounce" />
                      <p className="text-sm font-medium text-primary">
                        Soltá las imágenes aquí...
                      </p>
                    </>
                  ) : (
                    <>
                      <ImageIcon className="h-10 w-10 text-muted-foreground/50" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {isDisabled 
                            ? 'Límite de imágenes alcanzado'
                            : 'Arrastrá imágenes aquí o hacé click para seleccionar'
                          }
                        </p>
                        <p className="text-xs text-muted-foreground/70 mt-1">
                          PNG, JPG, WebP, GIF hasta {MAX_SIZE_MB}MB
                        </p>
                      </div>
                      {!isDisabled && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            open();
                          }}
                          className="mt-2"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Seleccionar archivos
                        </Button>
                      )}
                    </>
                  )}
                </div>

                {/* Counter */}
                <p className="text-xs text-muted-foreground mt-3">
                  {uploadedImages.length} de {MAX_IMAGES} imágenes
                </p>
              </div>

              {/* Error Message */}
              {uploadError && (
                <p className="text-sm text-destructive mt-2">{uploadError}</p>
              )}

              {/* Image Previews Grid */}
              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-4">
                  {uploadedImages.map((image, index) => (
                    <div 
                      key={image.id} 
                      className="relative group aspect-square rounded-lg overflow-hidden border bg-muted"
                    >
                      <img 
                        src={image.previewUrl} 
                        alt={`Producto ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder.svg';
                        }}
                      />
                      {index === 0 && (
                        <span className="absolute top-1 left-1 text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded font-medium">
                          Principal
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => removeImage(image.id)}
                        className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 
                                   opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/90"
                        aria-label={`Eliminar imagen ${index + 1}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
