import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useAtomValue } from 'jotai';
import { useTranslation } from 'react-i18next';
import { categoryService } from '@/services/category';
import { currencyAtom } from '@/stores/currencyStore';
import type { CategoryWithBudget, UpdateCategory } from '@/types/category';
import { delay } from '@/utils/delay';
import { showErrorToast, showSuccessToast } from '@/utils/toasts';
import { useCurrency } from './use-currency';

export const useCategories = () => {
  const { convertFromEUR } = useCurrency();
  const currency = useAtomValue(currencyAtom);
  const { data, ...others } = useQuery<CategoryWithBudget[]>({
    queryKey: ['categories', currency],
    queryFn: async () => {
      await delay(3000);
      return categoryService.getAll();
    },
    select: (data) =>
      data.map((category) => ({
        ...category,
        budgets: category.budgets?.map((budget) => ({
          ...budget,
          amount: convertFromEUR(budget.amount),
        })),
      })),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  return {
    data,
    ...others,
  };
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof AxiosError) {
      if (error.response?.status === 409) {
        return t('categories.toast.categoryAlreadyExist');
      }
      if (error.response?.status === 429) {
        return t('toast.tooManyAttempts');
      }
    }
    return t('categories.toast.createError');
  };

  return useMutation({
    mutationFn: categoryService.createCategory,
    onSuccess: (data) => {
      showSuccessToast(t('categories.toast.created', { title: t(data.title) }));
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: (error) => {
      showErrorToast(getErrorMessage(error));
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
      showSuccessToast(t('categories.toast.updated', { title: data.title }));
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
    onError: (_data) => {
      showErrorToast(t('categories.toast.updateError'));
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: categoryService.deleteCategory,
    onSuccess: (_data) => {
      showSuccessToast(t('categories.toast.deleted'));
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
    onError: (_data) => {
      showErrorToast(t('categories.toast.deleteError'));
    },
  });
};
