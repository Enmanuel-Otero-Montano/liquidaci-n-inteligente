import { useState, useCallback } from 'react';

interface MLProduct {
  ml_id: string;
  title: string;
  price: number;
  original_price: number | null;
  images: string[];
  permalink: string;
  available_quantity: number;
  discount_pct: number | null;
}

interface UseMercadoLibreReturn {
  isConnected: boolean;
  connect: (sellerId: string) => Promise<void>;
  products: MLProduct[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: (sellerId: string, offset?: number) => Promise<void>;
  hasMore: boolean;
  total: number;
}

export function useMercadoLibre(): UseMercadoLibreReturn {
  const [isConnected, setIsConnected] = useState(false);
  const [products, setProducts] = useState<MLProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const connect = useCallback(async (sellerId: string) => {
    try {
      setError(null);
      const res = await fetch(`/api/ml-auth-url?seller_id=${encodeURIComponent(sellerId)}`);
      const data = await res.json();

      if (!res.ok || !data.url) {
        setError(data.error || 'No se pudo generar la URL de conexión');
        return;
      }

      window.location.href = data.url;
    } catch {
      setError('Error al conectar con Mercado Libre');
    }
  }, []);

  const fetchProducts = useCallback(async (sellerId: string, offset = 0) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/ml-products?seller_id=${encodeURIComponent(sellerId)}&offset=${offset}`
      );
      const data = await res.json();

      if (!res.ok) {
        if (data.error === 'not_connected') {
          setIsConnected(false);
          setProducts([]);
          return;
        }
        setError(data.error || 'Error al obtener productos');
        return;
      }

      setIsConnected(true);
      setTotal(data.total);
      setHasMore(offset + (data.products?.length || 0) < data.total);

      if (offset === 0) {
        setProducts(data.products || []);
      } else {
        setProducts(prev => [...prev, ...(data.products || [])]);
      }
    } catch {
      setError('Error al obtener productos de MercadoLibre');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isConnected,
    connect,
    products,
    isLoading,
    error,
    fetchProducts,
    hasMore,
    total,
  };
}
