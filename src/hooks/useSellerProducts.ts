import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { SellerProductFilters, Product } from '@/types/product';
import { mapDbProduct } from './useProducts';

export function useSellerProducts(filters?: SellerProductFilters) {
  const { seller } = useAuth();

  return useQuery({
    queryKey: ['seller-products', seller?.id, filters],
    queryFn: async (): Promise<Product[]> => {
      let query = supabase
        .from('products')
        .select('*, sellers(id, nombre_comercial, profile_image_url, zona, status)')
        .eq('seller_id', seller!.id);

      // Apply status filter
      if (filters?.status && filters.status !== 'all') {
        query = query.eq('status', filters.status);
      }

      // Apply search filter
      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,category.ilike.%${filters.search}%`);
      }

      // Apply sorting
      if (filters?.sortBy) {
        query = query.order(filters.sortBy, { ascending: filters.sortOrder !== 'desc' });
      } else {
        query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query;
      if (error) throw error;

      return (data || []).map(mapDbProduct);
    },
    enabled: !!seller?.id,
  });
}

export function useDuplicateProduct() {
  const queryClient = useQueryClient();
  const { seller } = useAuth();

  return useMutation({
    mutationFn: async (productId: string) => {
      // Fetch the product to duplicate
      const { data: original, error: fetchError } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();

      if (fetchError || !original) throw new Error('Producto no encontrado');

      // Generate a new slug
      const { data: newSlug } = await supabase.rpc('generate_slug', { title: original.title + ' Copia' });

      const { data, error } = await supabase
        .from('products')
        .insert({
          seller_id: seller!.id,
          slug: newSlug || `${original.slug}-copia-${Date.now()}`,
          title: `${original.title} (Copia)`,
          description: original.description,
          category: original.category,
          price_before: original.price_before,
          price_now: original.price_now,
          stock_qty: original.stock_qty,
          location: original.location,
          images: original.images,
          status: 'draft',
          delivery_type: original.delivery_type,
          shipping_cost: original.shipping_cost,
          liquidation_reason: original.liquidation_reason,
          evidence_url: original.evidence_url,
          pickup_address: original.pickup_address,
          pickup_hours: original.pickup_hours,
          offers_shipping: original.offers_shipping,
          quantity_promo: original.quantity_promo,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seller-products'] });
    },
  });
}

export function useToggleProductStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, newStatus }: { productId: string; newStatus: 'approved' | 'disabled' }) => {
      const { data, error } = await supabase
        .from('products')
        .update({ status: newStatus })
        .eq('id', productId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seller-products'] });
    },
  });
}
