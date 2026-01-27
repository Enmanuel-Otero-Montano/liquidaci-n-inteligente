import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Product } from '@/types/product';
import { ProductRow } from './ProductRow';
import { ProductCard } from './ProductCard';
import { EmptyState } from './EmptyState';
import { ProductsTableSkeleton } from './ProductsTableSkeleton';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProductsTableProps {
  products: Product[];
  isLoading: boolean;
  onDuplicate: (productId: string) => void;
  onToggleStatus: (productId: string, newStatus: 'approved' | 'disabled') => void;
  isActionLoading?: boolean;
  hasFilters?: boolean;
}

export function ProductsTable({
  products,
  isLoading,
  onDuplicate,
  onToggleStatus,
  isActionLoading,
  hasFilters,
}: ProductsTableProps) {
  const isMobile = useIsMobile();

  if (isLoading) {
    return <ProductsTableSkeleton />;
  }

  if (products.length === 0) {
    return <EmptyState hasFilters={hasFilters} />;
  }

  // Mobile view: Cards
  if (isMobile) {
    return (
      <div className="space-y-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDuplicate={onDuplicate}
            onToggleStatus={onToggleStatus}
            isLoading={isActionLoading}
          />
        ))}
      </div>
    );
  }

  // Desktop view: Table
  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Producto</TableHead>
            <TableHead>Descuento</TableHead>
            <TableHead className="text-right">Precio</TableHead>
            <TableHead className="text-center">Stock</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right w-[70px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
              onDuplicate={onDuplicate}
              onToggleStatus={onToggleStatus}
              isLoading={isActionLoading}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
