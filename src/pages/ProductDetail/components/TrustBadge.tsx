import { CheckCircle, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function TrustBadge() {
  return (
    <div className="flex flex-col gap-2">
      <Badge 
        variant="outline" 
        className="w-fit border-primary text-primary bg-primary/5 gap-2 py-1.5 px-3"
      >
        <CheckCircle className="h-4 w-4" />
        Liquidación declarada
      </Badge>
      
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <ShieldCheck className="h-4 w-4" />
        <span>Descuento verificado ≥25% OFF</span>
      </div>
    </div>
  );
}
