import { Product } from '@/types/product';
import { DEPARTAMENTOS_URUGUAY } from '@/data/constants';

export const mockProducts: Product[] = [
  {
    id: "1",
    slug: "campera-invierno-north",
    title: "Campera de Invierno North Face - Talle M",
    description: "Campera térmica, impermeable, última temporada. Ideal para días fríos.",
    category: "Ropa",
    price_before: 150000,
    price_now: 89000,
    discount_pct: 41,
    stock_qty: 3,
    location: "Montevideo",
    images: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop"],
    seller_id: "seller-1",
    status: "approved",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z"
  },
  {
    id: "2",
    slug: "smart-tv-samsung-55",
    title: "Smart TV Samsung 55\" 4K UHD - Modelo 2023",
    description: "Televisor inteligente con resolución 4K, HDR10+, sistema Tizen.",
    category: "Electrónica",
    price_before: 89000,
    price_now: 59900,
    discount_pct: 33,
    stock_qty: 8,
    location: "Canelones",
    images: ["https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop"],
    seller_id: "seller-2",
    status: "approved",
    created_at: "2024-01-14T15:30:00Z",
    updated_at: "2024-01-14T15:30:00Z"
  },
  {
    id: "3",
    slug: "zapatillas-running-nike",
    title: "Zapatillas Nike Air Max 270 - Talle 42",
    description: "Zapatillas de running con tecnología Air Max para máximo confort.",
    category: "Deportes",
    price_before: 45000,
    price_now: 27000,
    discount_pct: 40,
    stock_qty: 2,
    location: "Montevideo",
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop"],
    seller_id: "seller-1",
    status: "approved",
    created_at: "2024-01-13T09:00:00Z",
    updated_at: "2024-01-13T09:00:00Z"
  },
  {
    id: "4",
    slug: "sofa-3-cuerpos-gris",
    title: "Sofá 3 Cuerpos Escandinavo - Gris Oxford",
    description: "Sofá de diseño nórdico, tapizado en tela premium, patas de madera.",
    category: "Hogar",
    price_before: 120000,
    price_now: 72000,
    discount_pct: 40,
    stock_qty: 1,
    location: "Maldonado",
    images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop"],
    seller_id: "seller-3",
    status: "approved",
    created_at: "2024-01-12T11:00:00Z",
    updated_at: "2024-01-12T11:00:00Z"
  },
  {
    id: "5",
    slug: "perfume-carolina-herrera",
    title: "Perfume Good Girl Carolina Herrera 80ml",
    description: "Fragancia femenina icónica. Notas de jazmín, cacao y tonka.",
    category: "Belleza",
    price_before: 18000,
    price_now: 12600,
    discount_pct: 30,
    stock_qty: 15,
    location: "Montevideo",
    images: ["https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop"],
    seller_id: "seller-4",
    status: "approved",
    created_at: "2024-01-11T14:00:00Z",
    updated_at: "2024-01-11T14:00:00Z"
  },
  {
    id: "6",
    slug: "bicicleta-mtb-specialized",
    title: "Bicicleta MTB Specialized Rockhopper 29\"",
    description: "Mountain bike con cuadro de aluminio, frenos hidráulicos, 21 velocidades.",
    category: "Deportes",
    price_before: 85000,
    price_now: 51000,
    discount_pct: 40,
    stock_qty: 4,
    location: "Paysandú",
    images: ["https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&h=400&fit=crop"],
    seller_id: "seller-5",
    status: "approved",
    created_at: "2024-01-10T16:00:00Z",
    updated_at: "2024-01-10T16:00:00Z"
  },
  {
    id: "7",
    slug: "cochecito-bebe-chicco",
    title: "Cochecito de Bebé Chicco Bravo - Negro",
    description: "Sistema de viaje completo, incluye huevito. Plegado compacto.",
    category: "Bebés",
    price_before: 65000,
    price_now: 39000,
    discount_pct: 40,
    stock_qty: 5,
    location: "Montevideo",
    images: ["https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400&h=400&fit=crop"],
    seller_id: "seller-2",
    status: "approved",
    created_at: "2024-01-09T10:30:00Z",
    updated_at: "2024-01-09T10:30:00Z"
  },
  {
    id: "8",
    slug: "notebook-lenovo-thinkpad",
    title: "Notebook Lenovo ThinkPad E14 - i5 16GB",
    description: "Laptop empresarial, procesador Intel i5, 16GB RAM, SSD 512GB.",
    category: "Electrónica",
    price_before: 125000,
    price_now: 87500,
    discount_pct: 30,
    stock_qty: 6,
    location: "Canelones",
    images: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop"],
    seller_id: "seller-3",
    status: "approved",
    created_at: "2024-01-08T09:00:00Z",
    updated_at: "2024-01-08T09:00:00Z"
  },
  {
    id: "9",
    slug: "reloj-casio-edifice",
    title: "Reloj Casio Edifice Cronógrafo - Acero",
    description: "Reloj analógico con cronógrafo, resistente al agua 100m, cristal mineral.",
    category: "Accesorios",
    price_before: 28000,
    price_now: 14000,
    discount_pct: 50,
    stock_qty: 3,
    location: "Montevideo",
    images: ["https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop"],
    seller_id: "seller-1",
    status: "approved",
    created_at: "2024-01-07T12:00:00Z",
    updated_at: "2024-01-07T12:00:00Z"
  },
  {
    id: "10",
    slug: "set-ollas-tramontina",
    title: "Set de Ollas Tramontina 7 Piezas - Acero Inox",
    description: "Juego de ollas profesional, triple fondo, apto para todas las cocinas.",
    category: "Hogar",
    price_before: 32000,
    price_now: 19200,
    discount_pct: 40,
    stock_qty: 10,
    location: "Salto",
    images: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop"],
    seller_id: "seller-4",
    status: "approved",
    created_at: "2024-01-06T08:00:00Z",
    updated_at: "2024-01-06T08:00:00Z"
  },
  {
    id: "11",
    slug: "vestido-zara-verano",
    title: "Vestido Zara Midi Floral - Talle S",
    description: "Vestido de verano con estampado floral, corte midi, tela liviana.",
    category: "Ropa",
    price_before: 8500,
    price_now: 4250,
    discount_pct: 50,
    stock_qty: 4,
    location: "Montevideo",
    images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop"],
    seller_id: "seller-5",
    status: "approved",
    created_at: "2024-01-05T14:00:00Z",
    updated_at: "2024-01-05T14:00:00Z"
  },
  {
    id: "12",
    slug: "auriculares-sony-wh1000",
    title: "Auriculares Sony WH-1000XM4 - Negro",
    description: "Auriculares inalámbricos con cancelación de ruido líder en el mercado.",
    category: "Electrónica",
    price_before: 55000,
    price_now: 33000,
    discount_pct: 40,
    stock_qty: 2,
    location: "Montevideo",
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"],
    seller_id: "seller-2",
    status: "approved",
    created_at: "2024-01-04T11:00:00Z",
    updated_at: "2024-01-04T11:00:00Z"
  },
  {
    id: "13",
    slug: "mochila-north-face-borealis",
    title: "Mochila The North Face Borealis 28L",
    description: "Mochila urbana con compartimento para laptop, respaldo acolchado.",
    category: "Accesorios",
    price_before: 22000,
    price_now: 13200,
    discount_pct: 40,
    stock_qty: 7,
    location: "Canelones",
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop"],
    seller_id: "seller-1",
    status: "approved",
    created_at: "2024-01-03T10:00:00Z",
    updated_at: "2024-01-03T10:00:00Z"
  },
  {
    id: "14",
    slug: "cafetera-nespresso-vertuo",
    title: "Cafetera Nespresso Vertuo Next - Roja",
    description: "Cafetera de cápsulas con tecnología Centrifusion, 5 tamaños de café.",
    category: "Hogar",
    price_before: 42000,
    price_now: 25200,
    discount_pct: 40,
    stock_qty: 5,
    location: "Montevideo",
    images: ["https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop"],
    seller_id: "seller-3",
    status: "approved",
    created_at: "2024-01-02T09:00:00Z",
    updated_at: "2024-01-02T09:00:00Z"
  },
  {
    id: "15",
    slug: "kit-maquillaje-mac",
    title: "Kit Maquillaje MAC - Paleta + Labiales",
    description: "Set completo con paleta de sombras y 3 labiales de colores clásicos.",
    category: "Belleza",
    price_before: 35000,
    price_now: 17500,
    discount_pct: 50,
    stock_qty: 3,
    location: "Maldonado",
    images: ["https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop"],
    seller_id: "seller-4",
    status: "approved",
    created_at: "2024-01-01T15:00:00Z",
    updated_at: "2024-01-01T15:00:00Z"
  },
  {
    id: "16",
    slug: "silla-gamer-secretlab",
    title: "Silla Gamer Secretlab Titan - Negro/Verde",
    description: "Silla ergonómica premium, reclinable 165°, soporte lumbar ajustable.",
    category: "Hogar",
    price_before: 95000,
    price_now: 66500,
    discount_pct: 30,
    stock_qty: 2,
    location: "Montevideo",
    images: ["https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&h=400&fit=crop"],
    seller_id: "seller-5",
    status: "approved",
    created_at: "2023-12-30T10:00:00Z",
    updated_at: "2023-12-30T10:00:00Z"
  }
];

