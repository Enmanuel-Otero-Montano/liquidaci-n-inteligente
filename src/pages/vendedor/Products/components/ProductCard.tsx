import { Card, CardContent } from '@/components/ui/card';
import { Product } from '@/types/product';
import { ProductStatusBadge } from './ProductStatusBadge';
import { ProductActions } from './ProductActions';

interface ProductCardProps {
  product: Product;
  onDuplicate: (productId: string) => void;
  onToggleStatus: (productId: string, newStatus: 'approved' | 'disabled') => void;
  isLoading?: boolean;
}

export function ProductCard({ product, onDuplicate, onToggleStatus, isLoading }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-UY', {
      style: 'currency',
      currency: 'UYU',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <img
            src={product.images[0]}
            alt={product.title}
            className="h-20 w-20 rounded-lg object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-medium truncate">{product.title}</h3>
                <p className="text-sm text-muted-foreground">{product.category}</p>
              </div>
              <ProductActions
                product={product}
                onDuplicate={onDuplicate}
                onToggleStatus={onToggleStatus}
                isLoading={isLoading}
              />
            </div>
            
            <div className="flex items-center gap-3 mt-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
                -{product.discount_pct}%
              </span>
              <ProductStatusBadge status={product.status} />
            </div>
            
            <div className="flex items-center justify-between mt-3">
              <div>
                <p className="font-semibold">{formatPrice(product.price_now)}</p>
                <p className="text-xs text-muted-foreground line-through">
                  {formatPrice(product.price_before)}
                </p>
              </div>
              <p className={`text-sm ${product.stock_qty === 0 ? 'text-destructive font-medium' : 'text-muted-foreground'}`}>
                Stock: {product.stock_qty}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
