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
import { Label } from '@/components/ui/label';
import { BadgeCheck, Loader2 } from 'lucide-react';
import { SellerWithStats } from '@/types/adminSeller';

interface VerifySellerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  seller: SellerWithStats | null;
  onConfirm: (notes?: string) => void;
  isLoading?: boolean;
}

export function VerifySellerDialog({
  open,
  onOpenChange,
  seller,
  onConfirm,
  isLoading,
}: VerifySellerDialogProps) {
  const [notes, setNotes] = useState('');

  const handleConfirm = () => {
    onConfirm(notes.trim() || undefined);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setNotes('');
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-slate-900 border-slate-700 text-slate-100 sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
              <BadgeCheck className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <DialogTitle className="text-slate-100">Verificar vendedor</DialogTitle>
              <DialogDescription className="text-slate-400">
                {seller?.nombre_comercial}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <p className="text-sm text-slate-300">
            Al marcar este vendedor como verificado, se mostrará un badge de confianza
            en su perfil y productos públicos.
          </p>

          <div className="space-y-2">
            <Label className="text-slate-200">Notas de verificación (opcional)</Label>
            <Textarea
              placeholder="Ej: Documentación verificada, visita al local realizada..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500 min-h-[80px]"
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="ghost"
            onClick={() => handleOpenChange(false)}
            className="text-slate-300 hover:text-slate-100 hover:bg-slate-800"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Verificando...
              </>
            ) : (
              <>
                <BadgeCheck className="h-4 w-4 mr-2" />
                Verificar vendedor
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
