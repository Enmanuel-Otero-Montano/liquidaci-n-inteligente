import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ProductReport } from '@/types/adminReports';
import { ReportRow } from './ReportRow';
import { ReportCard } from './ReportCard';
import { useIsMobile } from '@/hooks/use-mobile';

interface ReportsTableProps {
  reports: ProductReport[];
  onViewDetails: (report: ProductReport) => void;
  onHideProduct: (report: ProductReport) => void;
  onRequestEvidence: (report: ProductReport) => void;
  onPenalizeSeller: (report: ProductReport) => void;
  onResolve: (report: ProductReport) => void;
}

export function ReportsTable({
  reports,
  onViewDetails,
  onHideProduct,
  onRequestEvidence,
  onPenalizeSeller,
  onResolve,
}: ReportsTableProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="space-y-4">
        {reports.map((report) => (
          <ReportCard
            key={report.id}
            report={report}
            onViewDetails={() => onViewDetails(report)}
            onHideProduct={() => onHideProduct(report)}
            onRequestEvidence={() => onRequestEvidence(report)}
            onPenalizeSeller={() => onPenalizeSeller(report)}
            onResolve={() => onResolve(report)}
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
            <TableHead className="text-slate-300">Producto</TableHead>
            <TableHead className="text-slate-300">Motivo</TableHead>
            <TableHead className="text-slate-300">Reportado por</TableHead>
            <TableHead className="text-slate-300">Estado</TableHead>
            <TableHead className="text-slate-300">Fecha</TableHead>
            <TableHead className="text-slate-300 w-[100px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((report) => (
            <ReportRow
              key={report.id}
              report={report}
              onViewDetails={() => onViewDetails(report)}
              onHideProduct={() => onHideProduct(report)}
              onRequestEvidence={() => onRequestEvidence(report)}
              onPenalizeSeller={() => onPenalizeSeller(report)}
              onResolve={() => onResolve(report)}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
