import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { Lock, Loader2, Save, Key, MessageSquare, MapPin, User, Building } from 'lucide-react';
import { Seller, UpdateProfileInput } from '@/types/seller';
import { useUpdateProfile } from '@/hooks/useProfile';

import { DEPARTAMENTOS_URUGUAY } from '@/data/constants';

const profileSchema = z.object({
  nombre_comercial: z.string().min(2, 'Mínimo 2 caracteres'),
  responsable: z.string().min(2, 'Mínimo 2 caracteres'),
  telefono: z.string()
    .regex(/^(\+598\s?)?0?9\d\s?\d{3}\s?\d{3}$/, 'Formato: 09X XXX XXX o +598 9X XXX XXX'),
  zona: z.string().min(1, 'Seleccioná una zona'),
  direccion: z.string().optional(),
  whatsapp_message: z.string().max(500, 'Máximo 500 caracteres').optional(),
  politicas: z.string().max(1000, 'Máximo 1000 caracteres').optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  user: Seller;
  onPasswordChange: () => void;
}

export function ProfileForm({ user, onPasswordChange }: ProfileFormProps) {
  const updateProfile = useUpdateProfile();
  const [hasChanges, setHasChanges] = useState(false);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nombre_comercial: user.nombre_comercial || '',
      responsable: user.responsable || '',
      telefono: user.telefono || '',
      zona: user.zona || '',
      direccion: user.direccion || '',
      whatsapp_message: user.whatsapp_message || '',
      politicas: user.politicas || '',
    },
  });

  // Watch for form changes
  useEffect(() => {
    const subscription = form.watch(() => {
      setHasChanges(form.formState.isDirty);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Preview del mensaje de WhatsApp
  const whatsappMessage = form.watch('whatsapp_message');
  const previewMessage = (whatsappMessage || 'Hola! Te escribo por tu producto {producto} en LiquiMarket...')
    .replace('{producto}', 'iPhone 13 Pro')
    .replace('{precio}', '$28.000');

  const onSubmit = async (data: ProfileFormData) => {
    const input: UpdateProfileInput = {
      nombre_comercial: data.nombre_comercial,
      responsable: data.responsable,
      telefono: data.telefono,
      zona: data.zona,
      direccion: data.direccion,
      whatsapp_message: data.whatsapp_message,
      politicas: data.politicas,
    };
    
    await updateProfile.mutateAsync(input);
    setHasChanges(false);
    form.reset(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Información básica */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Información del negocio</CardTitle>
            </div>
            <CardDescription>
              Datos públicos que verán los compradores
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="nombre_comercial"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre comercial *</FormLabel>
                  <FormControl>
                    <Input placeholder="Tu tienda o marca" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="responsable"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del responsable *</FormLabel>
                  <FormControl>
                    <Input placeholder="Tu nombre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  Email
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Lock className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>El email no se puede cambiar por seguridad</p>
                    </TooltipContent>
                  </Tooltip>
                </FormLabel>
                <Input
                  value={user.email}
                  disabled
                  className="bg-muted"
                />
              </FormItem>

              <FormField
                control={form.control}
                name="telefono"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono *</FormLabel>
                    <FormControl>
                      <Input placeholder="09X XXX XXX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Ubicación */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Ubicación</CardTitle>
            </div>
            <CardDescription>
              Dónde pueden retirar los productos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="zona"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Departamento *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccioná tu departamento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {DEPARTAMENTOS_URUGUAY.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="direccion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección completa</FormLabel>
                  <FormControl>
                    <Input placeholder="Calle, número, barrio (opcional)" {...field} />
                  </FormControl>
                  <FormDescription>
                    Esta dirección se usará como predeterminada para el retiro de productos
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Comunicación */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Comunicación</CardTitle>
            </div>
            <CardDescription>
              Configura cómo te contactan los compradores
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="whatsapp_message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensaje de WhatsApp predeterminado</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Hola! Te escribo por tu producto {producto} en LiquiMarket..."
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Usá <code className="bg-muted px-1 rounded">{'{producto}'}</code> y{' '}
                    <code className="bg-muted px-1 rounded">{'{precio}'}</code> como variables
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {whatsappMessage && (
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Vista previa:</p>
                <p className="text-sm">{previewMessage}</p>
              </div>
            )}

            <Separator className="my-4" />

            <FormField
              control={form.control}
              name="politicas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Políticas del vendedor</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ej: Acepto cambios dentro de las 48 horas. Solo efectivo o transferencia..."
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Se mostrarán en el detalle de tus productos
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Seguridad */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Key className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Seguridad</CardTitle>
            </div>
            <CardDescription>
              Gestiona el acceso a tu cuenta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Contraseña</p>
                <p className="text-sm text-muted-foreground">
                  {user.password_changed_at
                    ? `Última actualización: ${new Date(user.password_changed_at).toLocaleDateString('es-UY')}`
                    : 'Nunca actualizada'}
                </p>
              </div>
              <Button type="button" variant="outline" onClick={onPasswordChange}>
                <Key className="h-4 w-4 mr-2" />
                Cambiar contraseña
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-end gap-4 sticky bottom-4 p-4 bg-background/80 backdrop-blur-sm border rounded-lg">
          {hasChanges && (
            <p className="text-sm text-muted-foreground self-center">
              Tenés cambios sin guardar
            </p>
          )}
          <Button 
            type="submit" 
            disabled={updateProfile.isPending || !hasChanges}
            size="lg"
          >
            {updateProfile.isPending ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Guardar cambios
          </Button>
        </div>
      </form>
    </Form>
  );
}
