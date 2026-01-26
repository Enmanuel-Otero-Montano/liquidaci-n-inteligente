import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { ArrowRight, ClipboardList } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ReservationWithProduct } from '@/types/dashboard';

interface RecentReservationsProps {
  reservations?: ReservationWithProduct[];
  isLoading: boolean;
}

const statusConfig = {
  new: { label: 'Nueva', variant: 'default' as const },
  contacted: { label: 'Contactado', variant: 'secondary' as const },
  closed: { label: 'Cerrada', variant: 'outline' as const },
  lost: { label: 'Perdida', variant: 'destructive' as const },
};

export function RecentReservations({ reservations, isLoading }: RecentReservationsProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5" />
            Reservas recientes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-6 w-20" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!reservations || reservations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5" />
            Reservas recientes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <ClipboardList className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Aún no tenés reservas</p>
            <p className="text-sm">Las reservas aparecerán aquí cuando los compradores se interesen en tus productos</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5" />
          Reservas recientes
        </CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/vendedor/reservas" className="flex items-center gap-1">
            Ver todas
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {reservations.map((reservation) => {
            const status = statusConfig[reservation.status];
            return (
              <div 
                key={reservation.id} 
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-medium truncate">{reservation.product_title}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <span>{reservation.buyer_name}</span>
                    <span>•</span>
                    <span>Cant: {reservation.quantity}</span>
                    <span>•</span>
                    <span>
                      {formatDistanceToNow(new Date(reservation.created_at), { 
                        addSuffix: true, 
                        locale: es 
                      })}
                    </span>
                  </div>
                </div>
                <Badge variant={status.variant} className="ml-4 shrink-0">
                  {status.label}
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
