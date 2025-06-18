import { budgetService } from '@/services/budget';
import type { Budget, BudgetResponse, CreateBudget, UpdateBudget } from '@/types/budget';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { useCurrency } from './use-currency';

export const useBudgets = () => {
  const { convertFromEUR, currency } = useCurrency();
  return useQuery<BudgetResponse>({
    queryKey: ['budgets', currency],
    queryFn: budgetService.getAllBudgets,
    select: (data) => ({
      ...data,
      budgets: data.budgets.map((budget: Budget) => ({
        ...budget,
        totalExpense: convertFromEUR(budget.totalExpense),
        amount: convertFromEUR(budget.amount),
        limitAlert: convertFromEUR(budget.limitAlert),
      })),
      budgetTotal: convertFromEUR(data.budgetTotal),
      budgetRemaining: convertFromEUR(data.budgetRemaining),
    }),
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateBudget = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { convertToEUR } = useCurrency();
  return useMutation({
    mutationFn: async (data: CreateBudget) => {
      return budgetService.createBudget({
        ...data,
        amount: convertToEUR(data.amount),
        limitAlert: convertToEUR(data.limitAlert),
      });
    },
    onSuccess: (data) => {
      console.log('Budget created:', data);
      toast.success(t('budget.toast.created', { title: data.category.title }));
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
    onError: (_data) => {
      toast.error(t('budget.toast.createError'));
    },
  });
}


export const useUpdateBudget = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBudget }) =>
      budgetService.updateBudget(id, data),
    onSuccess: (data) => {
      toast.success(t('budget.toast.updated', { title: data.category.title }));
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
    onError: (_data) => {
      toast.error(t('budget.toast.updateError'));
    },
  });
};

export const useDeleteBudget = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: budgetService.deleteBudget,
    onSuccess: (_data) => {
      toast.success(t('budget.toast.deleted'));
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
    onError: (_data) => {
      toast.error(t('budget.toast.deleteError'));
    },
  });
};
