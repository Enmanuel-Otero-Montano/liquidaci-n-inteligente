import { MapPin, Clock, FileText, Shield } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Seller } from '@/types/seller';
import { Skeleton } from '@/components/ui/skeleton';
import { SellerAvatar } from '@/components/seller/SellerAvatar';

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
      
      {/* Vendedor con Avatar */}
      {seller && (
        <div className="flex items-center justify-between">
          <SellerAvatar
            image={seller.profile_image}
            name={seller.nombre_comercial}
            subtitle={seller.zona}
            size="md"
            showName={true}
          />
          {seller.status === 'active' && (
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              <Shield className="h-3 w-3 mr-1" />
              Verificado
            </Badge>
          )}
        </div>
      )}

      {/* Ubicación */}
      <div className="flex items-start gap-3">
        <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
        <div>
          <p className="font-medium">Retiro en {location}</p>
          {seller?.direccion && (
            <p className="text-sm text-muted-foreground">{seller.direccion}</p>
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