// Additional products for seller-1 with various statuses
export const sellerProducts: Product[] = [
  ...mockProducts,
  {
    id: "17",
    slug: "chaqueta-cuero-vintage",
    title: "Chaqueta de Cuero Vintage - Talle L",
    description: "Chaqueta de cuero genuino, estilo retro, excelente estado.",
    category: "Ropa",
    price_before: 80000,
    price_now: 48000,
    discount_pct: 40,
    stock_qty: 1,
    location: "Montevideo",
    images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop"],
    seller_id: "seller-1",
    status: "draft",
    created_at: "2024-01-20T10:00:00Z",
    updated_at: "2024-01-20T10:00:00Z"
  },
  {
    id: "18",
    slug: "gorra-adidas-running",
    title: "Gorra Adidas Aeroready - Running",
    description: "Gorra deportiva con tecnología de secado rápido.",
    category: "Deportes",
    price_before: 3500,
    price_now: 2100,
    discount_pct: 40,
    stock_qty: 10,
    location: "Montevideo",
    images: ["https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop"],
    seller_id: "seller-1",
    status: "pending",
    created_at: "2024-01-19T14:00:00Z",
    updated_at: "2024-01-19T14:00:00Z"
  },
  {
    id: "19",
    slug: "remera-algodon-premium",
    title: "Pack 3 Remeras Algodón Premium - Varios Colores",
    description: "Remeras de algodón peinado, alta durabilidad.",
    category: "Ropa",
    price_before: 4500,
    price_now: 2700,
    discount_pct: 40,
    stock_qty: 0,
    location: "Montevideo",
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop"],
    seller_id: "seller-1",
    status: "rejected",
    created_at: "2024-01-18T09:00:00Z",
    updated_at: "2024-01-18T09:00:00Z"
  },
  {
    id: "20",
    slug: "bolso-deportivo-nike",
    title: "Bolso Deportivo Nike Brasilia - 60L",
    description: "Bolso amplio con compartimento para zapatillas.",
    category: "Deportes",
    price_before: 12000,
    price_now: 7200,
    discount_pct: 40,
    stock_qty: 5,
    location: "Montevideo",
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop"],
    seller_id: "seller-1",
    status: "disabled",
    created_at: "2024-01-17T16:00:00Z",
    updated_at: "2024-01-17T16:00:00Z"
  },
];

