import { Product } from '@/types/product';
import { ProductWithSeller, ModerationFilters } from '@/types/moderation';
import { mockSellers } from './sellers';
import { sellerProducts } from './products';

// Create mock pending products for moderation
const pendingProductsData: Omit<Product, 'seller'>[] = [
  {
    id: 'pending-1',
    slug: 'auriculares-bluetooth-jbl',
    title: 'Auriculares Bluetooth JBL Tune 510BT',
    description: 'Auriculares inalámbricos con hasta 40 horas de batería. Plegables y livianos.',
    category: 'Electrónica',
    price_before: 8500,
    price_now: 5100,
    discount_pct: 40,
    stock_qty: 12,
    location: 'Montevideo',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop',
    ],
    seller_id: 'seller-1',
    status: 'pending',
    delivery_type: 'shipping',
    shipping_cost: 150,
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'pending-2',
    slug: 'mesa-comedor-rustica',
    title: 'Mesa de Comedor Rústica 160cm - Madera Maciza',
    description: 'Mesa artesanal de madera reciclada. Ideal para 6 personas. Incluye protector de vidrio.',
    category: 'Hogar',
    price_before: 45000,
    price_now: 27000,
    discount_pct: 40,
    stock_qty: 2,
    location: 'Canelones',
    images: [
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&h=400&fit=crop',
    ],
    seller_id: 'seller-2',
    status: 'pending',
    delivery_type: 'pickup',
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'pending-3',
    slug: 'campera-puffer-mujer',
    title: 'Campera Puffer Mujer Talle M - Verde Oliva',
    description: 'Campera inflable ultraliviana, resistente al agua. Ideal para entretiempo.',
    category: 'Ropa',
    price_before: 12000,
    price_now: 4800,
    discount_pct: 60,
    stock_qty: 5,
    location: 'Montevideo',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=400&fit=crop',
    ],
    seller_id: 'seller-3',
    status: 'pending',
    delivery_type: 'both',
    shipping_cost: 200,
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'pending-4',
    slug: 'set-herramientas-stanley',
    title: 'Set de Herramientas Stanley 150 Piezas',
    description: 'Kit completo de herramientas profesionales. Maletín incluido.',
    category: 'Hogar',
    price_before: 18000,
    price_now: 10800,
    discount_pct: 40,
    stock_qty: 8,
    location: 'Paysandú',
    images: [
      'https://images.unsplash.com/photo-1581147036324-c17ac0f14f22?w=400&h=400&fit=crop',
    ],
    seller_id: 'seller-5',
    status: 'pending',
    delivery_type: 'shipping',
    shipping_cost: 350,
    created_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'pending-5',
    slug: 'crema-facial-loreal',
    title: 'Crema Facial L\'Oréal Revitalift - 50ml',
    description: 'Crema antiarrugas con ácido hialurónico. Sellada, vencimiento 2026.',
    category: 'Belleza',
    price_before: 4500,
    price_now: 2700,
    discount_pct: 40,
    stock_qty: 20,
    location: 'Montevideo',
    images: [
      'https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=400&h=400&fit=crop',
    ],
    seller_id: 'seller-4',
    status: 'pending',
    delivery_type: 'both',
    shipping_cost: 100,
    created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'pending-6',
    slug: 'bicicleta-plegable-btwin',
    title: 'Bicicleta Plegable B\'Twin Tilt 500',
    description: 'Bicicleta urbana plegable de 7 velocidades. Perfecta para ciudad.',
    category: 'Deportes',
    price_before: 65000,
    price_now: 32500,
    discount_pct: 50,
    stock_qty: 1,
    location: 'Maldonado',
    images: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=400&h=400&fit=crop',
    ],
    seller_id: 'seller-3',
    status: 'pending',
    delivery_type: 'pickup',
    created_at: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'pending-7',
    slug: 'cuna-bebe-convertible',
    title: 'Cuna Bebé Convertible 3 en 1 - Blanco',
    description: 'Cuna que se transforma en cama junior. Incluye colchón.',
    category: 'Bebés',
    price_before: 35000,
    price_now: 14000,
    discount_pct: 60,
    stock_qty: 3,
    location: 'Montevideo',
    images: [
      'https://images.unsplash.com/photo-1586105449897-20b5efeb3233?w=400&h=400&fit=crop',
    ],
    seller_id: 'seller-2',
    status: 'pending',
    delivery_type: 'both',
    shipping_cost: 500,
    created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'pending-8',
    slug: 'cartera-cuero-prune',
    title: 'Cartera de Cuero Prüne - Modelo Clásico',
    description: 'Cartera de cuero genuino con múltiples compartimentos. Color negro.',
    category: 'Accesorios',
    price_before: 18000,
    price_now: 9000,
    discount_pct: 50,
    stock_qty: 4,
    location: 'Montevideo',
    images: [
      'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400&h=400&fit=crop',
    ],
    seller_id: 'seller-1',
    status: 'pending',
    delivery_type: 'shipping',
    shipping_cost: 120,
    created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
  {
    id: 'pending-9',
    slug: 'microondas-samsung-32l',
    title: 'Microondas Samsung 32L con Grill',
    description: 'Microondas con función grill y descongelado inteligente.',
    category: 'Electrónica',
    price_before: 22000,
    price_now: 11000,
    discount_pct: 50,
    stock_qty: 6,
    location: 'Canelones',
    images: [
      'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=400&fit=crop',
    ],
    seller_id: 'seller-2',
    status: 'pending',
    delivery_type: 'pickup',
    created_at: new Date(Date.now() - 96 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 96 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'pending-10',
    slug: 'sillon-reclinable-cuero',
    title: 'Sillón Reclinable de Cuero Sintético',
    description: 'Sillón con reposapiés extensible y masajeador integrado.',
    category: 'Hogar',
    price_before: 55000,
    price_now: 22000,
    discount_pct: 60,
    stock_qty: 2,
    location: 'Salto',
    images: [
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=400&fit=crop',
    ],
    seller_id: 'seller-5',
    status: 'pending',
    delivery_type: 'pickup',
    created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  },
];

