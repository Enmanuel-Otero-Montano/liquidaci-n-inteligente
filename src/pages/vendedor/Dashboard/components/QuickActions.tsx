import { Link } from 'react-router-dom';
import { Plus, Package, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

export function QuickActions() {
  const { seller } = useAuth();
  const canPublish = seller?.status === 'active';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Acciones rápidas</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        {canPublish ? (
          <Button asChild className="w-full justify-start gap-3 h-12">
            <Link to="/vendedor/productos/nuevo">
              <Plus className="h-5 w-5" />
              Publicar producto
            </Link>
          </Button>
        ) : (
          <Button disabled className="w-full justify-start gap-3 h-12">
            <Plus className="h-5 w-5" />
            Publicar producto
          </Button>
        )}
        
        <Button asChild variant="outline" className="w-full justify-start gap-3 h-12">
          <Link to="/vendedor/productos">
            <Package className="h-5 w-5" />
            Ver mis productos
          </Link>
        </Button>
        
        <Button asChild variant="outline" className="w-full justify-start gap-3 h-12">
          <Link to="/vendedor/reservas">
            <ClipboardList className="h-5 w-5" />
            Gestionar reservas
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
