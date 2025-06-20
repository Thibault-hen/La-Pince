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

  const getErrorMessage = (error: any): string | null => {
    if (!error) return null;

    if (error.response?.status === 404) {
      return t('budget.toast.noCategory');
    }
    if (error.response?.status === 422) {
      return t('budget.toast.limitTooHigh');
    }
    if (error.response?.status === 409) {
      return t('budget.toast.categoryAlreadyUsed');
    }
    if (error.response?.status === 429) {
      return t('toast.tooManyAttempts');
    }
    return t('budget.toast.createError');
  };

  return useMutation({
    mutationFn: async (data: CreateBudget) => {
      return budgetService.createBudget({
        ...data,
        amount: convertToEUR(data.amount),
        limitAlert: convertToEUR(data.limitAlert),
      });
    },
    onSuccess: (data) => {
      toast.success(t('budget.toast.created', { title: t(data.category.title) }));
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

export const useUpdateBudget = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { convertToEUR } = useCurrency();

  const getErrorMessage = (error: any): string | null => {
    if (!error) return null;

    if (error.response?.status === 404) {
      return t('budget.toast.noCategory');
    }
    if (error.response?.status === 422) {
      return t('budget.toast.limitTooHigh');
    }
    if (error.response?.status === 409) {
      return t('budget.toast.categoryAlreadyUsed');
    }
    if (error.response?.status === 429) {
      return t('toast.tooManyAttempts');
    }
    return t('budget.toast.updateError');
  };

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBudget }) =>
      budgetService.updateBudget(id, {
        ...data,
        amount: convertToEUR(data.amount ?? 0),
        limitAlert: convertToEUR(data.limitAlert ?? 0),
      }),
    onSuccess: (data) => {
      toast.success(t('budget.toast.updated', { title: t(data.category.title) }));
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
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
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
    onError: (_data) => {
      toast.error(t('budget.toast.deleteError'));
    },
  });
};
