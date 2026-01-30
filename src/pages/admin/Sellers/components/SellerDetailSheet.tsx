import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Package,
  CheckCircle,
  Clock,
  XCircle,
  ShoppingCart,
  BadgeCheck,
  Ban,
  Unlock,
} from 'lucide-react';
import { SellerWithStats, SellerAction } from '@/types/adminSeller';
import { SellerStatusBadge } from './SellerStatusBadge';
import { useSellerActions } from '@/hooks/useAdminSellers';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface SellerDetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  seller: SellerWithStats | null;
  onBlock: () => void;
  onUnblock: () => void;
  onVerify: () => void;
  onUnverify: () => void;
}

export function SellerDetailSheet({
  open,
  onOpenChange,
  seller,
  onBlock,
  onUnblock,
  onVerify,
  onUnverify,
}: SellerDetailSheetProps) {
  const { data: actions = [] } = useSellerActions(seller?.id || '');

  if (!seller) return null;

  const initials = seller.nombre_comercial
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return format(new Date(dateString), "d 'de' MMMM, yyyy", { locale: es });
  };

  const getActionIcon = (action: SellerAction['action']) => {
    switch (action) {
      case 'verified':
        return <BadgeCheck className="h-4 w-4 text-green-400" />;
      case 'unverified':
        return <XCircle className="h-4 w-4 text-slate-400" />;
      case 'blocked':
        return <Ban className="h-4 w-4 text-red-400" />;
      case 'unblocked':
        return <Unlock className="h-4 w-4 text-green-400" />;
    }
  };

  const getActionLabel = (action: SellerAction['action']) => {
    switch (action) {
      case 'verified':
        return 'Verificado';
      case 'unverified':
        return 'Verificación removida';
      case 'blocked':
        return 'Bloqueado';
      case 'unblocked':
        return 'Desbloqueado';
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg bg-slate-900 border-slate-700 text-slate-100 p-0">
        <SheetHeader className="p-6 pb-0">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16 border-2 border-slate-700">
              <AvatarFallback className="bg-slate-800 text-slate-200 text-xl">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <SheetTitle className="text-slate-100 text-xl">
                  {seller.nombre_comercial}
                </SheetTitle>
                {seller.is_verified && (
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    <BadgeCheck className="h-3 w-3 mr-1" />
                    Verificado
                  </Badge>
                )}
              </div>
              <p className="text-slate-400 text-sm mt-1">{seller.responsable}</p>
              <div className="mt-2">
                <SellerStatusBadge status={seller.status || 'active'} />
              </div>
            </div>
          </div>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-280px)] px-6">
          <div className="space-y-6 py-6">
            {/* Contact Info */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">
                Información de contacto
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-slate-200">
                  <Mail className="h-4 w-4 text-slate-500" />
                  <span className="text-sm">{seller.email}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-200">
                  <Phone className="h-4 w-4 text-slate-500" />
                  <span className="text-sm">{seller.telefono}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-200">
                  <MapPin className="h-4 w-4 text-slate-500" />
                  <span className="text-sm">
                    {seller.zona}
                    {seller.direccion && ` - ${seller.direccion}`}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-slate-200">
                  <Calendar className="h-4 w-4 text-slate-500" />
                  <span className="text-sm">
                    Registrado el {formatDate(seller.created_at)}
                  </span>
                </div>
              </div>
            </div>

            <Separator className="bg-slate-700" />

            {/* Stats */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">
                Estadísticas
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Package className="h-5 w-5 text-blue-400" />
                      <div>
                        <p className="text-2xl font-bold text-slate-100">
                          {seller.stats.total_products}
                        </p>
                        <p className="text-xs text-slate-400">Total productos</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <div>
                        <p className="text-2xl font-bold text-slate-100">
                          {seller.stats.approved_products}
                        </p>
                        <p className="text-xs text-slate-400">Aprobados</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-amber-400" />
                      <div>
                        <p className="text-2xl font-bold text-slate-100">
                          {seller.stats.pending_products}
                        </p>
                        <p className="text-xs text-slate-400">Pendientes</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <ShoppingCart className="h-5 w-5 text-purple-400" />
                      <div>
                        <p className="text-2xl font-bold text-slate-100">
                          {seller.stats.total_reservations}
                        </p>
                        <p className="text-xs text-slate-400">Reservas</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {actions.length > 0 && (
              <>
                <Separator className="bg-slate-700" />

                {/* Action History */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">
                    Historial de acciones
                  </h3>
                  <div className="space-y-3">
                    {actions.map((action) => (
                      <div
                        key={action.id}
                        className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/50"
                      >
                        {getActionIcon(action.action)}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-slate-200">
                            {getActionLabel(action.action)}
                          </p>
                          {action.reason && (
                            <p className="text-xs text-slate-400 mt-1">
                              {action.reason}
                            </p>
                          )}
                          <p className="text-xs text-slate-500 mt-1">
                            Por {action.admin_name} •{' '}
                            {format(new Date(action.created_at), 'dd/MM/yyyy HH:mm')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </ScrollArea>

        <SheetFooter className="p-6 pt-4 border-t border-slate-700 gap-2">
          {seller.is_verified ? (
            <Button
              variant="outline"
              onClick={onUnverify}
              className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-800"
            >
              <XCircle className="h-4 w-4 mr-2" />
              Quitar verificación
            </Button>
          ) : (
            <Button
              onClick={onVerify}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <BadgeCheck className="h-4 w-4 mr-2" />
              Verificar
            </Button>
          )}

          {seller.status === 'suspended' ? (
            <Button
              onClick={onUnblock}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <Unlock className="h-4 w-4 mr-2" />
              Desbloquear
            </Button>
          ) : (
            <Button
              variant="destructive"
              onClick={onBlock}
              className="flex-1"
            >
              <Ban className="h-4 w-4 mr-2" />
              Bloquear
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