export const categories = [
  { label: "Ropa", slug: "ropa" },
  { label: "Electrónica", slug: "electronica" },
  { label: "Hogar", slug: "hogar" },
  { label: "Deportes", slug: "deportes" },
  { label: "Belleza", slug: "belleza" },
  { label: "Bebés", slug: "bebes" },
  { label: "Accesorios", slug: "accesorios" },
];

export const locations = DEPARTAMENTOS_URUGUAY.map((dep) => ({
  label: dep,
  slug: dep.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-'),
}));

export const discountOptions = [
  { value: 25, label: "≥25% OFF" },
  { value: 30, label: "≥30% OFF" },
  { value: 40, label: "≥40% OFF" },
  { value: 50, label: "≥50% OFF" },
];

export const sortOptions = [
  { value: "discount_desc" as const, label: "Más descuento" },
  { value: "newest" as const, label: "Más nuevos" },
  { value: "price_asc" as const, label: "Precio menor" },
];

// Mock function to get seller products
export const mockGetSellerProducts = async (
  sellerId: string,
  filters?: {
    status?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }
): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  let products = sellerProducts.filter(p => p.seller_id === sellerId);
  
  // Apply status filter
  if (filters?.status && filters.status !== 'all') {
    products = products.filter(p => p.status === filters.status);
  }
  
  // Apply search filter
  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    products = products.filter(p => 
      p.title.toLowerCase().includes(searchLower) ||
      p.category.toLowerCase().includes(searchLower)
    );
  }
  
  // Apply sorting
  if (filters?.sortBy) {
    products = [...products].sort((a, b) => {
      const order = filters.sortOrder === 'desc' ? -1 : 1;
      switch (filters.sortBy) {
        case 'title':
          return order * a.title.localeCompare(b.title);
        case 'discount_pct':
          return order * (a.discount_pct - b.discount_pct);
        case 'stock_qty':
          return order * (a.stock_qty - b.stock_qty);
        case 'created_at':
          return order * (new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        default:
          return 0;
      }
    });
  }
  
  return products;
};

