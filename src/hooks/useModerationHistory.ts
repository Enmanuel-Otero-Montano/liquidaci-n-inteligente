import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ModerationHistory } from '@/types/moderation';

export function useModerationHistory(productId: string | undefined) {
  return useQuery({
    queryKey: ['moderation-history', productId],
    queryFn: async (): Promise<ModerationHistory[]> => {
      const { data, error } = await supabase
        .from('moderation_history')
        .select('*')
        .eq('product_id', productId!)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return (data || []).map(row => ({
        id: row.id,
        product_id: row.product_id,
        action: row.action as ModerationHistory['action'],
        reason: row.reason ?? undefined,
        admin_name: row.admin_name ?? undefined,
        created_at: row.created_at,
      }));
    },
    enabled: !!productId,
  });
}
