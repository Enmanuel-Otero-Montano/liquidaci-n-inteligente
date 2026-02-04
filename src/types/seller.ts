import { z } from 'zod';

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
  profile_image?: string;  // URL o base64 de la imagen
}

export interface UpdateProfileInput {
  nombre_comercial: string;
  responsable: string;
  telefono: string;
  zona: string;
  direccion?: string;
  whatsapp_message?: string;
  politicas?: string;
  horario_retiro?: string;
  profile_image?: string | null;  // null para eliminar
}

export interface ChangePasswordInput {
  current_password: string;
  new_password: string;
}

// Schema de validación para el perfil
export const updateProfileSchema = z.object({
  nombre_comercial: z.string().min(3, 'Mínimo 3 caracteres'),
  responsable: z.string().min(2, 'Mínimo 2 caracteres'),
  telefono: z.string().min(8, 'Teléfono inválido'),
  zona: z.string().min(1, 'Seleccioná una zona'),
  direccion: z.string().optional(),
  whatsapp_message: z.string().optional(),
  politicas: z.string().optional(),
  horario_retiro: z.string().optional(),
  profile_image: z.string().nullable().optional(),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
