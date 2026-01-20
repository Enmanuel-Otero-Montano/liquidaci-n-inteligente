import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Package, XCircle } from 'lucide-react';

interface StockBadgeProps {
  quantity: number;
}

export function StockBadge({ quantity }: StockBadgeProps) {
  if (quantity === 0) {
    return (
      <div className="flex items-center gap-2 text-destructive">
        <XCircle className="h-5 w-5" />
        <Badge variant="destructive" className="text-sm font-medium">
          Agotado
        </Badge>
      </div>
    );
  }

  if (quantity <= 3) {
    return (
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-warning" />
        <Badge 
          variant="outline" 
          className="border-warning text-warning bg-warning/10 text-sm font-medium"
        >
          ¡Últimas {quantity} unidades!
        </Badge>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <Package className="h-5 w-5" />
      <span className="text-sm">{quantity} disponibles</span>
    </div>
  );
}
