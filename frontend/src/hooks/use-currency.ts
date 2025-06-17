import { useCurrencyContext } from '@/context/currency-context';
import { currencyService } from '@/services/currency';
import type { CurrencyRates } from '@/types/currency';
import { useQuery } from '@tanstack/react-query';

export const useCurrency = () => {
  const { currency, setCurrency } = useCurrencyContext();
  const { data: rates = {}, ...others } = useQuery<CurrencyRates>({
    queryKey: ['currencyRates'],
    queryFn: async () => {
      console.log('Fetching currency rates for:', currency);
      const response = await currencyService.getCurrencyRates();
      return response.rates;
    },
    staleTime: 1000 * 60 * 60,
  });

  const convertFromEUR = (amount: number): number => {
    if (currency === 'EUR') return amount;

    if (!rates[currency]) {
      console.error(`Currency ${currency} not found in rates`);
      return amount;
    }
    return amount * rates[currency];
  };

  const convertToEUR = (amount: number): number => {
    if (currency === 'EUR') return amount;

    if (!rates[currency]) {
      console.error(`Currency ${currency} not found in rates`);
      return amount;
    }
    return amount / rates[currency];
  };

  const formatAmount = (amount: number): string => {
    const formattedAmount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formattedAmount.format(amount);
  };

  return {
    currency,
    setCurrency,
    convertFromEUR,
    convertToEUR,
    formatAmount,
    others,
  };
};
