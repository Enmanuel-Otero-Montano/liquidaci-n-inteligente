import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/contexts/AuthContext';
import { useMercadoLibre } from '@/hooks/useMercadoLibre';

interface MLProductPickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectProduct: (product: {
    title: string;
    price: number;
    images: string[];
    permalink: string;
  }) => void;
}

export function MLProductPicker({ open, onOpenChange, onSelectProduct }: MLProductPickerProps) {
  const { seller } = useAuth();
  const { isConnected, connect, products, isLoading, error, fetchProducts, hasMore } = useMercadoLibre();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (open && seller?.id && !initialized) {
      setInitialized(true);
      fetchProducts(seller.id, 0);
    }
  }, [open, seller?.id, initialized, fetchProducts]);

  useEffect(() => {
    if (!open) {
      setInitialized(false);
    }
  }, [open]);

  const handleConnect = () => {
    if (seller?.id) {
      connect(seller.id);
    }
  };

  const handleLoadMore = () => {
    if (seller?.id) {
      fetchProducts(seller.id, products.length);
    }
  };

  const handleSelect = (product: typeof products[number]) => {
    onSelectProduct({
      title: product.title,
      price: product.price,
      images: product.images,
      permalink: product.permalink,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Importar desde MercadoLibre</DialogTitle>
          <DialogDescription>
            Seleccioná un producto para pre-llenar el formulario de publicación
          </DialogDescription>
        </DialogHeader>

        {/* Not connected state */}
        {!isConnected && !isLoading && (
          <div className="flex flex-col items-center gap-4 py-8">
            <img
              src="https://http2.mlstatic.com/frontend-assets/ui-navigation/5.21.11/mercadolibre/logo__large_plus@2x.png"
              alt="MercadoLibre"
              className="h-10"
            />
            <p className="text-muted-foreground text-center">
              Conectá tu cuenta de MercadoLibre para importar tus publicaciones
            </p>
            <Button onClick={handleConnect} size="lg">
              Conectar MercadoLibre
            </Button>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        )}

        {/* Loading state */}
        {isLoading && products.length === 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="border rounded-lg p-3 space-y-3">
                <Skeleton className="aspect-square w-full rounded-md" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        )}

        {/* Products grid */}
        {isConnected && products.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
              {products.map((product) => (
                <div
                  key={product.ml_id}
                  className="border rounded-lg p-3 space-y-3 hover:border-primary/50 transition-colors"
                >
                  {product.images[0] && (
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="aspect-square w-full object-contain rounded-md bg-muted"
                    />
                  )}
                  <div className="space-y-1">
                    <p className="text-sm font-medium line-clamp-2">{product.title}</p>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">
                        ${product.price.toLocaleString('es-UY')}
                      </span>
                      {product.original_price !== null && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.original_price.toLocaleString('es-UY')}
                        </span>
                      )}
                    </div>
                    {product.discount_pct !== null ? (
                      <Badge variant="secondary" className="text-xs">
                        {product.discount_pct}% OFF actual en ML
                      </Badge>
                    ) : (
                      <p className="text-xs text-muted-foreground">Sin precio original en ML</p>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => handleSelect(product)}
                  >
                    Usar este producto
                  </Button>
                </div>
              ))}
            </div>

            {hasMore && (
              <div className="flex justify-center pb-4">
                <Button
                  variant="outline"
                  onClick={handleLoadMore}
                  disabled={isLoading}
                >
                  {isLoading ? 'Cargando...' : 'Ver más'}
                </Button>
              </div>
            )}
          </>
        )}

        {/* Connected but empty */}
        {isConnected && !isLoading && products.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-8">
            <p className="text-muted-foreground">No se encontraron publicaciones activas en tu cuenta de MercadoLibre</p>
          </div>
        )}

        {/* Error state (when connected) */}
        {isConnected && error && (
          <p className="text-sm text-destructive text-center py-2">{error}</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
