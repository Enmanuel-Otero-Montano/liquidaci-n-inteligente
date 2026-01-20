import { useQuery } from '@tanstack/react-query';
import { Product } from '@/types/product';
import { Seller } from '@/types/seller';
import { mockProducts } from '@/mocks/products';
import { mockSellers } from '@/mocks/sellers';

const getProductBySlug = async (slug: string): Promise<Product | null> => {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const product = mockProducts.find(p => p.slug === slug && p.status === 'approved');
  return product || null;
};

const getSellerById = async (sellerId: string): Promise<Seller | null> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const seller = mockSellers.find(s => s.id === sellerId);
  return seller || null;
};

export function useProduct(slug: string | undefined) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => getProductBySlug(slug!),
    enabled: !!slug,
  });
}

export function useSeller(sellerId: string | undefined) {
  return useQuery({
    queryKey: ['seller', sellerId],
    queryFn: () => getSellerById(sellerId!),
    enabled: !!sellerId,
  });
}
