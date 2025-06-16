import { budgetService } from '@/services/budget';
import type { UpdateBudget } from '@/types/budget';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useBudgets = () => {
  return useQuery({
    queryKey: ['budgets'],
    queryFn: budgetService.getAllBudgets,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateBudget = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: budgetService.createBudget,
    onSuccess: (data) => {
      toast.success(`Ton budget ${data.category.title} a été créé`);
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
    onError: (_data) => {
      toast.error('Une erreur est survenue ou un autre budget appartient déjà à cette catégorie');
    },
  });
};

export const useUpdateBudget = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBudget }) =>
      budgetService.updateBudget(id, data),
    onSuccess: (data) => {
      toast.success(`Ton budget ${data.category.title} a été mis à jour`);
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
    onError: (_data) => {
      toast.error(
        'Une erreur est survenue lors de la mise à jour ou un autre budget appartient déjà à cette catégorie'
      );
    },
  });
};

export const useDeleteBudget = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: budgetService.deleteBudget,
    onSuccess: (_data) => {
      toast.success('Ton budget a été supprimé');
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
    onError: (_data) => {
      toast.error(
        "Une erreur est survenue lors de la suppression de ton budget ou il n'existe plus"
      );
    },
  });
};
