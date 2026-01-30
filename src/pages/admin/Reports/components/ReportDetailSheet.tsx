import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  EyeOff,
  MessageSquare,
  Ban,
  CheckCircle,
  ExternalLink,
  User,
  Store,
  Clock,
  AlertTriangle,
  CheckCircle2,
  MessageCircle,
  ShieldAlert,
} from 'lucide-react';
import { ProductReport, ReportActionType, reasonConfig } from '@/types/adminReports';
import { ReportStatusBadge, ReportReasonBadge } from './ReportBadges';

interface ReportDetailSheetProps {
  report: ProductReport | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onHideProduct: () => void;
  onRequestEvidence: () => void;
  onPenalizeSeller: () => void;
  onResolve: () => void;
}

const actionIcons: Record<ReportActionType, React.ReactNode> = {
  report_created: <AlertTriangle className="h-4 w-4 text-amber-400" />,
  product_hidden: <EyeOff className="h-4 w-4 text-red-400" />,
  evidence_requested: <MessageCircle className="h-4 w-4 text-blue-400" />,
  seller_penalized: <ShieldAlert className="h-4 w-4 text-orange-400" />,
  report_resolved: <CheckCircle2 className="h-4 w-4 text-green-400" />,
};

const actionLabels: Record<ReportActionType, string> = {
  report_created: 'Reporte creado',
  product_hidden: 'Producto ocultado',
  evidence_requested: 'Evidencia solicitada',
  seller_penalized: 'Vendedor penalizado',
  report_resolved: 'Reporte resuelto',
};

