import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { UpdateProfileInput } from '@/types/seller';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

export function useUpdateProfile() {
  const { seller, updateSeller } = useAuth();

  return useMutation({
    mutationFn: async (data: UpdateProfileInput) => {
      if (!seller?.id) throw new Error('Usuario no autenticado');

      const { data: updated, error } = await supabase
        .from('sellers')
        .update({
          nombre_comercial: data.nombre_comercial,
          responsable: data.responsable,
          telefono: data.telefono,
          zona: data.zona,
          direccion: data.direccion || null,
          whatsapp_message: data.whatsapp_message || null,
          politicas: data.politicas || null,
          horario_retiro: data.horario_retiro || null,
          profile_image_url: data.profile_image || null,
        })
        .eq('id', seller.id)
        .select()
        .single();

      if (error) throw error;
      return updated;
    },
    onSuccess: (updatedSeller) => {
      updateSeller(updatedSeller);
      toast({
        title: 'Perfil actualizado',
        description: 'Los cambios se guardaron correctamente',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'No se pudo actualizar el perfil',
        variant: 'destructive',
      });
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: async ({ newPassword }: { currentPassword: string; newPassword: string }) => {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      return { success: true };
    },
    onSuccess: () => {
      toast({
        title: 'Contraseña actualizada',
        description: 'Tu contraseña se cambió correctamente',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'No se pudo cambiar la contraseña',
        variant: 'destructive',
      });
    },
  });
}
