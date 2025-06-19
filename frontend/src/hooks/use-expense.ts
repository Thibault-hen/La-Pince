import { expenseService, type CreateExpense, type EditExpense } from '@/services/expenses';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { useCurrency } from './use-currency';

export type Expense = {
  id: string;
  title: string;
  budgetId: string;
  category: {
    title: string;
    color: string;
  };
  amount: number;
  date: string;
};

export function useExpenses() {
  const { convertFromEUR } = useCurrency();
  const { data = [], isLoading } = useQuery({
    queryKey: ['expenses'],
    queryFn: async () => {
      return expenseService.getAll();
    },
    select: (data) => {
      return data.map<Expense>((expense) => {
        return {
          id: expense.id,
          title: expense.description,
          category: {
            title: expense.category.title,
            color: expense.category.color.value,
          },
          amount: convertFromEUR(expense.amount),
          date: expense.date,
          budgetId: expense.budgetId,
        };
      });
    },
  });

  return {
    expenses: data,
    isLoading: isLoading,
  };
}

export function useCreateExpense() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { convertToEUR } = useCurrency();

  const getErrorMessage = (error: any): string | null => {
    if (!error) return null;

    if (error.response?.status === 404) {
      return t('expenses.toast.noBudget');
    }
    if (error.response?.status === 429) {
      return t('toast.tooManyAttempts');
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
      toast.success(t('expenses.toast.created', { title: expense.description }));
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  return mutation;
}

export function useUpdateExpense() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { convertToEUR } = useCurrency();

  const getErrorMessage = (error: any): string | null => {
    if (!error) return null;

    if (error.response?.status === 404) {
      return t('expenses.toast.noBudget');
    }
    if (error.response?.status === 429) {
      return t('toast.tooManyAttempts');
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
      toast.success(t('expenses.toast.updated'));
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
  return mutation;
}

export function useDeleteExpense() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const mutation = useMutation({
    mutationKey: ['expenses'],
    mutationFn: (id: string) => expenseService.delete(id),
    onSuccess: () => {
      toast.success(t('expenses.toast.deleted'));
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
    onError: () => {
      toast.error(t('expenses.toast.deleteError'));
    },
  });
  return mutation;
}
