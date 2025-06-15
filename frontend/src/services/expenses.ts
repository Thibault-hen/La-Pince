import { api } from '@/utils/api';

export type GetExpensesResponse = {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: {
    title: string;
    color: {
      value: string;
    };
  };
}[];

export const expenseService = {
  async getAll(): Promise<GetExpensesResponse> {
    const { data } = await api.get<GetExpensesResponse>('/expense');
    return data;
  },
};
