import { api } from '@/utils/api';
import type { Category } from './category';

export type Color = {
  id: string;
  value: string;
  createdAt: string;
  updatedAt: string;
};

export type Budget = {
  id: string;
  amount: number;
  categoryId: string;
  category: Category;
  createdAt: string;
  updatedAt: string;
  limitAlert: number;
  month: number;
  year: number;
  userId: string;
  totalExpense: number;
};

export type CreateBudget = {
  amount: number;
  categoryId: string;
  limitAlert: number;
};

export type UpdateBudget = {
  amount?: number;
  categoryId?: string;
  limitAlert?: number;
};

export type BudgetResponse = {
  budgetCount: number;
  budgetRemaining: number;
  budgetTotal: number;
  budgets: Budget[];
};

export const budgetService = {
  async getAllBudgets(): Promise<BudgetResponse> {
    const response = await api.get('/budget');
    return response.data;
  },

  async createBudget(data: CreateBudget): Promise<Budget> {
    const response = await api.post('/budget', data);
    return response.data;
  },

  async updateBudget(id: string, data: UpdateBudget): Promise<Budget> {
    const response = await api.patch(`/budget/${id}`, data);
    return response.data;
  },

  async deleteBudget(id: string): Promise<Budget> {
    const response = await api.delete(`/budget/${id}`);
    return response.data;
  },
};
