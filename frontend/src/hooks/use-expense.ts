import { expenseService, type CreateExpense, type EditExpense } from '@/services/expenses';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

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
          amount: expense.amount,
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
  const mutation = useMutation({
    mutationKey: ['expenses'],
    mutationFn: (expense: CreateExpense) => expenseService.create(expense),
    onSuccess: (expense) => {
      toast.success(t('expenses.toast.created', { title: expense.description }));
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
    onError: () => {
      toast.error(t('expenses.toast.createError'));
    },
  });

  return mutation;
}

export function useUpdateExpense() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const mutation = useMutation({
    mutationKey: ['expenses'],
    mutationFn: ({ id, data }: { id: string; data: EditExpense }) =>
      expenseService.update(id, data),
    onSuccess: () => {
      toast.success(t('expenses.toast.updated'));
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
    onError: () => {
      toast.error(t('expenses.toast.updateError'));
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
