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
import { REJECTION_REASONS } from '@/types/moderation';
import { Loader2 } from 'lucide-react';

interface RejectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (reason: string) => void;
  isLoading?: boolean;
  productTitle?: string;
}

export function RejectDialog({
  open,
  onOpenChange,
  onConfirm,
  isLoading,
  productTitle,
}: RejectDialogProps) {
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [customReason, setCustomReason] = useState('');

  const handleConfirm = () => {
    const reason = selectedReason === 'other' 
      ? customReason 
      : REJECTION_REASONS.find(r => r.value === selectedReason)?.label || selectedReason;
    onConfirm(reason);
  };

  const isValid = selectedReason && (selectedReason !== 'other' || customReason.trim().length > 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border-slate-700 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">Rechazar producto</DialogTitle>
          <DialogDescription className="text-slate-400">
            {productTitle && (
              <span className="block mt-1 text-slate-300 font-medium">{productTitle}</span>
            )}
            Seleccioná el motivo del rechazo. El vendedor recibirá esta información.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <RadioGroup value={selectedReason} onValueChange={setSelectedReason}>
            {REJECTION_REASONS.map((reason) => (
              <div key={reason.value} className="flex items-center space-x-3">
                <RadioGroupItem 
                  value={reason.value} 
                  id={reason.value}
                  className="border-slate-600 text-emerald-500"
                />
                <Label 
                  htmlFor={reason.value} 
                  className="text-slate-300 cursor-pointer"
                >
                  {reason.label}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {selectedReason === 'other' && (
            <Textarea
              placeholder="Especificá el motivo del rechazo..."
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              rows={3}
            />
          )}
        </div>

        <DialogFooter>
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="text-slate-400 hover:text-white hover:bg-slate-800"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!isValid || isLoading}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Rechazando...
              </>
            ) : (
              'Confirmar rechazo'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
