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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { SellerWithStats, BLOCK_REASONS } from '@/types/adminSeller';

interface BlockSellerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  seller: SellerWithStats | null;
  onConfirm: (reason: string) => void;
  isLoading?: boolean;
}

export function BlockSellerDialog({
  open,
  onOpenChange,
  seller,
  onConfirm,
  isLoading,
}: BlockSellerDialogProps) {
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');

  const handleConfirm = () => {
    const reason =
      selectedReason === 'other'
        ? customReason
        : BLOCK_REASONS.find((r) => r.value === selectedReason)?.label || '';
    onConfirm(reason);
  };

  const isValid =
    selectedReason && (selectedReason !== 'other' || customReason.trim().length > 0);

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setSelectedReason('');
      setCustomReason('');
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-slate-900 border-slate-700 text-slate-100 sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-red-500/20 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <DialogTitle className="text-slate-100">Bloquear vendedor</DialogTitle>
              <DialogDescription className="text-slate-400">
                {seller?.nombre_comercial}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <p className="text-sm text-slate-300">
            Al bloquear este vendedor, todos sus productos serán ocultados del catálogo
            público y no podrá realizar nuevas publicaciones.
          </p>

          <div className="space-y-3">
            <Label className="text-slate-200">Razón del bloqueo</Label>
            <RadioGroup
              value={selectedReason}
              onValueChange={setSelectedReason}
              className="space-y-2"
            >
              {BLOCK_REASONS.map((reason) => (
                <div
                  key={reason.value}
                  className="flex items-center space-x-3 rounded-lg border border-slate-700 p-3 hover:bg-slate-800/50"
                >
                  <RadioGroupItem
                    value={reason.value}
                    id={reason.value}
                    className="border-slate-600 text-primary"
                  />
                  <Label
                    htmlFor={reason.value}
                    className="flex-1 cursor-pointer text-slate-200"
                  >
                    {reason.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {selectedReason === 'other' && (
            <div className="space-y-2">
              <Label className="text-slate-200">Especificar razón</Label>
              <Textarea
                placeholder="Describe la razón del bloqueo..."
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                className="bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500 min-h-[80px]"
              />
            </div>
          )}
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
            variant="destructive"
            onClick={handleConfirm}
            disabled={!isValid || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Bloqueando...
              </>
            ) : (
              'Bloquear vendedor'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
