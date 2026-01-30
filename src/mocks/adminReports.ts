import { ProductReport, ReportFilters, PenaltyType } from '@/types/adminReports';

const mockReportsData: ProductReport[] = [
  {
    id: 'report-1',
    product: {
      id: 'prod-1',
      title: 'iPhone 13 Pro Max - LIQUIDACIÓN',
      image_url: 'https://images.unsplash.com/photo-1632661674596-df8be59a8f91?w=200',
      status: 'approved',
      seller: {
        id: 'seller-1',
        nombre_comercial: 'TechStore UY',
        email: 'tech@store.uy',
        zona: 'Montevideo',
        status: 'active',
        is_verified: true,
      },
      p0: 1200,
      p1: 799,
    },
    reason: 'fraude',
    description: 'El producto parece ser robado, no tiene factura ni garantía. El vendedor no responde consultas sobre procedencia.',
    reporter: {
      id: 'user-1',
      name: 'Juan Pérez',
      email: 'juan@email.com',
    },
    status: 'open',
    created_at: '2024-01-28T10:30:00Z',
    actions: [
      {
        id: 'action-1',
        report_id: 'report-1',
        action: 'report_created',
        admin_name: 'Sistema',
        note: 'Reporte recibido automáticamente',
        created_at: '2024-01-28T10:30:00Z',
      },
    ],
  },
  {
    id: 'report-2',
    product: {
      id: 'prod-2',
      title: 'Zapatillas Nike Air Max 90',
      image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200',
      status: 'approved',
      seller: {
        id: 'seller-2',
        nombre_comercial: 'Deportes Express',
        email: 'ventas@deportes.uy',
        zona: 'Canelones',
        status: 'active',
        is_verified: false,
      },
      p0: 180,
      p1: 89,
    },
    reason: 'precio_no_real',
    description: 'El precio original de USD 180 no es real. Estas zapatillas nunca costaron más de USD 120 nuevas.',
    reporter: {
      id: 'user-2',
      name: 'María García',
      email: 'maria@gmail.com',
    },
    status: 'open',
    created_at: '2024-01-27T14:20:00Z',
    actions: [
      {
        id: 'action-2',
        report_id: 'report-2',
        action: 'report_created',
        admin_name: 'Sistema',
        created_at: '2024-01-27T14:20:00Z',
      },
      {
        id: 'action-3',
        report_id: 'report-2',
        action: 'evidence_requested',
        admin_name: 'Admin Carlos',
        note: 'Se solicitó comprobante del precio original al vendedor',
        created_at: '2024-01-27T16:00:00Z',
      },
    ],
  },
  {
    id: 'report-3',
    product: {
      id: 'prod-3',
      title: 'TV Samsung 55" 4K',
      image_url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200',
      status: 'disabled',
      seller: {
        id: 'seller-3',
        nombre_comercial: 'ElectroHogar',
        email: 'info@electrohogar.uy',
        zona: 'Maldonado',
        status: 'suspended',
        is_verified: false,
      },
      p0: 800,
      p1: 399,
    },
    reason: 'fraude',
    description: 'Producto vendido previamente a múltiples compradores, nunca se entrega.',
    status: 'resolved',
    created_at: '2024-01-20T09:00:00Z',
    resolved_at: '2024-01-22T11:30:00Z',
    actions: [
      {
        id: 'action-4',
        report_id: 'report-3',
        action: 'report_created',
        admin_name: 'Sistema',
        created_at: '2024-01-20T09:00:00Z',
      },
      {
        id: 'action-5',
        report_id: 'report-3',
        action: 'product_hidden',
        admin_name: 'Admin Laura',
        note: 'Producto ocultado por múltiples denuncias de fraude',
        created_at: '2024-01-21T10:00:00Z',
      },
      {
        id: 'action-6',
        report_id: 'report-3',
        action: 'seller_penalized',
        admin_name: 'Admin Laura',
        note: 'Vendedor suspendido indefinidamente por fraude reiterado',
        created_at: '2024-01-21T10:15:00Z',
      },
      {
        id: 'action-7',
        report_id: 'report-3',
        action: 'report_resolved',
        admin_name: 'Admin Laura',
        note: 'Caso cerrado, vendedor y producto removidos',
        created_at: '2024-01-22T11:30:00Z',
      },
    ],
  },
  {
    id: 'report-4',
    product: {
      id: 'prod-4',
      title: 'Laptop Dell Inspiron 15',
      image_url: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=200',
      status: 'approved',
      seller: {
        id: 'seller-1',
        nombre_comercial: 'TechStore UY',
        email: 'tech@store.uy',
        zona: 'Montevideo',
        status: 'active',
        is_verified: true,
      },
      p0: 900,
      p1: 649,
    },
    reason: 'info_incorrecta',
    description: 'Las especificaciones no coinciden con el modelo real. Dice i7 pero es i5.',
    reporter: {
      id: 'user-3',
      email: 'comprador@test.com',
    },
    status: 'open',
    created_at: '2024-01-29T08:15:00Z',
    actions: [
      {
        id: 'action-8',
        report_id: 'report-4',
        action: 'report_created',
        admin_name: 'Sistema',
        created_at: '2024-01-29T08:15:00Z',
      },
    ],
  },
  {
    id: 'report-5',
    product: {
      id: 'prod-5',
      title: 'Bicicleta Mountain Bike R29',
      image_url: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=200',
      status: 'approved',
      seller: {
        id: 'seller-4',
        nombre_comercial: 'Ciclos del Este',
        email: 'ciclos@este.uy',
        zona: 'Rocha',
        status: 'active',
        is_verified: true,
      },
      p0: 600,
      p1: 380,
    },
    reason: 'otro',
    description: 'El vendedor es grosero al responder consultas.',
    status: 'resolved',
    created_at: '2024-01-15T16:40:00Z',
    resolved_at: '2024-01-16T09:00:00Z',
    actions: [
      {
        id: 'action-9',
        report_id: 'report-5',
        action: 'report_created',
        admin_name: 'Sistema',
        created_at: '2024-01-15T16:40:00Z',
      },
      {
        id: 'action-10',
        report_id: 'report-5',
        action: 'report_resolved',
        admin_name: 'Admin Carlos',
        note: 'No constituye una violación de políticas. Se sugiere al comprador evaluar si desea continuar con la compra.',
        created_at: '2024-01-16T09:00:00Z',
      },
    ],
  },
  {
    id: 'report-6',
    product: {
      id: 'prod-6',
      title: 'Perfume Chanel N°5 100ml',
      image_url: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=200',
      status: 'disabled',
      seller: {
        id: 'seller-5',
        nombre_comercial: 'Belleza Total',
        email: 'belleza@total.uy',
        zona: 'Montevideo',
        status: 'active',
        is_verified: false,
      },
      p0: 200,
      p1: 79,
    },
    reason: 'producto_prohibido',
    description: 'Producto falsificado/réplica. No es original.',
    reporter: {
      id: 'user-4',
      name: 'Ana Rodríguez',
      email: 'ana.r@hotmail.com',
    },
    status: 'resolved',
    created_at: '2024-01-18T11:00:00Z',
    resolved_at: '2024-01-19T14:20:00Z',
    actions: [
      {
        id: 'action-11',
        report_id: 'report-6',
        action: 'report_created',
        admin_name: 'Sistema',
        created_at: '2024-01-18T11:00:00Z',
      },
      {
        id: 'action-12',
        report_id: 'report-6',
        action: 'product_hidden',
        admin_name: 'Admin Laura',
        note: 'Producto ocultado por sospecha de falsificación',
        created_at: '2024-01-19T10:00:00Z',
      },
      {
        id: 'action-13',
        report_id: 'report-6',
        action: 'seller_penalized',
        admin_name: 'Admin Laura',
        note: 'Advertencia emitida al vendedor',
        created_at: '2024-01-19T14:00:00Z',
      },
      {
        id: 'action-14',
        report_id: 'report-6',
        action: 'report_resolved',
        admin_name: 'Admin Laura',
        note: 'Producto removido y vendedor advertido',
        created_at: '2024-01-19T14:20:00Z',
      },
    ],
  },
  {
    id: 'report-7',
    product: {
      id: 'prod-7',
      title: 'Silla Gamer RGB Pro',
      image_url: 'https://images.unsplash.com/photo-1616626625495-4e5d58b15cc1?w=200',
      status: 'approved',
      seller: {
        id: 'seller-6',
        nombre_comercial: 'GamerZone UY',
        email: 'gamer@zone.uy',
        zona: 'Montevideo',
        status: 'active',
        is_verified: true,
      },
      p0: 450,
      p1: 280,
    },
    reason: 'contenido_inapropiado',
    description: 'Las fotos muestran contenido inadecuado en el fondo.',
    status: 'open',
    created_at: '2024-01-29T12:00:00Z',
    actions: [
      {
        id: 'action-15',
        report_id: 'report-7',
        action: 'report_created',
        admin_name: 'Sistema',
        created_at: '2024-01-29T12:00:00Z',
      },
    ],
  },
  {
    id: 'report-8',
    product: {
      id: 'prod-8',
      title: 'Heladera Whirlpool 400L',
      image_url: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=200',
      status: 'approved',
      seller: {
        id: 'seller-3',
        nombre_comercial: 'ElectroHogar',
        email: 'info@electrohogar.uy',
        zona: 'Maldonado',
        status: 'suspended',
        is_verified: false,
      },
      p0: 1100,
      p1: 699,
    },
    reason: 'precio_no_real',
    description: 'Precio inflado artificialmente',
    status: 'open',
    created_at: '2024-01-26T17:30:00Z',
    actions: [
      {
        id: 'action-16',
        report_id: 'report-8',
        action: 'report_created',
        admin_name: 'Sistema',
        created_at: '2024-01-26T17:30:00Z',
      },
    ],
  },
  {
    id: 'report-9',
    product: {
      id: 'prod-9',
      title: 'Auriculares Sony WH-1000XM4',
      image_url: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=200',
      status: 'approved',
      seller: {
        id: 'seller-1',
        nombre_comercial: 'TechStore UY',
        email: 'tech@store.uy',
        zona: 'Montevideo',
        status: 'active',
        is_verified: true,
      },
      p0: 350,
      p1: 229,
    },
    reason: 'info_incorrecta',
    description: 'Dice que incluye estuche pero el vendedor confirma que no viene incluido.',
    reporter: {
      id: 'user-5',
      name: 'Pedro López',
      email: 'pedro.l@gmail.com',
    },
    status: 'resolved',
    created_at: '2024-01-24T13:45:00Z',
    resolved_at: '2024-01-25T10:00:00Z',
    actions: [
      {
        id: 'action-17',
        report_id: 'report-9',
        action: 'report_created',
        admin_name: 'Sistema',
        created_at: '2024-01-24T13:45:00Z',
      },
      {
        id: 'action-18',
        report_id: 'report-9',
        action: 'evidence_requested',
        admin_name: 'Admin Carlos',
        note: 'Se solicitó al vendedor corregir la descripción',
        created_at: '2024-01-24T15:00:00Z',
      },
      {
        id: 'action-19',
        report_id: 'report-9',
        action: 'report_resolved',
        admin_name: 'Admin Carlos',
        note: 'Vendedor corrigió la información del producto',
        created_at: '2024-01-25T10:00:00Z',
      },
    ],
  },
  {
    id: 'report-10',
    product: {
      id: 'prod-10',
      title: 'Mesa de Centro Nórdica',
      image_url: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=200',
      status: 'approved',
      seller: {
        id: 'seller-7',
        nombre_comercial: 'Muebles del Sur',
        email: 'muebles@sur.uy',
        zona: 'Paysandú',
        status: 'active',
        is_verified: false,
      },
      p0: 300,
      p1: 189,
    },
    reason: 'otro',
    status: 'open',
    created_at: '2024-01-29T09:20:00Z',
    actions: [
      {
        id: 'action-20',
        report_id: 'report-10',
        action: 'report_created',
        admin_name: 'Sistema',
        created_at: '2024-01-29T09:20:00Z',
      },
    ],
  },
  {
    id: 'report-11',
    product: {
      id: 'prod-11',
      title: 'Cámara Canon EOS R5',
      image_url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200',
      status: 'approved',
      seller: {
        id: 'seller-8',
        nombre_comercial: 'FotoPlus',
        email: 'ventas@fotoplus.uy',
        zona: 'Montevideo',
        status: 'active',
        is_verified: true,
      },
      p0: 3500,
      p1: 2499,
    },
    reason: 'fraude',
    description: 'No entrega factura válida para importaciones.',
    reporter: {
      id: 'user-6',
      name: 'Carlos Méndez',
      email: 'carlos.m@empresa.com',
    },
    status: 'open',
    created_at: '2024-01-28T15:10:00Z',
    actions: [
      {
        id: 'action-21',
        report_id: 'report-11',
        action: 'report_created',
        admin_name: 'Sistema',
        created_at: '2024-01-28T15:10:00Z',
      },
    ],
  },
];

