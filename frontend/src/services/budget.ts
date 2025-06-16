import type { BudgetResponse, CreateBudget, Budget, UpdateBudget } from '@/types/budget';
import { api } from '@/utils/api';

export const budgetService = {
  async getAllBudgets(): Promise<BudgetResponse> {
    const response = await api.get<BudgetResponse>('/budget');
    return response.data;
  },

  async createBudget(data: CreateBudget): Promise<Budget> {
    const response = await api.post<Budget>('/budget', data);
    return response.data;
  },

  async updateBudget(id: string, data: UpdateBudget): Promise<Budget> {
    const response = await api.patch<Budget>(`/budget/${id}`, data);
    return response.data;
  },

  async deleteBudget(id: string): Promise<Budget> {
    const response = await api.delete<Budget>(`/budget/${id}`);
    return response.data;
  },
};
