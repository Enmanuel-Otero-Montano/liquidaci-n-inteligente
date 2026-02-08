import { useState } from 'react';
import { MessageCircle, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';
import { Seller } from '@/types/seller';
import { ReservationModal } from '@/components/ReservationModal/ReservationModal';
import { formatPhoneForWhatsApp } from '@/lib/utils';

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

  const productUrl = (() => {
    const rawUrl = `${window.location.origin}/p/${product.slug}`;
    try {
      const url = new URL(rawUrl);
      // En algunos clientes, http sin dominio público puede no detectarse como link.
      // Forzamos https cuando no es localhost.
      if (!['localhost', '127.0.0.1'].includes(url.hostname) && url.protocol === 'http:') {
        url.protocol = 'https:';
      }
      return url.toString();
    } catch {
      return rawUrl;
    }
  })();

  // Nota: evitamos emojis en el texto prearmado para que no aparezcan caracteres "�"
  // en dispositivos/navegadores con soporte limitado.
  const whatsappMessage =
    `¡Hola!\n\n` +
    `Me interesa este producto de LiquiOff:\n\n` +
    `*${product.title}*\n` +
    `Precio: $${formatPrice(product.price_now)} (antes $${formatPrice(product.price_before)})\n` +
    `Descuento: ${product.discount_pct}% OFF\n\n` +
    // URL sola en su línea para maximizar que WhatsApp la detecte como link (al enviarlo).
    `Link del producto:\n${productUrl}\n\n` +
    `¿Está disponible?`;

  const whatsappUrl = sellerPhone
    ? `https://wa.me/${formatPhoneForWhatsApp(sellerPhone)}?${new URLSearchParams({ text: whatsappMessage }).toString()}`
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
