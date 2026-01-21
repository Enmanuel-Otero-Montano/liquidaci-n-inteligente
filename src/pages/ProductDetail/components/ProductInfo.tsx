import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Product } from '@/types/product';
import { Seller } from '@/types/seller';
import { PriceBlock } from './PriceBlock';
import { StockBadge } from './StockBadge';
import { TrustBadge } from './TrustBadge';
import { SellerInfo } from './SellerInfo';
import { ProductActions } from './ProductActions';

interface ProductInfoProps {
  product: Product;
  seller: Seller | null | undefined;
  isSellerLoading?: boolean;
}

export function ProductInfo({ product, seller, isSellerLoading }: ProductInfoProps) {
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
        isLoading={isSellerLoading}
      />
    </div>
  );
}
