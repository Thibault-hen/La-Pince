import type { Color } from '@/types/color';
import { api } from '@/utils/api';

export const colorService = {
	async getAllColors(): Promise<Color[]> {
		const response = await api.get<Color[]>('/color');
		return response.data;
	},
};
