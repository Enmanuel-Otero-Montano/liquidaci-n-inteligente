export type ReservationStatus = 'new' | 'contacted' | 'closed' | 'lost';

export interface Reservation {
  id: string;
  product_id: string;
  product_title: string;
  product_image: string;
  product_price: number;
  buyer_name: string;
  buyer_contact: string;
  buyer_contact_type: 'email' | 'phone';
  quantity: number;
  note?: string;
  seller_notes?: string;
  status: ReservationStatus;
  created_at: string;
  updated_at: string;
}

export interface ReservationFilters {
  status?: ReservationStatus | 'all';
  search?: string;
  product_id?: string;
}

export const RESERVATION_STATUS_CONFIG = {
  new: { label: 'Nueva', variant: 'default' as const, className: 'bg-blue-500 hover:bg-blue-600 text-white' },
  contacted: { label: 'Contactado', variant: 'secondary' as const, className: 'bg-amber-500 hover:bg-amber-600 text-white' },
  closed: { label: 'Cerrada', variant: 'default' as const, className: 'bg-green-500 hover:bg-green-600 text-white' },
  lost: { label: 'No concretada', variant: 'destructive' as const, className: 'bg-red-500 hover:bg-red-600 text-white' },
} as const;
