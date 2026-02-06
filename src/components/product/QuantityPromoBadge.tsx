import { Badge } from '@/components/ui/badge';
import { Tag } from 'lucide-react';
import { QuantityPromoInfo } from '@/types/product';

interface QuantityPromoBadgeProps {
  promo: QuantityPromoInfo;
  size?: 'sm' | 'md';
}

/**
 * Badge que muestra la promoción por cantidad en las cards de producto
 * Usa color púrpura para diferenciarse del badge de % OFF (verde)
 */
export function QuantityPromoBadge({ promo, size = 'sm' }: QuantityPromoBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-sm px-2 py-1',
  };
  
  const iconClasses = {
    sm: 'h-3 w-3 mr-1',
    md: 'h-4 w-4 mr-1.5',
  };

  return (
    <Badge 
      variant="secondary" 
      className={`bg-purple-100 text-purple-700 border border-purple-300 font-medium ${sizeClasses[size]}`}
    >
      <Tag className={iconClasses[size]} />
      {promo.badgeText}
    </Badge>
  );
}
