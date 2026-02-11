import { z } from 'zod';
import { DISCOUNT_CONFIG } from '@/lib/constants/discounts';

export const LIQUIDATION_REASONS = [
  { value: 'fin_temporada', label: 'Fin de temporada' },
  { value: 'sobrestock', label: 'Sobrestock' },
  { value: 'ultimas_unidades', label: 'Últimas unidades' },
  { value: 'pack', label: 'Pack / Combo' },
  { value: 'otro', label: 'Otro motivo' },
] as const;

export type LiquidationReason = typeof LIQUIDATION_REASONS[number]['value'];

export const PROMO_QUANTITY_TYPES = [
  { value: 'none', label: 'Sin promoción por cantidad' },
  { value: '2x1', label: '2x1 (llevás 2, pagás 1)' },
  { value: '3x2', label: '3x2 (llevás 3, pagás 2)' },
  { value: 'pack_price', label: 'Precio especial por pack' },
  { value: 'quantity_discount', label: 'Descuento a partir de X unidades' },
] as const;

export type PromoQuantityType = typeof PROMO_QUANTITY_TYPES[number]['value'];

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
  })
    .int('El stock debe ser un número entero')
    .min(1, 'Mínimo 1 unidad')
    .max(9999, 'Máximo 9999 unidades')
    .default(1),
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
  price_reference: z.string().max(200, 'Máximo 200 caracteres').optional().or(z.literal('')),
  // Promoción por cantidad
  has_quantity_promo: z.boolean().default(false),
  quantity_promo_type: z.enum(['none', '2x1', '3x2', 'pack_price', 'quantity_discount']).default('none'),
  pack_quantity: z.number().min(2, 'Mínimo 2 unidades').optional(),
  pack_price: z.number().min(1, 'El precio debe ser mayor a 0').optional(),
  min_quantity_for_discount: z.number().min(2, 'Mínimo 2 unidades').optional(),
  quantity_discount_percent: z.number().min(DISCOUNT_CONFIG.MIN_DISCOUNT_PERCENT, `Mínimo ${DISCOUNT_CONFIG.MIN_DISCOUNT_PERCENT}%`).max(100, 'Máximo 100%').optional(),
}).refine(
  (data) => data.price_now < data.price_before,
  { message: 'El precio de liquidación debe ser menor al anterior', path: ['price_now'] }
).refine(
  (data) => {
    // Validar campos requeridos para pack_price
    if (data.has_quantity_promo && data.quantity_promo_type === 'pack_price') {
      return data.pack_quantity !== undefined && data.pack_price !== undefined;
    }
    return true;
  },
  { message: 'Completá la cantidad y el precio del pack', path: ['pack_price'] }
).refine(
  (data) => {
    // Validar campos requeridos para quantity_discount
    if (data.has_quantity_promo && data.quantity_promo_type === 'quantity_discount') {
      return data.min_quantity_for_discount !== undefined && data.quantity_discount_percent !== undefined;
    }
    return true;
  },
  { message: 'Completá la cantidad mínima y el porcentaje de descuento', path: ['quantity_discount_percent'] }
).refine(
  (data) => {
    // Validar que el descuento del pack sea >= mínimo configurado
    if (data.has_quantity_promo && data.quantity_promo_type === 'pack_price' && data.pack_quantity && data.pack_price && data.price_before) {
      const pricePerUnitInPack = data.pack_price / data.pack_quantity;
      const effectiveDiscount = ((data.price_before - pricePerUnitInPack) / data.price_before) * 100;
      return effectiveDiscount >= DISCOUNT_CONFIG.MIN_DISCOUNT_PERCENT;
    }
    return true;
  },
  { message: `El precio del pack debe representar al menos ${DISCOUNT_CONFIG.MIN_DISCOUNT_PERCENT}% de descuento`, path: ['pack_price'] }
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
  price_reference?: string;
  status: 'draft' | 'pending';
  // Promoción por cantidad
  has_quantity_promo?: boolean;
  quantity_promo_type?: PromoQuantityType;
  pack_quantity?: number;
  pack_price?: number;
  min_quantity_for_discount?: number;
  quantity_discount_percent?: number;
}

export interface UpdateProductInput extends Partial<CreateProductInput> {
  id: string;
}
