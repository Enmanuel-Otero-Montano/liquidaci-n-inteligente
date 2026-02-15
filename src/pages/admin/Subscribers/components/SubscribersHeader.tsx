import { Search, Mail, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SubscriberFilters } from '@/hooks/useSubscribers';
import { CATEGORIAS, DEPARTAMENTOS_URUGUAY } from '@/data/constants';

interface SubscribersHeaderProps {
  totalCount: number;
  filters: SubscriberFilters;
  onFilterChange: (key: keyof SubscriberFilters, value: string | undefined) => void;
}

export function SubscribersHeader({ totalCount, filters, onFilterChange }: SubscribersHeaderProps) {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-white">Suscriptores</h1>
        <p className="text-slate-400">
          {totalCount} {totalCount === 1 ? 'persona suscrita' : 'personas suscritas'} a las notificaciones
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Buscar por nombre o contacto..."
            value={filters.search || ''}
            onChange={(e) => onFilterChange('search', e.target.value || undefined)}
            className="pl-9 bg-slate-800 border-slate-700 text-white"
          />
        </div>

        <Select
          value={filters.metodo_contacto || 'all'}
          onValueChange={(v) => onFilterChange('metodo_contacto', v as SubscriberFilters['metodo_contacto'])}
        >
          <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
            <SelectValue placeholder="Método" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            <SelectItem value="all" className="text-white hover:bg-slate-700">
              Todos los métodos
            </SelectItem>
            <SelectItem value="email" className="text-white hover:bg-slate-700">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </div>
            </SelectItem>
            <SelectItem value="whatsapp" className="text-white hover:bg-slate-700">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                WhatsApp
              </div>
            </SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.categoria || 'all'}
          onValueChange={(v) => onFilterChange('categoria', v === 'all' ? undefined : v)}
        >
          <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            <SelectItem value="all" className="text-white hover:bg-slate-700">
              Todas las categorías
            </SelectItem>
            {CATEGORIAS.filter(c => c.value !== 'todas').map((cat) => (
              <SelectItem
                key={cat.value}
                value={cat.label}
                className="text-white hover:bg-slate-700"
              >
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.zona || 'all'}
          onValueChange={(v) => onFilterChange('zona', v === 'all' ? undefined : v)}
        >
          <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
            <SelectValue placeholder="Zona" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            <SelectItem value="all" className="text-white hover:bg-slate-700">
              Todas las zonas
            </SelectItem>
            {DEPARTAMENTOS_URUGUAY.map((dept) => (
              <SelectItem
                key={dept}
                value={dept}
                className="text-white hover:bg-slate-700"
              >
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
