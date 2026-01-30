import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { TableRow, TableCell } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Reservation, ReservationStatus } from '@/types/reservation';
import { ReservationStatusBadge } from './ReservationStatusBadge';
import { ReservationActions } from './ReservationActions';
import { cn } from '@/lib/utils';

interface ReservationRowProps {
  reservation: Reservation;
  onStatusChange: (id: string, status: ReservationStatus) => void;
  onViewDetails: (reservation: Reservation) => void;
}

export function ReservationRow({ 
  reservation, 
  onStatusChange,
  onViewDetails 
}: ReservationRowProps) {
  const isNew = reservation.status === 'new';
  
  return (
    <TableRow className={cn(isNew && 'bg-blue-50/50 border-l-4 border-l-blue-500')}>
      <TableCell className="font-medium text-muted-foreground">
        <span className="text-sm">
          {formatDistanceToNow(new Date(reservation.created_at), {
            addSuffix: true,
            locale: es,
          })}
        </span>
      </TableCell>
      
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 rounded">
            <AvatarImage 
              src={reservation.product_image} 
              alt={reservation.product_title}
              className="object-cover"
            />
            <AvatarFallback className="rounded">
              {reservation.product_title.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="font-medium truncate max-w-[200px]">
              {reservation.product_title}
            </p>
            <p className="text-sm text-muted-foreground">
              ${reservation.product_price.toLocaleString('es-UY')}
            </p>
          </div>
        </div>
      </TableCell>
      
      <TableCell>
        <div>
          <p className="font-medium">{reservation.buyer_name}</p>
          <p className="text-sm text-muted-foreground">
            {reservation.buyer_contact}
          </p>
        </div>
      </TableCell>
      
      <TableCell className="text-center">
        <span className="font-medium">{reservation.quantity}</span>
      </TableCell>
      
      <TableCell>
        <ReservationStatusBadge status={reservation.status} />
      </TableCell>
      
      <TableCell>
        <ReservationActions
          reservation={reservation}
          onStatusChange={(status) => onStatusChange(reservation.id, status)}
          onViewDetails={() => onViewDetails(reservation)}
        />
      </TableCell>
    </TableRow>
  );
}
