import { useState } from 'react';
import { Search, FileWarning } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ReportFilters, ReportReason, ReportStatus, reasonConfig } from '@/types/adminReports';

interface ReportsHeaderProps {
  filters: ReportFilters;
  onFiltersChange: (filters: ReportFilters) => void;
  openCount: number;
  resolvedCount: number;
}

export function ReportsHeader({
  filters,
  onFiltersChange,
  openCount,
  resolvedCount,
}: ReportsHeaderProps) {
  const [searchValue, setSearchValue] = useState(filters.search || '');

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    onFiltersChange({ ...filters, search: value });
  };

  const handleStatusChange = (value: string) => {
    onFiltersChange({
      ...filters,
      status: value as ReportStatus | 'all',
    });
  };

  const handleReasonChange = (value: string) => {
    onFiltersChange({
      ...filters,
      reason: value as ReportReason | 'all',
    });
  };

  const handleSortChange = (value: string) => {
    onFiltersChange({
      ...filters,
      sortBy: value as ReportFilters['sortBy'],
    });
  };

  return (
    <div className="space-y-4">
      {/* Title and counts */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <FileWarning className="h-6 w-6 text-amber-400" />
          <h1 className="text-2xl font-bold text-white">Reportes</h1>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="destructive" className="bg-red-600/20 text-red-400 hover:bg-red-600/30">
            {openCount} abiertos
          </Badge>
          <Badge variant="secondary" className="bg-slate-700 text-slate-300">
            {resolvedCount} resueltos
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Buscar por producto, vendedor, motivo..."
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9 bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
          />
        </div>

        {/* Status filter */}
        <Select value={filters.status || 'all'} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-full sm:w-[150px] bg-slate-800 border-slate-700 text-white">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            <SelectItem value="all" className="text-white hover:bg-slate-700">
              Todos
            </SelectItem>
            <SelectItem value="open" className="text-white hover:bg-slate-700">
              Abiertos
            </SelectItem>
            <SelectItem value="resolved" className="text-white hover:bg-slate-700">
              Resueltos
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Reason filter */}
        <Select value={filters.reason || 'all'} onValueChange={handleReasonChange}>
          <SelectTrigger className="w-full sm:w-[180px] bg-slate-800 border-slate-700 text-white">
            <SelectValue placeholder="Motivo" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            <SelectItem value="all" className="text-white hover:bg-slate-700">
              Todos los motivos
            </SelectItem>
            {Object.entries(reasonConfig).map(([key, { label }]) => (
              <SelectItem key={key} value={key} className="text-white hover:bg-slate-700">
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select value={filters.sortBy || 'created_at'} onValueChange={handleSortChange}>
          <SelectTrigger className="w-full sm:w-[150px] bg-slate-800 border-slate-700 text-white">
            <SelectValue placeholder="Ordenar" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            <SelectItem value="created_at" className="text-white hover:bg-slate-700">
              Fecha
            </SelectItem>
            <SelectItem value="status" className="text-white hover:bg-slate-700">
              Estado
            </SelectItem>
            <SelectItem value="reason" className="text-white hover:bg-slate-700">
              Motivo
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
