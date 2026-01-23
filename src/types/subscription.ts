export interface Subscriber {
  id: string;
  nombre: string;
  metodoContacto: 'email' | 'whatsapp';
  contacto: string;
  categorias: string[];
  zona: string;
  frecuencia: string;
  created_at: string;
}

export interface SubscriptionFormData {
  nombre: string;
  metodoContacto: 'email' | 'whatsapp';
  email?: string;
  whatsapp?: string;
  categorias: string[];
  zona: string;
  frecuencia: string;
}
