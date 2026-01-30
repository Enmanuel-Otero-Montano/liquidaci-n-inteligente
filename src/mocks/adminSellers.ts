import { SellerWithStats, SellerFilters, SellerAction } from '@/types/adminSeller';

const today = new Date();
const formatDate = (daysAgo: number) => {
  const date = new Date(today);
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

export const mockSellersWithStats: SellerWithStats[] = [
  {
    id: "seller-1",
    nombre_comercial: "Norte Sports",
    responsable: "Juan Martínez",
    email: "contacto@nortesports.com",
    telefono: "59899123456",
    zona: "Montevideo",
    direccion: "Av. 18 de Julio 1234",
    politicas: "Retiro en local con documento. No se aceptan devoluciones en liquidación.",
    horario_retiro: "Lunes a Viernes 10:00 - 18:00, Sábados 10:00 - 14:00",
    status: "active",
    created_at: formatDate(120),
    stats: {
      total_products: 15,
      approved_products: 12,
      pending_products: 2,
      rejected_products: 1,
      total_reservations: 45,
    },
    is_verified: true,
    verified_at: formatDate(90),
    verified_by: "Admin Principal",
  },
  {
    id: "seller-2",
    nombre_comercial: "TecnoHogar",
    responsable: "María García",
    email: "ventas@tecnohogar.com",
    telefono: "59898765432",
    zona: "Canelones",
    direccion: "Ruta 5 Km 25",
    politicas: "Productos con garantía limitada. Retiro coordinado previamente.",
    horario_retiro: "Lunes a Viernes 9:00 - 17:00",
    status: "active",
    created_at: formatDate(90),
    stats: {
      total_products: 8,
      approved_products: 6,
      pending_products: 1,
      rejected_products: 1,
      total_reservations: 22,
    },
    is_verified: true,
    verified_at: formatDate(60),
    verified_by: "Admin Principal",
  },
  {
    id: "seller-3",
    nombre_comercial: "Casa Design",
    responsable: "Ana Rodríguez",
    email: "info@casadesign.com",
    telefono: "59897654321",
    zona: "Maldonado",
    direccion: "Gorlero 456",
    politicas: "Envíos disponibles con costo adicional. Retiro previa cita.",
    horario_retiro: "Martes a Sábado 11:00 - 19:00",
    status: "active",
    created_at: formatDate(60),
    stats: {
      total_products: 23,
      approved_products: 20,
      pending_products: 3,
      rejected_products: 0,
      total_reservations: 67,
    },
    is_verified: false,
  },
  {
    id: "seller-4",
    nombre_comercial: "Beauty Corner",
    responsable: "Laura Fernández",
    email: "hola@beautycorner.com",
    telefono: "59896543210",
    zona: "Montevideo",
    direccion: "Pocitos, 21 de Setiembre 2345",
    politicas: "Productos sellados, sin devolución. Verificar fecha de vencimiento.",
    horario_retiro: "Lunes a Sábado 10:00 - 20:00",
    status: "suspended",
    created_at: formatDate(45),
    stats: {
      total_products: 5,
      approved_products: 2,
      pending_products: 0,
      rejected_products: 3,
      total_reservations: 8,
    },
    is_verified: false,
  },
  {
    id: "seller-5",
    nombre_comercial: "Deportes Plus",
    responsable: "Carlos Pérez",
    email: "contacto@deportesplus.com",
    telefono: "59895432109",
    zona: "Paysandú",
    direccion: "Av. España 789",
    politicas: "Cambios solo por talle dentro de 48hs con etiqueta.",
    horario_retiro: "Lunes a Viernes 8:00 - 12:00 y 14:00 - 18:00",
    status: "active",
    created_at: formatDate(30),
    stats: {
      total_products: 11,
      approved_products: 9,
      pending_products: 2,
      rejected_products: 0,
      total_reservations: 31,
    },
    is_verified: false,
  },
  {
    id: "seller-6",
    nombre_comercial: "Muebles del Este",
    responsable: "Roberto Silva",
    email: "ventas@mueblesdeleske.com",
    telefono: "59894321098",
    zona: "Rocha",
    direccion: "Ruta 9 Km 210",
    politicas: "Envío a todo el país. Armado no incluido.",
    horario_retiro: "Lunes a Viernes 9:00 - 18:00",
    status: "pending",
    created_at: formatDate(2),
    stats: {
      total_products: 0,
      approved_products: 0,
      pending_products: 0,
      rejected_products: 0,
      total_reservations: 0,
    },
    is_verified: false,
  },
  {
    id: "seller-7",
    nombre_comercial: "Electro Salto",
    responsable: "Diego Acosta",
    email: "info@electrosalto.com",
    telefono: "59893210987",
    zona: "Salto",
    direccion: "Uruguay 234",
    politicas: "Garantía de 30 días en todos los productos.",
    horario_retiro: "Lunes a Sábado 9:00 - 13:00 y 16:00 - 20:00",
    status: "active",
    created_at: formatDate(0),
    stats: {
      total_products: 3,
      approved_products: 1,
      pending_products: 2,
      rejected_products: 0,
      total_reservations: 0,
    },
    is_verified: false,
  },
];

const mockSellerActions: SellerAction[] = [
  {
    id: "action-1",
    seller_id: "seller-1",
    action: "verified",
    admin_name: "Admin Principal",
    created_at: formatDate(90),
  },
  {
    id: "action-2",
    seller_id: "seller-2",
    action: "verified",
    admin_name: "Admin Principal",
    created_at: formatDate(60),
  },
  {
    id: "action-3",
    seller_id: "seller-4",
    action: "blocked",
    reason: "Productos fraudulentos - Descuentos no verificables en múltiples publicaciones",
    admin_name: "Admin Principal",
    created_at: formatDate(10),
  },
];

export async function mockGetAllSellers(
  filters?: SellerFilters
): Promise<SellerWithStats[]> {
  await new Promise((resolve) => setTimeout(resolve, 600));

  let results = [...mockSellersWithStats];

  if (filters?.search) {
    const search = filters.search.toLowerCase();
    results = results.filter(
      (seller) =>
        seller.nombre_comercial.toLowerCase().includes(search) ||
        seller.email.toLowerCase().includes(search) ||
        seller.zona.toLowerCase().includes(search) ||
        seller.responsable?.toLowerCase().includes(search)
    );
  }

  if (filters?.status && filters.status !== 'all') {
    results = results.filter((seller) => seller.status === filters.status);
  }

  if (filters?.verified !== undefined && filters.verified !== 'all') {
    results = results.filter((seller) => seller.is_verified === filters.verified);
  }

  const sortBy = filters?.sortBy || 'created_at';
  const sortOrder = filters?.sortOrder || 'desc';

  results.sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case 'nombre_comercial':
        comparison = a.nombre_comercial.localeCompare(b.nombre_comercial);
        break;
      case 'total_products':
        comparison = a.stats.total_products - b.stats.total_products;
        break;
      case 'created_at':
      default:
        comparison = new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime();
        break;
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  return results;
}

export async function mockGetSellerActions(sellerId: string): Promise<SellerAction[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockSellerActions.filter((action) => action.seller_id === sellerId);
}

export async function mockBlockSeller(
  sellerId: string,
  reason: string
): Promise<SellerWithStats> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const seller = mockSellersWithStats.find((s) => s.id === sellerId);
  if (!seller) throw new Error('Vendedor no encontrado');

  seller.status = 'suspended';

  mockSellerActions.push({
    id: `action-${Date.now()}`,
    seller_id: sellerId,
    action: 'blocked',
    reason,
    admin_name: 'Admin Principal',
    created_at: new Date().toISOString(),
  });

  return { ...seller };
}

