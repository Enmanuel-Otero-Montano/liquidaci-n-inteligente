import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardStats, ReservationWithProduct } from '@/types/dashboard';

export function useDashboardStats() {
  const { seller } = useAuth();

  return useQuery({
    queryKey: ['dashboard-stats', seller?.id],
    queryFn: async (): Promise<DashboardStats> => {
      // Fetch product counts by status
      const { data: products, error: prodErr } = await supabase
        .from('products')
        .select('status')
        .eq('seller_id', seller!.id);

      if (prodErr) throw prodErr;

      // Fetch reservation count
      const { count: reservationCount, error: resErr } = await supabase
        .from('reservations')
        .select('id', { count: 'exact', head: true })
        .eq('seller_id', seller!.id);

      if (resErr) throw resErr;

      const prods = products || [];
      return {
        totalProducts: prods.length,
        pendingProducts: prods.filter(p => p.status === 'pending').length,
        activeProducts: prods.filter(p => p.status === 'approved').length,
        totalReservations: reservationCount || 0,
      };
    },
    enabled: !!seller?.id,
    staleTime: 1000 * 60 * 5,
  });
}

export function useRecentReservations(limit: number = 10) {
  const { seller } = useAuth();

  return useQuery({
    queryKey: ['recent-reservations', seller?.id, limit],
    queryFn: async (): Promise<ReservationWithProduct[]> => {
      const { data, error } = await supabase
        .from('reservations')
        .select('id, product_id, buyer_name, buyer_contact, quantity, note, status, created_at, products(title)')
        .eq('seller_id', seller!.id)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;

      return (data || []).map(row => ({
        id: row.id,
        product_id: row.product_id,
        product_title: (row.products as any)?.title || '',
        buyer_name: row.buyer_name,
        buyer_contact: row.buyer_contact,
        quantity: row.quantity,
        note: row.note ?? undefined,
        status: row.status,
        created_at: row.created_at,
      }));
    },
    enabled: !!seller?.id,
    staleTime: 1000 * 60 * 2,
  });
}
