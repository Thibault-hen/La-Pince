import type { Currency } from '@/types/currency';
import axios from 'axios';

export const currencyService = {
  async getCurrencyRates(): Promise<Currency> {
    const response = await axios.get<Currency>('https://api.exchangerate-api.com/v4/latest/EUR');
    return response.data;
  },
};
