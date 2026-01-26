import { SellerLayout } from '@/components/layouts/SellerLayout';
import { DashboardHeader } from './components/DashboardHeader';
import { StatsCards } from './components/StatsCards';
import { RecentReservations } from './components/RecentReservations';
import { QuickActions } from './components/QuickActions';
import { useDashboardStats, useRecentReservations } from '@/hooks/useDashboard';

export function DashboardPage() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: reservations, isLoading: reservationsLoading } = useRecentReservations(5);

  return (
    <SellerLayout>
      <DashboardHeader />
      
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
