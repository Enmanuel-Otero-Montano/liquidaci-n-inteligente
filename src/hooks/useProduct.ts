import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types/product';
import { Seller } from '@/types/seller';
import { mapDbProduct } from './useProducts';

export function useProduct(slug: string | undefined) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: async (): Promise<Product | null> => {
      const { data, error } = await supabase
        .from('products')
        .select('*, sellers!inner(id, nombre_comercial, profile_image_url, zona, status)')
        .eq('slug', slug!)
        .eq('status', 'approved')
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;

      return mapDbProduct(data);
    },
    enabled: !!slug,
  });
}

export function useSeller(sellerId: string | undefined) {
  return useQuery({
    queryKey: ['seller', sellerId],
    queryFn: async (): Promise<Seller | null> => {
      const { data, error } = await supabase
        .from('sellers')
        .select('*')
        .eq('id', sellerId!)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;

      return {
        id: data.id,
        nombre_comercial: data.nombre_comercial,
        responsable: data.responsable ?? undefined,
        email: data.email,
        telefono: data.telefono,
        zona: data.zona,
        direccion: data.direccion ?? undefined,
        politicas: data.politicas ?? undefined,
        horario_retiro: data.horario_retiro ?? undefined,
        whatsapp_message: data.whatsapp_message ?? undefined,
        status: data.status,
        created_at: data.created_at,
        profile_image: data.profile_image_url ?? undefined,
      };
    },
    enabled: !!sellerId,
  });
}
