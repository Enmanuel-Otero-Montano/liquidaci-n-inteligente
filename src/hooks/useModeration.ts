import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ModerationFilters, ProductWithSeller } from '@/types/moderation';
import { Product } from '@/types/product';
import { useToast } from '@/hooks/use-toast';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

export function usePendingProducts(filters?: ModerationFilters) {
  return useQuery({
    queryKey: ['pending-products', filters],
    queryFn: async (): Promise<ProductWithSeller[]> => {
      let query = supabase
        .from('products')
        .select('*, sellers!inner(id, nombre_comercial, email, zona, created_at, seller_type)')
        .eq('status', 'pending')
        .order('created_at', { ascending: true });

      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,sellers.nombre_comercial.ilike.%${filters.search}%`);
      }

      if (filters?.dateRange === 'today') {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        query = query.gte('created_at', today.toISOString());
      } else if (filters?.dateRange === 'week') {
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        query = query.gte('created_at', weekAgo.toISOString());
      }

      if (filters?.sortBy === 'discount') {
        query = query.order('discount_pct', { ascending: false });
      }

      const { data, error } = await query;
      if (error) throw error;

      return (data || []).map(row => ({
        id: row.id,
        slug: row.slug,
        title: row.title,
        description: row.description,
        category: row.category,
        price_before: Number(row.price_before),
        price_now: Number(row.price_now),
        discount_pct: row.discount_pct,
        stock_qty: row.stock_qty,
        location: row.location,
        images: row.images || [],
        seller_id: row.seller_id,
        status: row.status,
        delivery_type: row.delivery_type,
        shipping_cost: row.shipping_cost ? Number(row.shipping_cost) : undefined,
        created_at: row.created_at,
        updated_at: row.updated_at,
        evidence_url: row.evidence_url ?? undefined,
        price_reference: row.price_reference ?? undefined,
        verification_status: (row as any).verification_status ?? 'unverified',
        verified_at: (row as any).verified_at ?? null,
        verified_by_admin_id: (row as any).verified_by_admin_id ?? null,
        liquidation_reason: row.liquidation_reason ?? undefined,
        pickup_address: row.pickup_address ?? undefined,
        pickup_hours: row.pickup_hours ?? undefined,
        offers_shipping: row.offers_shipping,
        seller: {
          id: (row.sellers as any).id,
          nombre_comercial: (row.sellers as any).nombre_comercial,
          email: (row.sellers as any).email,
          zona: (row.sellers as any).zona,
          created_at: (row.sellers as any).created_at,
          seller_type: (row.sellers as any).seller_type,
        },
      }));
    },
  });
}

export function useApproveProduct() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { admin } = useAdminAuth();

  return useMutation({
    mutationFn: async (productId: string) => {
      const { error } = await supabase
        .from('products')
        .update({ status: 'approved' })
        .eq('id', productId);

      if (error) throw error;

      // Log moderation action
      await supabase.from('moderation_history').insert({
        product_id: productId,
        action: 'approved',
        admin_id: admin?.id,
        admin_name: admin?.name || 'Admin',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-products'] });
      toast({ title: 'Producto aprobado', description: 'El producto ya está visible en el catálogo.' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'No se pudo aprobar el producto.', variant: 'destructive' });
    },
  });
}

export function useRejectProduct() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { admin } = useAdminAuth();

  return useMutation({
    mutationFn: async ({ productId, reason }: { productId: string; reason: string }) => {
      const { error } = await supabase
        .from('products')
        .update({ status: 'rejected' })
        .eq('id', productId);

      if (error) throw error;

      await supabase.from('moderation_history').insert({
        product_id: productId,
        action: 'rejected',
        reason,
        admin_id: admin?.id,
        admin_name: admin?.name || 'Admin',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-products'] });
      toast({ title: 'Producto rechazado', description: 'Se notificará al vendedor el motivo.' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'No se pudo rechazar el producto.', variant: 'destructive' });
    },
  });
}

export function useRequestChanges() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { admin } = useAdminAuth();

  return useMutation({
    mutationFn: async ({ productId, message }: { productId: string; message: string }) => {
      const { error } = await supabase
        .from('products')
        .update({ status: 'changes_requested' })
        .eq('id', productId);

      if (error) throw error;

      await supabase.from('moderation_history').insert({
        product_id: productId,
        action: 'changes_requested',
        reason: message,
        admin_id: admin?.id,
        admin_name: admin?.name || 'Admin',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-products'] });
      toast({ title: 'Cambios solicitados', description: 'El vendedor recibirá el mensaje con los cambios requeridos.' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'No se pudo enviar la solicitud de cambios.', variant: 'destructive' });
    },
  });
}
