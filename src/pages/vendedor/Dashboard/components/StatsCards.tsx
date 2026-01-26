import { Package, Clock, ClipboardList, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { DashboardStats } from '@/types/dashboard';

interface StatsCardsProps {
  stats?: DashboardStats;
  isLoading: boolean;
}

export function StatsCards({ stats, isLoading }: StatsCardsProps) {
  const cards = [
    {
      label: 'Productos publicados',
      value: stats?.totalProducts ?? 0,
      icon: Package,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: 'Productos activos',
      value: stats?.activeProducts ?? 0,
      icon: CheckCircle,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: 'Pendientes de aprobación',
      value: stats?.pendingProducts ?? 0,
      icon: Clock,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
    },
    {
      label: 'Reservas recibidas',
      value: stats?.totalReservations ?? 0,
      icon: ClipboardList,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Skeleton className="h-12 w-12 rounded-lg mb-4" />
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-4 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card) => (
        <Card key={card.label} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className={`w-12 h-12 rounded-lg ${card.bgColor} flex items-center justify-center mb-4`}>
              <card.icon className={`h-6 w-6 ${card.color}`} />
            </div>
            <p className="text-3xl font-bold text-foreground">{card.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{card.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
