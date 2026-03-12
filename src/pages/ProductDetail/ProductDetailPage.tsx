import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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

const SITE = 'https://liquioff.com.uy';

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

  const productUrl = product ? `${SITE}/p/${product.slug}` : '';
  const productImage = product?.images?.[0] || `${SITE}/liquioff-logo-og-1200x630.png`;
  const productTitle = product ? `${product.title} - ${product.discount_pct}% OFF | LiquiOff` : '';
  const productDescription = product
    ? (product.description || '').substring(0, 155) || `${product.title} con ${product.discount_pct}% de descuento en LiquiOff Uruguay.`
    : '';

  const productSchema = product ? (() => {
    const updatedAt = new Date(product.updated_at);
    const priceValidUntil = new Date(updatedAt.getTime() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];
    const sellerName = product.seller?.nombre_comercial || '';
    const pickupShipping = { "@type": "OfferShippingDetails", "doesNotShip": true };
    const paidShipping = {
      "@type": "OfferShippingDetails",
      "shippingRate": {
        "@type": "MonetaryAmount",
        "value": product.shipping_cost ?? 0,
        "currency": "UYU",
      },
      "shippingDestination": { "@type": "DefinedRegion", "addressCountry": "UY" },
    };
    const shippingDetails =
      product.delivery_type === 'pickup' ? pickupShipping
      : product.delivery_type === 'both' ? [pickupShipping, paidShipping]
      : paidShipping;
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.title,
      "description": product.description,
      "image": product.images || [],
      "url": productUrl,
      "brand": {
        "@type": "Brand",
        "name": sellerName,
      },
      "offers": {
        "@type": "Offer",
        "price": product.price_now,
        "priceCurrency": "UYU",
        "priceValidUntil": priceValidUntil,
        "availability": product.stock_qty > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
        "url": productUrl,
        "seller": {
          "@type": "Organization",
          "name": sellerName,
        },
        "shippingDetails": shippingDetails,
        "hasMerchantReturnPolicy": {
          "@type": "MerchantReturnPolicy",
          "applicableCountry": "UY",
          "returnPolicyCategory": "https://schema.org/MerchantReturnUnspecified",
        },
      },
    };
  })() : null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {product && (
        <Helmet>
          <title>{productTitle}</title>
          <meta name="description" content={productDescription} />
          <link rel="canonical" href={productUrl} />
          <meta property="og:type" content="product" />
          <meta property="og:title" content={productTitle} />
          <meta property="og:description" content={productDescription} />
          <meta property="og:image" content={productImage} />
          <meta property="og:url" content={productUrl} />
          <meta property="og:locale" content="es_UY" />
          <meta property="og:site_name" content="LiquiOff" />
          <meta property="product:price:amount" content={String(product.price_now)} />
          <meta property="product:price:currency" content="UYU" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={productTitle} />
          <meta name="twitter:description" content={productDescription} />
          <meta name="twitter:image" content={productImage} />
          <script type="application/ld+json">
            {JSON.stringify(productSchema)}
          </script>
        </Helmet>
      )}

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
