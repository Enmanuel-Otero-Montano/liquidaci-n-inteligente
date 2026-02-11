import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Package, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface EmptyStateProps {
  hasFilters?: boolean;
}

export function EmptyState({ hasFilters }: EmptyStateProps) {
  if (hasFilters) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Package className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">
          No hay resultados
        </h3>
        <p className="text-muted-foreground max-w-sm">
          No encontramos productos que coincidan con tu búsqueda. Probá ajustando los filtros.
        </p>
      </div>
    );
  }

  const { seller } = useAuth();
  const canPublish = seller?.status === 'active';

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <Package className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-lg font-semibold mb-2">
        Aún no tenés productos
      </h3>
      <p className="text-muted-foreground max-w-sm mb-6">
        Publicá tu primer producto en liquidación y empezá a recibir reservas de compradores interesados.
      </p>
      {canPublish ? (
        <Button asChild>
          <Link to="/vendedor/productos/nuevo">
            <Plus className="mr-2 h-4 w-4" />
            Publicar producto
          </Link>
        </Button>
      ) : (
        <Button disabled>
          <Plus className="mr-2 h-4 w-4" />
          Publicar producto
        </Button>
      )}
    </div>
  );
}
