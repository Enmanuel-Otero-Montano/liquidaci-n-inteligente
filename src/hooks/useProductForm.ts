import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Product, DeliveryType } from '@/types/product';
import { useAuth } from '@/contexts/AuthContext';
import { mapDbProduct } from './useProducts';

export function useProductForEdit(productId?: string) {
  return useQuery({
    queryKey: ['product', 'edit', productId],
    queryFn: async (): Promise<Product | null> => {
      const { data, error } = await supabase
        .from('products')
        .select('*, sellers(id, nombre_comercial, profile_image_url, zona, status)')
        .eq('id', productId!)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;

      return mapDbProduct(data);
    },
    enabled: !!productId,
    staleTime: 0,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  const { seller } = useAuth();

  return useMutation({
    mutationFn: async (data: {
      title: string;
      category: string;
      description: string;
      images: string[];
      liquidation_reason: string;
      stock_qty: number;
      price_before: number;
      price_now: number;
      discount_pct: number;
      pickup_address?: string;
      pickup_hours?: string;
      offers_shipping: boolean;
      shipping_cost?: number;
      evidence_url?: string;
      price_reference?: string;
      status: 'draft' | 'pending';
    }) => {
      if (!seller) throw new Error('No autenticado');

      // Determine delivery type
      let delivery_type: DeliveryType = 'pickup';
      if (data.offers_shipping && data.pickup_address) {
        delivery_type = 'both';
      } else if (data.offers_shipping) {
        delivery_type = 'shipping';
      }

      // Generate slug
      const { data: slug } = await supabase.rpc('generate_slug', { title: data.title });

      const { data: product, error } = await supabase
        .from('products')
        .insert({
          seller_id: seller.id,
          slug: slug || `product-${Date.now()}`,
          title: data.title,
          description: data.description,
          category: data.category,
          price_before: data.price_before,
          price_now: data.price_now,
          stock_qty: data.stock_qty,
          location: seller.zona,
          images: data.images,
          status: data.status,
          delivery_type,
          shipping_cost: data.offers_shipping ? data.shipping_cost : null,
          liquidation_reason: data.liquidation_reason as any,
          evidence_url: data.evidence_url || null,
          price_reference: data.price_reference || null,
          pickup_address: data.pickup_address || null,
          pickup_hours: data.pickup_hours || null,
          offers_shipping: data.offers_shipping,
          discount_pct: data.discount_pct,
        })
        .select()
        .single();

      if (error) throw error;
      return product;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seller-products'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: {
      id: string;
      data: Partial<{
        title: string;
        category: string;
        description: string;
        images: string[];
        liquidation_reason: string;
        stock_qty: number;
        price_before: number;
        price_now: number;
        pickup_address?: string;
        pickup_hours?: string;
        offers_shipping: boolean;
        shipping_cost?: number;
        evidence_url?: string;
        price_reference?: string;
        status: 'draft' | 'pending';
      }>;
    }) => {
      // Build update object
      const updateData: Record<string, any> = { ...data };

      // Determine delivery type if shipping info changed
      if (data.offers_shipping !== undefined) {
        if (data.offers_shipping && data.pickup_address) {
          updateData.delivery_type = 'both';
        } else if (data.offers_shipping) {
          updateData.delivery_type = 'shipping';
        } else {
          updateData.delivery_type = 'pickup';
        }
      }

      if (data.offers_shipping === false) {
        updateData.shipping_cost = null;
      }

      // Generate new slug if title changed
      if (data.title) {
        const { data: slug } = await supabase.rpc('generate_slug', { title: data.title });
        if (slug) updateData.slug = slug;
      }

      // Clean up fields that don't exist in DB
      delete updateData.offers_shipping; // handled via delivery_type
      
      const { data: product, error } = await supabase
        .from('products')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return mapDbProduct(product);
    },
    onSuccess: (updatedProduct: Product) => {
      queryClient.invalidateQueries({ queryKey: ['seller-products'] });
      queryClient.invalidateQueries({ queryKey: ['product', 'edit', updatedProduct.id] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
    },
  });
}
