import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Product } from '@/types/product';
import { Seller } from '@/types/seller';
import { ReservationForm } from './ReservationForm';

interface ReservationModalProps {
  product: Product;
  seller?: Seller;
  isOpen: boolean;
  onClose: () => void;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-UY', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function ReservationModal({ product, seller, isOpen, onClose }: ReservationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reservar producto</DialogTitle>
          <DialogDescription>
            Completá tus datos para reservar o consultar por este producto.
          </DialogDescription>
        </DialogHeader>

        {/* Resumen del producto */}
        <div className="flex gap-4 p-4 bg-muted rounded-lg">
          <img 
            src={product.images[0] || '/placeholder.svg'} 
            alt={product.title}
            className="h-16 w-16 object-cover rounded-md"
          />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{product.title}</p>
            <p className="text-lg font-bold text-primary">
              ${formatPrice(product.price_now)}
            </p>
          </div>
        </div>

        <ReservationForm product={product} seller={seller} onSuccess={onClose} />
      </DialogContent>
    </Dialog>
  );
}
