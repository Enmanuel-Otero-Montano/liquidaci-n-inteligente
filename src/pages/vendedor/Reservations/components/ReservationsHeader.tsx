import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';
import { ReservationStatus } from '@/types/reservation';

interface ReservationsHeaderProps {
  onSearchChange: (search: string) => void;
  onStatusChange: (status: ReservationStatus | 'all') => void;
  currentStatus: ReservationStatus | 'all';
  newCount: number;
}

export function ReservationsHeader({
  onSearchChange,
  onStatusChange,
  currentStatus,
  newCount,
}: ReservationsHeaderProps) {
  const [search, setSearch] = useState('');

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onSearchChange(value);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reservas</h1>
          <p className="text-muted-foreground">
            Gestiona las reservas de tus productos
            {newCount > 0 && (
              <span className="ml-2 text-blue-600 font-medium">
                ({newCount} nuevas)
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por comprador o producto..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={currentStatus} onValueChange={(v) => onStatusChange(v as ReservationStatus | 'all')}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filtrar estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="new">Nuevas</SelectItem>
            <SelectItem value="contacted">Contactadas</SelectItem>
            <SelectItem value="closed">Cerradas</SelectItem>
            <SelectItem value="lost">No concretadas</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
