import { useQuery } from '@tanstack/react-query';
import { colorService } from '@/services/color';
import type { Color } from '@/types/color';

export const useColors = () => {
	return useQuery<Color[]>({
		queryKey: ['color'],
		queryFn: colorService.getAllColors,
	});
};
