import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Reservation, ReservationFilters, ReservationStatus } from '@/types/reservation';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

function mapDbReservation(row: any): Reservation {
  return {
    id: row.id,
    product_id: row.product_id,
    product_title: row.products?.title || '',
    product_image: row.products?.images?.[0] || '',
    product_price: Number(row.products?.price_now || 0),
    buyer_name: row.buyer_name,
    buyer_contact: row.buyer_contact,
    buyer_contact_type: row.buyer_contact_type as 'email' | 'phone',
    quantity: row.quantity,
    note: row.note ?? undefined,
    seller_notes: row.seller_notes ?? undefined,
    status: row.status,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

export function useSellerReservations(filters?: ReservationFilters) {
  const { seller } = useAuth();

  return useQuery({
    queryKey: ['seller-reservations', seller?.id, filters],
    queryFn: async (): Promise<Reservation[]> => {
      let query = supabase
        .from('reservations')
        .select('*, products(title, images, price_now)')
        .eq('seller_id', seller!.id)
        .order('created_at', { ascending: false });

      if (filters?.status && filters.status !== 'all') {
        query = query.eq('status', filters.status);
      }

      if (filters?.product_id && filters.product_id !== 'all') {
        query = query.eq('product_id', filters.product_id);
      }

      if (filters?.search) {
        query = query.or(`buyer_name.ilike.%${filters.search}%,products.title.ilike.%${filters.search}%`);
      }

      const { data, error } = await query;
      if (error) throw error;

      return (data || []).map(mapDbReservation);
    },
    enabled: !!seller?.id,
  });
}

export function useUpdateReservationStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ reservationId, status }: { reservationId: string; status: ReservationStatus }) => {
      const { data, error } = await supabase
        .from('reservations')
        .update({ status })
        .eq('id', reservationId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, { status }) => {
      queryClient.invalidateQueries({ queryKey: ['seller-reservations'] });

      const statusLabels: Record<ReservationStatus, string> = {
        new: 'Nueva',
        contacted: 'Contactado',
        closed: 'Cerrada',
        lost: 'No concretada',
      };

      toast({
        title: 'Estado actualizado',
        description: `La reserva ahora está marcada como "${statusLabels[status]}"`,
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'No se pudo actualizar el estado de la reserva',
        variant: 'destructive',
      });
    },
  });
}

export function useUpdateReservationNotes() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ reservationId, notes }: { reservationId: string; notes: string }) => {
      const { data, error } = await supabase
        .from('reservations')
        .update({ seller_notes: notes })
        .eq('id', reservationId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seller-reservations'] });
      toast({
        title: 'Notas guardadas',
        description: 'Las notas se guardaron correctamente',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'No se pudieron guardar las notas',
        variant: 'destructive',
      });
    },
  });
}
