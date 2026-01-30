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
  whatsapp_message?: string;
  status?: SellerStatus;
  created_at?: string;
  password_changed_at?: string;
}

export interface UpdateProfileInput {
  nombre_comercial: string;
  responsable: string;
  telefono: string;
  zona: string;
  direccion?: string;
  whatsapp_message?: string;
  politicas?: string;
}

export interface ChangePasswordInput {
  current_password: string;
  new_password: string;
}
