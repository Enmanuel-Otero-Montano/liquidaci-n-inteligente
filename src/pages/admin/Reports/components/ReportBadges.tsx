import { Badge } from '@/components/ui/badge';
import { ReportStatus, ReportReason, reasonConfig } from '@/types/adminReports';

interface ReportStatusBadgeProps {
  status: ReportStatus;
}

export function ReportStatusBadge({ status }: ReportStatusBadgeProps) {
  const config: Record<ReportStatus, { label: string; className: string }> = {
    open: {
      label: 'Abierto',
      className: 'bg-red-600/20 text-red-400 border-red-600/30',
    },
    resolved: {
      label: 'Resuelto',
      className: 'bg-slate-600/20 text-slate-400 border-slate-600/30',
    },
  };

  const { label, className } = config[status];

  return (
    <Badge variant="outline" className={className}>
      {label}
    </Badge>
  );
}

interface ReportReasonBadgeProps {
  reason: ReportReason;
}

export function ReportReasonBadge({ reason }: ReportReasonBadgeProps) {
  const reasonColors: Record<ReportReason, string> = {
    descuento_enganoso: 'bg-amber-600/20 text-amber-400 border-amber-600/30',
    producto_no_coincide: 'bg-blue-600/20 text-blue-400 border-blue-600/30',
    stock_inexistente: 'bg-red-600/20 text-red-400 border-red-600/30',
    otro: 'bg-slate-600/20 text-slate-400 border-slate-600/30',
  };

  return (
    <Badge variant="outline" className={reasonColors[reason]}>
      {reasonConfig[reason].label}
    </Badge>
  );
}
