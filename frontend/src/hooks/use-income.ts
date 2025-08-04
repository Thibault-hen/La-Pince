import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { type UpdateIncome, updateIncomeSchema } from '@/schemas/income.schema';
import { incomeService } from '@/services/income';
import { showErrorToast, showSuccessToast } from '@/utils/toasts';
import { useCurrency } from './use-currency';

export const useUpdateIncome = () => {
	const queryClient = useQueryClient();
	const { t } = useTranslation();
	const { convertToEUR, formatAmount } = useCurrency();
	return useMutation({
		mutationFn: async ({ income }: { income: UpdateIncome }) => {
			updateIncomeSchema.parse(income);
			return incomeService.updateIncome({
				value: convertToEUR(income.value),
			});
		},
		onSuccess: (data) => {
			showSuccessToast(
				t('income.toast.updated', { value: formatAmount(data.value) }),
			);
			queryClient.invalidateQueries({ queryKey: ['dashboard'] });
		},
		onError: (_error) => {
			showErrorToast(t('income.toast.error'));
		},
	});
};
