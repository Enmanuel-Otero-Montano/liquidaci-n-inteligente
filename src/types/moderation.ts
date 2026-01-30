import { Product } from './product';

export interface ProductWithSeller extends Product {
  seller: {
    id: string;
    nombre_comercial: string;
    email: string;
    zona: string;
    created_at?: string;
  };
  evidence_url?: string;
  liquidation_reason?: string;
  pickup_address?: string;
  pickup_hours?: string;
  offers_shipping?: boolean;
  shipping_cost?: number;
}

export interface ModerationFilters {
  search?: string;
  dateRange?: 'all' | 'today' | 'week';
  sortBy?: 'date' | 'discount';
}

export type ModerationAction = 'approve' | 'reject' | 'request_changes';

export interface ModerationDecision {
  product_id: string;
  action: ModerationAction;
  reason?: string;
  admin_id: string;
  created_at: string;
}

export interface ModerationHistory {
  id: string;
  product_id: string;
  action: 'submitted' | 'approved' | 'rejected' | 'changes_requested';
  reason?: string;
  admin_name?: string;
  created_at: string;
}

export const REJECTION_REASONS = [
  { value: 'discount_not_verifiable', label: 'Descuento no verificable' },
  { value: 'low_quality_images', label: 'Imágenes de baja calidad' },
  { value: 'insufficient_description', label: 'Descripción insuficiente' },
  { value: 'suspicious_price', label: 'Precio sospechoso' },
  { value: 'other', label: 'Otro (especificar)' },
];

export const CHANGE_REQUEST_SUGGESTIONS = [
  { value: 'add_photos', label: 'Agregar más fotos' },
  { value: 'improve_description', label: 'Mejorar descripción' },
  { value: 'add_evidence', label: 'Adjuntar evidencia del precio original' },
  { value: 'fix_pickup_info', label: 'Corregir información de retiro' },
];
