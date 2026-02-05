import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ProductReport, ReportFilters, PenaltyType } from '@/types/adminReports';
import { useToast } from '@/hooks/use-toast';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

async function fetchReportWithDetails(reportRow: any): Promise<ProductReport> {
  // Fetch report actions
  const { data: actions } = await supabase
    .from('report_actions')
    .select('*')
    .eq('report_id', reportRow.id)
    .order('created_at', { ascending: true });

  const product = reportRow.products;
  const seller = product?.sellers;

  return {
    id: reportRow.id,
    product: {
      id: product?.id || '',
      title: product?.title || '',
      image_url: product?.images?.[0],
      status: product?.status || 'approved',
      seller: {
        id: seller?.id || '',
        nombre_comercial: seller?.nombre_comercial || '',
        email: seller?.email || '',
        zona: seller?.zona || '',
        status: seller?.status || 'active',
        is_verified: seller?.is_verified,
      },
      p0: product?.price_before ? Number(product.price_before) : undefined,
      p1: product?.price_now ? Number(product.price_now) : undefined,
    },
    reason: reportRow.reason,
    description: reportRow.description ?? undefined,
    reporter: reportRow.reporter_email ? { id: '', email: reportRow.reporter_email } : undefined,
    status: reportRow.status,
    created_at: reportRow.created_at,
    resolved_at: reportRow.resolved_at ?? undefined,
    actions: (actions || []).map((a: any) => ({
      id: a.id,
      report_id: a.report_id,
      action: a.action,
      admin_name: a.admin_name,
      note: a.note ?? undefined,
      created_at: a.created_at,
    })),
  };
}

export function useAllReports(filters?: ReportFilters) {
  return useQuery({
    queryKey: ['admin-reports', filters],
    queryFn: async (): Promise<ProductReport[]> => {
      let query = supabase
        .from('reports')
        .select('*, products(id, title, images, status, price_before, price_now, sellers(id, nombre_comercial, email, zona, status, is_verified))')
        .order('created_at', { ascending: false });

      if (filters?.status && filters.status !== 'all') {
        query = query.eq('status', filters.status);
      }

      if (filters?.reason && filters.reason !== 'all') {
        query = query.eq('reason', filters.reason);
      }

      if (filters?.search) {
        // Search is complex with joins, do it client-side
      }

      const { data, error } = await query;
      if (error) throw error;

      let reports = await Promise.all((data || []).map(fetchReportWithDetails));

      // Client-side search filter
      if (filters?.search) {
        const searchLower = filters.search.toLowerCase();
        reports = reports.filter(
          r =>
            r.product.title.toLowerCase().includes(searchLower) ||
            r.product.seller.nombre_comercial.toLowerCase().includes(searchLower) ||
            r.reason.toLowerCase().includes(searchLower) ||
            r.reporter?.email?.toLowerCase().includes(searchLower)
        );
      }

      // Sort open first
      reports.sort((a, b) => {
        if (a.status === 'open' && b.status !== 'open') return -1;
        if (a.status !== 'open' && b.status === 'open') return 1;
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });

      return reports;
    },
  });
}

export function useReportCounts() {
  return useQuery({
    queryKey: ['admin-reports-counts'],
    queryFn: async () => {
      const { count: open } = await supabase
        .from('reports')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'open');

      const { count: resolved } = await supabase
        .from('reports')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'resolved');

      return { open: open || 0, resolved: resolved || 0, total: (open || 0) + (resolved || 0) };
    },
  });
}

export function useHideProductFromReport() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { admin } = useAdminAuth();

  return useMutation({
    mutationFn: async ({ reportId, note }: { reportId: string; note?: string }) => {
      // Get report to find product
      const { data: report } = await supabase
        .from('reports')
        .select('product_id')
        .eq('id', reportId)
        .single();

      if (report) {
        await supabase
          .from('products')
          .update({ status: 'disabled' })
          .eq('id', report.product_id);
      }

      await supabase.from('report_actions').insert({
        report_id: reportId,
        action: 'product_hidden',
        admin_id: admin!.id,
        admin_name: admin!.name,
        note: note || 'Producto ocultado por reporte',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-reports'] });
      queryClient.invalidateQueries({ queryKey: ['admin-reports-counts'] });
      toast({ title: 'Producto ocultado', description: 'El producto ha sido removido del catálogo público.' });
    },
    onError: () => {
      toast({ variant: 'destructive', title: 'Error', description: 'No se pudo ocultar el producto.' });
    },
  });
}

export function useRequestEvidenceToSeller() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { admin } = useAdminAuth();

  return useMutation({
    mutationFn: async ({ reportId, message }: { reportId: string; message: string }) => {
      await supabase.from('report_actions').insert({
        report_id: reportId,
        action: 'evidence_requested',
        admin_id: admin!.id,
        admin_name: admin!.name,
        note: message,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-reports'] });
      toast({ title: 'Solicitud enviada', description: 'Se ha solicitado evidencia al vendedor.' });
    },
    onError: () => {
      toast({ variant: 'destructive', title: 'Error', description: 'No se pudo enviar la solicitud.' });
    },
  });
}

export function usePenalizeSellerFromReport() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { admin } = useAdminAuth();

  return useMutation({
    mutationFn: async ({ reportId, penalty, note }: { reportId: string; penalty: PenaltyType; note: string }) => {
      const penaltyLabels: Record<PenaltyType, string> = {
        warning: 'Advertencia',
        suspend_7: 'Suspensión 7 días',
        suspend_30: 'Suspensión 30 días',
        suspend_indefinite: 'Suspensión indefinida',
      };

      // If not just a warning, suspend the seller
      if (penalty !== 'warning') {
        const { data: report } = await supabase
          .from('reports')
          .select('products(seller_id)')
          .eq('id', reportId)
          .single();

        if (report?.products) {
          const sellerId = (report.products as any).seller_id;
          await supabase
            .from('sellers')
            .update({ status: 'suspended' })
            .eq('id', sellerId);
        }
      }

      await supabase.from('report_actions').insert({
        report_id: reportId,
        action: 'seller_penalized',
        admin_id: admin!.id,
        admin_name: admin!.name,
        note: `${penaltyLabels[penalty]}: ${note}`,
      });
    },
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
      toast({ variant: 'destructive', title: 'Error', description: 'No se pudo aplicar la penalización.' });
    },
  });
}

export function useResolveReport() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { admin } = useAdminAuth();

  return useMutation({
    mutationFn: async ({ reportId, note }: { reportId: string; note?: string }) => {
      const { error } = await supabase
        .from('reports')
        .update({ status: 'resolved', resolved_at: new Date().toISOString() })
        .eq('id', reportId);

      if (error) throw error;

      await supabase.from('report_actions').insert({
        report_id: reportId,
        action: 'report_resolved',
        admin_id: admin!.id,
        admin_name: admin!.name,
        note: note || 'Reporte marcado como resuelto',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-reports'] });
      queryClient.invalidateQueries({ queryKey: ['admin-reports-counts'] });
      toast({ title: 'Reporte resuelto', description: 'El reporte ha sido cerrado correctamente.' });
    },
    onError: () => {
      toast({ variant: 'destructive', title: 'Error', description: 'No se pudo resolver el reporte.' });
    },
  });
}
