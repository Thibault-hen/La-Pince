import { expenseService } from '@/services/expenses';
import { useQuery } from '@tanstack/react-query';

export type Expense = {
  id: string;
  title: string;
  category: {
    title: string;
    color: string;
  };
  amount: number;
  date: string;
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useExpenses: () => { expenses: Expense[]; isLoading: boolean } = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ['expenses'],
    queryFn: async () => {
      await delay(1000);
      return expenseService.getAll();
    },
    select: (data) => {
      return data.map((expense) => {
        return {
          id: expense.id,
          title: expense.description,
          category: {
            title: expense.category.title,
            color: expense.category.color.value,
          },
          amount: expense.amount,
          date: expense.date,
        };
      });
    },
    staleTime: 1000 * 60 * 5,
  });

  return {
    expenses: data,
    isLoading: isLoading,
  };
};
