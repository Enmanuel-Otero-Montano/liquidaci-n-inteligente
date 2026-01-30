import { Badge } from '@/components/ui/badge';
import { ProductStatus } from '@/types/product';
import { cn } from '@/lib/utils';

interface ProductStatusBadgeProps {
  status: ProductStatus;
}

const statusConfig: Record<ProductStatus, { label: string; className: string }> = {
  draft: { 
    label: 'Borrador', 
    className: 'bg-secondary text-secondary-foreground hover:bg-secondary/80' 
  },
  pending: { 
    label: 'Pendiente', 
    className: 'bg-warning text-warning-foreground hover:bg-warning/80' 
  },
  approved: { 
    label: 'Aprobado', 
    className: 'bg-primary text-primary-foreground hover:bg-primary/80' 
  },
  rejected: { 
    label: 'Rechazado', 
    className: 'bg-destructive text-destructive-foreground hover:bg-destructive/80' 
  },
  disabled: { 
    label: 'Desactivado', 
    className: 'border border-input bg-background text-muted-foreground' 
  },
  changes_requested: {
    label: 'Cambios requeridos',
    className: 'bg-amber-500/20 text-amber-700 border border-amber-500/30 hover:bg-amber-500/30'
  },
};

export function ProductStatusBadge({ status }: ProductStatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <Badge className={cn(config.className)}>
      {config.label}
    </Badge>
  );
}
