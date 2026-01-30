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
import { AlertTriangle } from 'lucide-react';
import { PenaltyType, penaltyConfig } from '@/types/adminReports';

interface PenalizeSellerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sellerName: string;
  onConfirm: (penalty: PenaltyType, note: string) => void;
  isLoading?: boolean;
}

export function PenalizeSellerDialog({
  open,
  onOpenChange,
  sellerName,
  onConfirm,
  isLoading,
}: PenalizeSellerDialogProps) {
  const [penalty, setPenalty] = useState<PenaltyType>('warning');
  const [note, setNote] = useState('');

  const handleConfirm = () => {
    if (!note.trim()) return;
    onConfirm(penalty, note.trim());
    setPenalty('warning');
    setNote('');
  };

  const handleCancel = () => {
    onOpenChange(false);
    setPenalty('warning');
    setNote('');
  };

  const isSuspension = penalty !== 'warning';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-amber-400">
            <AlertTriangle className="h-5 w-5" />
            Penalizar vendedor
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Aplicar una penalización a <strong className="text-white">{sellerName}</strong>.
            {isSuspension && (
              <span className="block mt-1 text-red-400">
                ⚠️ Esta acción suspenderá la cuenta del vendedor.
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Penalty selection */}
          <div className="space-y-3">
            <label className="text-sm text-slate-300">Tipo de penalización</label>
            <RadioGroup
              value={penalty}
              onValueChange={(value) => setPenalty(value as PenaltyType)}
              className="space-y-2"
            >
              {Object.entries(penaltyConfig).map(([key, config]) => (
                <div
                  key={key}
                  className={`flex items-start space-x-3 p-3 rounded-lg border transition-colors ${
                    penalty === key
                      ? 'border-amber-500/50 bg-amber-500/10'
                      : 'border-slate-700 bg-slate-800/50 hover:bg-slate-800'
                  }`}
                >
                  <RadioGroupItem
                    value={key}
                    id={key}
                    className="border-slate-500 text-amber-500"
                  />
                  <Label htmlFor={key} className="flex-1 cursor-pointer">
                    <span className="text-white font-medium">{config.label}</span>
                    <p className="text-sm text-slate-400 mt-0.5">{config.description}</p>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Note */}
          <div className="space-y-2">
            <label className="text-sm text-slate-300">
              Motivo de la penalización <span className="text-red-400">*</span>
            </label>
            <Textarea
              placeholder="Describa el motivo de la penalización..."
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
            variant={isSuspension ? 'destructive' : 'default'}
            onClick={handleConfirm}
            disabled={!note.trim() || isLoading}
            className={!isSuspension ? 'bg-amber-600 hover:bg-amber-700' : ''}
          >
            {isLoading
              ? 'Aplicando...'
              : isSuspension
              ? 'Suspender vendedor'
              : 'Emitir advertencia'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
