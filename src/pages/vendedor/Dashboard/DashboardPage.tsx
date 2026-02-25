import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { SellerLayout } from '@/components/layouts/SellerLayout';
import { DashboardHeader } from './components/DashboardHeader';
import { StatsCards } from './components/StatsCards';
import { RecentReservations } from './components/RecentReservations';
import { QuickActions } from './components/QuickActions';
import { useDashboardStats, useRecentReservations } from '@/hooks/useDashboard';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function DashboardPage() {
  const { seller } = useAuth();
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: reservations, isLoading: reservationsLoading } = useRecentReservations(5);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (searchParams.get('email_confirmed') === '1') {
      toast({
        title: '¡Email confirmado!',
        description: 'Gracias por registrarte.',
        duration: 6000,
        className: 'bg-emerald-600 text-white border-emerald-700 [&>div]:text-white',
      });
      navigate('/vendedor', { replace: true });
    }
  }, []);

  return (
    <SellerLayout>
      <DashboardHeader />

      {seller?.status === 'pending' && (
        <Alert variant="default" className="border-amber-200 bg-amber-50 dark:bg-amber-950/20 mb-6">
          <Clock className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-700 dark:text-amber-400">
            <span className="font-medium">Cuenta pendiente de aprobación.</span>{' '}
            Estamos revisando tu registro. En breve tu cuenta estará activa y podrás empezar a publicar.
          </AlertDescription>
        </Alert>
      )}

      <StatsCards stats={stats} isLoading={statsLoading} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentReservations 
            reservations={reservations} 
            isLoading={reservationsLoading} 
          />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
    </SellerLayout>
  );
}