export async function mockUnblockSeller(sellerId: string): Promise<SellerWithStats> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const seller = mockSellersWithStats.find((s) => s.id === sellerId);
  if (!seller) throw new Error('Vendedor no encontrado');

  seller.status = 'active';

  mockSellerActions.push({
    id: `action-${Date.now()}`,
    seller_id: sellerId,
    action: 'unblocked',
    admin_name: 'Admin Principal',
    created_at: new Date().toISOString(),
  });

  return { ...seller };
}

export async function mockVerifySeller(
  sellerId: string,
  notes?: string
): Promise<SellerWithStats> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const seller = mockSellersWithStats.find((s) => s.id === sellerId);
  if (!seller) throw new Error('Vendedor no encontrado');

  seller.is_verified = true;
  seller.verified_at = new Date().toISOString();
  seller.verified_by = 'Admin Principal';

  mockSellerActions.push({
    id: `action-${Date.now()}`,
    seller_id: sellerId,
    action: 'verified',
    reason: notes,
    admin_name: 'Admin Principal',
    created_at: new Date().toISOString(),
  });

  return { ...seller };
}

export async function mockUnverifySeller(sellerId: string): Promise<SellerWithStats> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const seller = mockSellersWithStats.find((s) => s.id === sellerId);
  if (!seller) throw new Error('Vendedor no encontrado');

  seller.is_verified = false;
  seller.verified_at = undefined;
  seller.verified_by = undefined;

  mockSellerActions.push({
    id: `action-${Date.now()}`,
    seller_id: sellerId,
    action: 'unverified',
    admin_name: 'Admin Principal',
    created_at: new Date().toISOString(),
  });

  return { ...seller };
}
