import { updateIncomeSchema, type UpdateIncome } from '@/schemas/income.schema';
import { incomeService } from '@/services/income';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

export const useUpdateIncome = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: async ({ id, value }: { id: string; value: UpdateIncome }) => {
      updateIncomeSchema.parse(value);
      const response = await incomeService.updateIncome(id, value);
      return response;
    },
    onSuccess: (data) => {
      toast.success(t('income.toast.updated', { income: data.value }));
      queryClient.invalidateQueries({ queryKey: ['account'] });
    },
    onError: (_error) => {
      toast.error(t('income.toast.error'));
    },
  });
};
