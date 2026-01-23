import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { CATEGORIAS } from '@/data/constants';
import { cn } from '@/lib/utils';

interface CategorySelectorProps {
  selected: string[];
  onChange: (categories: string[]) => void;
  error?: string;
}

export function CategorySelector({ selected, onChange, error }: CategorySelectorProps) {
  const handleToggle = (value: string, checked: boolean) => {
    if (value === 'todas') {
      // Si selecciona "todas", deseleccionar las demás
      onChange(checked ? ['todas'] : []);
    } else {
      // Si selecciona una categoría específica, quitar "todas"
      const filtered = selected.filter(s => s !== 'todas');
      if (checked) {
        onChange([...filtered, value]);
      } else {
        onChange(filtered.filter(s => s !== value));
      }
    }
  };

  const regularCategories = CATEGORIAS.filter(c => c.value !== 'todas');
  const todasOption = CATEGORIAS.find(c => c.value === 'todas')!;

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">¿Qué categorías te interesan?</p>
      
      <div className={cn(
        "grid grid-cols-2 gap-3",
        error && "ring-1 ring-destructive rounded-lg p-3"
      )}>
        {regularCategories.map((category) => (
          <div key={category.value} className="flex items-center space-x-2">
            <Checkbox
              id={`cat-${category.value}`}
              checked={selected.includes(category.value)}
              onCheckedChange={(checked) => handleToggle(category.value, checked as boolean)}
              disabled={selected.includes('todas')}
            />
            <Label
              htmlFor={`cat-${category.value}`}
              className={cn(
                "text-sm cursor-pointer",
                selected.includes('todas') && "text-muted-foreground"
              )}
            >
              {category.label}
            </Label>
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-2 pt-2 border-t">
        <Checkbox
          id="cat-todas"
          checked={selected.includes('todas')}
          onCheckedChange={(checked) => handleToggle('todas', checked as boolean)}
        />
        <Label htmlFor="cat-todas" className="text-sm font-medium cursor-pointer">
          {todasOption.label}
        </Label>
      </div>

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}
