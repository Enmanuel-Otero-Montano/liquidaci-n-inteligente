import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Pencil, Copy, Power, PowerOff } from 'lucide-react';
import { Product } from '@/types/product';

interface ProductActionsProps {
  product: Product;
  onDuplicate: (productId: string) => void;
  onToggleStatus: (productId: string, newStatus: 'approved' | 'disabled') => void;
  isLoading?: boolean;
}

export function ProductActions({
  product,
  onDuplicate,
  onToggleStatus,
  isLoading
}: ProductActionsProps) {
  const canDisable = product.status === 'approved';
  const canEnable = product.status === 'disabled';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" disabled={isLoading}>
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Acciones</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link to={`/vendedor/productos/${product.id}/editar`}>
            <Pencil className="mr-2 h-4 w-4" />
            Editar
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onDuplicate(product.id)}>
          <Copy className="mr-2 h-4 w-4" />
          Duplicar
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {canDisable && (
          <DropdownMenuItem
            onClick={() => onToggleStatus(product.id, 'disabled')}
            className="text-destructive focus:text-white"
          >
            <PowerOff className="mr-2 h-4 w-4" />
            Desactivar
          </DropdownMenuItem>
        )}

        {canEnable && (
          <DropdownMenuItem onClick={() => onToggleStatus(product.id, 'approved')}>
            <Power className="mr-2 h-4 w-4" />
            Activar
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
