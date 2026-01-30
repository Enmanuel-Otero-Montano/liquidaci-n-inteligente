import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ModerationFilters } from '@/types/moderation';
import {
  mockGetPendingProducts,
  mockApproveProduct,
  mockRejectProduct,
  mockRequestChanges,
} from '@/mocks/moderation';
import { useToast } from '@/hooks/use-toast';

export function usePendingProducts(filters?: ModerationFilters) {
  return useQuery({
    queryKey: ['pending-products', filters],
    queryFn: () => mockGetPendingProducts(filters),
  });
}

export function useApproveProduct() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (productId: string) => mockApproveProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-products'] });
      toast({
        title: 'Producto aprobado',
        description: 'El producto ya está visible en el catálogo.',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'No se pudo aprobar el producto.',
        variant: 'destructive',
      });
    },
  });
}

export function useRejectProduct() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ productId, reason }: { productId: string; reason: string }) =>
      mockRejectProduct(productId, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-products'] });
      toast({
        title: 'Producto rechazado',
        description: 'Se notificará al vendedor el motivo.',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'No se pudo rechazar el producto.',
        variant: 'destructive',
      });
    },
  });
}

export function useRequestChanges() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ productId, message }: { productId: string; message: string }) =>
      mockRequestChanges(productId, message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-products'] });
      toast({
        title: 'Cambios solicitados',
        description: 'El vendedor recibirá el mensaje con los cambios requeridos.',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'No se pudo enviar la solicitud de cambios.',
        variant: 'destructive',
      });
    },
  });
}
