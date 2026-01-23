export type ReportReason = 
  | 'descuento_enganoso'
  | 'producto_no_coincide'
  | 'stock_inexistente'
  | 'otro';

export type ReportStatus = 'open' | 'reviewing' | 'resolved' | 'dismissed';

export interface Report {
  id: string;
  product_id: string;
  reason: ReportReason;
  comment?: string;
  reporter_email?: string;
  status: ReportStatus;
  created_at: string;
}

export interface CreateReportInput {
  product_id: string;
  reason: ReportReason;
  comment?: string;
  email?: string;
}
