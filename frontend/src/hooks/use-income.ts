import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { type UpdateIncome, updateIncomeSchema } from '@/schemas/income.schema';
import { incomeService } from '@/services/income';
import { showErrorToast, showSuccessToast } from '@/utils/toasts';
import { useCurrency } from './use-currency';

export const useUpdateIncome = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { convertToEUR } = useCurrency();
  return useMutation({
    mutationFn: async ({ id, value }: { id: string; value: UpdateIncome }) => {
      updateIncomeSchema.parse(value);
      return incomeService.updateIncome(id, {
        value: convertToEUR(value.value),
      });
    },
    onSuccess: (data) => {
      showSuccessToast(t('income.toast.updated', { value: data.value }));
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
    onError: (_error) => {
      showErrorToast(t('income.toast.error'));
    },
  });
};
