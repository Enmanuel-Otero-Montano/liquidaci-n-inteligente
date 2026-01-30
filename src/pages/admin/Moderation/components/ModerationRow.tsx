import { TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Eye } from 'lucide-react';
import { ProductWithSeller } from '@/types/moderation';
import { ApprovalActions } from './ApprovalActions';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface ModerationRowProps {
  product: ProductWithSeller;
  onViewDetail: () => void;
  onApprove: () => void;
  onReject: () => void;
  onRequestChanges: () => void;
  isApproving?: boolean;
}

export function ModerationRow({
  product,
  onViewDetail,
  onApprove,
  onReject,
  onRequestChanges,
  isApproving,
}: ModerationRowProps) {
  const isUrgent = new Date().getTime() - new Date(product.created_at).getTime() > 48 * 60 * 60 * 1000;
  const isNew = new Date().getTime() - new Date(product.created_at).getTime() < 24 * 60 * 60 * 1000;

  return (
    <TableRow 
      className={cn(
        "border-slate-800 hover:bg-slate-800/50",
        isUrgent && "border-l-2 border-l-red-500 bg-red-950/10",
        isNew && !isUrgent && "border-l-2 border-l-blue-500 bg-blue-950/10"
      )}
    >
      {/* Product */}
      <TableCell>
        <div className="flex items-center gap-3">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-12 h-12 rounded-lg object-cover bg-slate-800"
          />
          <div className="min-w-0">
            <button
              onClick={onViewDetail}
              className="text-left hover:underline"
            >
              <p className="font-medium text-white truncate max-w-[200px]">
                {product.title}
              </p>
            </button>
            <p className="text-sm text-slate-500">{product.category}</p>
          </div>
        </div>
      </TableCell>

      {/* Seller */}
      <TableCell>
        <p className="text-slate-300">{product.seller.nombre_comercial}</p>
        <p className="text-xs text-slate-500">{product.seller.zona}</p>
      </TableCell>

      {/* Discount */}
      <TableCell>
        <Badge 
          className={cn(
            product.discount_pct >= 70 
              ? 'bg-amber-500/20 text-amber-400' 
              : 'bg-emerald-500/20 text-emerald-400'
          )}
        >
          -{product.discount_pct}%
        </Badge>
      </TableCell>

      {/* Date */}
      <TableCell>
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-sm">
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
      </TableCell>

      {/* Evidence */}
      <TableCell>
        {product.evidence_url ? (
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-slate-400 hover:text-white"
          >
            <a 
              href={product.evidence_url} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        ) : (
          <span className="text-slate-600 text-sm">—</span>
        )}
      </TableCell>

      {/* Actions */}
      <TableCell>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onViewDetail}
            className="text-slate-400 hover:text-white"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <ApprovalActions
            productId={product.id}
            discountPct={product.discount_pct}
            onApprove={onApprove}
            onReject={onReject}
            onRequestChanges={onRequestChanges}
            isApproving={isApproving}
            size="sm"
          />
        </div>
      </TableCell>
    </TableRow>
  );
}
