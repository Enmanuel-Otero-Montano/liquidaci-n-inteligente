import { useState } from 'react';
import { SellerLayout } from '@/components/layouts/SellerLayout';
import { ProfileHeader } from './components/ProfileHeader';
import { ProfileForm } from './components/ProfileForm';
import { ChangePasswordModal } from './components/ChangePasswordModal';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { Seller } from '@/types/seller';

export function ProfilePage() {
  const { seller, isLoading } = useAuth();
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  if (isLoading) {
    return (
      <SellerLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </SellerLayout>
    );
  }

  if (!seller) {
    return null;
  }

  // Map seller profile to Seller type for existing components
  const sellerAsSeller: Seller = {
    id: seller.id,
    nombre_comercial: seller.nombre_comercial,
    responsable: seller.responsable ?? undefined,
    email: seller.email,
    telefono: seller.telefono,
    zona: seller.zona,
    direccion: seller.direccion ?? undefined,
    politicas: seller.politicas ?? undefined,
    horario_retiro: seller.horario_retiro ?? undefined,
    whatsapp_message: seller.whatsapp_message ?? undefined,
    status: seller.status,
    created_at: seller.created_at,
    profile_image: seller.profile_image_url ?? undefined,
  };

  return (
    <SellerLayout>
      <div className="space-y-6 max-w-3xl">
        <ProfileHeader user={sellerAsSeller} />
        
        <ProfileForm 
          user={sellerAsSeller} 
          onPasswordChange={() => setPasswordModalOpen(true)} 
        />

        <ChangePasswordModal
          open={passwordModalOpen}
          onOpenChange={setPasswordModalOpen}
        />
      </div>
    </SellerLayout>
  );
}
