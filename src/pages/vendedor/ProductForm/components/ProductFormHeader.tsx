import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface ProductFormHeaderProps {
  isEditing: boolean;
  productTitle?: string;
}

export function ProductFormHeader({ isEditing, productTitle }: ProductFormHeaderProps) {
  return (
    <div className="space-y-2">
      <Button variant="ghost" size="sm" asChild className="-ml-2">
        <Link to="/vendedor/productos">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a productos
        </Link>
      </Button>
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          {isEditing ? 'Editar producto' : 'Nuevo producto'}
        </h1>
        {isEditing && productTitle && (
          <p className="text-muted-foreground">{productTitle}</p>
        )}
        {!isEditing && (
          <p className="text-muted-foreground">
            Completá los datos del producto
          </p>
        )}
      </div>
    </div>
  );
}
