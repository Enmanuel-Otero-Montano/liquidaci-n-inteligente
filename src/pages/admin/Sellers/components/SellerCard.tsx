import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { BadgeCheck, Mail, MapPin, Package } from 'lucide-react';
import { SellerWithStats } from '@/types/adminSeller';
import { SellerStatusBadge } from './SellerStatusBadge';
import { SellerTypeBadge } from '@/components/seller/SellerTypeBadge';
import { SellerActions } from './SellerActions';
import { format, isToday } from 'date-fns';
import { cn } from '@/lib/utils';

interface SellerCardProps {
  seller: SellerWithStats;
  onViewDetails: () => void;
  onApprove: () => void;
  onBlock: () => void;
  onUnblock: () => void;
  onVerify: () => void;
  onUnverify: () => void;
}

export function SellerCard({
  seller,
  onViewDetails,
  onApprove,
  onBlock,
  onUnblock,
  onVerify,
  onUnverify,
}: SellerCardProps) {
  const initials = seller.nombre_comercial
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const isNew = seller.created_at && isToday(new Date(seller.created_at));
  const isSuspended = seller.status === 'suspended';

  return (
    <Card
      className={cn(
        'bg-slate-800/50 border-slate-700',
        isSuspended && 'bg-red-950/30 border-red-900/50'
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-12 w-12 border border-slate-700 flex-shrink-0">
            <AvatarFallback className="bg-slate-800 text-slate-200">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-medium text-slate-100 truncate">
                    {seller.nombre_comercial}
                  </h3>
                  <SellerTypeBadge type={seller.seller_type} />
                  {seller.is_verified && (
                    <BadgeCheck className="h-4 w-4 text-green-400 flex-shrink-0" />
                  )}
                  {isNew && (
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                      Nuevo
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-slate-400">{seller.responsable}</p>
              </div>

              <SellerActions
                seller={seller}
                onViewDetails={onViewDetails}
                onApprove={onApprove}
                onBlock={onBlock}
                onUnblock={onUnblock}
                onVerify={onVerify}
                onUnverify={onUnverify}
              />
            </div>

            <div className="mt-3 space-y-1.5">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Mail className="h-3.5 w-3.5 text-slate-500" />
                <span className="truncate">{seller.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <MapPin className="h-3.5 w-3.5 text-slate-500" />
                <span>{seller.zona}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Package className="h-3.5 w-3.5 text-slate-500" />
                <span>{seller.stats.total_products} productos</span>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <SellerStatusBadge status={seller.status || 'active'} />
              <span className="text-xs text-slate-500">
                {seller.created_at
                  ? format(new Date(seller.created_at), 'dd/MM/yyyy')
                  : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