// Store for mutations
let reportsStore = [...mockReportsData];

export async function mockGetAllReports(
  filters?: ReportFilters
): Promise<ProductReport[]> {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  let result = [...reportsStore];
  
  // Apply search filter
  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    result = result.filter(
      r =>
        r.product.title.toLowerCase().includes(searchLower) ||
        r.product.seller.nombre_comercial.toLowerCase().includes(searchLower) ||
        r.reason.toLowerCase().includes(searchLower) ||
        r.reporter?.name?.toLowerCase().includes(searchLower) ||
        r.reporter?.email?.toLowerCase().includes(searchLower)
    );
  }
  
  // Apply status filter
  if (filters?.status && filters.status !== 'all') {
    result = result.filter(r => r.status === filters.status);
  }
  
  // Apply reason filter
  if (filters?.reason && filters.reason !== 'all') {
    result = result.filter(r => r.reason === filters.reason);
  }
  
  // Apply sorting
  const sortBy = filters?.sortBy || 'created_at';
  const sortOrder = filters?.sortOrder || 'desc';
  
  result.sort((a, b) => {
    // Open reports first
    if (a.status === 'open' && b.status !== 'open') return -1;
    if (a.status !== 'open' && b.status === 'open') return 1;
    
    let comparison = 0;
    
    switch (sortBy) {
      case 'created_at':
        comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        break;
      case 'status':
        comparison = a.status.localeCompare(b.status);
        break;
      case 'reason':
        comparison = a.reason.localeCompare(b.reason);
        break;
    }
    
    return sortOrder === 'desc' ? -comparison : comparison;
  });
  
  return result;
}

