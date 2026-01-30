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

export function ReportsTableSkeleton() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="p-4 rounded-lg border border-slate-700 bg-slate-800/50 space-y-3"
          >
            <div className="flex items-start gap-3">
              <Skeleton className="h-12 w-12 rounded-lg bg-slate-700" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4 bg-slate-700" />
                <Skeleton className="h-3 w-1/2 bg-slate-700" />
              </div>
              <Skeleton className="h-5 w-16 rounded-full bg-slate-700" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-5 w-24 rounded-full bg-slate-700" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-3 w-24 bg-slate-700" />
              <Skeleton className="h-3 w-20 bg-slate-700" />
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
          <TableRow className="border-slate-700 bg-slate-800/50 hover:bg-slate-800/50">
            <TableHead className="text-slate-300">Producto</TableHead>
            <TableHead className="text-slate-300">Motivo</TableHead>
            <TableHead className="text-slate-300">Reportado por</TableHead>
            <TableHead className="text-slate-300">Estado</TableHead>
            <TableHead className="text-slate-300">Fecha</TableHead>
            <TableHead className="text-slate-300 w-[100px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i} className="border-slate-700">
              <TableCell>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-lg bg-slate-700" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-40 bg-slate-700" />
                    <Skeleton className="h-3 w-24 bg-slate-700" />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-28 rounded-full bg-slate-700" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24 bg-slate-700" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-16 rounded-full bg-slate-700" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20 bg-slate-700" />
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Skeleton className="h-8 w-8 bg-slate-700" />
                  <Skeleton className="h-8 w-8 bg-slate-700" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
