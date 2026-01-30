import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Seller } from '@/types/seller';

interface ProfileHeaderProps {
  user: Seller;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const initials = user.nombre_comercial
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-16 w-16">
        <AvatarFallback className="text-xl bg-primary text-primary-foreground">
          {initials}
        </AvatarFallback>
      </Avatar>
      <div>
        <h1 className="text-2xl font-bold">{user.nombre_comercial}</h1>
        <p className="text-muted-foreground">{user.email}</p>
        {user.status && (
          <Badge 
            variant={user.status === 'active' ? 'default' : 'secondary'}
            className="mt-1"
          >
            {user.status === 'active' ? 'Activo' : user.status === 'pending' ? 'Pendiente' : 'Suspendido'}
          </Badge>
        )}
      </div>
    </div>
  );
}