export async function mockHideProductFromReport(
  reportId: string,
  note?: string
): Promise<ProductReport> {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const reportIndex = reportsStore.findIndex(r => r.id === reportId);
  if (reportIndex === -1) throw new Error('Reporte no encontrado');
  
  const report = reportsStore[reportIndex];
  
  const updatedReport: ProductReport = {
    ...report,
    product: {
      ...report.product,
      status: 'disabled',
    },
    actions: [
      ...report.actions,
      {
        id: `action-${Date.now()}`,
        report_id: reportId,
        action: 'product_hidden',
        admin_name: 'Admin',
        note: note || 'Producto ocultado por reporte',
        created_at: new Date().toISOString(),
      },
    ],
  };
  
  reportsStore[reportIndex] = updatedReport;
  return updatedReport;
}

export async function mockRequestEvidenceToSeller(
  reportId: string,
  message: string
): Promise<ProductReport> {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const reportIndex = reportsStore.findIndex(r => r.id === reportId);
  if (reportIndex === -1) throw new Error('Reporte no encontrado');
  
  const report = reportsStore[reportIndex];
  
  const updatedReport: ProductReport = {
    ...report,
    actions: [
      ...report.actions,
      {
        id: `action-${Date.now()}`,
        report_id: reportId,
        action: 'evidence_requested',
        admin_name: 'Admin',
        note: message,
        created_at: new Date().toISOString(),
      },
    ],
  };
  
  reportsStore[reportIndex] = updatedReport;
  return updatedReport;
}

