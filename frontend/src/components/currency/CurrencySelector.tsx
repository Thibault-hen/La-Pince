import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select';
import { useCurrency } from '@/hooks/use-currency';
import { useTranslation } from 'react-i18next';
import { CloudAlert } from 'lucide-react';
import { DefaultWrapper } from '@/layouts/DefaultWrapper';
import { useUpdateCurrency } from '@/hooks/use-account';

type Currency = {
  name: string;
  code: string;
  symbol: string;
};

export const currencies = [
  { name: 'US Dollar', code: 'USD', symbol: '$' },
  { name: 'Euro', code: 'EUR', symbol: '€' },
  { name: 'British Pound', code: 'GBP', symbol: '£' },
  { name: 'Japanese Yen', code: 'JPY', symbol: '¥' },
  { name: 'Swiss Franc', code: 'CHF', symbol: 'CHF' },
  { name: 'Canadian Dollar', code: 'CAD', symbol: 'CA$' },
  { name: 'Australian Dollar', code: 'AUD', symbol: 'A$' },
  { name: 'Chinese Yuan', code: 'CNY', symbol: '¥' },
  { name: 'Indian Rupee', code: 'INR', symbol: '₹' },
  { name: 'Brazilian Real', code: 'BRL', symbol: 'R$' },
  { name: 'South Korean Won', code: 'KRW', symbol: '₩' },
  { name: 'Mexican Peso', code: 'MXN', symbol: '$' },
  { name: 'Russian Ruble', code: 'RUB', symbol: '₽' },
  { name: 'Turkish Lira', code: 'TRY', symbol: '₺' },
  { name: 'South African Rand', code: 'ZAR', symbol: 'R' },
  { name: 'New Zealand Dollar', code: 'NZD', symbol: 'NZ$' },
  { name: 'Singapore Dollar', code: 'SGD', symbol: 'S$' },
  { name: 'Hong Kong Dollar', code: 'HKD', symbol: 'HK$' },
  { name: 'Swedish Krona', code: 'SEK', symbol: 'kr' },
  { name: 'Norwegian Krone', code: 'NOK', symbol: 'kr' },
] as Currency[];

export const CurrencySelector = () => {
  const { currency, setCurrency, error, isLoading } = useCurrency();
  const { t } = useTranslation();
  const { mutateAsync: updateCurrency } = useUpdateCurrency();

  const handleUpdateCurrency = async (currency: string) => {
    if (currency === undefined || currency === null) return;

    await updateCurrency({ currency });
    setCurrency(currency);
  };
  return (
    <div>
      <Select
        disabled={isLoading || error !== null}
        required
        value={currency}
        onValueChange={(value) => handleUpdateCurrency(value)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{t('currency.select')}</SelectLabel>
            {currencies?.map((currency, idx) => (
              <SelectItem key={idx} value={currency.code} className="flex cursor-pointer">
                <div className="flex items-center justify-center w-10 h-6">
                  <span className="w-10 h-6 flex items-center justify-center bg-secondary-color border border-secondary-color/40 rounded-md">
                    {currency.symbol}
                  </span>
                </div>
                <div className="flex flex-col ml-2 ">
                  <span className="font-bold">{currency.code}</span>
                  <span className="font-bold text-muted-foreground text-xs">{currency.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {error && (
        <DefaultWrapper>
          <div className="mt-3 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <CloudAlert className="h-5 w-5 text-red-500" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium">{t('currencySelector.errorTitle')}</h4>
                <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                  {t('currencySelector.error')}
                </p>
              </div>
            </div>
          </div>
        </DefaultWrapper>
      )}
    </div>
  );
};
