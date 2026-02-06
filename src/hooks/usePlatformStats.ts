import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function usePlatformStats() {
  return useQuery({
    queryKey: ['platform-stats'],
    queryFn: async () => {
      const [sellersRes, productsRes] = await Promise.all([
        supabase.from('sellers').select('id', { count: 'exact', head: true }).eq('status', 'active'),
        supabase.from('products').select('id', { count: 'exact', head: true }).eq('status', 'approved'),
      ]);

      return {
        sellers: sellersRes.count ?? 0,
        products: productsRes.count ?? 0,
      };
    },
    staleTime: 1000 * 60 * 30,
  });
}
