import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Reservation, ReservationStatus } from '@/types/reservation';
import { ReservationRow } from './ReservationRow';
import { ReservationCard } from './ReservationCard';
import { useIsMobile } from '@/hooks/use-mobile';

interface ReservationsTableProps {
  reservations: Reservation[];
  onStatusChange: (id: string, status: ReservationStatus) => void;
  onViewDetails: (reservation: Reservation) => void;
}

export function ReservationsTable({ 
  reservations, 
  onStatusChange,
  onViewDetails 
}: ReservationsTableProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="space-y-3">
        {reservations.map((reservation) => (
          <ReservationCard
            key={reservation.id}
            reservation={reservation}
            onStatusChange={onStatusChange}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Fecha</TableHead>
            <TableHead>Producto</TableHead>
            <TableHead>Comprador</TableHead>
            <TableHead className="text-center w-[80px]">Cant.</TableHead>
            <TableHead className="w-[130px]">Estado</TableHead>
            <TableHead className="w-[150px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations.map((reservation) => (
            <ReservationRow
              key={reservation.id}
              reservation={reservation}
              onStatusChange={onStatusChange}
              onViewDetails={onViewDetails}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
