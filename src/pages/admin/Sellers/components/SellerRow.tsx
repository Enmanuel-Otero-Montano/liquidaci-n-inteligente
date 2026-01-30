import { TableCell, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { BadgeCheck } from 'lucide-react';
import { SellerWithStats } from '@/types/adminSeller';
import { SellerStatusBadge } from './SellerStatusBadge';
import { SellerActions } from './SellerActions';
import { format, isToday } from 'date-fns';
import { cn } from '@/lib/utils';

interface SellerRowProps {
  seller: SellerWithStats;
  onViewDetails: () => void;
  onBlock: () => void;
  onUnblock: () => void;
  onVerify: () => void;
  onUnverify: () => void;
}

export function SellerRow({
  seller,
  onViewDetails,
  onBlock,
  onUnblock,
  onVerify,
  onUnverify,
}: SellerRowProps) {
  const initials = seller.nombre_comercial
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const isNew = seller.created_at && isToday(new Date(seller.created_at));
  const isSuspended = seller.status === 'suspended';

  return (
    <TableRow
      className={cn(
        'border-slate-700 hover:bg-slate-800/50',
        isSuspended && 'bg-red-950/20'
      )}
    >
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border border-slate-700">
            <AvatarFallback className="bg-slate-800 text-slate-200 text-sm">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-medium text-slate-100 truncate">
                {seller.nombre_comercial}
              </span>
              {seller.is_verified && (
                <BadgeCheck className="h-4 w-4 text-green-400 flex-shrink-0" />
              )}
              {isNew && (
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                  Nuevo
                </Badge>
              )}
            </div>
            <p className="text-sm text-slate-400 truncate">{seller.responsable}</p>
          </div>
        </div>
      </TableCell>
      <TableCell className="text-slate-300">{seller.email}</TableCell>
      <TableCell className="text-slate-300">{seller.zona}</TableCell>
      <TableCell>
        <SellerStatusBadge status={seller.status || 'active'} />
      </TableCell>
      <TableCell className="text-center">
        <span className="text-slate-100 font-medium">
          {seller.stats.total_products}
        </span>
      </TableCell>
      <TableCell className="text-slate-400">
        {seller.created_at
          ? format(new Date(seller.created_at), 'dd/MM/yyyy')
          : 'N/A'}
      </TableCell>
      <TableCell>
        <SellerActions
          seller={seller}
          onViewDetails={onViewDetails}
          onBlock={onBlock}
          onUnblock={onUnblock}
          onVerify={onVerify}
          onUnverify={onUnverify}
        />
      </TableCell>
    </TableRow>
  );
}
