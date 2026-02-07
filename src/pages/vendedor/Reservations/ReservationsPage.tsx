import { useState, useEffect } from 'react';
import { SellerLayout } from '@/components/layouts/SellerLayout';
import { ReservationsHeader } from './components/ReservationsHeader';
import { ReservationsTable } from './components/ReservationsTable';
import { ReservationsTableSkeleton } from './components/ReservationsTableSkeleton';
import { ReservationDetailSheet } from './components/ReservationDetailSheet';
import { EmptyState } from './components/EmptyState';
import {
  useSellerReservations,
  useUpdateReservationStatus,
  useUpdateReservationNotes
} from '@/hooks/useReservations';
import { useSellerProducts } from '@/hooks/useSellerProducts';
import { Reservation, ReservationStatus, ReservationFilters } from '@/types/reservation';

export function ReservationsPage() {
  const [filters, setFilters] = useState<ReservationFilters>({
    status: 'all',
    search: '',
  });
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const { data: reservations, isLoading } = useSellerReservations(filters);
  const { data: sellerProducts } = useSellerProducts();
  const updateStatus = useUpdateReservationStatus();
  const updateNotes = useUpdateReservationNotes();

  const productOptions = (sellerProducts || []).map(p => ({ id: p.id, title: p.title }));

  // Count new reservations
  const newCount = reservations?.filter(r => r.status === 'new').length || 0;

  const handleStatusChange = (id: string, status: ReservationStatus) => {
    updateStatus.mutate({ reservationId: id, status });
  };

  const handleNotesChange = (id: string, notes: string) => {
    updateNotes.mutate({ reservationId: id, notes });
  };

  const handleViewDetails = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setSheetOpen(true);
  };

  // Update selected reservation when data changes
  useEffect(() => {
    if (selectedReservation && reservations) {
      const updated = reservations.find(r => r.id === selectedReservation.id);
      if (updated) {
        setSelectedReservation(updated);
      }
    }
  }, [reservations, selectedReservation?.id]);

  return (
    <SellerLayout>
      <div className="space-y-6">
        <ReservationsHeader
          onSearchChange={(search) => setFilters(f => ({ ...f, search }))}
          onStatusChange={(status) => setFilters(f => ({ ...f, status }))}
          onProductChange={(product_id) => setFilters(f => ({ ...f, product_id }))}
          currentStatus={filters.status || 'all'}
          currentProductId={filters.product_id || 'all'}
          products={productOptions}
          newCount={newCount}
        />

        {isLoading ? (
          <ReservationsTableSkeleton />
        ) : !reservations || reservations.length === 0 ? (
          <EmptyState />
        ) : (
          <ReservationsTable
            reservations={reservations}
            onStatusChange={handleStatusChange}
            onViewDetails={handleViewDetails}
          />
        )}

        <ReservationDetailSheet
          reservation={selectedReservation}
          open={sheetOpen}
          onOpenChange={setSheetOpen}
          onStatusChange={handleStatusChange}
          onNotesChange={handleNotesChange}
          isUpdating={updateNotes.isPending}
        />
      </div>
    </SellerLayout>
  );
}
