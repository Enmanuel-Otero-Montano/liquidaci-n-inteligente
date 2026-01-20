import { SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { CatalogFilters } from '@/types/product';
import { discountOptions, sortOptions } from '@/mocks/products';

interface FilterPanelProps {
  filters: CatalogFilters;
  categories: { label: string; slug: string }[];
  locations: { label: string; slug: string }[];
  onFilterChange: (key: keyof CatalogFilters, value: string | number | undefined) => void;
  onClearFilters: () => void;
  activeFiltersCount: number;
}

export function FilterPanel({
  filters,
  categories,
  locations,
  onFilterChange,
  onClearFilters,
  activeFiltersCount,
}: FilterPanelProps) {
  return (
    <div className="space-y-4">
      {/* Desktop Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <SlidersHorizontal className="h-4 w-4" />
          <span className="hidden sm:inline">Filtros</span>
        </div>

        {/* Category Filter */}
        <Select
          value={filters.category || "all"}
          onValueChange={(value) => 
            onFilterChange('category', value === 'all' ? undefined : value)
          }
        >
          <SelectTrigger className="w-[140px] h-9 bg-background" aria-label="Filtrar por categoría">
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.slug} value={cat.label}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Discount Filter */}
        <Select
          value={filters.min_discount?.toString() || "25"}
          onValueChange={(value) => onFilterChange('min_discount', parseInt(value))}
        >
          <SelectTrigger className="w-[130px] h-9 bg-background" aria-label="Filtrar por descuento mínimo">
            <SelectValue placeholder="% Descuento" />
          </SelectTrigger>
          <SelectContent>
            {discountOptions.map((option) => (
              <SelectItem key={option.value} value={option.value.toString()}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Location Filter */}
        <Select
          value={filters.location || "all"}
          onValueChange={(value) => 
            onFilterChange('location', value === 'all' ? undefined : value)
          }
        >
          <SelectTrigger className="w-[140px] h-9 bg-background" aria-label="Filtrar por zona">
            <SelectValue placeholder="Zona" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las zonas</SelectItem>
            {locations.map((loc) => (
              <SelectItem key={loc.slug} value={loc.label}>
                {loc.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort Filter */}
        <Select
          value={filters.sort_by || "discount_desc"}
          onValueChange={(value) => onFilterChange('sort_by', value)}
        >
          <SelectTrigger className="w-[150px] h-9 bg-background" aria-label="Ordenar por">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Clear Filters */}
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="h-9 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4 mr-1" />
            Limpiar
            <Badge variant="secondary" className="ml-1.5 h-5 px-1.5 text-xs">
              {activeFiltersCount}
            </Badge>
          </Button>
        )}
      </div>
    </div>
  );
}
