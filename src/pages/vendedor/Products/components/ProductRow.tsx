import { TableCell, TableRow } from '@/components/ui/table';
import { Product } from '@/types/product';
import { ProductStatusBadge } from './ProductStatusBadge';
import { ProductActions } from './ProductActions';

interface ProductRowProps {
  product: Product;
  onDuplicate: (productId: string) => void;
  onToggleStatus: (productId: string, newStatus: 'approved' | 'disabled') => void;
  isLoading?: boolean;
}

export function ProductRow({ product, onDuplicate, onToggleStatus, isLoading }: ProductRowProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-UY', {
      style: 'currency',
      currency: 'UYU',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <img
            src={product.images?.[0] || '/placeholder.svg'}
            alt={product.title}
            className="h-12 w-12 rounded-lg object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
          />
          <div className="min-w-0">
            <p className="font-medium truncate max-w-[200px]">{product.title}</p>
            <p className="text-sm text-muted-foreground">{product.category}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
          -{product.discount_pct}%
        </span>
      </TableCell>
      <TableCell>
        <div className="text-right">
          <p className="font-medium">{formatPrice(product.price_now)}</p>
          <p className="text-xs text-muted-foreground line-through">
            {formatPrice(product.price_before)}
          </p>
        </div>
      </TableCell>
      <TableCell className="text-center">
        <span className={product.stock_qty === 0 ? 'text-destructive font-medium' : ''}>
          {product.stock_qty}
        </span>
      </TableCell>
      <TableCell>
        <div>
          <ProductStatusBadge status={product.status} />
          {product.rejection_reason && (product.status === 'rejected' || product.status === 'changes_requested') && (
            <p className="text-xs text-destructive mt-1 max-w-[200px]" title={product.rejection_reason}>
              {product.rejection_reason}
            </p>
          )}
        </div>
      </TableCell>
      <TableCell className="text-right">
        <ProductActions
          product={product}
          onDuplicate={onDuplicate}
          onToggleStatus={onToggleStatus}
          isLoading={isLoading}
        />
      </TableCell>
    </TableRow>
  );
}
