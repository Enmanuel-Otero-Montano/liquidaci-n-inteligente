import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Upload, X, Store, ImageIcon, AlertCircle, Camera } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { 
  validateProfileImage, 
  fileToBase64, 
  getInitials,
  PROFILE_IMAGE_CONFIG 
} from '@/utils/imageUtils';

interface ProfileImageUploadProps {
  currentImage?: string | null;
  storeName: string;
  onImageChange: (imageUrl: string | null) => void;
  disabled?: boolean;
}

export function ProfileImageUpload({ 
  currentImage, 
  storeName, 
  onImageChange,
  disabled = false 
}: ProfileImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileSelect = useCallback(async (file: File) => {
    setError(null);
    
    // Validar archivo
    const validation = validateProfileImage(file);
    if (!validation.valid) {
      setError(validation.error || 'Archivo inválido');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const base64 = await fileToBase64(file);
      setPreview(base64);
      onImageChange(base64);
    } catch (err) {
      setError('Error al procesar la imagen. Intentá de nuevo.');
    } finally {
      setIsLoading(false);
    }
  }, [onImageChange]);
  
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  }, [disabled]);
  
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (disabled) return;
    
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }, [disabled, handleFileSelect]);
  
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);
  
  const handleRemove = useCallback(() => {
    setPreview(null);
    setError(null);
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [onImageChange]);
  
  const handleClick = useCallback(() => {
    if (!disabled && !isLoading) {
      fileInputRef.current?.click();
    }
  }, [disabled, isLoading]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Camera className="h-5 w-5 text-muted-foreground" />
          <CardTitle>Imagen de tu tienda</CardTitle>
        </div>
        <CardDescription>
          Subí un logo o foto que represente tu negocio. Se mostrará junto a tus productos.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Preview del Avatar */}
          <div className="relative shrink-0">
            <Avatar className="h-24 w-24 border-2 border-border">
              <AvatarImage src={preview || undefined} alt={storeName} />
              <AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">
                {getInitials(storeName)}
              </AvatarFallback>
            </Avatar>
            
            {/* Botón eliminar */}
            {preview && !disabled && (
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 h-7 w-7 rounded-full shadow-md"
                onClick={handleRemove}
                aria-label="Eliminar imagen"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            
            {/* Indicador de carga */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-full">
                <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
          
          {/* Área de upload */}
          <div
            className={cn(
              "flex-1 w-full border-2 border-dashed rounded-lg p-6 transition-all cursor-pointer",
              isDragging 
                ? "border-primary bg-primary/5" 
                : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50",
              disabled && "opacity-50 cursor-not-allowed",
              isLoading && "pointer-events-none"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
            role="button"
            tabIndex={disabled ? -1 : 0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClick();
              }
            }}
            aria-label="Subir imagen de perfil"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept={PROFILE_IMAGE_CONFIG.acceptedExtensions}
              onChange={handleInputChange}
              className="hidden"
              disabled={disabled}
              aria-hidden="true"
            />
            
            <div className="flex flex-col items-center text-center gap-2">
              {isDragging ? (
                <Upload className="h-8 w-8 text-primary" />
              ) : (
                <ImageIcon className="h-8 w-8 text-muted-foreground" />
              )}
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  {isDragging ? (
                    "Soltá la imagen acá"
                  ) : (
                    <>
                      Arrastrá una imagen o{' '}
                      <span className="text-primary font-medium">
                        hacé click para seleccionar
                      </span>
                    </>
                  )}
                </p>
                <p className="text-xs text-muted-foreground/70">
                  PNG, JPG o WEBP • Máximo {PROFILE_IMAGE_CONFIG.maxSizeMB}MB • 
                  Recomendado: {PROFILE_IMAGE_CONFIG.recommendedSize}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mensaje de error */}
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
