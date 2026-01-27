import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { 
  mockGetSellerProducts, 
  mockDuplicateProduct, 
  mockToggleProductStatus 
} from '@/mocks/products';
import { SellerProductFilters, Product } from '@/types/product';

export function useSellerProducts(filters?: SellerProductFilters) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['seller-products', user?.id, filters],
    queryFn: () => mockGetSellerProducts(user?.id || '', filters),
    enabled: !!user?.id,
  });
}

export function useDuplicateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => mockDuplicateProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seller-products'] });
    },
  });
}

export function useToggleProductStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, newStatus }: { productId: string; newStatus: 'approved' | 'disabled' }) =>
      mockToggleProductStatus(productId, newStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seller-products'] });
    },
  });
}
