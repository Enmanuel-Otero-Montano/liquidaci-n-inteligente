import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  mockGetProductForEdit, 
  mockCreateProduct, 
  mockUpdateProduct 
} from '@/mocks/products';
import { Product } from '@/types/product';
import { useAuth } from '@/contexts/AuthContext';

export function useProductForEdit(productId?: string) {
  return useQuery({
    queryKey: ['product', 'edit', productId],
    queryFn: () => mockGetProductForEdit(productId!),
    enabled: !!productId,
    staleTime: 0, // Always fetch fresh data for editing
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: (data: {
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
      status: 'draft' | 'pending';
    }) => mockCreateProduct(data, user?.id || ''),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sellerProducts'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { 
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
        status: 'draft' | 'pending';
      }>;
    }) => mockUpdateProduct(id, data),
    onSuccess: (updatedProduct: Product) => {
      queryClient.invalidateQueries({ queryKey: ['sellerProducts'] });
      queryClient.invalidateQueries({ queryKey: ['product', 'edit', updatedProduct.id] });
      queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
    },
  });
}
