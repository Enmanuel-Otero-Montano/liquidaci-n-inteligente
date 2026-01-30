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
    fraude: 'bg-red-600/20 text-red-400 border-red-600/30',
    precio_no_real: 'bg-amber-600/20 text-amber-400 border-amber-600/30',
    producto_prohibido: 'bg-purple-600/20 text-purple-400 border-purple-600/30',
    contenido_inapropiado: 'bg-orange-600/20 text-orange-400 border-orange-600/30',
    info_incorrecta: 'bg-blue-600/20 text-blue-400 border-blue-600/30',
    otro: 'bg-slate-600/20 text-slate-400 border-slate-600/30',
  };

  return (
    <Badge variant="outline" className={reasonColors[reason]}>
      {reasonConfig[reason].label}
    </Badge>
  );
}
