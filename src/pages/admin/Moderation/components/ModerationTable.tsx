import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ProductWithSeller } from '@/types/moderation';
import { ModerationRow } from './ModerationRow';
import { ModerationCard } from './ModerationCard';
import { useIsMobile } from '@/hooks/use-mobile';

interface ModerationTableProps {
  products: ProductWithSeller[];
  onViewDetail: (product: ProductWithSeller) => void;
  onApprove: (productId: string) => void;
  onReject: (productId: string) => void;
  onRequestChanges: (productId: string) => void;
  approvingId?: string;
}

export function ModerationTable({
  products,
  onViewDetail,
  onApprove,
  onReject,
  onRequestChanges,
  approvingId,
}: ModerationTableProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="space-y-3">
        {products.map((product) => (
          <ModerationCard
            key={product.id}
            product={product}
            onViewDetail={() => onViewDetail(product)}
            onApprove={() => onApprove(product.id)}
            onReject={() => onReject(product.id)}
            onRequestChanges={() => onRequestChanges(product.id)}
            isApproving={approvingId === product.id}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-800 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/50">
            <TableHead className="text-slate-400">Producto</TableHead>
            <TableHead className="text-slate-400">Vendedor</TableHead>
            <TableHead className="text-slate-400">Descuento</TableHead>
            <TableHead className="text-slate-400">Enviado</TableHead>
            <TableHead className="text-slate-400">Verificacion</TableHead>
            <TableHead className="text-slate-400">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <ModerationRow
              key={product.id}
              product={product}
              onViewDetail={() => onViewDetail(product)}
              onApprove={() => onApprove(product.id)}
              onReject={() => onReject(product.id)}
              onRequestChanges={() => onRequestChanges(product.id)}
              isApproving={approvingId === product.id}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
