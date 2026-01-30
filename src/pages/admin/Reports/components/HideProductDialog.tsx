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
import { AlertTriangle } from 'lucide-react';

interface HideProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productTitle: string;
  onConfirm: (note?: string) => void;
  isLoading?: boolean;
}

export function HideProductDialog({
  open,
  onOpenChange,
  productTitle,
  onConfirm,
  isLoading,
}: HideProductDialogProps) {
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
          <DialogTitle className="flex items-center gap-2 text-red-400">
            <AlertTriangle className="h-5 w-5" />
            Ocultar producto
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Esta acción removerá el producto del catálogo público.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
            <p className="text-sm text-slate-300">
              <strong>Producto:</strong> {productTitle}
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-slate-300">Nota interna (opcional)</label>
            <Textarea
              placeholder="Motivo por el cual se oculta el producto..."
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
            variant="destructive"
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Ocultando...' : 'Ocultar producto'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
