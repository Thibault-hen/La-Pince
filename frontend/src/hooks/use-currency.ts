import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useCurrencyContext } from '@/context/currency-context';
import { currencyService } from '@/services/currency';
import type { CurrencyRates } from '@/types/currency';

export const useCurrency = () => {
	const { currency } = useCurrencyContext();
	const { i18n } = useTranslation();

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

	const {
		data: rates = {},
		error,
		...others
	} = useQuery<CurrencyRates>({
		queryKey: ['currencyRates'],
		queryFn: async () => {
			const response = await currencyService.getCurrencyRates();
			return response.rates;
		},
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		retry: false,
		staleTime: Infinity,

		// fallback data to avoid errors in the UI
		placeholderData: (previousData) => previousData,
	});

	const getRate = () => rates[currency] || 1;

	const convertFromEUR = (amount: number): number => amount * getRate();
	const convertToEUR = (amount: number): number => amount / getRate();

	const formatAmount = (amount: number): string => {
		const formattedAmount = new Intl.NumberFormat(getLocale(), {
			style: 'currency',
			currency: rates[currency] ? currency : 'EUR',
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});

		return formattedAmount.format(amount);
	};

	return {
		convertFromEUR,
		convertToEUR,
		formatAmount,
		error,
		...others,
	};
};
