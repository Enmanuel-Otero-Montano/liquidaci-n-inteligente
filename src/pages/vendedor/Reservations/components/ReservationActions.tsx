import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  MoreHorizontal, 
  MessageCircle, 
  Mail, 
  CheckCircle, 
  Phone, 
  XCircle,
  Eye,
  ArrowRight
} from 'lucide-react';
import { Reservation, ReservationStatus } from '@/types/reservation';

interface ReservationActionsProps {
  reservation: Reservation;
  onStatusChange: (status: ReservationStatus) => void;
  onViewDetails: () => void;
}

export function ReservationActions({ 
  reservation, 
  onStatusChange,
  onViewDetails 
}: ReservationActionsProps) {
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
    <div className="flex items-center gap-2">
      {/* Quick contact button */}
      {buyer_contact_type === 'phone' ? (
        <Button
          variant="outline"
          size="sm"
          className="hidden sm:flex gap-1 text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
          asChild
        >
          <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </Button>
      ) : (
        <Button
          variant="outline"
          size="sm"
          className="hidden sm:flex gap-1"
          asChild
        >
          <a href={getMailtoUrl()}>
            <Mail className="h-4 w-4" />
            Email
          </a>
        </Button>
      )}

      {/* Actions dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onViewDetails}>
            <Eye className="h-4 w-4 mr-2" />
            Ver detalle
          </DropdownMenuItem>
          
          {buyer_contact_type === 'phone' ? (
            <DropdownMenuItem asChild>
              <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4 mr-2" />
                Abrir WhatsApp
              </a>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem asChild>
              <a href={getMailtoUrl()}>
                <Mail className="h-4 w-4 mr-2" />
                Enviar email
              </a>
            </DropdownMenuItem>
          )}
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            onClick={() => onStatusChange('contacted')}
            disabled={reservation.status === 'contacted'}
          >
            <Phone className="h-4 w-4 mr-2" />
            Marcar como contactado
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            onClick={() => onStatusChange('closed')}
            disabled={reservation.status === 'closed'}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Marcar como cerrada
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            onClick={() => onStatusChange('lost')}
            disabled={reservation.status === 'lost'}
          >
            <XCircle className="h-4 w-4 mr-2" />
            Marcar como no concretada
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
