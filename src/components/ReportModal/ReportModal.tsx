import { AlertTriangle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ReportForm } from './ReportForm';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
  productTitle: string;
}

export function ReportModal({ isOpen, onClose, productId, productTitle }: ReportModalProps) {
  const handleSuccess = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[450px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <DialogTitle>Reportar publicación</DialogTitle>
              <DialogDescription>
                Ayudanos a mantener la plataforma segura
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <ReportForm
          productId={productId}
          productTitle={productTitle}
          onClose={onClose}
          onSuccess={handleSuccess}
        />
      </DialogContent>
    </Dialog>
  );
}
