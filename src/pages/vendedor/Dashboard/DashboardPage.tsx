import { SellerLayout } from '@/components/layouts/SellerLayout';
import { DashboardHeader } from './components/DashboardHeader';
import { StatsCards } from './components/StatsCards';
import { RecentReservations } from './components/RecentReservations';
import { QuickActions } from './components/QuickActions';
import { useDashboardStats, useRecentReservations } from '@/hooks/useDashboard';
import { useAuth } from '@/contexts/AuthContext';
import { Clock } from 'lucide-react';

export function DashboardPage() {
  const { seller } = useAuth();
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: reservations, isLoading: reservationsLoading } = useRecentReservations(5);

  return (
    <SellerLayout>
      <DashboardHeader />

      {seller?.status === 'pending' && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-amber-400" />
            <div>
              <p className="font-medium text-amber-300">Cuenta pendiente de aprobación</p>
              <p className="text-sm text-amber-400/70 mt-1">
                Estamos revisando tu registro. Te notificaremos por email cuando tu cuenta esté activa
                y puedas empezar a publicar.
              </p>
            </div>
          </div>
        </div>
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
