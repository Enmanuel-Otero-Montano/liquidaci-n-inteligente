import { z } from 'zod';

export const LIQUIDATION_REASONS = [
  { value: 'fin_temporada', label: 'Fin de temporada' },
  { value: 'sobrestock', label: 'Sobrestock' },
  { value: 'ultimas_unidades', label: 'Últimas unidades' },
  { value: 'pack', label: 'Pack / Combo' },
  { value: 'otro', label: 'Otro motivo' },
] as const;

export type LiquidationReason = typeof LIQUIDATION_REASONS[number]['value'];

export const productFormSchema = z.object({
  title: z.string()
    .min(1, 'El título es requerido')
    .min(10, 'El título debe tener al menos 10 caracteres'),
  category: z.string()
    .min(1, 'Seleccioná una categoría'),
  description: z.string()
    .min(1, 'La descripción es requerida')
    .min(20, 'La descripción debe tener al menos 20 caracteres'),
  images: z.array(z.string())
    .min(1, 'Subí al menos 1 foto')
    .max(5, 'Máximo 5 fotos'),
  liquidation_reason: z.enum(['fin_temporada', 'sobrestock', 'ultimas_unidades', 'pack', 'otro'], {
    required_error: 'Seleccioná un motivo de liquidación',
  }),
  stock_qty: z.number({
    required_error: 'El stock es requerido',
    invalid_type_error: 'Ingresá un número válido',
  }).min(1, 'Mínimo 1 unidad'),
  price_before: z.number({
    required_error: 'El precio anterior es requerido',
    invalid_type_error: 'Ingresá un número válido',
  }).min(1, 'El precio debe ser mayor a 0'),
  price_now: z.number({
    required_error: 'El precio de liquidación es requerido',
    invalid_type_error: 'Ingresá un número válido',
  }).min(1, 'El precio debe ser mayor a 0'),
  pickup_address: z.string().optional(),
  use_seller_address: z.boolean().default(true),
  pickup_hours: z.string().optional(),
  offers_shipping: z.boolean().default(false),
  shipping_cost: z.number().optional(),
  evidence_url: z.string().url('Ingresá una URL válida').optional().or(z.literal('')),
}).refine(
  (data) => data.price_now < data.price_before,
  { message: 'El precio de liquidación debe ser menor al anterior', path: ['price_now'] }
);

export type ProductFormData = z.infer<typeof productFormSchema>;

export interface CreateProductInput {
  title: string;
  category: string;
  description: string;
  images: string[];
  liquidation_reason: LiquidationReason;
  stock_qty: number;
  price_before: number;
  price_now: number;
  pickup_address?: string;
  pickup_hours?: string;
  offers_shipping: boolean;
  shipping_cost?: number;
  evidence_url?: string;
  status: 'draft' | 'pending';
}

export interface UpdateProductInput extends Partial<CreateProductInput> {
  id: string;
}
