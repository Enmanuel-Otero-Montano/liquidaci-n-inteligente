import { useState } from 'react';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { SellersHeader } from './components/SellersHeader';
import { SellersTable } from './components/SellersTable';
import { SellersTableSkeleton } from './components/SellersTableSkeleton';
import { EmptyState } from './components/EmptyState';
import { SellerDetailSheet } from './components/SellerDetailSheet';
import { BlockSellerDialog } from './components/BlockSellerDialog';
import { VerifySellerDialog } from './components/VerifySellerDialog';
import { SellerFilters, SellerWithStats } from '@/types/adminSeller';
import { SellerStatus } from '@/types/seller';
import {
  useAllSellers,
  useApproveSeller,
  useBlockSeller,
  useUnblockSeller,
  useVerifySeller,
  useUnverifySeller,
} from '@/hooks/useAdminSellers';
import { toast } from '@/hooks/use-toast';

export function SellersPage() {
  const [filters, setFilters] = useState<SellerFilters>({
    status: 'all',
    verified: 'all',
    sortBy: 'created_at',
    sortOrder: 'desc',
  });

  const [selectedSeller, setSelectedSeller] = useState<SellerWithStats | null>(null);
  const [detailSheetOpen, setDetailSheetOpen] = useState(false);
  const [blockDialogOpen, setBlockDialogOpen] = useState(false);
  const [verifyDialogOpen, setVerifyDialogOpen] = useState(false);

  const { data: sellers = [], isLoading } = useAllSellers(filters);
  const approveMutation = useApproveSeller();
  const blockMutation = useBlockSeller();
  const unblockMutation = useUnblockSeller();
  const verifyMutation = useVerifySeller();
  const unverifyMutation = useUnverifySeller();

  // Calculate status counts from unfiltered data
  const { data: allSellers = [] } = useAllSellers({});
  const statusCounts = allSellers.reduce(
    (acc, seller) => {
      const status = seller.status || 'active';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    {} as Record<SellerStatus, number>
  );

  const hasFilters = !!(filters.search || filters.status !== 'all' || filters.verified !== 'all');

  const handleViewDetails = (seller: SellerWithStats) => {
    setSelectedSeller(seller);
    setDetailSheetOpen(true);
  };

  const handleApprove = async (seller: SellerWithStats) => {
    try {
      await approveMutation.mutateAsync(seller.id);
      toast({
        title: 'Vendedor aprobado',
        description: `${seller.nombre_comercial} ya puede publicar productos.`,
      });
      setDetailSheetOpen(false);
      setSelectedSeller(null);
    } catch {
      toast({
        title: 'Error',
        description: 'No se pudo aprobar al vendedor.',
        variant: 'destructive',
      });
    }
  };

  const handleBlock = (seller: SellerWithStats) => {
    setSelectedSeller(seller);
    setBlockDialogOpen(true);
  };

  const handleUnblock = async (seller: SellerWithStats) => {
    try {
      await unblockMutation.mutateAsync(seller.id);
      toast({
        title: 'Vendedor desbloqueado',
        description: `${seller.nombre_comercial} ha sido desbloqueado exitosamente.`,
      });
    } catch {
      toast({
        title: 'Error',
        description: 'No se pudo desbloquear al vendedor.',
        variant: 'destructive',
      });
    }
  };

  const handleVerify = (seller: SellerWithStats) => {
    setSelectedSeller(seller);
    setVerifyDialogOpen(true);
  };

  const handleUnverify = async (seller: SellerWithStats) => {
    try {
      await unverifyMutation.mutateAsync(seller.id);
      toast({
        title: 'Verificación removida',
        description: `Se ha quitado la verificación de ${seller.nombre_comercial}.`,
      });
    } catch {
      toast({
        title: 'Error',
        description: 'No se pudo quitar la verificación.',
        variant: 'destructive',
      });
    }
  };

  const handleConfirmBlock = async (reason: string) => {
    if (!selectedSeller) return;

    try {
      await blockMutation.mutateAsync({ sellerId: selectedSeller.id, reason });
      toast({
        title: 'Vendedor bloqueado',
        description: `${selectedSeller.nombre_comercial} ha sido bloqueado.`,
      });
      setBlockDialogOpen(false);
      setDetailSheetOpen(false);
      setSelectedSeller(null);
    } catch {
      toast({
        title: 'Error',
        description: 'No se pudo bloquear al vendedor.',
        variant: 'destructive',
      });
    }
  };

  const handleConfirmVerify = async (notes?: string) => {
    if (!selectedSeller) return;

    try {
      await verifyMutation.mutateAsync({ sellerId: selectedSeller.id, notes });
      toast({
        title: 'Vendedor verificado',
        description: `${selectedSeller.nombre_comercial} ha sido marcado como verificado.`,
      });
      setVerifyDialogOpen(false);
      setDetailSheetOpen(false);
      setSelectedSeller(null);
    } catch {
      toast({
        title: 'Error',
        description: 'No se pudo verificar al vendedor.',
        variant: 'destructive',
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <SellersHeader
          filters={filters}
          onFiltersChange={setFilters}
          totalSellers={allSellers.length}
          statusCounts={statusCounts}
        />

        {isLoading ? (
          <SellersTableSkeleton />
        ) : sellers.length === 0 ? (
          <EmptyState hasFilters={hasFilters} />
        ) : (
          <SellersTable
            sellers={sellers}
            onViewDetails={handleViewDetails}
            onApprove={handleApprove}
            onBlock={handleBlock}
            onUnblock={handleUnblock}
            onVerify={handleVerify}
            onUnverify={handleUnverify}
          />
        )}

        <SellerDetailSheet
          open={detailSheetOpen}
          onOpenChange={setDetailSheetOpen}
          seller={selectedSeller}
          onApprove={() => selectedSeller && handleApprove(selectedSeller)}
          onBlock={() => setBlockDialogOpen(true)}
          onUnblock={() => selectedSeller && handleUnblock(selectedSeller)}
          onVerify={() => setVerifyDialogOpen(true)}
          onUnverify={() => selectedSeller && handleUnverify(selectedSeller)}
        />

        <BlockSellerDialog
          open={blockDialogOpen}
          onOpenChange={setBlockDialogOpen}
          seller={selectedSeller}
          onConfirm={handleConfirmBlock}
          isLoading={blockMutation.isPending}
        />

        <VerifySellerDialog
          open={verifyDialogOpen}
          onOpenChange={setVerifyDialogOpen}
          seller={selectedSeller}
          onConfirm={handleConfirmVerify}
          isLoading={verifyMutation.isPending}
        />
      </div>
    </AdminLayout>
  );
}
