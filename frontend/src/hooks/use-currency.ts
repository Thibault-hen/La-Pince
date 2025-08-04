import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { currencyService } from '@/services/currency';
import { currencyAtom } from '@/stores/currencyStore';
import type { CurrencyRates } from '@/types/currency';
import { getLocale } from '@/utils/getLocale';

export const useCurrency = () => {
	const currency = useAtomValue(currencyAtom);

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
		rates,
		convertFromEUR,
		convertToEUR,
		formatAmount,
		error,
		...others,
	};
};
