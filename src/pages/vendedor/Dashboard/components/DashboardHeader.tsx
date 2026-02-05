import { useAuth } from '@/contexts/AuthContext';
import { SellerAvatar } from '@/components/seller/SellerAvatar';

export function DashboardHeader() {
  const { seller } = useAuth();
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 19) return 'Buenas tardes';
    return 'Buenas noches';
  };

  return (
    <div className="mb-8 flex items-center gap-4">
      {seller && (
        <SellerAvatar
          image={seller.profile_image_url}
          name={seller.nombre_comercial}
          size="lg"
          showName={false}
        />
      )}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          {getGreeting()}, {seller?.responsable?.split(' ')[0] || seller?.nombre_comercial}
        </h1>
        <p className="text-muted-foreground mt-1">
          Aquí está el resumen de tu tienda
        </p>
      </div>
    </div>
  );
}
