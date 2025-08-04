import type { UpdateIncome } from '@/schemas/income.schema';
import type { Income } from '@/types/income';
import { api } from '@/utils/api';

export const incomeService = {
	async updateIncome(value: UpdateIncome): Promise<Income> {
		const response = await api.put<Income>('/income', value);
		return response.data;
	},
};
