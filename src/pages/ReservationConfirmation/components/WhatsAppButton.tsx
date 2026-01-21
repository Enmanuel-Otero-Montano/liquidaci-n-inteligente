import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  productTitle: string;
  productUrl: string;
  buyerName: string;
}

function generateWhatsAppLink({ 
  phoneNumber, 
  productTitle, 
  productUrl, 
  buyerName 
}: WhatsAppButtonProps): string {
  const defaultNumber = '59899999999';
  const phone = phoneNumber?.replace(/\D/g, '') || defaultNumber;
  
  const message = encodeURIComponent(
    `¡Hola! Soy ${buyerName}.\n\n` +
    `Acabo de reservar: *${productTitle}*\n` +
    `${productUrl}\n\n` +
    `¿Podemos coordinar?`
  );
  
  return `https://wa.me/${phone}?text=${message}`;
}

export function WhatsAppButton({ 
  phoneNumber, 
  productTitle, 
  productUrl, 
  buyerName 
}: WhatsAppButtonProps) {
  const whatsappLink = generateWhatsAppLink({
    phoneNumber,
    productTitle,
    productUrl,
    buyerName,
  });

  return (
    <Button
      asChild
      size="lg"
      className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white"
    >
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar al vendedor por WhatsApp"
      >
        <MessageCircle className="mr-2 h-5 w-5" />
        Contactar por WhatsApp
      </a>
    </Button>
  );
}
