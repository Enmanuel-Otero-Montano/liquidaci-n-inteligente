import { Tag, Info } from 'lucide-react';
import { QuantityPromoInfo } from '@/types/product';
import { QuantityPromoBadge } from './QuantityPromoBadge';

interface QuantityPromoDetailProps {
  promo: QuantityPromoInfo;
  priceNow: number;
}

/**
 * Sección destacada para mostrar promoción por cantidad en detalle de producto
 */
export function QuantityPromoDetail({ promo, priceNow }: QuantityPromoDetailProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-UY', {
      style: 'currency',
      currency: 'UYU',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Tag className="h-5 w-5 text-purple-600" />
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-purple-900">
              Promoción por cantidad
            </h3>
            <QuantityPromoBadge promo={promo} size="md" />
          </div>
          
          <p className="text-lg font-medium text-purple-800">
            {promo.displayText}
          </p>
          
          {/* Detalles adicionales según tipo */}
          {promo.type === 'pack_price' && promo.pricePerUnitInPack && (
            <p className="text-sm text-purple-700">
              Precio por unidad en pack: {formatPrice(promo.pricePerUnitInPack)}
            </p>
          )}
          
          {promo.type === '2x1' && (
            <p className="text-sm text-purple-700">
              Pagás: {formatPrice(priceNow)} × 1 = {formatPrice(priceNow)} por 2 unidades
            </p>
          )}
          
          {promo.type === '3x2' && (
            <p className="text-sm text-purple-700">
              Pagás: {formatPrice(priceNow)} × 2 = {formatPrice(priceNow * 2)} por 3 unidades
            </p>
          )}
          
          <div className="flex items-center gap-1.5 text-sm text-purple-600 mt-2 pt-2 border-t border-purple-200">
            <Info className="h-4 w-4" />
            Ahorro efectivo: {promo.effectiveDiscountPercent}% por unidad
          </div>
        </div>
      </div>
    </div>
  );
}
