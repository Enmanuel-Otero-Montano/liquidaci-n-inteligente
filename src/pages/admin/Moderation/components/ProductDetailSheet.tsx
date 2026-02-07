import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  ExternalLink, 
  MapPin, 
  Package, 
  Truck, 
  Clock,
  User,
  Mail,
  Calendar,
} from 'lucide-react';
import { ProductWithSeller } from '@/types/moderation';
import { ApprovalActions } from './ApprovalActions';
import { ModerationTimeline } from './ModerationTimeline';
import { useModerationHistory } from '@/hooks/useModerationHistory';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface ProductDetailSheetProps {
  product: ProductWithSeller | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApprove: () => void;
  onReject: () => void;
  onRequestChanges: () => void;
  isApproving?: boolean;
}

export function ProductDetailSheet({
  product,
  open,
  onOpenChange,
  onApprove,
  onReject,
  onRequestChanges,
  isApproving,
}: ProductDetailSheetProps) {
  const { data: history = [], isLoading: isHistoryLoading } = useModerationHistory(product?.id);

  if (!product) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-UY', {
      style: 'currency',
      currency: 'UYU',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const isUrgent = new Date().getTime() - new Date(product.created_at).getTime() > 48 * 60 * 60 * 1000;
  const isNew = new Date().getTime() - new Date(product.created_at).getTime() < 24 * 60 * 60 * 1000;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="bg-slate-900 border-slate-700 w-full sm:max-w-lg p-0 flex flex-col">
        <SheetHeader className="p-6 pb-0">
          <div className="flex items-start gap-2">
            <SheetTitle className="text-white text-left flex-1">
              {product.title}
            </SheetTitle>
            {isUrgent && (
              <Badge variant="destructive" className="shrink-0">
                Urgente
              </Badge>
            )}
            {isNew && !isUrgent && (
              <Badge className="bg-blue-500/20 text-blue-400 shrink-0">
                Nuevo
              </Badge>
            )}
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1 px-6">
          <div className="space-y-6 pb-6">
            {/* Images */}
            <div className="space-y-2">
              <div className="aspect-video rounded-lg overflow-hidden bg-slate-800">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {product.images.slice(1).map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${product.title} ${idx + 2}`}
                      className="w-16 h-16 rounded-lg object-cover shrink-0"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Price block */}
            <div className="bg-slate-800 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm line-through">
                    {formatPrice(product.price_before)}
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {formatPrice(product.price_now)}
                  </p>
                </div>
                <Badge 
                  className={`text-lg px-3 py-1 ${
                    product.discount_pct >= 70 
                      ? 'bg-amber-500/20 text-amber-400' 
                      : 'bg-emerald-500/20 text-emerald-400'
                  }`}
                >
                  -{product.discount_pct}% OFF
                </Badge>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-slate-400">Detalles</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Package className="h-4 w-4 text-slate-500" />
                  <span>{product.stock_qty} unidades</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <MapPin className="h-4 w-4 text-slate-500" />
                  <span>{product.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Clock className="h-4 w-4 text-slate-500" />
                  <span>
                    {formatDistanceToNow(new Date(product.created_at), { 
                      addSuffix: true, 
                      locale: es 
                    })}
                  </span>
                </div>
                {product.offers_shipping && (
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Truck className="h-4 w-4 text-slate-500" />
                    <span>Envío disponible</span>
                  </div>
                )}
              </div>

              <Badge variant="outline" className="border-slate-600 text-slate-400">
                {product.category}
              </Badge>
            </div>

            <Separator className="bg-slate-700" />

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-slate-400">Descripción</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Evidence */}
            {product.evidence_url && (
              <>
                <Separator className="bg-slate-700" />
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-slate-400">Evidencia de precio</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="border-slate-600 text-slate-300 hover:bg-slate-800"
                  >
                    <a 
                      href={product.evidence_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Ver enlace original
                    </a>
                  </Button>
                </div>
              </>
            )}

            <Separator className="bg-slate-700" />

            {/* Seller info */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-slate-400">Vendedor</h3>
              <div className="bg-slate-800 rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-slate-500" />
                  <span className="text-slate-200 font-medium">
                    {product.seller.nombre_comercial}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-slate-500" />
                  <span className="text-slate-400">{product.seller.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-slate-500" />
                  <span className="text-slate-400">{product.seller.zona}</span>
                </div>
                {product.seller.created_at && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-slate-500" />
                    <span className="text-slate-400">
                      Registrado {formatDistanceToNow(new Date(product.seller.created_at), { 
                        addSuffix: true, 
                        locale: es 
                      })}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Moderation History */}
            {history.length > 0 && (
              <>
                <Separator className="bg-slate-700" />
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-slate-400">Historial de moderación</h3>
                  <ModerationTimeline history={history} isLoading={isHistoryLoading} />
                </div>
              </>
            )}
          </div>
        </ScrollArea>

        <SheetFooter className="p-4 border-t border-slate-700 bg-slate-900">
          <ApprovalActions
            productId={product.id}
            discountPct={product.discount_pct}
            onApprove={onApprove}
            onReject={onReject}
            onRequestChanges={onRequestChanges}
            isApproving={isApproving}
            size="sm"
          />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
