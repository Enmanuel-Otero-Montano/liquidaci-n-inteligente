import { Report, CreateReportInput } from '@/types/report';

export const mockReports: Report[] = [];

export const mockCreateReport = async (data: CreateReportInput): Promise<Report> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const report: Report = {
    id: `report-${Date.now()}`,
    product_id: data.product_id,
    reason: data.reason,
    comment: data.comment,
    reporter_email: data.email,
    status: 'open',
    created_at: new Date().toISOString(),
  };
  
  // Guardar en localStorage
  const existing = JSON.parse(localStorage.getItem('reports') || '[]');
  existing.push(report);
  localStorage.setItem('reports', JSON.stringify(existing));
  
  mockReports.push(report);
  
  return report;
};

export const getReports = (): Report[] => {
  return JSON.parse(localStorage.getItem('reports') || '[]');
};
