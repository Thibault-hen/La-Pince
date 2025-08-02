import { useQuery } from '@tanstack/react-query';
import { healthService } from '@/services/health';

export const useHealth = () => {
  return useQuery({
    queryKey: ['health'],
    queryFn: healthService.checkHealth,
    staleTime: 1000 * 60 * 2, // 2 minutes cache
    refetchInterval: 1000 * 60 * 2, // 2 minutes refresh
  });
};
