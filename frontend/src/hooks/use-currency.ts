import { useCurrencyContext } from '@/context/currency-context';
import { currencyService } from '@/services/currency';
import type { CurrencyRates } from '@/types/currency';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

export const useCurrency = () => {
  const { currency, setCurrency } = useCurrencyContext();
  const { i18n } = useTranslation();
  const {
    data: rates = {},
    isError,
    error,
    ...others
  } = useQuery<CurrencyRates>({
    queryKey: ['currencyRates'],
    queryFn: async () => {
      throw Error('API not implemented yet');
      // const response = await currencyService.getCurrencyRates();
      // return response.rates;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: Infinity,

    // fallback data to avoid errors in the UI
    placeholderData: (previousData) => previousData,
  });

  const convertFromEUR = (amount: number): number => {
    if (currency === 'EUR') return amount;

    if (!rates[currency]) {
      return amount;
    }
    return amount * rates[currency];
  };

  const convertToEUR = (amount: number): number => {
    if (currency === 'EUR') return amount;

    if (!rates[currency]) {
      return amount;
    }
    return amount / rates[currency];
  };

  const formatAmount = (amount: number): string => {
    const getLocale = (): string => {
      switch (i18n.language) {
        case 'fr':
          return 'fr-FR';
        case 'en':
          return 'en-US';
        default:
          return navigator.language || 'fr-FR';
      }
    };

    const formattedAmount = new Intl.NumberFormat(getLocale(), {
      style: 'currency',
      currency: rates[currency] ? currency : 'EUR',
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
    error,
    ...others,
  };
};
