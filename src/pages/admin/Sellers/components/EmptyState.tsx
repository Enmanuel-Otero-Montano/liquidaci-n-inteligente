import { Users } from 'lucide-react';

interface EmptyStateProps {
  hasFilters?: boolean;
}

export function EmptyState({ hasFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="h-16 w-16 rounded-full bg-slate-800 flex items-center justify-center mb-4">
        <Users className="h-8 w-8 text-slate-500" />
      </div>
      <h3 className="text-lg font-medium text-slate-200 mb-2">
        {hasFilters ? 'No se encontraron vendedores' : 'Sin vendedores registrados'}
      </h3>
      <p className="text-slate-400 text-center max-w-sm">
        {hasFilters
          ? 'Probá ajustando los filtros de búsqueda para encontrar lo que buscás.'
          : 'Los vendedores registrados aparecerán aquí para su gestión.'}
      </p>
    </div>
  );
}
