import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { ContactMethodTabs } from './ContactMethodTabs';
import { CategorySelector } from './CategorySelector';
import { ZONAS_URUGUAY, FRECUENCIAS } from '@/data/constants';
import { subscribe } from '@/services/subscriptionService';
import type { SubscriptionFormData } from '@/types/subscription';

const subscriptionSchema = z.object({
  nombre: z
    .string()
    .min(1, 'El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres'),
  
  metodoContacto: z.enum(['email', 'whatsapp']),
  
  email: z
    .string()
    .optional(),
  
  whatsapp: z
    .string()
    .optional(),
  
  categorias: z
    .array(z.string())
    .min(1, 'Seleccioná al menos una categoría'),
  
  zona: z
    .string({ required_error: 'Seleccioná tu zona' })
    .min(1, 'Seleccioná tu zona'),
  
  frecuencia: z
    .string()
    .default('inmediato'),
}).superRefine((data, ctx) => {
  if (data.metodoContacto === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Ingresá un email válido',
        path: ['email'],
      });
    }
  }
  if (data.metodoContacto === 'whatsapp') {
    const phoneRegex = /^0?9[0-9]{7}$/;
    if (!data.whatsapp || !phoneRegex.test(data.whatsapp.replace(/\s/g, ''))) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Ingresá un WhatsApp válido (ej: 099 123 456)',
        path: ['whatsapp'],
      });
    }
  }
});

type FormData = z.infer<typeof subscriptionSchema>;

export function SuscripcionForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactMethod, setContactMethod] = useState<'email' | 'whatsapp'>('email');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      metodoContacto: 'email',
      frecuencia: 'inmediato',
      categorias: [],
    },
  });

  const handleContactMethodChange = (method: 'email' | 'whatsapp') => {
    setContactMethod(method);
    setValue('metodoContacto', method);
    // Limpiar el campo del otro método
    if (method === 'email') {
      setValue('whatsapp', '');
    } else {
      setValue('email', '');
    }
  };

  const handleCategoriesChange = (categories: string[]) => {
    setSelectedCategories(categories);
    setValue('categorias', categories, { shouldValidate: true });
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      const subscriber = await subscribe(data as SubscriptionFormData);
      navigate('/suscripcion-ok', { state: { subscriber } });
    } catch (error) {
      console.error('Error al suscribirse:', error);
      toast({
        title: 'Error',
        description:
          error instanceof Error && error.message
            ? error.message
            : 'Hubo un error inesperado. Intentá de nuevo en unos minutos.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Nombre */}
      <div className="space-y-2">
        <Label htmlFor="nombre">Tu nombre</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="nombre"
            placeholder="Tu nombre"
            className="pl-10"
            {...register('nombre')}
          />
        </div>
        {errors.nombre && (
          <p className="text-sm text-destructive">{errors.nombre.message}</p>
        )}
      </div>

      {/* Método de contacto */}
      <ContactMethodTabs value={contactMethod} onChange={handleContactMethodChange} />

      {/* Email o WhatsApp según selección */}
      {contactMethod === 'email' ? (
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              className="pl-10"
              {...register('email')}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <Label htmlFor="whatsapp">WhatsApp</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="whatsapp"
              type="tel"
              inputMode="numeric"
              placeholder="099 123 456"
              className="pl-10"
              {...register('whatsapp')}
            />
          </div>
          {errors.whatsapp && (
            <p className="text-sm text-destructive">{errors.whatsapp.message}</p>
          )}
        </div>
      )}

      {/* Categorías */}
      <CategorySelector
        selected={selectedCategories}
        onChange={handleCategoriesChange}
        error={errors.categorias?.message}
      />

      {/* Zona */}
      <div className="space-y-2">
        <Label htmlFor="zona">¿De qué zona sos?</Label>
        <Select onValueChange={(value) => setValue('zona', value, { shouldValidate: true })}>
          <SelectTrigger id="zona">
            <SelectValue placeholder="Seleccioná tu zona" />
          </SelectTrigger>
          <SelectContent>
            {ZONAS_URUGUAY.map((zona) => (
              <SelectItem key={zona.value} value={zona.value}>
                {zona.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.zona && (
          <p className="text-sm text-destructive">{errors.zona.message}</p>
        )}
      </div>

      {/* Frecuencia */}
      <div className="space-y-3">
        <Label>¿Con qué frecuencia querés recibir notificaciones?</Label>
        <RadioGroup
          defaultValue="inmediato"
          onValueChange={(value) => setValue('frecuencia', value)}
        >
          {FRECUENCIAS.map((freq) => (
            <div key={freq.value} className="flex items-center space-x-2">
              <RadioGroupItem value={freq.value} id={`freq-${freq.value}`} />
              <Label htmlFor={`freq-${freq.value}`} className="cursor-pointer font-normal">
                {freq.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Submit */}
      <Button 
        type="submit" 
        size="lg" 
        className="w-full bg-accent hover:bg-accent/90"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Suscribiendo...
          </>
        ) : (
          'Avisarme de ofertas'
        )}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        Sin spam. Podés desuscribirte cuando quieras.
      </p>
    </form>
  );
}
