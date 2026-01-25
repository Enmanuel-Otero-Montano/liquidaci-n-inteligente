export type SellerStatus = 'active' | 'pending' | 'suspended';

export interface Seller {
  id: string;
  nombre_comercial: string;
  responsable?: string;
  email: string;
  telefono: string;
  zona: string;
  direccion?: string;
  politicas?: string;
  horario_retiro?: string;
  status?: SellerStatus;
  created_at?: string;
}
