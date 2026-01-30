import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertTriangle } from 'lucide-react';

interface ResolveReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productStillVisible: boolean;
  onConfirm: (note?: string) => void;
  isLoading?: boolean;
}

export function ResolveReportDialog({
  open,
  onOpenChange,
  productStillVisible,
  onConfirm,
  isLoading,
}: ResolveReportDialogProps) {
  const [note, setNote] = useState('');

  const handleConfirm = () => {
    onConfirm(note || undefined);
    setNote('');
  };

  const handleCancel = () => {
    onOpenChange(false);
    setNote('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-green-400">
            <CheckCircle className="h-5 w-5" />
            Resolver reporte
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Marcar este reporte como resuelto y cerrarlo.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {productStillVisible && (
            <Alert variant="default" className="bg-amber-500/10 border-amber-500/30">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              <AlertDescription className="text-amber-300 text-sm">
                El producto reportado sigue visible en el catálogo. ¿Desea cerrar el reporte de todas formas?
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <label className="text-sm text-slate-300">Nota interna (opcional)</label>
            <Textarea
              placeholder="Resumen de la resolución del caso..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              rows={3}
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="ghost"
            onClick={handleCancel}
            className="text-slate-300 hover:text-white hover:bg-slate-700"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700"
          >
            {isLoading ? 'Resolviendo...' : 'Marcar como resuelto'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
