import { Reservation, ReservationStatus, ReservationFilters } from '@/types/reservation';

// Generate dates relative to now
const now = new Date();
const hoursAgo = (hours: number) => new Date(now.getTime() - hours * 60 * 60 * 1000).toISOString();
const daysAgo = (days: number) => new Date(now.getTime() - days * 24 * 60 * 60 * 1000).toISOString();

export const mockReservations: Reservation[] = [
  {
    id: 'res-001',
    product_id: 'prod-001',
    product_title: 'iPhone 13 Pro Max 256GB - Excelente estado',
    product_image: 'https://images.unsplash.com/photo-1632661674596-df8be59a6d9f?w=200',
    product_price: 28000,
    buyer_name: 'María González',
    buyer_contact: '099123456',
    buyer_contact_type: 'phone',
    quantity: 1,
    note: 'Me interesa retirarlo hoy si es posible',
    status: 'new',
    created_at: hoursAgo(0.5),
    updated_at: hoursAgo(0.5),
  },
  {
    id: 'res-002',
    product_id: 'prod-002',
    product_title: 'Samsung Galaxy S23 Ultra 512GB',
    product_image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=200',
    product_price: 32000,
    buyer_name: 'Juan Pérez',
    buyer_contact: 'juan.perez@gmail.com',
    buyer_contact_type: 'email',
    quantity: 1,
    status: 'new',
    created_at: hoursAgo(2),
    updated_at: hoursAgo(2),
  },
  {
    id: 'res-003',
    product_id: 'prod-003',
    product_title: 'MacBook Air M2 2023',
    product_image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200',
    product_price: 45000,
    buyer_name: 'Ana Rodríguez',
    buyer_contact: '098765432',
    buyer_contact_type: 'phone',
    quantity: 1,
    note: '¿Tiene cargador original?',
    seller_notes: 'Sí tiene cargador. Quedamos en coordinar para el sábado.',
    status: 'contacted',
    created_at: hoursAgo(5),
    updated_at: hoursAgo(3),
  },
  {
    id: 'res-004',
    product_id: 'prod-004',
    product_title: 'Zapatillas Nike Air Max 90 - Talle 42',
    product_image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200',
    product_price: 4500,
    buyer_name: 'Carlos Silva',
    buyer_contact: '091234567',
    buyer_contact_type: 'phone',
    quantity: 2,
    note: 'Quiero 2 pares si tenés disponibles',
    status: 'new',
    created_at: daysAgo(1),
    updated_at: daysAgo(1),
  },
  {
    id: 'res-005',
    product_id: 'prod-005',
    product_title: 'PlayStation 5 Digital Edition',
    product_image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=200',
    product_price: 18000,
    buyer_name: 'Roberto Fernández',
    buyer_contact: 'roberto.f@hotmail.com',
    buyer_contact_type: 'email',
    quantity: 1,
    seller_notes: 'Ya coordinamos, viene el lunes a las 18hs.',
    status: 'contacted',
    created_at: daysAgo(2),
    updated_at: daysAgo(1),
  },
  {
    id: 'res-006',
    product_id: 'prod-006',
    product_title: 'Smart TV Samsung 55" 4K',
    product_image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200',
    product_price: 22000,
    buyer_name: 'Laura Martínez',
    buyer_contact: '094567890',
    buyer_contact_type: 'phone',
    quantity: 1,
    note: '¿Hacés envío a Maldonado?',
    seller_notes: 'No hacemos envío, solo retiro. Le avisé pero no respondió más.',
    status: 'lost',
    created_at: daysAgo(5),
    updated_at: daysAgo(3),
  },
  {
    id: 'res-007',
    product_id: 'prod-007',
    product_title: 'Campera North Face Invierno - Talle L',
    product_image: 'https://images.unsplash.com/photo-1544923246-77307dd628b9?w=200',
    product_price: 8500,
    buyer_name: 'Martín López',
    buyer_contact: '099888777',
    buyer_contact_type: 'phone',
    quantity: 1,
    status: 'closed',
    created_at: daysAgo(7),
    updated_at: daysAgo(6),
  },
  {
    id: 'res-008',
    product_id: 'prod-008',
    product_title: 'Auriculares Sony WH-1000XM5',
    product_image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=200',
    product_price: 12000,
    buyer_name: 'Sofía Ramírez',
    buyer_contact: 'sofia.ramirez@gmail.com',
    buyer_contact_type: 'email',
    quantity: 1,
    note: '¿Los puedo probar antes de comprar?',
    status: 'closed',
    created_at: daysAgo(10),
    updated_at: daysAgo(8),
  },
  {
    id: 'res-009',
    product_id: 'prod-009',
    product_title: 'Bicicleta Mountain Bike Rodado 29',
    product_image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=200',
    product_price: 35000,
    buyer_name: 'Diego Acosta',
    buyer_contact: '092111222',
    buyer_contact_type: 'phone',
    quantity: 1,
    seller_notes: 'Le mostré la bici pero decidió no comprar porque buscaba otra marca.',
    status: 'lost',
    created_at: daysAgo(14),
    updated_at: daysAgo(12),
  },
  {
    id: 'res-010',
    product_id: 'prod-010',
    product_title: 'Licuadora Oster Pro 1200W',
    product_image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=200',
    product_price: 3200,
    buyer_name: 'Valentina Castro',
    buyer_contact: '097333444',
    buyer_contact_type: 'phone',
    quantity: 3,
    note: 'Quiero 3 para regalo de navidad',
    status: 'contacted',
    created_at: hoursAgo(8),
    updated_at: hoursAgo(4),
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function mockGetSellerReservations(
  sellerId: string,
  filters?: ReservationFilters
): Promise<Reservation[]> {
  await delay(600);
  
  let reservations = [...mockReservations];
  
  // Apply status filter
  if (filters?.status && filters.status !== 'all') {
    reservations = reservations.filter(r => r.status === filters.status);
  }
  
  // Apply search filter
  if (filters?.search) {
    const search = filters.search.toLowerCase();
    reservations = reservations.filter(
      r => 
        r.buyer_name.toLowerCase().includes(search) ||
        r.product_title.toLowerCase().includes(search)
    );
  }
  
  // Sort by date (newest first)
  reservations.sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  
  return reservations;
}

export async function mockUpdateReservationStatus(
  reservationId: string,
  status: ReservationStatus
): Promise<Reservation> {
  await delay(400);
  
  const index = mockReservations.findIndex(r => r.id === reservationId);
  if (index === -1) {
    throw new Error('Reserva no encontrada');
  }
  
  mockReservations[index] = {
    ...mockReservations[index],
    status,
    updated_at: new Date().toISOString(),
  };
  
  return mockReservations[index];
}

export async function mockUpdateReservationNotes(
  reservationId: string,
  notes: string
): Promise<Reservation> {
  await delay(400);
  
  const index = mockReservations.findIndex(r => r.id === reservationId);
  if (index === -1) {
    throw new Error('Reserva no encontrada');
  }
  
  mockReservations[index] = {
    ...mockReservations[index],
    seller_notes: notes,
    updated_at: new Date().toISOString(),
  };
  
  return mockReservations[index];
}
