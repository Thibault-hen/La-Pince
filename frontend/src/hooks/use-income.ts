import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { type UpdateIncome, updateIncomeSchema } from '@/schemas/income.schema';
import { incomeService } from '@/services/income';
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
			toast.success(t('income.toast.updated', { value: data.value }));
			queryClient.invalidateQueries({ queryKey: ['dashboard'] });
		},
		onError: (_error) => {
			toast.error(t('income.toast.error'));
		},
	});
};
