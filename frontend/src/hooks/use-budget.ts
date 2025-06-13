import { budgetService } from '@/services/budget';
import { useQuery } from '@tanstack/react-query';
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useBudgets = () => {
  return useQuery({
    queryKey: ['budgets'],
    queryFn: async () => {
      await delay(3000);
      const budgets = await budgetService.getAllBudgets();
      return budgets;
    },
  });
};
