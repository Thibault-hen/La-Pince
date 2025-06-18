import { categoryService } from '@/services/category';
import type { CategoryWithBudget, UpdateCategory } from '@/types/category';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { useCurrency } from './use-currency';

export const useCategories = () => {
  const { currency, convertFromEUR } = useCurrency();
  const { data, ...others } = useQuery<CategoryWithBudget[]>({
    queryKey: ['categories', currency],
    queryFn: categoryService.getAll,
    select: (data) =>
      data.map((category) => ({
        ...category,
        budgets: category.budgets?.map((budget) => ({
          ...budget,
          amount: convertFromEUR(budget.amount),
        })),
      })),
    staleTime: 1000 * 60 * 5,
  });

  return {
    data,
    ...others,
  };
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: categoryService.createCategory,
    onSuccess: (data) => {
      toast.success(t('category.toast.created', { title: data.title }));
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: (_data) => {
      toast.error(t('category.toast.createError'));
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCategory }) =>
      categoryService.updateCategory(id, data),
    onSuccess: (data) => {
      toast.success(t('category.toast.updated', { title: data.title }));
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
    onError: (_data) => {
      toast.error(t('category.toast.updateError'));
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: categoryService.deleteCategory,
    onSuccess: (_data) => {
      toast.success(t('category.toast.deleted'));
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
    onError: (_data) => {
      toast.error(t('category.toast.deleteError'));
    },
  });
};
