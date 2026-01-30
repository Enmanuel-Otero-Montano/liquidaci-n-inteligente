import { useState } from 'react';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { ReportsHeader } from './components/ReportsHeader';
import { ReportsTable } from './components/ReportsTable';
import { ReportsTableSkeleton } from './components/ReportsTableSkeleton';
import { EmptyState } from './components/EmptyState';
import { ReportDetailSheet } from './components/ReportDetailSheet';
import { HideProductDialog } from './components/HideProductDialog';
import { RequestEvidenceDialog } from './components/RequestEvidenceDialog';
import { PenalizeSellerDialog } from './components/PenalizeSellerDialog';
import { ResolveReportDialog } from './components/ResolveReportDialog';
import { ProductReport, ReportFilters, PenaltyType } from '@/types/adminReports';
import {
  useAllReports,
  useReportCounts,
  useHideProductFromReport,
  useRequestEvidenceToSeller,
  usePenalizeSellerFromReport,
  useResolveReport,
} from '@/hooks/useAdminReports';

export function ReportsPage() {
  // Filters
  const [filters, setFilters] = useState<ReportFilters>({
    status: 'all',
    reason: 'all',
    sortBy: 'created_at',
    sortOrder: 'desc',
  });

  // Data
  const { data: reports, isLoading } = useAllReports(filters);
  const { data: counts } = useReportCounts();

  // Mutations
  const hideProductMutation = useHideProductFromReport();
  const requestEvidenceMutation = useRequestEvidenceToSeller();
  const penalizeSellerMutation = usePenalizeSellerFromReport();
  const resolveReportMutation = useResolveReport();

  // UI State
  const [selectedReport, setSelectedReport] = useState<ProductReport | null>(null);
  const [detailSheetOpen, setDetailSheetOpen] = useState(false);
  const [hideDialogOpen, setHideDialogOpen] = useState(false);
  const [evidenceDialogOpen, setEvidenceDialogOpen] = useState(false);
  const [penalizeDialogOpen, setPenalizeDialogOpen] = useState(false);
  const [resolveDialogOpen, setResolveDialogOpen] = useState(false);

  // Handlers
  const handleViewDetails = (report: ProductReport) => {
    setSelectedReport(report);
    setDetailSheetOpen(true);
  };

  const handleHideProduct = (report: ProductReport) => {
    setSelectedReport(report);
    setHideDialogOpen(true);
  };

  const handleRequestEvidence = (report: ProductReport) => {
    setSelectedReport(report);
    setEvidenceDialogOpen(true);
  };

  const handlePenalizeSeller = (report: ProductReport) => {
    setSelectedReport(report);
    setPenalizeDialogOpen(true);
  };

  const handleResolve = (report: ProductReport) => {
    setSelectedReport(report);
    setResolveDialogOpen(true);
  };

  // Confirm handlers
  const confirmHideProduct = (note?: string) => {
    if (!selectedReport) return;
    hideProductMutation.mutate(
      { reportId: selectedReport.id, note },
      {
        onSuccess: () => {
          setHideDialogOpen(false);
          setDetailSheetOpen(false);
        },
      }
    );
  };

  const confirmRequestEvidence = (message: string) => {
    if (!selectedReport) return;
    requestEvidenceMutation.mutate(
      { reportId: selectedReport.id, message },
      {
        onSuccess: () => {
          setEvidenceDialogOpen(false);
        },
      }
    );
  };

  const confirmPenalizeSeller = (penalty: PenaltyType, note: string) => {
    if (!selectedReport) return;
    penalizeSellerMutation.mutate(
      { reportId: selectedReport.id, penalty, note },
      {
        onSuccess: () => {
          setPenalizeDialogOpen(false);
        },
      }
    );
  };

  const confirmResolveReport = (note?: string) => {
    if (!selectedReport) return;
    resolveReportMutation.mutate(
      { reportId: selectedReport.id, note },
      {
        onSuccess: () => {
          setResolveDialogOpen(false);
          setDetailSheetOpen(false);
        },
      }
    );
  };

  const hasFilters = !!(filters.search || (filters.status && filters.status !== 'all') || (filters.reason && filters.reason !== 'all'));

  return (
    <AdminLayout>
      <div className="space-y-6">
        <ReportsHeader
          filters={filters}
          onFiltersChange={setFilters}
          openCount={counts?.open || 0}
          resolvedCount={counts?.resolved || 0}
        />

        {isLoading ? (
          <ReportsTableSkeleton />
        ) : reports && reports.length > 0 ? (
          <ReportsTable
            reports={reports}
            onViewDetails={handleViewDetails}
            onHideProduct={handleHideProduct}
            onRequestEvidence={handleRequestEvidence}
            onPenalizeSeller={handlePenalizeSeller}
            onResolve={handleResolve}
          />
        ) : (
          <EmptyState hasFilters={hasFilters} />
        )}

        {/* Detail Sheet */}
        <ReportDetailSheet
          report={selectedReport}
          open={detailSheetOpen}
          onOpenChange={setDetailSheetOpen}
          onHideProduct={() => {
            setDetailSheetOpen(false);
            setHideDialogOpen(true);
          }}
          onRequestEvidence={() => {
            setDetailSheetOpen(false);
            setEvidenceDialogOpen(true);
          }}
          onPenalizeSeller={() => {
            setDetailSheetOpen(false);
            setPenalizeDialogOpen(true);
          }}
          onResolve={() => {
            setDetailSheetOpen(false);
            setResolveDialogOpen(true);
          }}
        />

        {/* Dialogs */}
        <HideProductDialog
          open={hideDialogOpen}
          onOpenChange={setHideDialogOpen}
          productTitle={selectedReport?.product.title || ''}
          onConfirm={confirmHideProduct}
          isLoading={hideProductMutation.isPending}
        />

        <RequestEvidenceDialog
          open={evidenceDialogOpen}
          onOpenChange={setEvidenceDialogOpen}
          sellerName={selectedReport?.product.seller.nombre_comercial || ''}
          onConfirm={confirmRequestEvidence}
          isLoading={requestEvidenceMutation.isPending}
        />

        <PenalizeSellerDialog
          open={penalizeDialogOpen}
          onOpenChange={setPenalizeDialogOpen}
          sellerName={selectedReport?.product.seller.nombre_comercial || ''}
          onConfirm={confirmPenalizeSeller}
          isLoading={penalizeSellerMutation.isPending}
        />

        <ResolveReportDialog
          open={resolveDialogOpen}
          onOpenChange={setResolveDialogOpen}
          productStillVisible={selectedReport?.product.status === 'approved'}
          onConfirm={confirmResolveReport}
          isLoading={resolveReportMutation.isPending}
        />
      </div>
    </AdminLayout>
  );
}
