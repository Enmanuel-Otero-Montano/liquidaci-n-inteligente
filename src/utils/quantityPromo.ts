import { PromoQuantityType } from '@/types/productForm';
import { QuantityPromoInfo } from '@/types/product';

/**
 * Calcula la información de promoción por cantidad para display
 */
export function calculateQuantityPromoInfo(
  promoType: PromoQuantityType,
  pricePerUnit: number,
  packQuantity?: number,
  packPrice?: number,
  minQuantity?: number,
  discountPercent?: number
): QuantityPromoInfo | null {
  
  if (promoType === 'none') return null;
  
  switch (promoType) {
    case '2x1':
      return {
        type: '2x1',
        effectiveDiscountPercent: 50,
        displayText: 'Llevás 2, pagás 1',
        badgeText: '2x1',
      };
      
    case '3x2':
      return {
        type: '3x2',
        effectiveDiscountPercent: 33.33,
        displayText: 'Llevás 3, pagás 2',
        badgeText: '3x2',
      };
      
    case 'pack_price':
      if (!packQuantity || !packPrice) return null;
      const pricePerUnitInPack = packPrice / packQuantity;
      const effectiveDiscount = ((pricePerUnit - pricePerUnitInPack) / pricePerUnit) * 100;
      return {
        type: 'pack_price',
        effectiveDiscountPercent: Math.round(effectiveDiscount * 10) / 10,
        packQuantity,
        packPrice,
        pricePerUnitInPack,
        displayText: `${packQuantity} unidades por $${packPrice.toLocaleString('es-UY')}`,
        badgeText: `${packQuantity}x$${packPrice.toLocaleString('es-UY')}`,
      };
      
    case 'quantity_discount':
      if (!minQuantity || !discountPercent) return null;
      return {
        type: 'quantity_discount',
        effectiveDiscountPercent: discountPercent,
        minQuantity,
        discountPercent,
        displayText: `${discountPercent}% OFF comprando ${minQuantity}+ unidades`,
        badgeText: `${discountPercent}% x${minQuantity}+`,
      };
      
    default:
      return null;
  }
}

/**
 * Valida si un precio de pack cumple con el mínimo de descuento configurado
 */
export function validatePackDiscount(
  pricePerUnit: number,
  packQuantity: number,
  packPrice: number,
  minDiscountPercent: number = 20
): { isValid: boolean; actualDiscount: number } {
  const pricePerUnitInPack = packPrice / packQuantity;
  const actualDiscount = ((pricePerUnit - pricePerUnitInPack) / pricePerUnit) * 100;
  return {
    isValid: actualDiscount >= minDiscountPercent,
    actualDiscount: Math.round(actualDiscount * 10) / 10,
  };
}

/**
 * Formatea un precio en formato uruguayo
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-UY', {
    style: 'currency',
    currency: 'UYU',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
