import { useState } from 'react';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { ModerationHeader } from './components/ModerationHeader';
import { ModerationTable } from './components/ModerationTable';
import { ModerationTableSkeleton } from './components/ModerationTableSkeleton';
import { ProductDetailSheet } from './components/ProductDetailSheet';
import { RejectDialog } from './components/RejectDialog';
import { RequestChangesDialog } from './components/RequestChangesDialog';
import { EmptyState } from './components/EmptyState';
import { 
  usePendingProducts, 
  useApproveProduct, 
  useRejectProduct, 
  useRequestChanges 
} from '@/hooks/useModeration';
import { ModerationFilters, ProductWithSeller } from '@/types/moderation';

export function ModerationPage() {
  const [filters, setFilters] = useState<ModerationFilters>({
    dateRange: 'all',
    sortBy: 'date',
  });
  const [selectedProduct, setSelectedProduct] = useState<ProductWithSeller | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [requestChangesOpen, setRequestChangesOpen] = useState(false);
  const [actionProductId, setActionProductId] = useState<string | null>(null);

  const { data: products, isLoading } = usePendingProducts(filters);
  const approveProduct = useApproveProduct();
  const rejectProduct = useRejectProduct();
  const requestChanges = useRequestChanges();

  const handleViewDetail = (product: ProductWithSeller) => {
    setSelectedProduct(product);
    setDetailOpen(true);
  };

  const handleApprove = (productId: string) => {
    approveProduct.mutate(productId);
    setDetailOpen(false);
  };

  const handleRejectClick = (productId: string) => {
    setActionProductId(productId);
    const product = products?.find(p => p.id === productId);
    setSelectedProduct(product || null);
    setRejectOpen(true);
  };

  const handleRejectConfirm = (reason: string) => {
    if (actionProductId) {
      rejectProduct.mutate(
        { productId: actionProductId, reason },
        {
          onSuccess: () => {
            setRejectOpen(false);
            setDetailOpen(false);
            setActionProductId(null);
          },
        }
      );
    }
  };

  const handleRequestChangesClick = (productId: string) => {
    setActionProductId(productId);
    const product = products?.find(p => p.id === productId);
    setSelectedProduct(product || null);
    setRequestChangesOpen(true);
  };

  const handleRequestChangesConfirm = (message: string) => {
    if (actionProductId) {
      requestChanges.mutate(
        { productId: actionProductId, message },
        {
          onSuccess: () => {
            setRequestChangesOpen(false);
            setDetailOpen(false);
            setActionProductId(null);
          },
        }
      );
    }
  };

  const pendingCount = products?.length || 0;

  return (
    <AdminLayout pendingCount={pendingCount}>
      <div className="space-y-6">
        <ModerationHeader
          filters={filters}
          onFiltersChange={setFilters}
          pendingCount={pendingCount}
        />

        {isLoading ? (
          <ModerationTableSkeleton />
        ) : !products || products.length === 0 ? (
          <EmptyState />
        ) : (
          <ModerationTable
            products={products}
            onViewDetail={handleViewDetail}
            onApprove={handleApprove}
            onReject={handleRejectClick}
            onRequestChanges={handleRequestChangesClick}
            approvingId={approveProduct.isPending ? approveProduct.variables : undefined}
          />
        )}

        <ProductDetailSheet
          product={selectedProduct}
          open={detailOpen}
          onOpenChange={setDetailOpen}
          onApprove={() => selectedProduct && handleApprove(selectedProduct.id)}
          onReject={() => selectedProduct && handleRejectClick(selectedProduct.id)}
          onRequestChanges={() => selectedProduct && handleRequestChangesClick(selectedProduct.id)}
          isApproving={approveProduct.isPending}
        />

        <RejectDialog
          open={rejectOpen}
          onOpenChange={setRejectOpen}
          onConfirm={handleRejectConfirm}
          isLoading={rejectProduct.isPending}
          productTitle={selectedProduct?.title}
        />

        <RequestChangesDialog
          open={requestChangesOpen}
          onOpenChange={setRequestChangesOpen}
          onConfirm={handleRequestChangesConfirm}
          isLoading={requestChanges.isPending}
          productTitle={selectedProduct?.title}
        />
      </div>
    </AdminLayout>
  );
}
