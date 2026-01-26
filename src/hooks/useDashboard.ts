import { useQuery } from '@tanstack/react-query';
import { mockGetDashboardStats, mockGetRecentReservations } from '@/mocks/dashboard';
import { useAuth } from '@/contexts/AuthContext';

export function useDashboardStats() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['dashboard-stats', user?.id],
    queryFn: () => mockGetDashboardStats(user?.id ?? ''),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useRecentReservations(limit: number = 10) {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['recent-reservations', user?.id, limit],
    queryFn: () => mockGetRecentReservations(user?.id ?? '', limit),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}
