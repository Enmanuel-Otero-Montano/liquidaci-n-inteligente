import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { SellerWithStats, SellerFilters, SellerAction } from '@/types/adminSeller';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

export function useAllSellers(filters?: SellerFilters) {
  return useQuery({
    queryKey: ['admin-sellers', filters],
    queryFn: async (): Promise<SellerWithStats[]> => {
      let query = supabase
        .from('sellers')
        .select('*');

      if (filters?.search) {
        query = query.or(
          `nombre_comercial.ilike.%${filters.search}%,email.ilike.%${filters.search}%,zona.ilike.%${filters.search}%,responsable.ilike.%${filters.search}%`
        );
      }

      if (filters?.status && filters.status !== 'all') {
        query = query.eq('status', filters.status);
      }

      if (filters?.verified !== undefined && filters.verified !== 'all') {
        query = query.eq('is_verified', filters.verified);
      }

      const sortBy = filters?.sortBy || 'created_at';
      const sortOrder = filters?.sortOrder || 'desc';
      query = query.order(sortBy === 'total_products' ? 'created_at' : sortBy, { ascending: sortOrder === 'asc' });

      const { data: sellers, error } = await query;
      if (error) throw error;

      // Fetch stats for each seller
      const sellersWithStats: SellerWithStats[] = await Promise.all(
        (sellers || []).map(async (seller) => {
          const { data: products } = await supabase
            .from('products')
            .select('status')
            .eq('seller_id', seller.id);

          const { count: reservationCount } = await supabase
            .from('reservations')
            .select('id', { count: 'exact', head: true })
            .eq('seller_id', seller.id);

          const prods = products || [];
          return {
            id: seller.id,
            nombre_comercial: seller.nombre_comercial,
            responsable: seller.responsable ?? undefined,
            email: seller.email,
            telefono: seller.telefono,
            zona: seller.zona,
            direccion: seller.direccion ?? undefined,
            politicas: seller.politicas ?? undefined,
            horario_retiro: seller.horario_retiro ?? undefined,
            whatsapp_message: seller.whatsapp_message ?? undefined,
            status: seller.status,
            created_at: seller.created_at,
            profile_image: seller.profile_image_url ?? undefined,
            stats: {
              total_products: prods.length,
              approved_products: prods.filter(p => p.status === 'approved').length,
              pending_products: prods.filter(p => p.status === 'pending').length,
              rejected_products: prods.filter(p => p.status === 'rejected').length,
              total_reservations: reservationCount || 0,
            },
            is_verified: seller.is_verified,
            verified_at: seller.verified_at ?? undefined,
            verified_by: seller.verified_by ?? undefined,
          };
        })
      );

      // Sort by total_products if requested
      if (filters?.sortBy === 'total_products') {
        sellersWithStats.sort((a, b) => {
          const diff = a.stats.total_products - b.stats.total_products;
          return sortOrder === 'asc' ? diff : -diff;
        });
      }

      return sellersWithStats;
    },
  });
}

export function useSellerActions(sellerId: string) {
  return useQuery({
    queryKey: ['seller-actions', sellerId],
    queryFn: async (): Promise<SellerAction[]> => {
      const { data, error } = await supabase
        .from('seller_actions')
        .select('*')
        .eq('seller_id', sellerId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return (data || []).map(a => ({
        id: a.id,
        seller_id: a.seller_id,
        action: a.action,
        reason: a.reason ?? undefined,
        admin_name: a.admin_name,
        created_at: a.created_at,
      }));
    },
    enabled: !!sellerId,
  });
}

export function useBlockSeller() {
  const queryClient = useQueryClient();
  const { admin } = useAdminAuth();

  return useMutation({
    mutationFn: async ({ sellerId, reason }: { sellerId: string; reason: string }) => {
      const { error } = await supabase
        .from('sellers')
        .update({ status: 'suspended' })
        .eq('id', sellerId);

      if (error) throw error;

      await supabase.from('seller_actions').insert({
        seller_id: sellerId,
        action: 'blocked',
        reason,
        admin_id: admin!.id,
        admin_name: admin!.name,
      });

      // Hide all seller's products
      await supabase
        .from('products')
        .update({ status: 'disabled' })
        .eq('seller_id', sellerId)
        .eq('status', 'approved');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-sellers'] });
    },
  });
}

export function useUnblockSeller() {
  const queryClient = useQueryClient();
  const { admin } = useAdminAuth();

  return useMutation({
    mutationFn: async (sellerId: string) => {
      const { error } = await supabase
        .from('sellers')
        .update({ status: 'active' })
        .eq('id', sellerId);

      if (error) throw error;

      await supabase.from('seller_actions').insert({
        seller_id: sellerId,
        action: 'unblocked',
        admin_id: admin!.id,
        admin_name: admin!.name,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-sellers'] });
    },
  });
}

export function useVerifySeller() {
  const queryClient = useQueryClient();
  const { admin } = useAdminAuth();

  return useMutation({
    mutationFn: async ({ sellerId, notes }: { sellerId: string; notes?: string }) => {
      const { error } = await supabase
        .from('sellers')
        .update({
          is_verified: true,
          verified_at: new Date().toISOString(),
          verified_by: admin!.id,
        })
        .eq('id', sellerId);

      if (error) throw error;

      await supabase.from('seller_actions').insert({
        seller_id: sellerId,
        action: 'verified',
        reason: notes,
        admin_id: admin!.id,
        admin_name: admin!.name,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-sellers'] });
    },
  });
}

export function useUnverifySeller() {
  const queryClient = useQueryClient();
  const { admin } = useAdminAuth();

  return useMutation({
    mutationFn: async (sellerId: string) => {
      const { error } = await supabase
        .from('sellers')
        .update({
          is_verified: false,
          verified_at: null,
          verified_by: null,
        })
        .eq('id', sellerId);

      if (error) throw error;

      await supabase.from('seller_actions').insert({
        seller_id: sellerId,
        action: 'unverified',
        admin_id: admin!.id,
        admin_name: admin!.name,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-sellers'] });
    },
  });
}
