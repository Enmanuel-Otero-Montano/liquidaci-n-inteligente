import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Clock } from 'lucide-react';
import { ModerationFilters } from '@/types/moderation';

interface ModerationHeaderProps {
  filters: ModerationFilters;
  onFiltersChange: (filters: ModerationFilters) => void;
  pendingCount: number;
}

export function ModerationHeader({ 
  filters, 
  onFiltersChange,
  pendingCount 
}: ModerationHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white">Cola de Moderación</h1>
            <Badge variant="secondary" className="bg-amber-500/20 text-amber-400 border-amber-500/30">
              {pendingCount} pendientes
            </Badge>
          </div>
          <p className="text-slate-400 mt-1">
            Revisá y aprobá los productos enviados por vendedores
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <Input
            placeholder="Buscar por título o vendedor..."
            value={filters.search || ''}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
            className="pl-9 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
          />
        </div>

        {/* Date filter */}
        <Select
          value={filters.dateRange || 'all'}
          onValueChange={(value) => 
            onFiltersChange({ ...filters, dateRange: value as ModerationFilters['dateRange'] })
          }
        >
          <SelectTrigger className="w-full sm:w-[180px] bg-slate-800 border-slate-700 text-white">
            <Clock className="h-4 w-4 mr-2 text-slate-400" />
            <SelectValue placeholder="Fecha" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            <SelectItem value="all" className="text-white">Todos</SelectItem>
            <SelectItem value="today" className="text-white">Hoy</SelectItem>
            <SelectItem value="week" className="text-white">Esta semana</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select
          value={filters.sortBy || 'date'}
          onValueChange={(value) => 
            onFiltersChange({ ...filters, sortBy: value as ModerationFilters['sortBy'] })
          }
        >
          <SelectTrigger className="w-full sm:w-[180px] bg-slate-800 border-slate-700 text-white">
            <SelectValue placeholder="Ordenar" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            <SelectItem value="date" className="text-white">Más antiguo primero</SelectItem>
            <SelectItem value="discount" className="text-white">Mayor descuento</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
