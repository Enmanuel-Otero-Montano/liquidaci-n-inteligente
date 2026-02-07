export type ReportStatus = 'open' | 'resolved';

export type ReportReason =
  | 'descuento_enganoso'
  | 'producto_no_coincide'
  | 'stock_inexistente'
  | 'otro';

export const reasonConfig: Record<ReportReason, { label: string }> = {
  descuento_enganoso: { label: 'Descuento engañoso' },
  producto_no_coincide: { label: 'Producto no coincide' },
  stock_inexistente: { label: 'Stock inexistente' },
  otro: { label: 'Otro' },
};

export type PenaltyType = 'warning' | 'suspend_7' | 'suspend_30' | 'suspend_indefinite';

export const penaltyConfig: Record<PenaltyType, { label: string; description: string }> = {
  warning: { label: 'Advertencia', description: 'Se notifica al vendedor sin suspensión' },
  suspend_7: { label: 'Suspensión 7 días', description: 'Cuenta suspendida por 7 días' },
  suspend_30: { label: 'Suspensión 30 días', description: 'Cuenta suspendida por 30 días' },
  suspend_indefinite: { label: 'Suspensión indefinida', description: 'Cuenta suspendida hasta revisión manual' },
};

export interface ReportUser {
  id: string;
  name?: string;
  email?: string;
}

export interface ReportSeller {
  id: string;
  nombre_comercial: string;
  email: string;
  zona: string;
  status: 'pending' | 'active' | 'suspended';
  is_verified?: boolean;
}

export interface ReportProductLite {
  id: string;
  title: string;
  image_url?: string;
  status: 'draft' | 'pending' | 'approved' | 'rejected' | 'disabled' | 'changes_requested';
  seller: ReportSeller;
  p0?: number;
  p1?: number;
}

export type ReportActionType =
  | 'report_created'
  | 'product_hidden'
  | 'evidence_requested'
  | 'seller_penalized'
  | 'report_resolved';

export interface ReportAction {
  id: string;
  report_id: string;
  action: ReportActionType;
  admin_name: string;
  note?: string;
  created_at: string;
}

export interface ProductReport {
  id: string;
  product: ReportProductLite;
  reason: ReportReason;
  description?: string;
  reporter?: ReportUser;
  status: ReportStatus;
  created_at: string;
  resolved_at?: string;
  actions: ReportAction[];
}

export interface ReportFilters {
  search?: string;
  status?: ReportStatus | 'all';
  reason?: ReportReason | 'all';
  sortBy?: 'created_at' | 'status' | 'reason';
  sortOrder?: 'asc' | 'desc';
}