// Mock function to duplicate a product
export const mockDuplicateProduct = async (productId: string): Promise<Product> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const product = sellerProducts.find(p => p.id === productId);
  if (!product) {
    throw new Error('Producto no encontrado');
  }
  
  const newProduct: Product = {
    ...product,
    id: `product-${Date.now()}`,
    slug: `${product.slug}-copia`,
    title: `${product.title} (Copia)`,
    status: 'draft',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  
  sellerProducts.push(newProduct);
  return newProduct;
};

// Mock function to toggle product status
export const mockToggleProductStatus = async (
  productId: string, 
  newStatus: 'approved' | 'disabled'
): Promise<Product> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const product = sellerProducts.find(p => p.id === productId);
  if (!product) {
    throw new Error('Producto no encontrado');
  }
  
  product.status = newStatus;
  product.updated_at = new Date().toISOString();
  
  return product;
};

// Helper to generate slug from title
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// Mock function to get a product for editing
export const mockGetProductForEdit = async (productId: string): Promise<Product | null> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return sellerProducts.find(p => p.id === productId) || null;
};

// Mock function to create a product
export const mockCreateProduct = async (
  data: {
    title: string;
    category: string;
    description: string;
    images: string[];
    liquidation_reason: string;
    stock_qty: number;
    price_before: number;
    price_now: number;
    pickup_address?: string;
    pickup_hours?: string;
    offers_shipping: boolean;
    shipping_cost?: number;
    evidence_url?: string;
    status: 'draft' | 'pending';
  },
  sellerId: string
): Promise<Product> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const discount_pct = Math.round(((data.price_before - data.price_now) / data.price_before) * 100);
  
  const newProduct: Product = {
    id: `product-${Date.now()}`,
    slug: generateSlug(data.title),
    title: data.title,
    description: data.description,
    category: data.category,
    price_before: data.price_before,
    price_now: data.price_now,
    discount_pct,
    stock_qty: data.stock_qty,
    location: 'Montevideo', // Default, would come from seller
    images: data.images,
    seller_id: sellerId,
    status: data.status,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  
  sellerProducts.push(newProduct);
  return newProduct;
};

// Mock function to update a product
export const mockUpdateProduct = async (
  productId: string,
  data: Partial<{
    title: string;
    category: string;
    description: string;
    images: string[];
    liquidation_reason: string;
    stock_qty: number;
    price_before: number;
    price_now: number;
    pickup_address?: string;
    pickup_hours?: string;
    offers_shipping: boolean;
    shipping_cost?: number;
    evidence_url?: string;
    status: 'draft' | 'pending';
  }>
): Promise<Product> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const productIndex = sellerProducts.findIndex(p => p.id === productId);
  if (productIndex === -1) {
    throw new Error('Producto no encontrado');
  }
  
  const product = sellerProducts[productIndex];
  
  // Calculate new discount if prices changed
  let discount_pct = product.discount_pct;
  if (data.price_before !== undefined && data.price_now !== undefined) {
    discount_pct = Math.round(((data.price_before - data.price_now) / data.price_before) * 100);
  }
  
  const updatedProduct: Product = {
    ...product,
    ...data,
    discount_pct,
    slug: data.title ? generateSlug(data.title) : product.slug,
    updated_at: new Date().toISOString(),
  };
  
  sellerProducts[productIndex] = updatedProduct;
  return updatedProduct;
};
