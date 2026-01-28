import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DiscountCalculatorProps {
  priceBefore: number;
  priceNow: number;
}

export function DiscountCalculator({ priceBefore, priceNow }: DiscountCalculatorProps) {
  const isValid = priceBefore > 0 && priceNow > 0 && priceNow < priceBefore;
  const discountPct = isValid 
    ? Math.round(((priceBefore - priceNow) / priceBefore) * 100)
    : 0;
  const isValidDiscount = discountPct >= 25;

  if (!isValid) {
    return null;
  }

  return (
    <div className={cn(
      "flex items-center gap-3 p-4 rounded-lg border-2",
      isValidDiscount 
        ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-800" 
        : "bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800"
    )}>
      <Badge 
        className={cn(
          "text-2xl font-bold px-4 py-2",
          isValidDiscount 
            ? "bg-emerald-500 hover:bg-emerald-600" 
            : "bg-red-500 hover:bg-red-600"
        )}
      >
        {discountPct}% OFF
      </Badge>
      
      <div className="flex items-center gap-2">
        {isValidDiscount ? (
          <>
            <CheckCircle className="h-5 w-5 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
              ¡Descuento válido para publicar!
            </span>
          </>
        ) : (
          <>
            <AlertCircle className="h-5 w-5 text-red-600" />
            <span className="text-sm font-medium text-red-700 dark:text-red-400">
              El descuento mínimo es 25% para publicar
            </span>
          </>
        )}
      </div>
    </div>
  );
}
