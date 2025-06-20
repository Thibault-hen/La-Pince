import type { DashboardData } from '@/types/dashboard';
import { api } from '@/utils/api';

export const dashboardService = {
  async getDashboard(): Promise<DashboardData> {
    const response = await api.get<DashboardData>('/dashboard');
    return response.data;
  },
};
