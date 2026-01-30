import { useState } from 'react';
import { SellerLayout } from '@/components/layouts/SellerLayout';
import { ProfileHeader } from './components/ProfileHeader';
import { ProfileForm } from './components/ProfileForm';
import { ChangePasswordModal } from './components/ChangePasswordModal';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

export function ProfilePage() {
  const { user, isLoading } = useAuth();
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

  if (!user) {
    return null;
  }

  return (
    <SellerLayout>
      <div className="space-y-6 max-w-3xl">
        <ProfileHeader user={user} />
        
        <ProfileForm 
          user={user} 
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