export function ReportDetailSheet({
  report,
  open,
  onOpenChange,
  onHideProduct,
  onRequestEvidence,
  onPenalizeSeller,
  onResolve,
}: ReportDetailSheetProps) {
  if (!report) return null;

  const isProductHidden = report.product.status === 'disabled';
  const isResolved = report.status === 'resolved';
  const discountPct = report.product.p0 && report.product.p1
    ? Math.round(((report.product.p0 - report.product.p1) / report.product.p0) * 100)
    : null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg bg-slate-900 border-slate-700 text-white p-0 flex flex-col">
        <SheetHeader className="p-6 pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <ReportStatusBadge status={report.status} />
                <ReportReasonBadge reason={report.reason} />
              </div>
              <SheetTitle className="text-white text-lg">
                Reporte #{report.id.slice(-6)}
              </SheetTitle>
              <p className="text-sm text-slate-400">
                {format(new Date(report.created_at), "d 'de' MMMM, yyyy 'a las' HH:mm", { locale: es })}
              </p>
            </div>
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1 px-6">
          <div className="space-y-6 pb-6">
            {/* Product Section */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wide">
                Producto reportado
              </h3>
              <div className="flex gap-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <Avatar className="h-16 w-16 rounded-lg">
                  <AvatarImage src={report.product.image_url} alt={report.product.title} />
                  <AvatarFallback className="rounded-lg bg-slate-700 text-white">
                    {report.product.title.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-medium text-white truncate">{report.product.title}</h4>
                    {isProductHidden && (
                      <Badge variant="outline" className="shrink-0 bg-red-600/20 text-red-400 border-red-600/30">
                        Oculto
                      </Badge>
                    )}
                  </div>
                  {report.product.p0 && report.product.p1 && (
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-slate-400 line-through">
                        ${report.product.p0}
                      </span>
                      <span className="text-sm font-semibold text-white">
                        ${report.product.p1}
                      </span>
                      {discountPct && (
                        <Badge className="bg-green-600/20 text-green-400 border-green-600/30">
                          -{discountPct}%
                        </Badge>
                      )}
                    </div>
                  )}
                  <Button
                    variant="link"
                    size="sm"
                    className="h-auto p-0 mt-2 text-blue-400 hover:text-blue-300"
                    onClick={() => window.open(`/p/${report.product.id}`, '_blank')}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Ver publicación
                  </Button>
                </div>
              </div>
            </div>

            <Separator className="bg-slate-700" />

            {/* Seller Section */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wide flex items-center gap-2">
                <Store className="h-4 w-4" />
                Vendedor
              </h3>
              <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-white">
                    {report.product.seller.nombre_comercial}
                  </span>
                  <div className="flex items-center gap-2">
                    {report.product.seller.is_verified && (
                      <Badge className="bg-blue-600/20 text-blue-400 border-blue-600/30">
                        Verificado
                      </Badge>
                    )}
                    <Badge
                      variant="outline"
                      className={
                        report.product.seller.status === 'active'
                          ? 'bg-green-600/20 text-green-400 border-green-600/30'
                          : report.product.seller.status === 'suspended'
                          ? 'bg-red-600/20 text-red-400 border-red-600/30'
                          : 'bg-amber-600/20 text-amber-400 border-amber-600/30'
                      }
                    >
                      {report.product.seller.status === 'active'
                        ? 'Activo'
                        : report.product.seller.status === 'suspended'
                        ? 'Suspendido'
                        : 'Pendiente'}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-slate-400">{report.product.seller.email}</p>
                <p className="text-sm text-slate-400">Zona: {report.product.seller.zona}</p>
              </div>
            </div>

            <Separator className="bg-slate-700" />

            {/* Reporter Section */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wide flex items-center gap-2">
                <User className="h-4 w-4" />
                Usuario que reportó
              </h3>
              <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                {report.reporter ? (
                  <div className="space-y-1">
                    {report.reporter.name && (
                      <p className="font-medium text-white">{report.reporter.name}</p>
                    )}
                    {report.reporter.email && (
                      <p className="text-sm text-slate-400">{report.reporter.email}</p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500 italic">Reporte anónimo</p>
                )}
              </div>
            </div>

            {/* Description Section */}
            {report.description && (
              <>
                <Separator className="bg-slate-700" />
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wide">
                    Descripción del reporte
                  </h3>
                  <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                    <p className="text-sm text-slate-300 whitespace-pre-wrap">
                      {report.description}
                    </p>
                  </div>
                </div>
              </>
            )}

            <Separator className="bg-slate-700" />

            {/* Actions History */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wide flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Historial de acciones
              </h3>
              <div className="space-y-3">
                {report.actions.map((action, index) => (
                  <div
                    key={action.id}
                    className="relative pl-6 pb-4 last:pb-0"
                  >
                    {/* Timeline line */}
                    {index < report.actions.length - 1 && (
                      <div className="absolute left-[7px] top-6 bottom-0 w-px bg-slate-700" />
                    )}
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-1">
                      {actionIcons[action.action]}
                    </div>
                    {/* Content */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-white">
                          {actionLabels[action.action]}
                        </span>
                        <span className="text-xs text-slate-500">
                          por {action.admin_name}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">
                        {format(new Date(action.created_at), "d MMM yyyy, HH:mm", { locale: es })}
                      </p>
                      {action.note && (
                        <p className="text-sm text-slate-300 mt-1 p-2 bg-slate-800 rounded">
                          {action.note}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        <SheetFooter className="p-4 border-t border-slate-700 bg-slate-900/80 backdrop-blur">
          <div className="flex flex-wrap gap-2 w-full">
            <Button
              variant="destructive"
              size="sm"
              onClick={onHideProduct}
              disabled={isProductHidden}
              className="flex-1 sm:flex-none"
            >
              <EyeOff className="h-4 w-4 mr-2" />
              {isProductHidden ? 'Ya oculto' : 'Ocultar'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onRequestEvidence}
              disabled={isResolved}
              className="flex-1 sm:flex-none border-slate-600 text-white hover:bg-slate-700"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Evidencia
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onPenalizeSeller}
              className="flex-1 sm:flex-none border-amber-600/50 text-amber-400 hover:bg-amber-600/20"
            >
              <Ban className="h-4 w-4 mr-2" />
              Penalizar
            </Button>
            {!isResolved && (
              <Button
                size="sm"
                onClick={onResolve}
                className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Resolver
              </Button>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
