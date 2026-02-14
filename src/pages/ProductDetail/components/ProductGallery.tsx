import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/lib/utils';
import { ImageLightbox } from './ImageLightbox';

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const displayImages = images.length > 0
    ? images
    : ['/placeholder.svg'];

  const hasMultiple = displayImages.length > 1;

  const goTo = (index: number) => {
    setSelectedIndex((index + displayImages.length) % displayImages.length);
  };

  return (
    <div className="space-y-4">
      {/* Imagen Principal */}
      <div className="group relative overflow-hidden rounded-lg border border-border bg-muted">
        <AspectRatio ratio={4 / 3}>
          <img
            src={displayImages[selectedIndex]}
            alt={title}
            className="h-full w-full cursor-zoom-in object-contain"
            loading="eager"
            onClick={() => setLightboxOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setLightboxOpen(true);
              }
            }}
          />
        </AspectRatio>

        {/* Flechas de navegación */}
        {hasMultiple && (
          <>
            <button
              onClick={() => goTo(selectedIndex - 1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/70 p-1.5 text-foreground/70 opacity-0 transition-opacity hover:bg-background hover:text-foreground group-hover:opacity-100"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => goTo(selectedIndex + 1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/70 p-1.5 text-foreground/70 opacity-0 transition-opacity hover:bg-background hover:text-foreground group-hover:opacity-100"
              aria-label="Imagen siguiente"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Indicador de posición */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {displayImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    selectedIndex === index
                      ? "w-4 bg-primary"
                      : "w-1.5 bg-foreground/30 hover:bg-foreground/50"
                  )}
                  aria-label={`Ir a imagen ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {hasMultiple && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {displayImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                "relative flex-shrink-0 overflow-hidden rounded-md border-2 transition-all",
                selectedIndex === index
                  ? "border-primary ring-2 ring-primary ring-offset-2"
                  : "border-border hover:border-muted-foreground"
              )}
              aria-label={`Ver imagen ${index + 1}`}
            >
              <div className="h-16 w-16 md:h-20 md:w-20">
                <img
                  src={image}
                  alt={`${title} - imagen ${index + 1}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </button>
          ))}
        </div>
      )}

      <ImageLightbox
        images={displayImages}
        initialIndex={selectedIndex}
        title={title}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
      />
    </div>
  );
}
