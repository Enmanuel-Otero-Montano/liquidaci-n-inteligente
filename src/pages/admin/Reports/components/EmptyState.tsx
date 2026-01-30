import { FileWarning } from 'lucide-react';

interface EmptyStateProps {
  hasFilters?: boolean;
}

export function EmptyState({ hasFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="h-16 w-16 rounded-full bg-slate-800 flex items-center justify-center mb-4">
        <FileWarning className="h-8 w-8 text-slate-500" />
      </div>
      <h3 className="text-lg font-medium text-white mb-1">
        {hasFilters ? 'No hay reportes que coincidan' : 'Sin reportes pendientes'}
      </h3>
      <p className="text-sm text-slate-400 max-w-sm">
        {hasFilters
          ? 'Prueba ajustando los filtros de búsqueda para encontrar otros reportes.'
          : '¡Excelente! No hay reportes abiertos en este momento.'}
      </p>
    </div>
  );
}
