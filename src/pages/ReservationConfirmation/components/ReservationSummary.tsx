import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface ReservationSummaryProps {
  product: {
    title: string;
    price_now: number;
    discount_pct: number;
    images: string[];
  };
  lead: {
    buyer_name: string;
    buyer_contact: string;
    quantity: number;
  };
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-UY', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function ReservationSummary({ product, lead }: ReservationSummaryProps) {
  return (
    <Card className="bg-muted/50">
      <CardContent className="p-4">
        {/* Product info */}
        <div className="flex gap-4 mb-4">
          <img
            src={product.images[0] || '/placeholder.svg'}
            alt={product.title}
            className="h-20 w-20 object-cover rounded-lg"
          />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm line-clamp-2 mb-1">{product.title}</p>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary">
                ${formatPrice(product.price_now)}
              </span>
              <Badge className="text-xs bg-accent text-accent-foreground">
                -{product.discount_pct}% OFF
              </Badge>
            </div>
          </div>
        </div>

        {/* Reservation details */}
        <div className="space-y-2 text-sm border-t border-border pt-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Cantidad:</span>
            <span className="font-medium">{lead.quantity} {lead.quantity === 1 ? 'unidad' : 'unidades'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Nombre:</span>
            <span className="font-medium">{lead.buyer_name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Contacto:</span>
            <span className="font-medium truncate ml-4">{lead.buyer_contact}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
