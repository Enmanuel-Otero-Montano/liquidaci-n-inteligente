import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Store, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Home, 
  Lock, 
  Eye, 
  EyeOff, 
  Loader2 
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { ZONAS_URUGUAY } from '@/data/constants';

const registerSchema = z.object({
  nombre_comercial: z
    .string()
    .min(1, 'El nombre comercial es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres'),
  
  responsable: z
    .string()
    .min(1, 'El nombre del responsable es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres'),
  
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Ingresá un email válido'),
  
  telefono: z
    .string()
    .min(1, 'El teléfono es requerido')
    .regex(
      /^0?9[0-9]{7}$/,
      'Ingresá un número válido (ej: 099123456)'
    ),
  
  zona: z
    .string()
    .min(1, 'Seleccioná tu zona'),
  
  direccion: z
    .string()
    .optional(),
  
  password: z
    .string()
    .min(1, 'La contraseña es requerida')
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  
  confirmPassword: z
    .string()
    .min(1, 'Confirmá tu contraseña'),
  
  aceptaTerminos: z
    .boolean()
    .refine(val => val === true, {
      message: 'Debés aceptar los términos para continuar',
    }),
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  }
);

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register: authRegister } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nombre_comercial: '',
      responsable: '',
      email: '',
      telefono: '',
      zona: '',
      direccion: '',
      password: '',
      confirmPassword: '',
      aceptaTerminos: false,
    },
  });

  const aceptaTerminos = watch('aceptaTerminos');

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    try {
      await authRegister({
        nombre_comercial: data.nombre_comercial,
        responsable: data.responsable,
        email: data.email,
        telefono: data.telefono.replace(/\s/g, ''),
        zona: data.zona,
        direccion: data.direccion,
        password: data.password,
      });

      toast({
        title: '¡Cuenta creada!',
        description: 'Ya podés empezar a publicar tus productos.',
      });

      navigate('/vendedor', { replace: true });
    } catch (error) {
      const message = error instanceof Error 
        ? error.message 
        : 'Error al crear la cuenta';
      
      toast({
        variant: 'destructive',
        title: 'Error',
        description: message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Creá tu cuenta de vendedor
        </h1>
        <p className="text-muted-foreground">
          Empezá a publicar tus liquidaciones hoy mismo
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Nombre comercial */}
        <div className="space-y-2">
          <Label htmlFor="nombre_comercial">Nombre comercial</Label>
          <div className="relative">
            <Store className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="nombre_comercial"
              placeholder="Ej: Tienda de Juan"
              className="pl-10"
              disabled={isSubmitting}
              {...register('nombre_comercial')}
            />
          </div>
          {errors.nombre_comercial && (
            <p className="text-sm text-destructive">{errors.nombre_comercial.message}</p>
          )}
        </div>

        {/* Responsable */}
        <div className="space-y-2">
          <Label htmlFor="responsable">Nombre del responsable</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="responsable"
              placeholder="Tu nombre completo"
              className="pl-10"
              disabled={isSubmitting}
              {...register('responsable')}
            />
          </div>
          {errors.responsable && (
            <p className="text-sm text-destructive">{errors.responsable.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              className="pl-10"
              disabled={isSubmitting}
              {...register('email')}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Teléfono */}
        <div className="space-y-2">
          <Label htmlFor="telefono">Teléfono / WhatsApp</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="telefono"
              type="tel"
              placeholder="099 123 456"
              className="pl-10"
              disabled={isSubmitting}
              {...register('telefono')}
            />
          </div>
          {errors.telefono && (
            <p className="text-sm text-destructive">{errors.telefono.message}</p>
          )}
        </div>

        {/* Zona */}
        <div className="space-y-2">
          <Label htmlFor="zona">Departamento / Zona</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
            <Select
              disabled={isSubmitting}
              onValueChange={(value) => setValue('zona', value)}
            >
              <SelectTrigger className="pl-10">
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
          </div>
          {errors.zona && (
            <p className="text-sm text-destructive">{errors.zona.message}</p>
          )}
        </div>

        {/* Dirección (opcional) */}
        <div className="space-y-2">
          <Label htmlFor="direccion">
            Dirección <span className="text-muted-foreground">(opcional)</span>
          </Label>
          <div className="relative">
            <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="direccion"
              placeholder="Calle, número, ciudad"
              className="pl-10"
              disabled={isSubmitting}
              {...register('direccion')}
            />
          </div>
        </div>

        {/* Contraseña */}
        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Mínimo 6 caracteres"
              className="pl-10 pr-10"
              disabled={isSubmitting}
              {...register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password.message}</p>
          )}
        </div>

        {/* Confirmar contraseña */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Repetí tu contraseña"
              className="pl-10 pr-10"
              disabled={isSubmitting}
              {...register('confirmPassword')}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              tabIndex={-1}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Términos */}
        <div className="space-y-2">
          <div className="flex items-start gap-3">
            <Checkbox
              id="aceptaTerminos"
              checked={aceptaTerminos}
              onCheckedChange={(checked) => setValue('aceptaTerminos', checked === true)}
              disabled={isSubmitting}
              className="mt-0.5"
            />
            <Label htmlFor="aceptaTerminos" className="text-sm font-normal leading-relaxed cursor-pointer">
              Acepto los{' '}
              <Link to="/terminos" className="text-primary hover:underline">
                términos de publicación
              </Link>
              {' '}y me comprometo a publicar solo productos con descuento real ≥25%
            </Label>
          </div>
          {errors.aceptaTerminos && (
            <p className="text-sm text-destructive">{errors.aceptaTerminos.message}</p>
          )}
        </div>

        {/* Submit button */}
        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creando cuenta...
            </>
          ) : (
            'Crear cuenta'
          )}
        </Button>
      </form>

      {/* Login link */}
      <p className="mt-6 text-center text-sm text-muted-foreground">
        ¿Ya tenés cuenta?{' '}
        <Link
          to="/vendedor/login"
          className="font-medium text-primary hover:underline"
        >
          Iniciar sesión
        </Link>
      </p>
    </div>
  );
}
