import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useIsMobile } from '@/hooks/use-mobile';

export function SellersTableSkeleton() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="p-4 rounded-lg border border-slate-700 bg-slate-800/50"
          >
            <div className="flex items-start gap-3">
              <Skeleton className="h-12 w-12 rounded-full bg-slate-700" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-32 bg-slate-700" />
                <Skeleton className="h-4 w-24 bg-slate-700" />
                <div className="space-y-1.5 mt-3">
                  <Skeleton className="h-4 w-48 bg-slate-700" />
                  <Skeleton className="h-4 w-28 bg-slate-700" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-700 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-slate-700 bg-slate-800/50">
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
          {[...Array(5)].map((_, i) => (
            <TableRow key={i} className="border-slate-700">
              <TableCell>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full bg-slate-700" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-28 bg-slate-700" />
                    <Skeleton className="h-3 w-20 bg-slate-700" />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-36 bg-slate-700" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24 bg-slate-700" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-16 rounded-full bg-slate-700" />
              </TableCell>
              <TableCell className="text-center">
                <Skeleton className="h-4 w-8 mx-auto bg-slate-700" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20 bg-slate-700" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-8 w-8 rounded bg-slate-700" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
