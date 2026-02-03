import { useState } from 'react';
import { MessageCircle, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';
import { Seller } from '@/types/seller';
import { ReservationModal } from '@/components/ReservationModal/ReservationModal';

interface ProductActionsProps {
  product: Product;
  seller?: Seller;
  sellerPhone?: string;
  disabled?: boolean;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-UY', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function ProductActions({ product, seller, sellerPhone, disabled }: ProductActionsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const productUrl = `${window.location.origin}/p/${product.slug}`;
  
  const whatsappMessage = encodeURIComponent(
    `¡Hola! 👋\n\n` +
    `Me interesa este producto de LiquiOff:\n\n` +
    `📦 *${product.title}*\n` +
    `💰 Precio: $${formatPrice(product.price_now)} (antes $${formatPrice(product.price_before)})\n` +
    `🏷️ ${product.discount_pct}% OFF\n\n` +
    `🔗 Ver producto: ${productUrl}\n\n` +
    `¿Está disponible?`
  );
  
  const whatsappUrl = sellerPhone 
    ? `https://wa.me/${sellerPhone}?text=${whatsappMessage}`
    : null;

  const handleReserveClick = () => {
    setIsModalOpen(true);
  };

  const isOutOfStock = product.stock_qty === 0;

  return (
    <>
      <div className="flex flex-col gap-3">
        <Button 
          size="lg" 
          className="w-full text-base font-semibold"
          onClick={handleReserveClick}
          disabled={disabled || isOutOfStock}
        >
          <ShoppingBag className="mr-2 h-5 w-5" />
          {isOutOfStock ? 'Sin stock' : 'Reservar / Consultar'}
        </Button>

        {whatsappUrl && (
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full text-base"
            asChild
          >
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Abrir WhatsApp para consultar"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Abrir WhatsApp
            </a>
          </Button>
        )}
      </div>

      <ReservationModal 
        product={product}
        seller={seller}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
