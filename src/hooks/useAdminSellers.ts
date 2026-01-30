import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { SellerFilters } from '@/types/adminSeller';
import {
  mockGetAllSellers,
  mockGetSellerActions,
  mockBlockSeller,
  mockUnblockSeller,
  mockVerifySeller,
  mockUnverifySeller,
} from '@/mocks/adminSellers';

export function useAllSellers(filters?: SellerFilters) {
  return useQuery({
    queryKey: ['admin-sellers', filters],
    queryFn: () => mockGetAllSellers(filters),
  });
}

export function useSellerActions(sellerId: string) {
  return useQuery({
    queryKey: ['seller-actions', sellerId],
    queryFn: () => mockGetSellerActions(sellerId),
    enabled: !!sellerId,
  });
}

export function useBlockSeller() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sellerId, reason }: { sellerId: string; reason: string }) =>
      mockBlockSeller(sellerId, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-sellers'] });
    },
  });
}

export function useUnblockSeller() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sellerId: string) => mockUnblockSeller(sellerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-sellers'] });
    },
  });
}

export function useVerifySeller() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sellerId, notes }: { sellerId: string; notes?: string }) =>
      mockVerifySeller(sellerId, notes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-sellers'] });
    },
  });
}

export function useUnverifySeller() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sellerId: string) => mockUnverifySeller(sellerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-sellers'] });
    },
  });
}
