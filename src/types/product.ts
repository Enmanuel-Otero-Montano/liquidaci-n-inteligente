import { PromoQuantityType } from './productForm';
import { Seller } from './seller';

export type ProductStatus = 'draft' | 'pending' | 'approved' | 'rejected' | 'disabled' | 'changes_requested';

export type DeliveryType = 'pickup' | 'shipping' | 'both';

export interface QuantityPromoInfo {
  type: PromoQuantityType;
  effectiveDiscountPercent: number;
  packQuantity?: number;
  packPrice?: number;
  pricePerUnitInPack?: number;
  minQuantity?: number;
  discountPercent?: number;
  displayText: string;
  badgeText: string;
}

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
  seller?: Pick<Seller, 'id' | 'nombre_comercial' | 'profile_image' | 'zona' | 'status'>;
  status: ProductStatus;
  delivery_type: DeliveryType;
  shipping_cost?: number | null;
  quantityPromo?: QuantityPromoInfo;
  rejection_reason?: string | null;
  evidence_url?: string | null;
  price_reference?: string | null;
  created_at: string;
  updated_at: string;
}

export interface CatalogFilters {
  search?: string;
  category?: string;
  min_discount?: number;
  location?: string;
  delivery_type?: 'pickup' | 'shipping' | 'both' | 'all';
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

export interface SellerProductFilters {
  status?: ProductStatus | 'all';
  search?: string;
  sortBy?: 'title' | 'discount_pct' | 'stock_qty' | 'created_at';
  sortOrder?: 'asc' | 'desc';
}
