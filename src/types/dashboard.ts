export interface DashboardStats {
  totalProducts: number;
  pendingProducts: number;
  totalReservations: number;
  activeProducts: number;
}

export interface ReservationWithProduct {
  id: string;
  product_id: string;
  product_title: string;
  buyer_name: string;
  buyer_contact: string;
  quantity: number;
  note?: string;
  status: 'new' | 'contacted' | 'closed' | 'lost';
  created_at: string;
}
