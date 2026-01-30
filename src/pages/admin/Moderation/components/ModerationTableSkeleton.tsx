import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function ModerationTableSkeleton() {
  return (
    <div className="rounded-lg border border-slate-800 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-800/50 border-slate-700">
            <TableHead className="text-slate-400">Producto</TableHead>
            <TableHead className="text-slate-400">Vendedor</TableHead>
            <TableHead className="text-slate-400">Descuento</TableHead>
            <TableHead className="text-slate-400">Enviado</TableHead>
            <TableHead className="text-slate-400">Evidencia</TableHead>
            <TableHead className="text-slate-400">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i} className="border-slate-800">
              <TableCell>
                <div className="flex items-center gap-3">
                  <Skeleton className="w-12 h-12 rounded-lg bg-slate-800" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-40 bg-slate-800" />
                    <Skeleton className="h-3 w-20 bg-slate-800" />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24 bg-slate-800" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-14 rounded-full bg-slate-800" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20 bg-slate-800" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-6 bg-slate-800" />
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-20 bg-slate-800" />
                  <Skeleton className="h-8 w-20 bg-slate-800" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
