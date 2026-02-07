import { useState } from 'react';
import { Flag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Product } from '@/types/product';
import { Seller } from '@/types/seller';
import { PriceBlock } from './PriceBlock';
import { StockBadge } from './StockBadge';
import { TrustBadge } from './TrustBadge';
import { SellerInfo } from './SellerInfo';
import { ProductActions } from './ProductActions';
import { ReportModal } from '@/components/ReportModal';
import { QuantityPromoDetail } from '@/components/product/QuantityPromoDetail';

interface ProductInfoProps {
  product: Product;
  seller: Seller | null | undefined;
  isSellerLoading?: boolean;
}

export function ProductInfo({ product, seller, isSellerLoading }: ProductInfoProps) {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Categoría */}
      <Badge variant="secondary" className="text-sm">
        {product.category}
      </Badge>

      {/* Título */}
      <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
        {product.title}
      </h1>

      {/* Badge de confianza */}
      <TrustBadge />

      <Separator />

      {/* Bloque de precio */}
      <PriceBlock 
        priceBefore={product.price_before}
        priceNow={product.price_now}
        discountPct={product.discount_pct}
      />

      {/* Stock */}
      <StockBadge quantity={product.stock_qty} />

      {/* Promoción por cantidad */}
      {product.quantityPromo && (
        <QuantityPromoDetail 
          promo={product.quantityPromo} 
          priceNow={product.price_now} 
        />
      )}

      <Separator />

      {/* CTAs */}
      <ProductActions 
        product={product}
        seller={seller || undefined}
        sellerPhone={seller?.telefono}
        disabled={product.stock_qty === 0}
      />

      {/* Descripción */}
      <div className="space-y-2">
        <h2 className="font-semibold text-lg">Descripción</h2>
        <p className="text-muted-foreground leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Info del vendedor */}
      <SellerInfo
        seller={seller}
        location={product.location}
        deliveryType={product.delivery_type}
        shippingCost={product.shipping_cost}
        isLoading={isSellerLoading}
      />

      {/* Reportar publicación */}
      <Separator />
      <div className="flex justify-center">
        <Button 
          variant="ghost" 
          size="sm"
          className="text-destructive border border-transparent hover:border-destructive hover:bg-transparent hover:text-destructive"
          onClick={() => setIsReportModalOpen(true)}
        >
          <Flag className="h-4 w-4 mr-1" />
          Reportar publicación
        </Button>
      </div>

      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        productId={product.id}
        productTitle={product.title}
      />
    </div>
  );
}
