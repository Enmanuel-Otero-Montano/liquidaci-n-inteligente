import { CheckCircle2, XCircle, AlertTriangle, Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { ModerationHistory } from '@/types/moderation';
import { Skeleton } from '@/components/ui/skeleton';

interface ModerationTimelineProps {
  history: ModerationHistory[];
  isLoading?: boolean;
}

const ACTION_CONFIG: Record<string, { icon: typeof CheckCircle2; color: string; label: string }> = {
  approved: { icon: CheckCircle2, color: 'text-emerald-400', label: 'Aprobado' },
  rejected: { icon: XCircle, color: 'text-red-400', label: 'Rechazado' },
  changes_requested: { icon: AlertTriangle, color: 'text-amber-400', label: 'Cambios solicitados' },
  submitted: { icon: Send, color: 'text-blue-400', label: 'Enviado a revisión' },
};

export function ModerationTimeline({ history, isLoading }: ModerationTimelineProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-4 w-32 bg-slate-700" />
        <Skeleton className="h-12 w-full bg-slate-700" />
        <Skeleton className="h-12 w-full bg-slate-700" />
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <p className="text-sm text-slate-500">Sin historial de moderación</p>
    );
  }

  return (
    <div className="space-y-3">
      {history.map((entry) => {
        const config = ACTION_CONFIG[entry.action] || ACTION_CONFIG.submitted;
        const Icon = config.icon;

        return (
          <div key={entry.id} className="flex gap-3">
            <div className="flex flex-col items-center">
              <Icon className={`h-4 w-4 ${config.color} shrink-0 mt-0.5`} />
              <div className="w-px flex-1 bg-slate-700 mt-1" />
            </div>
            <div className="pb-3 min-w-0">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className={`text-sm font-medium ${config.color}`}>
                  {config.label}
                </span>
                <span className="text-xs text-slate-500">
                  {formatDistanceToNow(new Date(entry.created_at), {
                    addSuffix: true,
                    locale: es,
                  })}
                </span>
              </div>
              {entry.admin_name && (
                <p className="text-xs text-slate-500">por {entry.admin_name}</p>
              )}
              {entry.reason && (
                <p className="text-xs text-slate-400 mt-1 bg-slate-800/50 rounded px-2 py-1">
                  {entry.reason}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
