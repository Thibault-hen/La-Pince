import type { DashboardData } from '@/types/dashboard';
import { api } from '@/utils/api';
import { delay } from '@/utils/delay';

export const dashboardService = {
	async getDashboard(): Promise<DashboardData> {
		await delay(3000);
		const response = await api.get<DashboardData>('/dashboard');
		return response.data;
	},
};
