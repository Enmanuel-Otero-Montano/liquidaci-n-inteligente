import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Product, CatalogFilters } from '@/types/product';
import { DEPARTAMENTOS_URUGUAY } from '@/data/constants';

function mapDbProduct(row: any): Product {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    category: row.category,
    price_before: Number(row.price_before),
    price_now: Number(row.price_now),
    discount_pct: row.discount_pct,
    stock_qty: row.stock_qty,
    location: row.location,
    images: row.images || [],
    seller_id: row.seller_id,
    seller: row.sellers ? {
      id: row.sellers.id,
      nombre_comercial: row.sellers.nombre_comercial,
      profile_image: row.sellers.profile_image_url,
      zona: row.sellers.zona,
      status: row.sellers.status,
    } : undefined,
    status: row.status,
    delivery_type: row.delivery_type,
    shipping_cost: row.shipping_cost ? Number(row.shipping_cost) : null,
    quantityPromo: row.quantity_promo as Product['quantityPromo'],
    created_at: row.created_at,
    updated_at: row.updated_at,
    evidence_url: row.evidence_url ?? null,
    price_reference: row.price_reference ?? null,
  };
}

async function fetchProducts(filters: CatalogFilters): Promise<Product[]> {
  let query = supabase
    .from('products')
    .select('*, sellers!inner(id, nombre_comercial, profile_image_url, zona, status)')
    .eq('status', 'approved');

  // Search filter
  if (filters.search) {
    query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
  }

  // Category filter
  if (filters.category) {
    query = query.ilike('category', filters.category);
  }

  // Minimum discount filter (default 20%)
  const minDiscount = filters.min_discount ?? 20;
  query = query.gte('discount_pct', minDiscount);

  // Location filter
  if (filters.location) {
    query = query.ilike('location', filters.location);
  }

  // Delivery type filter
  if (filters.delivery_type && filters.delivery_type !== 'all') {
    if (filters.delivery_type === 'shipping') {
      query = query.in('delivery_type', ['shipping', 'both']);
    } else if (filters.delivery_type === 'pickup') {
      query = query.eq('delivery_type', 'pickup');
    }
  }

  // Sorting
  switch (filters.sort_by) {
    case 'discount_desc':
      query = query.order('discount_pct', { ascending: false });
      break;
    case 'newest':
      query = query.order('created_at', { ascending: false });
      break;
    case 'price_asc':
      query = query.order('price_now', { ascending: true });
      break;
    default:
      query = query.order('discount_pct', { ascending: false });
  }

  const { data, error } = await query;
  if (error) throw error;

  return (data || []).map(mapDbProduct);
}

export function useProducts(filters: CatalogFilters) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => fetchProducts(filters),
    staleTime: 1000 * 60 * 5,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('category')
        .eq('status', 'approved');
      
      if (error) throw error;
      
      const uniqueCategories = [...new Set((data || []).map(p => p.category))];
      return uniqueCategories.map(cat => ({
        label: cat,
        slug: cat.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      }));
    },
    staleTime: 1000 * 60 * 60,
  });
}

export function useLocations() {
  return useQuery({
    queryKey: ['locations'],
    queryFn: async () => {
      return DEPARTAMENTOS_URUGUAY.map(dep => ({
        label: dep,
        slug: dep.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-'),
      }));
    },
    staleTime: 1000 * 60 * 60,
  });
}

export { mapDbProduct };
