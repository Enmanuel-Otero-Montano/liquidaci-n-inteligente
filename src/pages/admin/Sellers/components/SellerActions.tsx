import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Eye, Ban, CheckCircle, Unlock, XCircle } from 'lucide-react';
import { SellerWithStats } from '@/types/adminSeller';

interface SellerActionsProps {
  seller: SellerWithStats;
  onViewDetails: () => void;
  onBlock: () => void;
  onUnblock: () => void;
  onVerify: () => void;
  onUnverify: () => void;
}

export function SellerActions({
  seller,
  onViewDetails,
  onBlock,
  onUnblock,
  onVerify,
  onUnverify,
}: SellerActionsProps) {
  const isSuspended = seller.status === 'suspended';
  const isVerified = seller.is_verified;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-slate-400 hover:text-slate-100 hover:bg-slate-700"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
        <DropdownMenuItem
          onClick={onViewDetails}
          className="text-slate-100 focus:bg-slate-700 focus:text-slate-100"
        >
          <Eye className="h-4 w-4 mr-2" />
          Ver detalles
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-slate-700" />

        {isVerified ? (
          <DropdownMenuItem
            onClick={onUnverify}
            className="text-slate-100 focus:bg-slate-700 focus:text-slate-100"
          >
            <XCircle className="h-4 w-4 mr-2" />
            Quitar verificación
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            onClick={onVerify}
            className="text-green-400 focus:bg-slate-700 focus:text-green-400"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Marcar verificado
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator className="bg-slate-700" />

        {isSuspended ? (
          <DropdownMenuItem
            onClick={onUnblock}
            className="text-green-400 focus:bg-slate-700 focus:text-green-400"
          >
            <Unlock className="h-4 w-4 mr-2" />
            Desbloquear
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            onClick={onBlock}
            className="text-red-400 focus:bg-slate-700 focus:text-red-400"
          >
            <Ban className="h-4 w-4 mr-2" />
            Bloquear vendedor
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
