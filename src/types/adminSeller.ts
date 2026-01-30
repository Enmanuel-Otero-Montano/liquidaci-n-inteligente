import { Seller, SellerStatus } from './seller';

export interface SellerStats {
  total_products: number;
  approved_products: number;
  pending_products: number;
  rejected_products: number;
  total_reservations: number;
}

export interface SellerWithStats extends Seller {
  stats: SellerStats;
  is_verified: boolean;
  verified_at?: string;
  verified_by?: string;
}

export interface SellerFilters {
  search?: string;
  status?: SellerStatus | 'all';
  verified?: boolean | 'all';
  sortBy?: 'created_at' | 'nombre_comercial' | 'total_products';
  sortOrder?: 'asc' | 'desc';
}

export interface SellerAction {
  id: string;
  seller_id: string;
  action: 'blocked' | 'unblocked' | 'verified' | 'unverified';
  reason?: string;
  admin_name: string;
  created_at: string;
}

export const BLOCK_REASONS = [
  { value: 'fraudulent', label: 'Productos fraudulentos' },
  { value: 'non_compliance', label: 'Incumplimiento reiterado' },
  { value: 'seller_request', label: 'Solicitud del vendedor' },
  { value: 'other', label: 'Otro (especificar)' },
] as const;

export const STATUS_CONFIG = {
  pending: { label: 'Pendiente', variant: 'warning' as const },
  active: { label: 'Activo', variant: 'success' as const },
  suspended: { label: 'Suspendido', variant: 'destructive' as const },
} as const;
