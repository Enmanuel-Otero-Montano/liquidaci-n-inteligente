import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, MoreHorizontal, EyeOff, MessageSquare, Ban, CheckCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ProductReport, reasonConfig } from '@/types/adminReports';
import { ReportStatusBadge } from './ReportBadges';

interface ReportCardProps {
  report: ProductReport;
  onViewDetails: () => void;
  onHideProduct: () => void;
  onRequestEvidence: () => void;
  onPenalizeSeller: () => void;
  onResolve: () => void;
}

export function ReportCard({
  report,
  onViewDetails,
  onHideProduct,
  onRequestEvidence,
  onPenalizeSeller,
  onResolve,
}: ReportCardProps) {
  const isProductHidden = report.product.status === 'disabled';
  const isResolved = report.status === 'resolved';

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardContent className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-start gap-3">
          <Avatar className="h-12 w-12 rounded-lg">
            <AvatarImage src={report.product.image_url} alt={report.product.title} />
            <AvatarFallback className="rounded-lg bg-slate-700 text-white">
              {report.product.title.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-medium text-white truncate">{report.product.title}</h3>
                <p className="text-sm text-slate-400">{report.product.seller.nombre_comercial}</p>
              </div>
              <ReportStatusBadge status={report.status} />
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <Badge variant="outline" className="border-slate-600 text-slate-300">
            {reasonConfig[report.reason].label}
          </Badge>
          {isProductHidden && (
            <Badge variant="outline" className="bg-red-600/20 text-red-400 border-red-600/30">
              Producto oculto
            </Badge>
          )}
        </div>

        {/* Reporter & Date */}
        <div className="flex items-center justify-between text-sm text-slate-400">
          <span>
            {report.reporter?.name || report.reporter?.email || (
              <span className="italic">Anónimo</span>
            )}
          </span>
          <span>
            {format(new Date(report.created_at), "d MMM yyyy", { locale: es })}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-700">
          <Button
            variant="ghost"
            size="sm"
            onClick={onViewDetails}
            className="flex-1 text-slate-300 hover:text-white hover:bg-slate-700"
          >
            <Eye className="h-4 w-4 mr-2" />
            Ver detalles
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
              {!isProductHidden && (
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
              {!isResolved && (
                <>
                  <DropdownMenuSeparator className="bg-slate-700" />
                  <DropdownMenuItem
                    onClick={onResolve}
                    className="text-green-400 hover:bg-slate-700 hover:text-green-300 cursor-pointer"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Marcar resuelto
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}
