/**
 * Configuración de descuentos de la plataforma
 */
export const DISCOUNT_CONFIG = {
  /** Descuento mínimo requerido para todas las publicaciones */
  MIN_DISCOUNT_PERCENT: 20,

  /** Mensaje de error cuando no se cumple el mínimo */
  MIN_DISCOUNT_ERROR: 'El descuento debe ser de al menos 20% sobre el precio original',

  /** Mensaje de ayuda para vendedores */
  MIN_DISCOUNT_HELP: 'Todos los productos deben tener mínimo 20% de descuento verificable',
} as const;
