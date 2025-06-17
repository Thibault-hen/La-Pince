import { budgetService } from '@/services/budget';
import type { BudgetResponse, UpdateBudget } from '@/types/budget';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

export const useBudgets = () => {
  return useQuery<BudgetResponse>({
    queryKey: ['budgets'],
    queryFn: budgetService.getAllBudgets,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateBudget = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: budgetService.createBudget,
    onSuccess: (data) => {
      toast.success(t('budget.toast.created', { title: data.category.title }));
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
    onError: (_data) => {
      toast.error(t('budget.toast.createError'));
    },
  });
};

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
