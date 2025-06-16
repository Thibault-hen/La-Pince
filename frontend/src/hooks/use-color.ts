import { colorService } from '@/services/color';
import type { Color } from '@/types/color';
import { useQuery } from '@tanstack/react-query';

export const useColors = () => {
  return useQuery<Color[]>({
    queryKey: ['color'],
    queryFn: colorService.getAllColors,
    staleTime: 1000 * 60 * 5,
  });
};
