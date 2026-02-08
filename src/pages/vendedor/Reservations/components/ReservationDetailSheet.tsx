import { useState } from 'react';
import { formatDistanceToNow, format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MessageCircle, Mail, Phone, Calendar, Package, Save, Loader2 } from 'lucide-react';
import { Reservation, ReservationStatus, RESERVATION_STATUS_CONFIG } from '@/types/reservation';
import { ReservationStatusBadge } from './ReservationStatusBadge';

interface ReservationDetailSheetProps {
  reservation: Reservation | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusChange: (id: string, status: ReservationStatus) => void;
  onNotesChange: (id: string, notes: string) => void;
  isUpdating?: boolean;
}

export function ReservationDetailSheet({
  reservation,
  open,
  onOpenChange,
  onStatusChange,
  onNotesChange,
  isUpdating,
}: ReservationDetailSheetProps) {
  const [notes, setNotes] = useState(reservation?.seller_notes || '');
  const [hasChanges, setHasChanges] = useState(false);

  if (!reservation) return null;

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

  const handleNotesChange = (value: string) => {
    setNotes(value);
    setHasChanges(value !== (reservation.seller_notes || ''));
  };

  const handleSaveNotes = () => {
    onNotesChange(reservation.id, notes);
    setHasChanges(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Detalle de reserva</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Product info */}
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20 rounded-lg">
              <AvatarImage 
                src={reservation.product_image} 
                alt={reservation.product_title}
                className="object-cover"
              />
              <AvatarFallback className="rounded-lg text-lg">
                {reservation.product_title.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold line-clamp-2">{reservation.product_title}</h3>
              <p className="text-lg font-bold text-primary mt-1">
                ${reservation.product_price.toLocaleString('es-UY')}
              </p>
              <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                <Package className="h-4 w-4" />
                {reservation.quantity} {reservation.quantity === 1 ? 'unidad' : 'unidades'}
              </div>
            </div>
          </div>

          <Separator />

          {/* Buyer info */}
          <div className="space-y-3">
            <h4 className="font-medium">Datos del comprador</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-sm font-medium">
                    {buyer_name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{buyer_name}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                {buyer_contact_type === 'phone' ? (
                  <Phone className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Mail className="h-4 w-4 text-muted-foreground" />
                )}
                <span>{buyer_contact}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  {format(new Date(reservation.created_at), "d 'de' MMMM 'a las' HH:mm", { locale: es })}
                  {' '}
                  ({formatDistanceToNow(new Date(reservation.created_at), { addSuffix: true, locale: es })})
                </span>
              </div>
            </div>
          </div>

          {/* Buyer note */}
          {reservation.note && (
            <>
              <Separator />
              <div className="space-y-2">
                <h4 className="font-medium">Mensaje del comprador</h4>
                <p className="text-sm bg-muted/50 rounded-lg p-3">
                  "{reservation.note}"
                </p>
              </div>
            </>
          )}

          <Separator />

          {/* Status */}
          <div className="space-y-3">
            <h4 className="font-medium">Estado de la reserva</h4>
            <div className="flex items-center gap-3">
              <Select
                value={reservation.status}
                onValueChange={(value) => onStatusChange(reservation.id, value as ReservationStatus)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(RESERVATION_STATUS_CONFIG).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      {config.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* Seller notes */}
          <div className="space-y-3">
            <Label htmlFor="seller-notes">Notas internas</Label>
            <Textarea
              id="seller-notes"
              placeholder="Agregá notas sobre esta reserva (solo vos las ves)..."
              value={notes}
              onChange={(e) => handleNotesChange(e.target.value)}
              rows={3}
            />
            {hasChanges && (
              <Button 
                size="sm" 
                onClick={handleSaveNotes}
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Guardar notas
              </Button>
            )}
          </div>

          <Separator />

          {/* Contact action */}
          <div className="space-y-3">
            <h4 className="font-medium">Contactar</h4>
            {buyer_contact_type === 'phone' ? (
              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                asChild
              >
                <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Abrir WhatsApp
                </a>
              </Button>
            ) : (
              <Button
                className="w-full"
                asChild
              >
                <a href={getMailtoUrl()}>
                  <Mail className="h-4 w-4 mr-2" />
                  Enviar email
                </a>
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
