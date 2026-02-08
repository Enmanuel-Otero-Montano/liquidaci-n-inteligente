import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageCircle, Mail, Eye } from 'lucide-react';
import { Reservation, ReservationStatus } from '@/types/reservation';
import { ReservationStatusBadge } from './ReservationStatusBadge';
import { cn } from '@/lib/utils';

interface ReservationCardProps {
  reservation: Reservation;
  onStatusChange: (id: string, status: ReservationStatus) => void;
  onViewDetails: (reservation: Reservation) => void;
}

export function ReservationCard({ 
  reservation, 
  onStatusChange,
  onViewDetails 
}: ReservationCardProps) {
  const isNew = reservation.status === 'new';
  const { buyer_contact, buyer_contact_type, buyer_name, product_title } = reservation;
  
  // Generate WhatsApp link with pre-filled message
  const getWhatsAppUrl = () => {
    const phone = buyer_contact.replace(/\D/g, '');
    const phoneWithCountry = phone.startsWith('598') ? phone : `598${phone}`;
    const message = `Hola ${buyer_name}! Vi tu reserva del producto "${product_title}" en LiquiOff. ¿Seguís interesado?`;
    return `https://wa.me/${phoneWithCountry}?text=${encodeURIComponent(message)}`;
  };
  
  // Generate mailto link
  const getMailtoUrl = () => {
    const subject = `Tu reserva en LiquiOff: ${product_title}`;
    const body = `Hola ${buyer_name},\n\nVi tu reserva del producto "${product_title}" en LiquiOff.\n\n¿Seguís interesado?\n\nSaludos`;
    return `mailto:${buyer_contact}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  
  return (
    <Card className={cn(
      'transition-all',
      isNew && 'border-l-4 border-l-blue-500 bg-blue-50/30'
    )}>
      <CardContent className="p-4 space-y-4">
        {/* Header: Product + Status */}
        <div className="flex items-start gap-3">
          <Avatar className="h-12 w-12 rounded">
            <AvatarImage 
              src={reservation.product_image} 
              alt={reservation.product_title}
              className="object-cover"
            />
            <AvatarFallback className="rounded">
              {reservation.product_title.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium line-clamp-2 text-sm">
              {reservation.product_title}
            </p>
            <p className="text-sm text-muted-foreground">
              ${reservation.product_price.toLocaleString('es-UY')}
            </p>
          </div>
          <ReservationStatusBadge status={reservation.status} />
        </div>
        
        {/* Buyer info */}
        <div className="flex items-center justify-between text-sm">
          <div>
            <p className="font-medium">{reservation.buyer_name}</p>
            <p className="text-muted-foreground">{reservation.buyer_contact}</p>
          </div>
          <div className="text-right">
            <p className="font-medium">{reservation.quantity} {reservation.quantity === 1 ? 'unidad' : 'unidades'}</p>
            <p className="text-muted-foreground">
              {formatDistanceToNow(new Date(reservation.created_at), {
                addSuffix: true,
                locale: es,
              })}
            </p>
          </div>
        </div>
        
        {/* Comment preview */}
        {reservation.note && (
          <p className="text-sm text-muted-foreground bg-muted/50 rounded p-2 line-clamp-2">
            "{reservation.note}"
          </p>
        )}
        
        {/* Actions */}
        <div className="flex gap-2">
          {buyer_contact_type === 'phone' ? (
            <Button
              variant="default"
              size="sm"
              className="flex-1 bg-green-600 hover:bg-green-700"
              asChild
            >
              <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
              </a>
            </Button>
          ) : (
            <Button
              variant="default"
              size="sm"
              className="flex-1"
              asChild
            >
              <a href={getMailtoUrl()}>
                <Mail className="h-4 w-4 mr-2" />
                Email
              </a>
            </Button>
          )}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(reservation)}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
