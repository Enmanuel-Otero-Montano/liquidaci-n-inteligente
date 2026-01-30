import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  mockGetSellerReservations, 
  mockUpdateReservationStatus, 
  mockUpdateReservationNotes 
} from '@/mocks/reservations';
import { ReservationFilters, ReservationStatus } from '@/types/reservation';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

export function useSellerReservations(filters?: ReservationFilters) {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['seller-reservations', user?.id, filters],
    queryFn: () => mockGetSellerReservations(user?.id || '', filters),
    enabled: !!user?.id,
  });
}

export function useUpdateReservationStatus() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ reservationId, status }: { reservationId: string; status: ReservationStatus }) =>
      mockUpdateReservationStatus(reservationId, status),
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
    mutationFn: ({ reservationId, notes }: { reservationId: string; notes: string }) =>
      mockUpdateReservationNotes(reservationId, notes),
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
