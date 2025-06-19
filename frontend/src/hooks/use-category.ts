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

  const getErrorMessage = (error: any): string | null => {
    if (!error) return null;

    if (error.response?.status === 409) {
      return t('categories.toast.categoryAlreadyExist');
    }
    if (error.response?.status === 429) {
      return t('toast.tooManyAttempts');
    }
    return t('categories.toast.createError');
  };

  return useMutation({
    mutationFn: categoryService.createCategory,
    onSuccess: (data) => {
      toast.success(t('categories.toast.created', { title: t(data.title) }));
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
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
      toast.success(t('categories.toast.updated', { title: data.title }));
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
    onError: (_data) => {
      toast.error(t('categories.toast.updateError'));
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: categoryService.deleteCategory,
    onSuccess: (_data) => {
      toast.success(t('categories.toast.deleted'));
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
    onError: (_data) => {
      toast.error(t('categories.toast.deleteError'));
    },
  });
};
