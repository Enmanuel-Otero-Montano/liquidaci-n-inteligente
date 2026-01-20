import { Link } from 'react-router-dom';
import { PackageX, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ProductNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-md mx-auto text-center space-y-6">
        <div className="flex justify-center">
          <div className="rounded-full bg-muted p-6">
            <PackageX className="h-16 w-16 text-muted-foreground" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">
            Este producto ya no está disponible
          </h1>
          <p className="text-muted-foreground">
            Puede que se haya agotado o el vendedor lo haya retirado.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link to="/liquidaciones">
              <Search className="mr-2 h-4 w-4" />
              Ver otras liquidaciones
            </Link>
          </Button>
          
          <Button variant="outline" asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al inicio
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
