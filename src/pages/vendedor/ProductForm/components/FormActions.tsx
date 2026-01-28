import { Button } from '@/components/ui/button';
import { Loader2, Save, Send } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface FormActionsProps {
  isValidDiscount: boolean;
  isSubmitting: boolean;
  isEditing: boolean;
  wasApproved: boolean;
  onSaveDraft: () => void;
  onSubmitForApproval: () => void;
}

export function FormActions({
  isValidDiscount,
  isSubmitting,
  isEditing,
  wasApproved,
  onSaveDraft,
  onSubmitForApproval,
}: FormActionsProps) {
  return (
    <div className="space-y-4">
      {wasApproved && (
        <Alert variant="default" className="border-amber-200 bg-amber-50 dark:bg-amber-950/20">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-700 dark:text-amber-400">
            Este producto ya estaba aprobado. Si lo modificás, volverá a estado "Pendiente" 
            y deberá ser revisado nuevamente.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onSaveDraft}
          disabled={isSubmitting}
          className="flex-1"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Guardar borrador
        </Button>

        <Button
          type="button"
          onClick={onSubmitForApproval}
          disabled={!isValidDiscount || isSubmitting}
          className="flex-1"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Send className="h-4 w-4 mr-2" />
          )}
          Enviar a aprobación
        </Button>
      </div>

      {!isValidDiscount && (
        <p className="text-sm text-red-600 text-center">
          El descuento debe ser de al menos 25% para enviar a aprobación
        </p>
      )}
    </div>
  );
}
