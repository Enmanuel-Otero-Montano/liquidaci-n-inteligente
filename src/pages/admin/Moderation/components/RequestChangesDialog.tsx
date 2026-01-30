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
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { CHANGE_REQUEST_SUGGESTIONS } from '@/types/moderation';
import { Loader2 } from 'lucide-react';

interface RequestChangesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (message: string) => void;
  isLoading?: boolean;
  productTitle?: string;
}

export function RequestChangesDialog({
  open,
  onOpenChange,
  onConfirm,
  isLoading,
  productTitle,
}: RequestChangesDialogProps) {
  const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>([]);
  const [customMessage, setCustomMessage] = useState('');

  const toggleSuggestion = (value: string) => {
    setSelectedSuggestions(prev =>
      prev.includes(value)
        ? prev.filter(s => s !== value)
        : [...prev, value]
    );
  };

  const handleConfirm = () => {
    const suggestions = selectedSuggestions
      .map(s => CHANGE_REQUEST_SUGGESTIONS.find(cs => cs.value === s)?.label)
      .filter(Boolean);
    
    const message = [...suggestions, customMessage.trim()]
      .filter(Boolean)
      .join('. ');
    
    onConfirm(message);
  };

  const isValid = selectedSuggestions.length > 0 || customMessage.trim().length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border-slate-700 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">Solicitar cambios</DialogTitle>
          <DialogDescription className="text-slate-400">
            {productTitle && (
              <span className="block mt-1 text-slate-300 font-medium">{productTitle}</span>
            )}
            Indicá qué cambios necesita el vendedor antes de aprobar.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-3">
            {CHANGE_REQUEST_SUGGESTIONS.map((suggestion) => (
              <div key={suggestion.value} className="flex items-center space-x-3">
                <Checkbox
                  id={suggestion.value}
                  checked={selectedSuggestions.includes(suggestion.value)}
                  onCheckedChange={() => toggleSuggestion(suggestion.value)}
                  className="border-slate-600 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                />
                <Label 
                  htmlFor={suggestion.value} 
                  className="text-slate-300 cursor-pointer"
                >
                  {suggestion.label}
                </Label>
              </div>
            ))}
          </div>

          <Textarea
            placeholder="Mensaje adicional para el vendedor (opcional)..."
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
            rows={3}
          />
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
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Enviando...
              </>
            ) : (
              'Enviar solicitud'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
