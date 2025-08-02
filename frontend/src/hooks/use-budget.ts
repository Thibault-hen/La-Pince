import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useAtomValue } from 'jotai';
import { useTranslation } from 'react-i18next';
import { budgetService } from '@/services/budget';
import { currencyAtom } from '@/stores/currencyStore';
import type {
  Budget,
  BudgetResponse,
  CreateBudget,
  UpdateBudget,
} from '@/types/budget';
import { showErrorToast, showSuccessToast } from '@/utils/toasts';
import { useCurrency } from './use-currency';

export const useBudgets = () => {
  const { convertFromEUR } = useCurrency();
  const currency = useAtomValue(currencyAtom);
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
  });
};

export const useCreateBudget = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { convertToEUR } = useCurrency();

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof AxiosError) {
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
      showSuccessToast(
        t('budget.toast.created', { title: t(data.category.title) }),
      );
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: (error) => {
      showErrorToast(getErrorMessage(error));
    },
  });
};

export const useUpdateBudget = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { convertToEUR } = useCurrency();

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof AxiosError) {
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
      showSuccessToast(
        t('budget.toast.updated', { title: t(data.category.title) }),
      );
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
    onError: (error) => {
      showErrorToast(getErrorMessage(error));
    },
  });
};

export const useDeleteBudget = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: budgetService.deleteBudget,
    onSuccess: (_data) => {
      showSuccessToast(t('budget.toast.deleted'));
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
    onError: (_data) => {
      showErrorToast(t('budget.toast.deleteError'));
    },
  });
};
