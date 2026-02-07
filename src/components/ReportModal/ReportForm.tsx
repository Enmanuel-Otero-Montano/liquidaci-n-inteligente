import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { REPORT_REASONS } from '@/data/constants';
import { supabase } from '@/integrations/supabase/client';

const reportSchema = z.object({
  reason: z.enum(['descuento_enganoso', 'producto_no_coincide', 'stock_inexistente', 'otro'], {
    required_error: 'Seleccioná un motivo',
  }),
  comment: z
    .string()
    .max(500, 'Máximo 500 caracteres')
    .optional(),
  email: z
    .string()
    .email('Ingresá un email válido')
    .optional()
    .or(z.literal('')),
}).refine(
  (data) => {
    if (data.reason === 'otro') {
      return data.comment && data.comment.trim().length >= 10;
    }
    return true;
  },
  {
    message: 'Por favor, describí el problema (mínimo 10 caracteres)',
    path: ['comment'],
  }
);

type ReportFormData = z.infer<typeof reportSchema>;

interface ReportFormProps {
  productId: string;
  productTitle: string;
  onClose: () => void;
  onSuccess: () => void;
}

export function ReportForm({ productId, productTitle, onClose, onSuccess }: ReportFormProps) {
  const { toast } = useToast();

  const form = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      reason: undefined,
      comment: '',
      email: '',
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const watchedReason = form.watch('reason');
  const watchedComment = form.watch('comment') || '';

  const onSubmit = async (data: ReportFormData) => {
    try {
      const { error } = await supabase.from('reports').insert({
        product_id: productId,
        reason: data.reason,
        description: data.comment || null,
        reporter_email: data.email || null,
      });

      if (error) throw error;

      toast({
        title: 'Reporte enviado',
        description: 'Gracias por tu reporte. Lo revisaremos pronto.',
      });

      onSuccess();
    } catch {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No pudimos enviar el reporte. Intentá de nuevo.',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Producto reportado */}
        <div className="bg-muted rounded-lg p-3">
          <p className="text-sm text-muted-foreground">Producto:</p>
          <p className="font-medium text-sm line-clamp-2">{productTitle}</p>
        </div>

        {/* Motivo del reporte */}
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <Label className="text-base font-medium">¿Cuál es el problema?</Label>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="mt-3 space-y-3"
                >
                  {REPORT_REASONS.map((reason) => (
                    <div
                      key={reason.value}
                      className="flex items-start space-x-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => field.onChange(reason.value)}
                    >
                      <RadioGroupItem value={reason.value} id={reason.value} className="mt-0.5" />
                      <div className="flex-1">
                        <Label 
                          htmlFor={reason.value} 
                          className="font-medium cursor-pointer"
                        >
                          {reason.label}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {reason.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Comentario */}
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <Label>
                Contanos más detalles
                {watchedReason === 'otro' && <span className="text-destructive ml-1">*</span>}
              </Label>
              <FormControl>
                <Textarea
                  placeholder="Contanos más detalles sobre el problema..."
                  className="min-h-[100px] resize-none"
                  maxLength={500}
                  {...field}
                />
              </FormControl>
              <div className="flex justify-between items-center">
                <FormMessage />
                <span className="text-xs text-muted-foreground ml-auto">
                  {watchedComment.length}/500
                </span>
              </div>
            </FormItem>
          )}
        />

        {/* Email opcional */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <Label>Email de contacto (opcional)</Label>
              <FormControl>
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  {...field}
                />
              </FormControl>
              <p className="text-xs text-muted-foreground">
                Para contactarte si necesitamos más información
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Acciones */}
        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="destructive"
            disabled={isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              'Enviar reporte'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
