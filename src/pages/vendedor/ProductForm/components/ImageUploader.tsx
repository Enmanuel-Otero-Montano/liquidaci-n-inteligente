import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { X, Plus, ImageIcon, GripVertical } from 'lucide-react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductFormData } from '@/types/productForm';

interface ImageUploaderProps {
  form: UseFormReturn<ProductFormData>;
}

export function ImageUploader({ form }: ImageUploaderProps) {
  const [newImageUrl, setNewImageUrl] = useState('');
  const images = form.watch('images') || [];

  const addImage = () => {
    if (newImageUrl.trim() && images.length < 5) {
      form.setValue('images', [...images, newImageUrl.trim()], { shouldValidate: true });
      setNewImageUrl('');
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    form.setValue('images', newImages, { shouldValidate: true });
  };

  const moveImage = (from: number, to: number) => {
    if (to < 0 || to >= images.length) return;
    const newImages = [...images];
    const [removed] = newImages.splice(from, 1);
    newImages.splice(to, 0, removed);
    form.setValue('images', newImages, { shouldValidate: true });
  };

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
                Agregá entre 1 y 5 fotos. La primera será la imagen principal.
              </FormDescription>
              
              {/* Image previews */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-3">
                  {images.map((url, index) => (
                    <div 
                      key={index} 
                      className="relative group aspect-square rounded-lg overflow-hidden border bg-muted"
                    >
                      <img 
                        src={url} 
                        alt={`Producto ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder.svg';
                        }}
                      />
                      {index === 0 && (
                        <span className="absolute top-1 left-1 text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded">
                          Principal
                        </span>
                      )}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                        {index > 0 && (
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 text-white hover:bg-white/20"
                            onClick={() => moveImage(index, index - 1)}
                          >
                            <GripVertical className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7 text-white hover:bg-white/20"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add image input */}
              {images.length < 5 && (
                <div className="flex gap-2 mt-3">
                  <FormControl>
                    <Input
                      placeholder="Pegá la URL de una imagen"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addImage();
                        }
                      }}
                    />
                  </FormControl>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={addImage}
                    disabled={!newImageUrl.trim()}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Agregar
                  </Button>
                </div>
              )}

              {images.length === 0 && (
                <div className="border-2 border-dashed rounded-lg p-8 text-center text-muted-foreground">
                  <ImageIcon className="h-10 w-10 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Agregá URLs de imágenes del producto</p>
                  <p className="text-xs mt-1">Formatos: JPG, PNG, WebP</p>
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
