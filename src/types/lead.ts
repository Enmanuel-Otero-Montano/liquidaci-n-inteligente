export interface Lead {
  id: string;
  product_id: string;
  buyer_name: string;
  buyer_contact: string;
  quantity: number;
  note?: string;
  status: 'new' | 'contacted' | 'closed' | 'lost';
  created_at: string;
}

export interface CreateLeadInput {
  product_id: string;
  buyer_name: string;
  buyer_contact: string;
  quantity: number;
  note?: string;
}
