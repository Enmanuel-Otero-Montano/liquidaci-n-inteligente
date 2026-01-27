import { useState } from 'react';
import { SellerLayout } from '@/components/layouts/SellerLayout';
import { ProductsHeader } from './components/ProductsHeader';
import { ProductsTable } from './components/ProductsTable';
import { useSellerProducts, useDuplicateProduct, useToggleProductStatus } from '@/hooks/useSellerProducts';
import { useToast } from '@/hooks/use-toast';
import { ProductStatus } from '@/types/product';

export function ProductsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProductStatus | 'all'>('all');
  const { toast } = useToast();

  const { data: products = [], isLoading } = useSellerProducts({
    search: search || undefined,
    status: statusFilter,
  });

  const duplicateMutation = useDuplicateProduct();
  const toggleStatusMutation = useToggleProductStatus();

  const handleDuplicate = async (productId: string) => {
    try {
      await duplicateMutation.mutateAsync(productId);
      toast({
        title: 'Producto duplicado',
        description: 'Se creó una copia del producto como borrador.',
      });
    } catch {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo duplicar el producto.',
      });
    }
  };

  const handleToggleStatus = async (productId: string, newStatus: 'approved' | 'disabled') => {
    try {
      await toggleStatusMutation.mutateAsync({ productId, newStatus });
      toast({
        title: newStatus === 'disabled' ? 'Producto desactivado' : 'Producto activado',
        description: newStatus === 'disabled' 
          ? 'El producto ya no es visible para los compradores.'
          : 'El producto está nuevamente visible.',
      });
    } catch {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo actualizar el estado del producto.',
      });
    }
  };

  const hasFilters = search !== '' || statusFilter !== 'all';
  const isActionLoading = duplicateMutation.isPending || toggleStatusMutation.isPending;

  return (
    <SellerLayout>
      <div className="space-y-6">
        <ProductsHeader
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          totalProducts={products.length}
        />

        <ProductsTable
          products={products}
          isLoading={isLoading}
          onDuplicate={handleDuplicate}
          onToggleStatus={handleToggleStatus}
          isActionLoading={isActionLoading}
          hasFilters={hasFilters}
        />
      </div>
    </SellerLayout>
  );
}
