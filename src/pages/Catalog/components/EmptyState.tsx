import { PackageSearch } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  onClearFilters: () => void;
}

export function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="rounded-full bg-muted p-4 mb-4">
        <PackageSearch className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        No encontramos liquidaciones
      </h3>
      <p className="text-muted-foreground max-w-md mb-6">
        No hay productos que coincidan con esos filtros. 
        Probá bajando el % de descuento o quitando algunos filtros.
      </p>
      <Button 
        onClick={onClearFilters}
        variant="outline"
        className="border-catalog-primary text-catalog-primary hover:bg-catalog-primary hover:text-white"
      >
        Limpiar filtros
      </Button>
    </div>
  );
}
