import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  TableCell,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { ProductReport, reasonConfig } from '@/types/adminReports';
import { ReportStatusBadge } from './ReportBadges';
import { ReportActions } from './ReportActions';

interface ReportRowProps {
  report: ProductReport;
  onViewDetails: () => void;
  onHideProduct: () => void;
  onRequestEvidence: () => void;
  onPenalizeSeller: () => void;
  onResolve: () => void;
}

export function ReportRow({
  report,
  onViewDetails,
  onHideProduct,
  onRequestEvidence,
  onPenalizeSeller,
  onResolve,
}: ReportRowProps) {
  const isProductHidden = report.product.status === 'disabled';

  return (
    <TableRow className="border-slate-700 hover:bg-slate-800/50">
      {/* Product */}
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 rounded-lg">
            <AvatarImage src={report.product.image_url} alt={report.product.title} />
            <AvatarFallback className="rounded-lg bg-slate-700 text-white text-xs">
              {report.product.title.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-medium text-white truncate max-w-[200px]">
                {report.product.title}
              </span>
              {isProductHidden && (
                <Badge variant="outline" className="shrink-0 bg-red-600/20 text-red-400 border-red-600/30 text-xs">
                  Oculto
                </Badge>
              )}
            </div>
            <span className="text-sm text-slate-400">
              {report.product.seller.nombre_comercial}
            </span>
          </div>
        </div>
      </TableCell>

      {/* Reason */}
      <TableCell>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge
              variant="outline"
              className="cursor-help border-slate-600 text-slate-300"
            >
              {reasonConfig[report.reason].label}
            </Badge>
          </TooltipTrigger>
          {report.description && (
            <TooltipContent side="top" className="max-w-xs bg-slate-800 border-slate-700 text-white">
              <p className="text-sm">{report.description}</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TableCell>

      {/* Reporter */}
      <TableCell>
        <span className="text-sm text-slate-300">
          {report.reporter?.name || report.reporter?.email || (
            <span className="text-slate-500 italic">Anónimo</span>
          )}
        </span>
      </TableCell>

      {/* Status */}
      <TableCell>
        <ReportStatusBadge status={report.status} />
      </TableCell>

      {/* Date */}
      <TableCell>
        <span className="text-sm text-slate-400">
          {format(new Date(report.created_at), "d MMM yyyy", { locale: es })}
        </span>
      </TableCell>

      {/* Actions */}
      <TableCell>
        <ReportActions
          report={report}
          onViewDetails={onViewDetails}
          onHideProduct={onHideProduct}
          onRequestEvidence={onRequestEvidence}
          onPenalizeSeller={onPenalizeSeller}
          onResolve={onResolve}
        />
      </TableCell>
    </TableRow>
  );
}
