import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, X, MessageSquare, AlertTriangle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface ApprovalActionsProps {
  productId: string;
  discountPct: number;
  onApprove: () => void;
  onReject: () => void;
  onRequestChanges: () => void;
  isApproving?: boolean;
  size?: 'sm' | 'default';
}

export function ApprovalActions({
  discountPct,
  onApprove,
  onReject,
  onRequestChanges,
  isApproving,
  size = 'default',
}: ApprovalActionsProps) {
  const [showHighDiscountWarning, setShowHighDiscountWarning] = useState(false);
  const isHighDiscount = discountPct >= 70;

  const handleApprove = () => {
    if (isHighDiscount) {
      setShowHighDiscountWarning(true);
    } else {
      onApprove();
    }
  };

  const confirmApprove = () => {
    setShowHighDiscountWarning(false);
    onApprove();
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          size={size}
          onClick={handleApprove}
          disabled={isApproving}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          <Check className="h-4 w-4 mr-1" />
          Aprobar
        </Button>
        <Button
          size={size}
          variant="outline"
          onClick={onRequestChanges}
          className="border-amber-600 text-amber-500 hover:bg-amber-600/10"
        >
          <MessageSquare className="h-4 w-4 mr-1" />
          Pedir cambios
        </Button>
        <Button
          size={size}
          variant="outline"
          onClick={onReject}
          className="border-red-600 text-red-500 hover:bg-red-600/10"
        >
          <X className="h-4 w-4 mr-1" />
          Rechazar
        </Button>
      </div>

      {/* High discount warning dialog */}
      <AlertDialog open={showHighDiscountWarning} onOpenChange={setShowHighDiscountWarning}>
        <AlertDialogContent className="bg-slate-900 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Descuento muy alto
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Este producto tiene un descuento del {discountPct}%. Antes de aprobar, 
              verificá que el precio original sea legítimo y que la evidencia sea correcta.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmApprove}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Aprobar de todas formas
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
