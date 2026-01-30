import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Users } from 'lucide-react';
import { SellerFilters } from '@/types/adminSeller';
import { SellerStatus } from '@/types/seller';

interface SellersHeaderProps {
  filters: SellerFilters;
  onFiltersChange: (filters: SellerFilters) => void;
  totalSellers: number;
  statusCounts: Record<SellerStatus, number>;
}

export function SellersHeader({
  filters,
  onFiltersChange,
  totalSellers,
  statusCounts,
}: SellersHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-slate-800 flex items-center justify-center">
            <Users className="h-5 w-5 text-slate-300" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-100">
              Gestión de Vendedores
            </h1>
            <p className="text-sm text-slate-400">
              {totalSellers} vendedores registrados
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 text-sm">
          <span className="px-2 py-1 rounded bg-green-500/20 text-green-400">
            {statusCounts.active || 0} activos
          </span>
          <span className="px-2 py-1 rounded bg-amber-500/20 text-amber-400">
            {statusCounts.pending || 0} pendientes
          </span>
          <span className="px-2 py-1 rounded bg-red-500/20 text-red-400">
            {statusCounts.suspended || 0} suspendidos
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <Input
            placeholder="Buscar por nombre, email o zona..."
            className="pl-9 bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
            value={filters.search || ''}
            onChange={(e) =>
              onFiltersChange({ ...filters, search: e.target.value })
            }
          />
        </div>

        <Select
          value={filters.status?.toString() || 'all'}
          onValueChange={(value) =>
            onFiltersChange({
              ...filters,
              status: value as SellerStatus | 'all',
            })
          }
        >
          <SelectTrigger className="w-full sm:w-[160px] bg-slate-800/50 border-slate-700 text-slate-100">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            <SelectItem value="all" className="text-slate-100">
              Todos
            </SelectItem>
            <SelectItem value="active" className="text-slate-100">
              Activos
            </SelectItem>
            <SelectItem value="pending" className="text-slate-100">
              Pendientes
            </SelectItem>
            <SelectItem value="suspended" className="text-slate-100">
              Suspendidos
            </SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={
            filters.verified === undefined || filters.verified === 'all'
              ? 'all'
              : filters.verified
              ? 'verified'
              : 'unverified'
          }
          onValueChange={(value) =>
            onFiltersChange({
              ...filters,
              verified:
                value === 'all' ? 'all' : value === 'verified' ? true : false,
            })
          }
        >
          <SelectTrigger className="w-full sm:w-[160px] bg-slate-800/50 border-slate-700 text-slate-100">
            <SelectValue placeholder="Verificación" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            <SelectItem value="all" className="text-slate-100">
              Todos
            </SelectItem>
            <SelectItem value="verified" className="text-slate-100">
              Verificados
            </SelectItem>
            <SelectItem value="unverified" className="text-slate-100">
              No verificados
            </SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.sortBy || 'created_at'}
          onValueChange={(value) =>
            onFiltersChange({
              ...filters,
              sortBy: value as 'created_at' | 'nombre_comercial' | 'total_products',
            })
          }
        >
          <SelectTrigger className="w-full sm:w-[180px] bg-slate-800/50 border-slate-700 text-slate-100">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            <SelectItem value="created_at" className="text-slate-100">
              Fecha registro
            </SelectItem>
            <SelectItem value="nombre_comercial" className="text-slate-100">
              Nombre
            </SelectItem>
            <SelectItem value="total_products" className="text-slate-100">
              Productos
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