// Extra info for some products
const extraProductInfo: Record<string, Partial<ProductWithSeller>> = {
  'pending-1': { evidence_url: 'https://www.jbl.com.uy/auriculares/tune510bt' },
  'pending-3': { evidence_url: 'https://www.zara.com/uy/campera-puffer' },
  'pending-6': { evidence_url: 'https://www.decathlon.com.uy/bicicleta-plegable' },
  'pending-8': { evidence_url: 'https://www.prune.com.ar/carteras' },
};

// Mutable store for pending products
let pendingProducts = [...pendingProductsData];

// Get seller by ID
const getSellerById = (sellerId: string) => {
  const seller = mockSellers.find(s => s.id === sellerId);
  return seller ? {
    id: seller.id,
    nombre_comercial: seller.nombre_comercial,
    email: seller.email,
    zona: seller.zona,
    created_at: '2024-01-01T00:00:00Z',
  } : null;
};

// Get pending products with seller info
export async function mockGetPendingProducts(
  filters?: ModerationFilters
): Promise<ProductWithSeller[]> {
  await new Promise(resolve => setTimeout(resolve, 600));

  // Also include any pending products from sellerProducts
  const allPending = [
    ...pendingProducts,
    ...sellerProducts.filter(p => p.status === 'pending'),
  ];

  let products: ProductWithSeller[] = allPending.map(p => {
    const seller = getSellerById(p.seller_id);
    return {
      ...p,
      seller: seller || {
        id: p.seller_id,
        nombre_comercial: 'Vendedor Desconocido',
        email: 'unknown@email.com',
        zona: 'Sin zona',
      },
      ...extraProductInfo[p.id],
    };
  });

  // Apply filters
  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    products = products.filter(p =>
      p.title.toLowerCase().includes(searchLower) ||
      p.seller.nombre_comercial.toLowerCase().includes(searchLower)
    );
  }

  if (filters?.dateRange) {
    const now = new Date();
    products = products.filter(p => {
      const created = new Date(p.created_at);
      if (filters.dateRange === 'today') {
        return now.toDateString() === created.toDateString();
      }
      if (filters.dateRange === 'week') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return created >= weekAgo;
      }
      return true;
    });
  }

  // Sort
  if (filters?.sortBy === 'discount') {
    products.sort((a, b) => b.discount_pct - a.discount_pct);
  } else {
    // Default: oldest first (to review oldest submissions first)
    products.sort((a, b) => 
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
  }

  return products;
}

// Approve product
export async function mockApproveProduct(productId: string): Promise<Product> {
  await new Promise(resolve => setTimeout(resolve, 500));

  // Check in pending products
  const pendingIndex = pendingProducts.findIndex(p => p.id === productId);
  if (pendingIndex !== -1) {
    const product = pendingProducts[pendingIndex];
    product.status = 'approved';
    product.updated_at = new Date().toISOString();
    pendingProducts.splice(pendingIndex, 1);
    return product;
  }

  // Check in seller products
  const sellerProduct = sellerProducts.find(p => p.id === productId);
  if (sellerProduct) {
    sellerProduct.status = 'approved';
    sellerProduct.updated_at = new Date().toISOString();
    return sellerProduct;
  }

  throw new Error('Producto no encontrado');
}

// Reject product
export async function mockRejectProduct(
  productId: string,
  reason: string
): Promise<Product> {
  await new Promise(resolve => setTimeout(resolve, 500));

  const pendingIndex = pendingProducts.findIndex(p => p.id === productId);
  if (pendingIndex !== -1) {
    const product = pendingProducts[pendingIndex];
    product.status = 'rejected';
    product.updated_at = new Date().toISOString();
    pendingProducts.splice(pendingIndex, 1);
    console.log(`Product ${productId} rejected. Reason: ${reason}`);
    return product;
  }

  const sellerProduct = sellerProducts.find(p => p.id === productId);
  if (sellerProduct) {
    sellerProduct.status = 'rejected';
    sellerProduct.updated_at = new Date().toISOString();
    return sellerProduct;
  }

  throw new Error('Producto no encontrado');
}

// Request changes
export async function mockRequestChanges(
  productId: string,
  message: string
): Promise<Product> {
  await new Promise(resolve => setTimeout(resolve, 500));

  const pendingIndex = pendingProducts.findIndex(p => p.id === productId);
  if (pendingIndex !== -1) {
    const product = pendingProducts[pendingIndex];
    product.status = 'changes_requested';
    product.updated_at = new Date().toISOString();
    pendingProducts.splice(pendingIndex, 1);
    console.log(`Product ${productId} needs changes: ${message}`);
    return product;
  }

  const sellerProduct = sellerProducts.find(p => p.id === productId);
  if (sellerProduct) {
    sellerProduct.status = 'changes_requested';
    sellerProduct.updated_at = new Date().toISOString();
    return sellerProduct;
  }

  throw new Error('Producto no encontrado');
}
