import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';
import {
  type CreateExpense,
  type EditExpense,
  expenseService,
} from '@/services/expenses';
import type { Expense } from '@/types/expense';
import { showErrorToast, showSuccessToast } from '@/utils/toasts';
import { useCurrency } from './use-currency';

export const useExpenses = () => {
  const { convertFromEUR } = useCurrency();
  const { data = [], isLoading } = useQuery({
    queryKey: ['expenses'],
    queryFn: expenseService.getAll,
    select: (data) => {
      return data.map<Expense>((expense) => {
        return {
          id: expense.id,
          title: expense.description,
          category: {
            id: expense.category?.id,
            title: expense.category?.title,
            color: expense.category?.color.value,
          },
          amount: convertFromEUR(expense.amount),
          date: expense.date,
          budgetId: expense.budgetId ? expense.budgetId : undefined,
        };
      });
    },
  });

  return {
    expenses: data,
    isLoading: isLoading,
  };
};

export const useCreateExpense = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { convertToEUR } = useCurrency();

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof AxiosError) {
      if (error.response?.status === 404) {
        return t('expenses.toast.noBudget');
      }
      if (error.response?.status === 429) {
        return t('toast.tooManyAttempts');
      }
    }
    return t('expenses.toast.createError');
  };

  const mutation = useMutation({
    mutationKey: ['expenses'],
    mutationFn: (data: CreateExpense) =>
      expenseService.create({
        ...data,
        amount: convertToEUR(data.amount),
      }),
    onSuccess: (expense) => {
      showSuccessToast(
        t('expenses.toast.created', { title: expense.description }),
      );
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
    onError: (error) => {
      showErrorToast(getErrorMessage(error));
    },
  });

  return mutation;
};

export const useUpdateExpense = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { convertToEUR } = useCurrency();

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof AxiosError) {
      if (error.response?.status === 404) {
        return t('expenses.toast.noBudget');
      }
      if (error.response?.status === 429) {
        return t('toast.tooManyAttempts');
      }
    }
    return t('expenses.toast.updateError');
  };

  const mutation = useMutation({
    mutationKey: ['expenses'],
    mutationFn: ({ id, data }: { id: string; data: EditExpense }) =>
      expenseService.update(id, {
        ...data,
        amount: convertToEUR(data.amount),
      }),
    onSuccess: () => {
      showSuccessToast(t('expenses.toast.updated'));
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
    onError: (error) => {
      showErrorToast(getErrorMessage(error));
    },
  });
  return mutation;
};

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const mutation = useMutation({
    mutationKey: ['expenses'],
    mutationFn: (id: string) => expenseService.delete(id),
    onSuccess: () => {
      showSuccessToast(t('expenses.toast.deleted'));
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
    onError: () => {
      showErrorToast(t('expenses.toast.deleteError'));
    },
  });
  return mutation;
};
