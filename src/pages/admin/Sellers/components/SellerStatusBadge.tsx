import { Badge } from '@/components/ui/badge';
import { SellerStatus } from '@/types/seller';
import { cn } from '@/lib/utils';

interface SellerStatusBadgeProps {
  status: SellerStatus;
}

const STATUS_STYLES = {
  pending: { label: 'Pendiente', className: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  active: { label: 'Activo', className: 'bg-green-500/20 text-green-400 border-green-500/30' },
  suspended: { label: 'Suspendido', className: 'bg-red-500/20 text-red-400 border-red-500/30' },
} as const;

export function SellerStatusBadge({ status }: SellerStatusBadgeProps) {
  const config = STATUS_STYLES[status];

  return (
    <Badge className={cn('border', config.className)}>
      {config.label}
    </Badge>
  );
}