export async function mockPenalizeSellerFromReport(
  reportId: string,
  penalty: PenaltyType,
  note: string
): Promise<ProductReport> {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const reportIndex = reportsStore.findIndex(r => r.id === reportId);
  if (reportIndex === -1) throw new Error('Reporte no encontrado');
  
  const report = reportsStore[reportIndex];
  
  const penaltyLabels: Record<PenaltyType, string> = {
    warning: 'Advertencia',
    suspend_7: 'Suspensión 7 días',
    suspend_30: 'Suspensión 30 días',
    suspend_indefinite: 'Suspensión indefinida',
  };
  
  const updatedReport: ProductReport = {
    ...report,
    product: {
      ...report.product,
      seller: {
        ...report.product.seller,
        status: penalty === 'warning' ? report.product.seller.status : 'suspended',
      },
    },
    actions: [
      ...report.actions,
      {
        id: `action-${Date.now()}`,
        report_id: reportId,
        action: 'seller_penalized',
        admin_name: 'Admin',
        note: `${penaltyLabels[penalty]}: ${note}`,
        created_at: new Date().toISOString(),
      },
    ],
  };
  
  reportsStore[reportIndex] = updatedReport;
  return updatedReport;
}

export async function mockResolveReport(
  reportId: string,
  note?: string
): Promise<ProductReport> {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const reportIndex = reportsStore.findIndex(r => r.id === reportId);
  if (reportIndex === -1) throw new Error('Reporte no encontrado');
  
  const report = reportsStore[reportIndex];
  
  const updatedReport: ProductReport = {
    ...report,
    status: 'resolved',
    resolved_at: new Date().toISOString(),
    actions: [
      ...report.actions,
      {
        id: `action-${Date.now()}`,
        report_id: reportId,
        action: 'report_resolved',
        admin_name: 'Admin',
        note: note || 'Reporte marcado como resuelto',
        created_at: new Date().toISOString(),
      },
    ],
  };
  
  reportsStore[reportIndex] = updatedReport;
  return updatedReport;
}

export function getReportCounts() {
  const open = reportsStore.filter(r => r.status === 'open').length;
  const resolved = reportsStore.filter(r => r.status === 'resolved').length;
  return { open, resolved, total: open + resolved };
}
