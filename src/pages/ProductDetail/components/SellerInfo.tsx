import { MapPin, Clock, Store, FileText } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Seller } from '@/types/seller';
import { Skeleton } from '@/components/ui/skeleton';

interface SellerInfoProps {
  seller: Seller | null | undefined;
  location: string;
  isLoading?: boolean;
}

export function SellerInfo({ seller, location, isLoading }: SellerInfoProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-40" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Separator />
      
      {/* Vendedor */}
      {seller && (
        <div className="flex items-start gap-3">
          <Store className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="font-medium">{seller.nombre_comercial}</p>
            <p className="text-sm text-muted-foreground">Vendedor verificado</p>
          </div>
        </div>
      )}

      {/* Ubicación */}
      <div className="flex items-start gap-3">
        <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
        <div>
          <p className="font-medium">Retiro en {location}</p>
          {seller?.horario_retiro && (
            <p className="text-sm text-muted-foreground">{seller.horario_retiro}</p>
          )}
        </div>
      </div>

      {/* Horarios */}
      {seller?.horario_retiro && (
        <div className="flex items-start gap-3">
          <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="font-medium">Horarios de retiro</p>
            <p className="text-sm text-muted-foreground">{seller.horario_retiro}</p>
          </div>
        </div>
      )}

      {/* Políticas */}
      {seller?.politicas && (
        <>
          <Separator />
          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium text-sm">Condiciones del vendedor</p>
              <p className="text-sm text-muted-foreground">{seller.politicas}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
