import { api } from '@/utils/api';

export type GetExpensesResponse = {
  id: string;
  description: string;
  amount: number;
  date: string;
  budgetId: string;
  category: {
    title: string;
    color: {
      value: string;
    };
  };
}[];

export type EditExpense = {
  description: string;
  amount: number;
  budgetId: string;
  date: string;
};

export type CreateExpense = {
  description: string;
  amount: number;
  budgetId: string;
  date: string;
}

type ExpenseResponse = {
  id: string;
  description: string;
  amount: number;
  date: string;
  budgetId: string;
}


export const expenseService = {
  async getAll(): Promise<GetExpensesResponse> {
    const { data } = await api.get<GetExpensesResponse>('/expense');
    return data;
  },
  async create(expense: CreateExpense): Promise<ExpenseResponse> {
    const { data } = await api.post('/expense', expense);
    return data;
  },
  async update(id: string, expense: EditExpense): Promise<ExpenseResponse> {
    const { data } = await api.put(`/expense/${id}`, expense);
    return data;
  },
  async delete(id: string): Promise<ExpenseResponse> {
    const { data } = await api.delete(`/expense/${id}`);
    return data;
  },
};
