import type { Currency } from '@/types/currency';
import { api } from '@/utils/api';

export const currencyService = {
  async getCurrencyRates(): Promise<Currency> {
    const response = await api.get<Currency>('exchange-rate');
    return response.data;
  },
};
