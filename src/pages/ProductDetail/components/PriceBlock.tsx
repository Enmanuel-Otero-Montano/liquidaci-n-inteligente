import { Badge } from '@/components/ui/badge';

interface PriceBlockProps {
  priceBefore: number;
  priceNow: number;
  discountPct: number;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-UY', {
    style: 'currency',
    currency: 'UYU',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price).replace('UYU', '$');
}

export function PriceBlock({ priceBefore, priceNow, discountPct }: PriceBlockProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <Badge 
          variant="secondary" 
          className="bg-accent text-accent-foreground text-lg font-bold px-3 py-1"
        >
          -{discountPct}% OFF
        </Badge>
      </div>
      
      <div className="flex flex-col">
        <span className="text-muted-foreground line-through text-lg">
          Antes: {formatPrice(priceBefore)}
        </span>
        <span className="text-3xl md:text-4xl font-bold text-primary">
          Ahora: {formatPrice(priceNow)}
        </span>
      </div>
      
      <p className="text-sm text-muted-foreground">
        Ahorrás {formatPrice(priceBefore - priceNow)}
      </p>
    </div>
  );
}
