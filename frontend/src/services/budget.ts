import { api } from '@/utils/api';

export type Category = {
  id: string;
  title: string;
  userId: string;
  colorId: number;
  createdAt: string;
  color: Color;
};

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

export type BudgetResponse = {
  budgetCount: number;
  budgetRemaning: number;
  budgetTotal: number;
  budgets: Budget[];
};

export const budgetService = {
  async getAllBudgets(): Promise<BudgetResponse> {
    const response = await api.get('/budget');
    return response.data;
  },
};
