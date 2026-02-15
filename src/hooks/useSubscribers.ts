import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Subscriber {
  id: string;
  nombre: string;
  metodo_contacto: 'email' | 'whatsapp';
  contacto: string;
  categorias: string[];
  zona: string;
  frecuencia: string;
  created_at: string;
}

export interface SubscriberFilters {
  search?: string;
  metodo_contacto?: 'all' | 'email' | 'whatsapp';
  categoria?: string;
  zona?: string;
}

export function useSubscribers(filters: SubscriberFilters = {}) {
  return useQuery({
    queryKey: ['subscribers', filters],
    queryFn: async () => {
      let query = supabase
        .from('subscribers')
        .select('*')
        .order('created_at', { ascending: false });

      if (filters.search) {
        query = query.or(`nombre.ilike.%${filters.search}%,contacto.ilike.%${filters.search}%`);
      }

      if (filters.metodo_contacto && filters.metodo_contacto !== 'all') {
        query = query.eq('metodo_contacto', filters.metodo_contacto);
      }

      if (filters.categoria) {
        query = query.contains('categorias', [filters.categoria]);
      }

      if (filters.zona) {
        query = query.eq('zona', filters.zona);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Subscriber[];
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useSubscriberStats() {
  return useQuery({
    queryKey: ['subscriber-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subscribers')
        .select('metodo_contacto, categorias, zona');

      if (error) throw error;

      const total = data.length;
      const porEmail = data.filter(s => s.metodo_contacto === 'email').length;
      const porWhatsApp = data.filter(s => s.metodo_contacto === 'whatsapp').length;

      const categoryCounts: Record<string, number> = {};
      data.forEach(sub => {
        (sub.categorias as string[]).forEach((cat: string) => {
          categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
        });
      });

      const zoneCounts: Record<string, number> = {};
      data.forEach(sub => {
        if (sub.zona) {
          zoneCounts[sub.zona] = (zoneCounts[sub.zona] || 0) + 1;
        }
      });

      return {
        total,
        porEmail,
        porWhatsApp,
        categoryCounts,
        zoneCounts,
        topCategoria: Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A',
        topZona: Object.entries(zoneCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A',
      };
    },
    staleTime: 1000 * 60 * 10,
  });
}

export function useMatchingSubscribers(productCategory?: string) {
  return useQuery({
    queryKey: ['matching-subscribers', productCategory],
    queryFn: async () => {
      if (!productCategory) return [];

      const { data, error } = await supabase
        .from('subscribers')
        .select('*')
        .contains('categorias', [productCategory]);

      if (error) throw error;
      return data as Subscriber[];
    },
    enabled: !!productCategory,
    staleTime: 1000 * 60 * 5,
  });
}

export function useDeleteSubscriber() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (subscriberId: string) => {
      const { error } = await supabase
        .from('subscribers')
        .delete()
        .eq('id', subscriberId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscribers'] });
      queryClient.invalidateQueries({ queryKey: ['subscriber-stats'] });
      toast({
        title: 'Suscriptor eliminado',
        description: 'El suscriptor fue removido de la lista.',
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo eliminar el suscriptor.',
      });
    },
  });
}
