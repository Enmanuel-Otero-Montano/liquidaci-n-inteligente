import { useMutation } from '@tanstack/react-query';
import { mockUpdateProfile, mockChangePassword } from '@/mocks/auth';
import { UpdateProfileInput } from '@/types/seller';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

export function useUpdateProfile() {
  const { user, updateUser } = useAuth();
  
  return useMutation({
    mutationFn: (data: UpdateProfileInput) => {
      if (!user?.id) throw new Error('Usuario no autenticado');
      return mockUpdateProfile(user.id, data);
    },
    onSuccess: (updatedSeller) => {
      updateUser(updatedSeller);
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
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: ({ currentPassword, newPassword }: { currentPassword: string; newPassword: string }) => {
      if (!user?.id) throw new Error('Usuario no autenticado');
      return mockChangePassword(user.id, currentPassword, newPassword);
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
