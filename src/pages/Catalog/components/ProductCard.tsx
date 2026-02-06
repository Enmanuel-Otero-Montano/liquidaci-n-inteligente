import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Product } from '@/types/product';
import { ArrowRight, AlertTriangle, Tag } from 'lucide-react';
import { SellerAvatar } from '@/components/seller/SellerAvatar';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const isLowStock = product.stock_qty <= 5;
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-UY', {
      style: 'currency',
      currency: 'UYU',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link 
      to={`/p/${product.slug}`}
      className="group block"
      aria-label={`Ver ${product.title} - ${formatPrice(product.price_now)} - ${product.discount_pct}% de descuento`}
    >
      <Card className="h-full overflow-hidden border-border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.images[0]}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Discount Badge */}
          <Badge 
            className="absolute top-3 right-3 bg-catalog-accent hover:bg-catalog-accent text-white font-bold text-sm px-2.5 py-1 shadow-md"
          >
            -{product.discount_pct}%
          </Badge>

          {/* Quantity Promo Badge */}
          {product.quantityPromo && (
            <Badge 
              variant="secondary" 
              className="absolute top-3 left-3 bg-purple-100 text-purple-700 border border-purple-300 font-bold text-sm px-2.5 py-1 shadow-md"
            >
              <Tag className="h-3.5 w-3.5 mr-1" />
              {product.quantityPromo.badgeText}
            </Badge>
          )}
        </div>

        <CardContent className="p-4 space-y-3">
          {/* Title */}
          <h3 className="font-medium text-foreground line-clamp-2 min-h-[2.5rem] leading-tight group-hover:text-primary transition-colors">
            {product.title}
          </h3>

          {/* Prices */}
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold text-foreground">
              {formatPrice(product.price_now)}
            </span>
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.price_before)}
            </span>
          </div>

          {/* Low Stock Badge */}
          {isLowStock && (
            <Badge 
              variant="outline" 
              className="border-catalog-warning text-catalog-warning bg-catalog-warning/10 text-xs"
            >
              <AlertTriangle className="h-3 w-3 mr-1" />
              {product.stock_qty === 1 ? 'Última unidad' : `Últimas ${product.stock_qty} unidades`}
            </Badge>
          )}

          {/* Seller Avatar */}
          {product.seller && (
            <div className="pt-1">
              <SellerAvatar
                image={product.seller.profile_image}
                name={product.seller.nombre_comercial}
                size="sm"
                showName={true}
              />
            </div>
          )}

          {/* Location */}
          <p className="text-xs text-muted-foreground">
            📍 {product.location}
          </p>

          {/* CTA Indicator */}
          <span className="inline-flex items-center text-sm font-medium text-catalog-primary group-hover:text-catalog-primary/80 transition-colors pt-1">
            Ver producto
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
