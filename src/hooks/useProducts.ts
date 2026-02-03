import { useQuery } from '@tanstack/react-query';
import { Product, CatalogFilters } from '@/types/product';
import { mockProducts } from '@/mocks/products';
import { DEPARTAMENTOS_URUGUAY } from '@/data/constants';

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchProducts(filters: CatalogFilters): Promise<Product[]> {
  // Simulate network delay
  await delay(800);

  let filteredProducts = mockProducts.filter(p => p.status === 'approved');

  // Search filter
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filteredProducts = filteredProducts.filter(p =>
      p.title.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower)
    );
  }

  // Category filter
  if (filters.category) {
    filteredProducts = filteredProducts.filter(p =>
      p.category.toLowerCase() === filters.category?.toLowerCase()
    );
  }

  // Minimum discount filter (default 25%)
  const minDiscount = filters.min_discount ?? 25;
  filteredProducts = filteredProducts.filter(p => p.discount_pct >= minDiscount);

  // Location filter
  if (filters.location) {
    filteredProducts = filteredProducts.filter(p =>
      p.location.toLowerCase() === filters.location?.toLowerCase()
    );
  }

  // Sorting
  switch (filters.sort_by) {
    case 'discount_desc':
      filteredProducts.sort((a, b) => b.discount_pct - a.discount_pct);
      break;
    case 'newest':
      filteredProducts.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      break;
    case 'price_asc':
      filteredProducts.sort((a, b) => a.price_now - b.price_now);
      break;
    default:
      // Default: sort by discount descending
      filteredProducts.sort((a, b) => b.discount_pct - a.discount_pct);
  }

  return filteredProducts;
}

export function useProducts(filters: CatalogFilters) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => fetchProducts(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      await delay(200);
      const uniqueCategories = [...new Set(mockProducts.map(p => p.category))];
      return uniqueCategories.map(cat => ({
        label: cat,
        slug: cat.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      }));
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function useLocations() {
  return useQuery({
    queryKey: ['locations'],
    queryFn: async () => {
      await delay(200);
      return DEPARTAMENTOS_URUGUAY.map(dep => ({
        label: dep,
        slug: dep.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-'),
      }));
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}
