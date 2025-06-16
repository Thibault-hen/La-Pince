import { expenseService, type CreateExpense, type EditExpense } from '@/services/expenses';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

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
  const mutation = useMutation({
    mutationKey: ['expenses'],
    mutationFn: (expense: CreateExpense) => expenseService.create(expense),
    onSuccess: (expense) => {
      toast.success(`Ta dépense "${expense.description}" a été créé`);
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
    },
    onError: () => {
      toast.error('Une erreur est survenue lors de la création de ta dépense');
    }
  });

  return mutation;
}

export function useUpdateExpense() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ['expenses'],
    mutationFn: ({ id, data }: { id: string; data: EditExpense }) =>
      expenseService.update(id, data),
    onSuccess: () => {
      toast.success('Ta dépense a été mise à jour');
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
    },
    onError: () => {
      toast.error('Une erreur est survenue lors de la mise à jour de ta dépense');
    },
  });
  return mutation;
}

export function useDeleteExpense() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ['expenses'],
    mutationFn: (id: string) => expenseService.delete(id),
    onSuccess: () => {
      toast.success('Ta dépense a été supprimée');
      queryClient.invalidateQueries({ queryKey: ['expenses'] }
      )
    },
    onError: () => {
      toast.error('Une erreur est survenue lors de la suppression de ta dépense');
    },
  });
  return mutation;
}
