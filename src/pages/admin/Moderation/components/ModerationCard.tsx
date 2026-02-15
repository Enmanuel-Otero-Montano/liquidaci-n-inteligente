import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, X, MessageSquare, Eye, ShieldCheck, FileCheck, AlertCircle } from 'lucide-react';
import { ProductWithSeller } from '@/types/moderation';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface ModerationCardProps {
  product: ProductWithSeller;
  onViewDetail: () => void;
  onApprove: () => void;
  onReject: () => void;
  onRequestChanges: () => void;
  isApproving?: boolean;
}

export function ModerationCard({
  product,
  onViewDetail,
  onApprove,
  onReject,
  onRequestChanges,
  isApproving,
}: ModerationCardProps) {
  const isUrgent = new Date().getTime() - new Date(product.created_at).getTime() > 48 * 60 * 60 * 1000;
  const isNew = new Date().getTime() - new Date(product.created_at).getTime() < 24 * 60 * 60 * 1000;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-UY', {
      style: 'currency',
      currency: 'UYU',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card 
      className={cn(
        "bg-slate-800 border-slate-700",
        isUrgent && "border-l-4 border-l-red-500",
        isNew && !isUrgent && "border-l-4 border-l-blue-500"
      )}
    >
      <CardContent className="p-4">
        <div className="flex gap-3">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-20 h-20 rounded-lg object-cover bg-slate-700 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <button onClick={onViewDetail} className="text-left">
                <h3 className="font-medium text-white hover:underline line-clamp-2">
                  {product.title}
                </h3>
              </button>
              <Badge 
                className={cn(
                  "shrink-0",
                  product.discount_pct >= 70 
                    ? 'bg-amber-500/20 text-amber-400' 
                    : 'bg-emerald-500/20 text-emerald-400'
                )}
              >
                -{product.discount_pct}%
              </Badge>
            </div>

            <p className="text-sm text-slate-400 mt-1">
              {product.seller.nombre_comercial}
            </p>

            <div className="flex items-center gap-2 mt-2">
              <span className="text-lg font-bold text-white">
                {formatPrice(product.price_now)}
              </span>
              <span className="text-sm text-slate-500 line-through">
                {formatPrice(product.price_before)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-700">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">
              {formatDistanceToNow(new Date(product.created_at), { 
                addSuffix: true, 
                locale: es 
              })}
            </span>
            {isNew && (
              <Badge className="bg-blue-500/20 text-blue-400 text-xs">
                Nuevo
              </Badge>
            )}
            {isUrgent && (
              <Badge variant="destructive" className="text-xs">
                Urgente
              </Badge>
            )}
          </div>

          {product.verification_status === 'verified' ? (
            <Badge className="bg-green-900 text-green-300 border-green-700 text-xs">
              <ShieldCheck className="h-3 w-3 mr-1" />
              Verificado
            </Badge>
          ) : (product.evidence_url || product.price_reference) ? (
            <Badge className="bg-amber-900 text-amber-300 border-amber-700 text-xs">
              <FileCheck className="h-3 w-3 mr-1" />
              Con evidencia
            </Badge>
          ) : (
            <Badge variant="secondary" className="text-xs">
              <AlertCircle className="h-3 w-3 mr-1" />
              Sin evidencia
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2 mt-3">
          <Button
            size="sm"
            variant="ghost"
            onClick={onViewDetail}
            className="text-slate-400 hover:text-white"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            onClick={onApprove}
            disabled={isApproving}
            className="bg-emerald-600 hover:bg-emerald-700 text-white flex-1"
          >
            <Check className="h-4 w-4 mr-1" />
            Aprobar
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onRequestChanges}
            className="border-amber-600 text-amber-500 hover:bg-amber-600/10"
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onReject}
            className="border-red-600 text-red-500 hover:bg-red-600/10"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
