import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ReportFilters, PenaltyType } from '@/types/adminReports';
import {
  mockGetAllReports,
  mockHideProductFromReport,
  mockRequestEvidenceToSeller,
  mockPenalizeSellerFromReport,
  mockResolveReport,
  getReportCounts,
} from '@/mocks/adminReports';
import { useToast } from '@/hooks/use-toast';

export function useAllReports(filters?: ReportFilters) {
  return useQuery({
    queryKey: ['admin-reports', filters],
    queryFn: () => mockGetAllReports(filters),
  });
}

export function useReportCounts() {
  return useQuery({
    queryKey: ['admin-reports-counts'],
    queryFn: () => Promise.resolve(getReportCounts()),
  });
}

export function useHideProductFromReport() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ reportId, note }: { reportId: string; note?: string }) =>
      mockHideProductFromReport(reportId, note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-reports'] });
      queryClient.invalidateQueries({ queryKey: ['admin-reports-counts'] });
      toast({
        title: 'Producto ocultado',
        description: 'El producto ha sido removido del catálogo público.',
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo ocultar el producto.',
      });
    },
  });
}

export function useRequestEvidenceToSeller() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ reportId, message }: { reportId: string; message: string }) =>
      mockRequestEvidenceToSeller(reportId, message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-reports'] });
      toast({
        title: 'Solicitud enviada',
        description: 'Se ha solicitado evidencia al vendedor.',
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo enviar la solicitud.',
      });
    },
  });
}

export function usePenalizeSellerFromReport() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({
      reportId,
      penalty,
      note,
    }: {
      reportId: string;
      penalty: PenaltyType;
      note: string;
    }) => mockPenalizeSellerFromReport(reportId, penalty, note),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin-reports'] });
      queryClient.invalidateQueries({ queryKey: ['admin-reports-counts'] });
      const isWarning = variables.penalty === 'warning';
      toast({
        title: isWarning ? 'Advertencia emitida' : 'Vendedor penalizado',
        description: isWarning
          ? 'Se ha enviado una advertencia al vendedor.'
          : 'El vendedor ha sido suspendido.',
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo aplicar la penalización.',
      });
    },
  });
}

export function useResolveReport() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ reportId, note }: { reportId: string; note?: string }) =>
      mockResolveReport(reportId, note),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin-reports'] });
      queryClient.invalidateQueries({ queryKey: ['admin-reports-counts'] });
      
      // Check if product is still visible
      const productStillVisible = data.product.status === 'approved';
      
      toast({
        title: 'Reporte resuelto',
        description: productStillVisible
          ? 'El reporte ha sido cerrado. Nota: El producto sigue visible en el catálogo.'
          : 'El reporte ha sido cerrado correctamente.',
        variant: productStillVisible ? 'default' : 'default',
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo resolver el reporte.',
      });
    },
  });
}
