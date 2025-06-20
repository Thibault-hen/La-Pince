import type { UpdateIncome } from '@/schemas/income.schema';
import type { Income } from '@/types/income';
import axios from 'axios';

export const incomeService = {
  async updateIncome(id: string, value: UpdateIncome): Promise<Income> {
    const response = await axios.put<Income>(`/income/${id}`, value);
    return response.data;
  },
};
