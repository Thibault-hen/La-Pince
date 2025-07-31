import { api } from '@/utils/api';

export const healthService = {
  async checkHealth(): Promise<Record<string, string>> {
    const response = await api.get('/health');
    return response.data;
  },
};
