import { useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts, useCategories, useLocations } from '@/hooks/useProducts';
import { CatalogFilters } from '@/types/product';
import { SearchBar } from './components/SearchBar';
import { FilterPanel } from './components/FilterPanel';
import { ProductGrid } from './components/ProductGrid';
import { CatalogSkeleton } from './components/CatalogSkeleton';
import { EmptyState } from './components/EmptyState';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Percent } from 'lucide-react';
import Header from '@/components/Header';

export function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Parse filters from URL
  const filters: CatalogFilters = useMemo(() => ({
    search: searchParams.get('search') || undefined,
    category: searchParams.get('category') || undefined,
    min_discount: searchParams.get('min_discount') 
      ? parseInt(searchParams.get('min_discount')!) 
      : 25,
    location: searchParams.get('location') || undefined,
    sort_by: (searchParams.get('sort_by') as CatalogFilters['sort_by']) || 'discount_desc',
  }), [searchParams]);

  // Fetch data
  const { data: products, isLoading, isError, error, refetch } = useProducts(filters);
  const { data: categories = [] } = useCategories();
  const { data: locations = [] } = useLocations();

  // Handle errors
  useEffect(() => {
    if (isError) {
      toast({
        title: "Error al cargar productos",
        description: error instanceof Error ? error.message : "Ocurrió un error inesperado",
        variant: "destructive",
      });
    }
  }, [isError, error]);

  // Update filters in URL
  const updateFilter = useCallback((key: keyof CatalogFilters, value: string | number | undefined) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (value === undefined || value === '') {
      newParams.delete(key);
    } else {
      newParams.set(key, value.toString());
    }
    
    setSearchParams(newParams, { replace: true });
  }, [searchParams, setSearchParams]);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  // Count active filters (excluding defaults)
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.search) count++;
    if (filters.category) count++;
    if (filters.min_discount && filters.min_discount > 25) count++;
    if (filters.location) count++;
    if (filters.sort_by && filters.sort_by !== 'discount_desc') count++;
    return count;
  }, [filters]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Promo Banner */}
      <div className="bg-primary text-primary-foreground py-3">
        <div className="container mx-auto px-4 flex items-center justify-center gap-2 text-sm md:text-base">
          <Percent className="h-4 w-4" />
          <span className="font-medium">Todo ≥25% OFF real</span>
          <span className="opacity-80">• Descuentos verificados</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Page Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Liquidaciones
          </h1>
          <p className="text-muted-foreground">
            Encontrá los mejores productos en liquidación con descuentos reales.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-4 max-w-xl">
          <SearchBar
            value={filters.search || ''}
            onChange={(value) => updateFilter('search', value || undefined)}
            onClear={() => updateFilter('search', undefined)}
          />
        </div>

        {/* Filters */}
        <div className="mb-6 pb-4 border-b border-border">
          <FilterPanel
            filters={filters}
            categories={categories}
            locations={locations}
            onFilterChange={updateFilter}
            onClearFilters={clearFilters}
            activeFiltersCount={activeFiltersCount}
          />
        </div>

        {/* Results Count */}
        {!isLoading && products && products.length > 0 && (
          <div className="mb-4 flex items-center gap-2">
            <Badge variant="secondary" className="font-normal">
              {products.length} {products.length === 1 ? 'producto' : 'productos'}
            </Badge>
          </div>
        )}

        {/* Content */}
        {isLoading ? (
          <CatalogSkeleton />
        ) : isError ? (
          <div className="text-center py-12">
            <p className="text-destructive mb-4">Error al cargar los productos</p>
            <button 
              onClick={() => refetch()}
              className="text-primary hover:underline"
            >
              Reintentar
            </button>
          </div>
        ) : products && products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <EmptyState onClearFilters={clearFilters} />
        )}
      </div>
    </div>
  );
}
