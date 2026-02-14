import { useCallback, useEffect, useRef, useState } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageLightboxProps {
  images: string[];
  initialIndex: number;
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ImageLightbox({ images, initialIndex, title, open, onOpenChange }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const transformRef = useRef<ReactZoomPanPinchRef>(null);
  const hasMultiple = images.length > 1;

  // Sync initialIndex when lightbox opens
  useEffect(() => {
    if (open) {
      setCurrentIndex(initialIndex);
    }
  }, [open, initialIndex]);

  const goTo = useCallback((index: number) => {
    const next = (index + images.length) % images.length;
    setCurrentIndex(next);
    transformRef.current?.resetTransform(0);
  }, [images.length]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft' && hasMultiple) {
      e.preventDefault();
      goTo(currentIndex - 1);
    } else if (e.key === 'ArrowRight' && hasMultiple) {
      e.preventDefault();
      goTo(currentIndex + 1);
    }
  }, [currentIndex, goTo, hasMultiple]);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/90 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          onKeyDown={handleKeyDown}
          aria-describedby={undefined}
          className="fixed inset-0 z-50 flex items-center justify-center outline-none"
        >
          <DialogPrimitive.Title className="sr-only">
            {title}
          </DialogPrimitive.Title>

          {/* Close button */}
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-3 top-3 z-10 rounded-full bg-black/50 p-2 text-white/80 transition-colors hover:bg-black/70 hover:text-white"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Navigation arrows */}
          {hasMultiple && (
            <>
              <button
                onClick={() => goTo(currentIndex - 1)}
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white/80 transition-colors hover:bg-black/70 hover:text-white"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={() => goTo(currentIndex + 1)}
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white/80 transition-colors hover:bg-black/70 hover:text-white"
                aria-label="Imagen siguiente"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Image with zoom */}
          <div className="h-full w-full p-12 md:p-16">
            <TransformWrapper
              ref={transformRef}
              key={currentIndex}
              minScale={1}
              maxScale={5}
              doubleClick={{ mode: 'zoomIn', step: 1.5 }}
              wheel={{ step: 0.3 }}
              panning={{ velocityDisabled: true }}
            >
              {({ zoomIn, zoomOut, resetTransform }) => (
                <>
                  <TransformComponent
                    wrapperClass="!w-full !h-full"
                    contentClass="!w-full !h-full !flex !items-center !justify-center"
                  >
                    <img
                      src={images[currentIndex]}
                      alt={`${title} - imagen ${currentIndex + 1}`}
                      className="max-h-full max-w-full object-contain select-none"
                      draggable={false}
                    />
                  </TransformComponent>

                  {/* Bottom toolbar */}
                  <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-full bg-black/60 px-3 py-1.5 backdrop-blur-sm">
                    <button
                      onClick={() => zoomOut()}
                      className="rounded-full p-1.5 text-white/80 transition-colors hover:text-white"
                      aria-label="Alejar"
                    >
                      <ZoomOut className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => resetTransform()}
                      className="rounded-full p-1.5 text-white/80 transition-colors hover:text-white"
                      aria-label="Restablecer zoom"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => zoomIn()}
                      className="rounded-full p-1.5 text-white/80 transition-colors hover:text-white"
                      aria-label="Acercar"
                    >
                      <ZoomIn className="h-4 w-4" />
                    </button>
                    {hasMultiple && (
                      <span className="ml-1 border-l border-white/30 pl-2 text-xs text-white/70">
                        {currentIndex + 1} / {images.length}
                      </span>
                    )}
                  </div>
                </>
              )}
            </TransformWrapper>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
