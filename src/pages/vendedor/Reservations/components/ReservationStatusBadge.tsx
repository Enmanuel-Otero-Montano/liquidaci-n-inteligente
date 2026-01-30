import { Badge } from '@/components/ui/badge';
import { ReservationStatus, RESERVATION_STATUS_CONFIG } from '@/types/reservation';
import { cn } from '@/lib/utils';

interface ReservationStatusBadgeProps {
  status: ReservationStatus;
}

export function ReservationStatusBadge({ status }: ReservationStatusBadgeProps) {
  const config = RESERVATION_STATUS_CONFIG[status];
  
  return (
    <Badge className={cn('font-medium', config.className)}>
      {config.label}
    </Badge>
  );
}
