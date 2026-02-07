import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Product } from '@/types/product';
import { Seller } from '@/types/seller';
import { useToast } from '@/hooks/use-toast';
import { useCreateLead } from '@/hooks/useCreateLead';
import { Loader2, Send } from 'lucide-react';

const createReservationSchema = (maxStock: number) => z.object({
  buyer_name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  buyer_contact: z.string()
    .min(1, 'Ingresá un email o teléfono')
    .refine(
      (val) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^(\+598\s?9\d|09\d)\s?\d{3}\s?\d{3}$/;
        return emailRegex.test(val) || phoneRegex.test(val);
      },
      'Ingresá un email válido o teléfono uruguayo (ej: 099 123 456 o +598 99 123 456)'
    ),
  quantity: z.number()
    .min(1, 'Mínimo 1 unidad')
    .max(maxStock, `Máximo ${maxStock} unidades disponibles`),
  note: z.string().max(500, 'Máximo 500 caracteres').optional(),
});

type ReservationFormData = z.infer<ReturnType<typeof createReservationSchema>>;

interface ReservationFormProps {
  product: Product;
  seller?: Seller;
  onSuccess: () => void;
}

export function ReservationForm({ product, seller, onSuccess }: ReservationFormProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const createLead = useCreateLead();

  const reservationSchema = createReservationSchema(product.stock_qty);

  const form = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      buyer_name: '',
      buyer_contact: '',
      quantity: 1,
      note: '',
    },
  });

  const onSubmit = async (data: ReservationFormData) => {
    try {
      const lead = await createLead.mutateAsync({
        product_id: product.id,
        buyer_name: data.buyer_name,
        buyer_contact: data.buyer_contact,
        quantity: data.quantity,
        note: data.note || undefined,
      });
      
      toast({
        title: '¡Reserva enviada con éxito!',
        description: 'El vendedor recibirá tu solicitud.',
      });
      
      form.reset();
      onSuccess();

      // Navigate to confirmation page with state
      navigate('/reserva-ok', {
        state: {
          lead,
          product,
          seller,
        },
      });
    } catch {
      toast({
        title: 'Error al enviar',
        description: 'Hubo un problema. Por favor intentá de nuevo.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="buyer_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Tu nombre" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="buyer_contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contacto</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Email o teléfono (ej: 099 123 456)" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Te contactaremos por este medio
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cantidad</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min={1} 
                  max={product.stock_qty}
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                />
              </FormControl>
              <FormDescription>
                {product.stock_qty} unidades disponibles
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comentario (opcional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="¿Alguna consulta adicional?"
                  className="resize-none"
                  rows={3}
                  maxLength={500}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" 
          size="lg"
          disabled={createLead.isPending}
        >
          {createLead.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Enviar reserva
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
