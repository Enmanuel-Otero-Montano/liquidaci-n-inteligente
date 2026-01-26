import { DashboardStats, ReservationWithProduct } from '@/types/dashboard';
import { mockProducts } from './products';

// Mock reservations with product info
const mockReservations: ReservationWithProduct[] = [
  {
    id: 'res-1',
    product_id: '1',
    product_title: 'Campera de Invierno North Face - Talle M',
    buyer_name: 'María García',
    buyer_contact: '099123456',
    quantity: 1,
    status: 'new',
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 min ago
  },
  {
    id: 'res-2',
    product_id: '3',
    product_title: 'Zapatillas Nike Air Max 270 - Talle 42',
    buyer_name: 'Juan Rodríguez',
    buyer_contact: 'juan@email.com',
    quantity: 1,
    note: 'Prefiero retirar después de las 18hs',
    status: 'contacted',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    id: 'res-3',
    product_id: '9',
    product_title: 'Reloj Casio Edifice Cronógrafo - Acero',
    buyer_name: 'Ana Martínez',
    buyer_contact: '098765432',
    quantity: 2,
    status: 'new',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
  },
  {
    id: 'res-4',
    product_id: '13',
    product_title: 'Mochila The North Face Borealis 28L',
    buyer_name: 'Carlos López',
    buyer_contact: 'carlos.lopez@gmail.com',
    quantity: 1,
    status: 'closed',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
  {
    id: 'res-5',
    product_id: '1',
    product_title: 'Campera de Invierno North Face - Talle M',
    buyer_name: 'Laura Fernández',
    buyer_contact: '099888777',
    quantity: 1,
    note: 'Es para regalo, ¿tienen caja?',
    status: 'new',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
  },
];

export async function mockGetDashboardStats(sellerId: string): Promise<DashboardStats> {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Filter products by seller
  const sellerProducts = mockProducts.filter(p => p.seller_id === sellerId);
  
  return {
    totalProducts: sellerProducts.length,
    pendingProducts: sellerProducts.filter(p => p.status === 'pending').length,
    activeProducts: sellerProducts.filter(p => p.status === 'approved').length,
    totalReservations: mockReservations.filter(r => 
      sellerProducts.some(p => p.id === r.product_id)
    ).length,
  };
}

export async function mockGetRecentReservations(
  sellerId: string, 
  limit: number = 10
): Promise<ReservationWithProduct[]> {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Filter reservations for seller's products
  const sellerProducts = mockProducts.filter(p => p.seller_id === sellerId);
  const sellerReservations = mockReservations.filter(r => 
    sellerProducts.some(p => p.id === r.product_id)
  );
  
  // Sort by date and limit
  return sellerReservations
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, limit);
}
