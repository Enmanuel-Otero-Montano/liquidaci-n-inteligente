import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProduct, useSeller } from '@/hooks/useProduct';
import { formatPhoneForWhatsApp } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ProductGallery } from './components/ProductGallery';
import { ProductInfo } from './components/ProductInfo';
import { ProductDetailSkeleton } from './components/ProductDetailSkeleton';
import { ProductNotFound } from './components/ProductNotFound';
import { Breadcrumbs } from './components/Breadcrumbs';

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  
  const { 
    data: product, 
    isLoading: isProductLoading, 
    isError: isProductError 
  } = useProduct(slug);
  
  const { 
    data: seller, 
    isLoading: isSellerLoading 
  } = useSeller(product?.seller_id);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {isProductLoading ? (
          <ProductDetailSkeleton />
        ) : isProductError || !product ? (
          <ProductNotFound />
        ) : (
          <div className="container mx-auto px-4 py-6 md:py-10">
            {/* Botón volver */}
            <Button 
              variant="ghost" 
              size="sm" 
              asChild 
              className="mb-4 -ml-2"
            >
              <Link to="/liquidaciones">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al catálogo
              </Link>
            </Button>

            {/* Breadcrumbs */}
            <Breadcrumbs 
              category={product.category} 
              productTitle={product.title} 
            />

            {/* Layout principal */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Columna izquierda: Galería */}
              <div className="lg:sticky lg:top-6 lg:self-start">
                <ProductGallery 
                  images={product.images} 
                  title={product.title} 
                />
              </div>

              {/* Columna derecha: Info del producto */}
              <div>
                <ProductInfo 
                  product={product}
                  seller={seller}
                  isSellerLoading={isSellerLoading}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />

      {/* CTAs sticky en mobile */}
      {!isProductLoading && !isProductError && product && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 shadow-lg">
          <div className="container mx-auto flex gap-3">
            <Button 
              size="lg" 
              className="flex-1"
              disabled={product.stock_qty === 0}
            >
              {product.stock_qty === 0 ? 'Sin stock' : 'Reservar'}
            </Button>
            {seller?.telefono && (
              <Button 
                variant="outline" 
                size="lg"
                asChild
              >
                <a 
                  href={`https://wa.me/${formatPhoneForWhatsApp(seller.telefono)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                >
                  WhatsApp
                </a>
              </Button>
            )}
          </div>
        </div>
      )}
      
      {/* Spacer para mobile sticky footer */}
      <div className="lg:hidden h-20" />
    </div>
  );
}
