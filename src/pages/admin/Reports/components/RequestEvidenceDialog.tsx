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
import { Badge } from '@/components/ui/badge';
import { MessageSquare } from 'lucide-react';

const EVIDENCE_SUGGESTIONS = [
  'Adjuntar evidencia del precio original',
  'Aclarar condición del producto',
  'Corregir información de retiro/envío',
  'Proporcionar factura o comprobante',
];

interface RequestEvidenceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sellerName: string;
  onConfirm: (message: string) => void;
  isLoading?: boolean;
}

export function RequestEvidenceDialog({
  open,
  onOpenChange,
  sellerName,
  onConfirm,
  isLoading,
}: RequestEvidenceDialogProps) {
  const [message, setMessage] = useState('');

  const handleSuggestionClick = (suggestion: string) => {
    setMessage((prev) => {
      if (prev.includes(suggestion)) return prev;
      return prev ? `${prev}\n• ${suggestion}` : `• ${suggestion}`;
    });
  };

  const handleConfirm = () => {
    if (!message.trim()) return;
    onConfirm(message.trim());
    setMessage('');
  };

  const handleCancel = () => {
    onOpenChange(false);
    setMessage('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-400" />
            Solicitar evidencia al vendedor
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Se enviará una notificación a <strong className="text-white">{sellerName}</strong> solicitando la información indicada.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Quick suggestions */}
          <div className="space-y-2">
            <label className="text-sm text-slate-300">Sugerencias rápidas</label>
            <div className="flex flex-wrap gap-2">
              {EVIDENCE_SUGGESTIONS.map((suggestion) => (
                <Badge
                  key={suggestion}
                  variant="outline"
                  className="cursor-pointer border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  + {suggestion}
                </Badge>
              ))}
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label className="text-sm text-slate-300">
              Mensaje al vendedor <span className="text-red-400">*</span>
            </label>
            <Textarea
              placeholder="Describa qué información o evidencia necesita el vendedor proporcionar..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 min-h-[120px]"
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
            disabled={!message.trim() || isLoading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? 'Enviando...' : 'Enviar solicitud'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
