export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  price_before: number;
  price_now: number;
  discount_pct: number;
  stock_qty: number;
  location: string;
  images: string[];
  seller_id: string;
  status: 'draft' | 'pending' | 'approved' | 'rejected' | 'disabled';
  created_at: string;
  updated_at: string;
}

export interface CatalogFilters {
  search?: string;
  category?: string;
  min_discount?: number;
  location?: string;
  delivery_type?: 'pickup' | 'shipping' | 'both';
  sort_by?: 'discount_desc' | 'newest' | 'price_asc';
}

export type SortOption = {
  value: CatalogFilters['sort_by'];
  label: string;
};

export type DiscountOption = {
  value: number;
  label: string;
};
