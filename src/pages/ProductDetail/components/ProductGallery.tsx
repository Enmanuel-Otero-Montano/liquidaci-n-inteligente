import { useState } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const displayImages = images.length > 0 
    ? images 
    : ['/placeholder.svg'];

  return (
    <div className="space-y-4">
      {/* Imagen Principal */}
      <div className="overflow-hidden rounded-lg border border-border bg-muted">
        <AspectRatio ratio={4 / 3}>
          <img
            src={displayImages[selectedIndex]}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            loading="eager"
          />
        </AspectRatio>
      </div>

      {/* Thumbnails */}
      {displayImages.length > 1 && (
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
    </div>
  );
}
