import { useState } from 'react';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { SubscribersHeader } from './components/SubscribersHeader';
import { SubscribersStats } from './components/SubscribersStats';
import { SubscribersTable } from './components/SubscribersTable';
import { useSubscribers, useSubscriberStats, SubscriberFilters } from '@/hooks/useSubscribers';

export function SubscribersPage() {
  const [filters, setFilters] = useState<SubscriberFilters>({
    metodo_contacto: 'all',
  });

  const { data: subscribers = [], isLoading } = useSubscribers(filters);
  const { data: stats } = useSubscriberStats();

  const updateFilter = (key: keyof SubscriberFilters, value: string | undefined) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <SubscribersHeader
          totalCount={stats?.total || 0}
          filters={filters}
          onFilterChange={updateFilter}
        />

        <SubscribersStats stats={stats} />

        <SubscribersTable
          subscribers={subscribers}
          isLoading={isLoading}
        />
      </div>
    </AdminLayout>
  );
}
