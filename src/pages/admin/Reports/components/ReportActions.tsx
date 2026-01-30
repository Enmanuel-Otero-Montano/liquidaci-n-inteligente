import { MoreHorizontal, Eye, EyeOff, MessageSquare, Ban, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ProductReport } from '@/types/adminReports';

interface ReportActionsProps {
  report: ProductReport;
  onViewDetails: () => void;
  onHideProduct: () => void;
  onRequestEvidence: () => void;
  onPenalizeSeller: () => void;
  onResolve: () => void;
}

export function ReportActions({
  report,
  onViewDetails,
  onHideProduct,
  onRequestEvidence,
  onPenalizeSeller,
  onResolve,
}: ReportActionsProps) {
  const isProductHidden = report.product.status === 'disabled';
  const isResolved = report.status === 'resolved';

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={onViewDetails}
        className="text-slate-300 hover:text-white hover:bg-slate-700"
      >
        <Eye className="h-4 w-4" />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-300 hover:text-white hover:bg-slate-700"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
          <DropdownMenuItem
            onClick={onViewDetails}
            className="text-white hover:bg-slate-700 cursor-pointer"
          >
            <Eye className="mr-2 h-4 w-4" />
            Ver detalles
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-slate-700" />

          {isProductHidden ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="px-2 py-1.5 text-sm text-slate-500 cursor-not-allowed flex items-center">
                  <EyeOff className="mr-2 h-4 w-4" />
                  Producto ya oculto
                </div>
              </TooltipTrigger>
              <TooltipContent>
                El producto ya está deshabilitado
              </TooltipContent>
            </Tooltip>
          ) : (
            <DropdownMenuItem
              onClick={onHideProduct}
              className="text-red-400 hover:bg-slate-700 hover:text-red-300 cursor-pointer"
            >
              <EyeOff className="mr-2 h-4 w-4" />
              Ocultar producto
            </DropdownMenuItem>
          )}

          <DropdownMenuItem
            onClick={onRequestEvidence}
            className="text-white hover:bg-slate-700 cursor-pointer"
            disabled={isResolved}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Solicitar evidencia
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={onPenalizeSeller}
            className="text-amber-400 hover:bg-slate-700 hover:text-amber-300 cursor-pointer"
          >
            <Ban className="mr-2 h-4 w-4" />
            Penalizar vendedor
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-slate-700" />

          {isResolved ? (
            <div className="px-2 py-1.5 text-sm text-slate-500 flex items-center">
              <CheckCircle className="mr-2 h-4 w-4" />
              Ya resuelto
            </div>
          ) : (
            <DropdownMenuItem
              onClick={onResolve}
              className="text-green-400 hover:bg-slate-700 hover:text-green-300 cursor-pointer"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Marcar resuelto
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
