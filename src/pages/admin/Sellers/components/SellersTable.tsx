import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SellerWithStats } from '@/types/adminSeller';
import { SellerRow } from './SellerRow';
import { SellerCard } from './SellerCard';
import { useIsMobile } from '@/hooks/use-mobile';

interface SellersTableProps {
  sellers: SellerWithStats[];
  onViewDetails: (seller: SellerWithStats) => void;
  onApprove: (seller: SellerWithStats) => void;
  onBlock: (seller: SellerWithStats) => void;
  onUnblock: (seller: SellerWithStats) => void;
  onVerify: (seller: SellerWithStats) => void;
  onUnverify: (seller: SellerWithStats) => void;
}

export function SellersTable({
  sellers,
  onViewDetails,
  onApprove,
  onBlock,
  onUnblock,
  onVerify,
  onUnverify,
}: SellersTableProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="space-y-3">
        {sellers.map((seller) => (
          <SellerCard
            key={seller.id}
            seller={seller}
            onViewDetails={() => onViewDetails(seller)}
            onApprove={() => onApprove(seller)}
            onBlock={() => onBlock(seller)}
            onUnblock={() => onUnblock(seller)}
            onVerify={() => onVerify(seller)}
            onUnverify={() => onUnverify(seller)}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-700 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-slate-700 bg-slate-800/50 hover:bg-slate-800/50">
            <TableHead className="text-slate-300">Vendedor</TableHead>
            <TableHead className="text-slate-300">Email</TableHead>
            <TableHead className="text-slate-300">Zona</TableHead>
            <TableHead className="text-slate-300">Estado</TableHead>
            <TableHead className="text-slate-300 text-center">Productos</TableHead>
            <TableHead className="text-slate-300">Registro</TableHead>
            <TableHead className="text-slate-300 w-[60px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sellers.map((seller) => (
            <SellerRow
              key={seller.id}
              seller={seller}
              onViewDetails={() => onViewDetails(seller)}
              onApprove={() => onApprove(seller)}
              onBlock={() => onBlock(seller)}
              onUnblock={() => onUnblock(seller)}
              onVerify={() => onVerify(seller)}
              onUnverify={() => onUnverify(seller)}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
