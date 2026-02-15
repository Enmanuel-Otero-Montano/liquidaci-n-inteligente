import { useState } from 'react';
import { useVerifyProduct } from '@/hooks/useVerification';
import { ProductWithSeller } from '@/types/moderation';
import { VERIFICATION_CONFIG } from '@/config/verification';
import { VerificationMethod } from '@/types/verification';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ExternalLink, Check } from 'lucide-react';

interface VerifyProductDialogProps {
  product: ProductWithSeller;
  isOpen: boolean;
  onClose: () => void;
}

export function VerifyProductDialog({ product, isOpen, onClose }: VerifyProductDialogProps) {
  const [verificationMethod, setVerificationMethod] = useState<VerificationMethod>('manual_url_check');
  const [notes, setNotes] = useState('');
  const verifyMutation = useVerifyProduct();

  const handleVerify = async () => {
    await verifyMutation.mutateAsync({
      productId: product.id,
      verificationMethod,
      notes: notes.trim() || undefined,
    });
    onClose();
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('es-UY', {
      style: 'currency',
      currency: 'UYU',
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader className="shrink-0">
          <DialogTitle>Verificar oferta</DialogTitle>
          <DialogDescription>
            Revisá la evidencia y confirmá que el descuento es real
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 overflow-y-auto flex-1 min-h-0 pr-1">
          {/* Product info */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 space-y-2">
            <h4 className="font-medium truncate">{product.title}</h4>
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm">
              <span className="text-muted-foreground">Antes:</span>
              <span className="line-through">{formatPrice(product.price_before)}</span>
              <span className="text-muted-foreground">→ Ahora:</span>
              <span className="font-semibold text-green-600">
                {formatPrice(product.price_now)}
              </span>
              <span className="text-lg font-bold text-primary">
                -{product.discount_pct}%
              </span>
            </div>
          </div>

          {/* Evidence provided */}
          <div className="space-y-3">
            <Label>Evidencia provista por el vendedor:</Label>

            {product.evidence_url ? (
              <Button
                variant="outline"
                size="sm"
                asChild
                className="w-full justify-start overflow-hidden"
              >
                <a
                  href={product.evidence_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-2 shrink-0" />
                  <span className="truncate">
                    {product.evidence_url}
                  </span>
                </a>
              </Button>
            ) : (
              <p className="text-sm text-muted-foreground">Sin URL de evidencia</p>
            )}

            {product.price_reference && (
              <div className="bg-slate-100 dark:bg-slate-800 rounded-md p-3">
                <p className="text-sm italic break-words">"{product.price_reference}"</p>
              </div>
            )}

            {!product.evidence_url && !product.price_reference && (
              <p className="text-sm text-amber-600">
                El vendedor no proporcionó evidencia. Verificá por otros medios.
              </p>
            )}
          </div>

          {/* Verification method */}
          <div className="space-y-3">
            <Label>¿Cómo verificaste el precio?</Label>
            <RadioGroup
              value={verificationMethod}
              onValueChange={(v) => setVerificationMethod(v as VerificationMethod)}
            >
              {Object.values(VERIFICATION_CONFIG.VERIFICATION_METHODS).map((method) => (
                <div key={method.value} className="flex items-start space-x-2">
                  <RadioGroupItem value={method.value} id={method.value} className="mt-1 shrink-0" />
                  <Label htmlFor={method.value} className="font-normal cursor-pointer">
                    <div>
                      <div className="font-medium text-sm">{method.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {method.description}
                      </div>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Optional notes */}
          <div className="space-y-2">
            <Label htmlFor="verify-notes">Notas (opcional)</Label>
            <Textarea
              id="verify-notes"
              placeholder="Ej: Verifiqué en MercadoLibre, el precio anterior coincide..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
            />
          </div>
        </div>

        <DialogFooter className="shrink-0 pt-4 border-t">
          <Button variant="outline" onClick={onClose} disabled={verifyMutation.isPending}>
            Cancelar
          </Button>
          <Button
            onClick={handleVerify}
            disabled={verifyMutation.isPending}
            className="gap-2"
          >
            <Check className="h-4 w-4" />
            {verifyMutation.isPending ? 'Verificando...' : 'Confirmar verificación'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
