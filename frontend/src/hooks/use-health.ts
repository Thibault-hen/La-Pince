import { useQuery } from '@tanstack/react-query';
import { healthService } from '@/services/health';

export const useHealth = () => {
  return useQuery({
    queryKey: ['health'],
    queryFn: healthService.checkHealth,
    refetchInterval: 1000 * 60 * 5, // 5 minutes refresh
    retry: false,
  });
};
