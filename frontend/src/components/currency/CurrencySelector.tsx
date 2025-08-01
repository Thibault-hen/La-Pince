import { useAtom } from 'jotai';
import { CloudAlert } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUpdateCurrency } from '@/hooks/use-account';
import { useCurrency } from '@/hooks/use-currency';
import { DefaultWrapper } from '@/layouts/DefaultWrapper';
import { currencyAtom } from '@/stores/currencyStore';

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
  const [currency, setCurrency] = useAtom(currencyAtom);
  const { error, isLoading } = useCurrency();
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
        <SelectTrigger className="w-full h-12 border-border/50 hover:border-secondary-color transition-all duration-300 focus:border-secondary-color disabled:opacity-50 disabled:cursor-not-allowed">
          <SelectValue
            placeholder={
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-8 h-6 border-border/30 flex items-center justify-center">
                  <span className="text-xs">¤</span>
                </div>
                <span>{t('currency.select')}</span>
              </div>
            }
          />
        </SelectTrigger>
        <SelectContent className="bg-background/95 backdrop-blur-xl border-2 border-border/50">
          <SelectGroup>
            <SelectLabel className="px-3 py-2 text-sm font-semibold">
              {t('currency.select')}
            </SelectLabel>
            {currencies?.map((currency) => (
              <SelectItem
                key={currency.code}
                value={currency.code}
                className="group cursor-pointer p-2 hover:bg-gradient-to-r hover:from-primary-color/10 hover:to-secondary-color/10 transition-all duration-300 hover:shadow-md border-b border-border/20 last:border-b-0 focus:bg-gradient-to-r focus:from-primary-color/15 focus:to-secondary-color/15"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="relative">
                    <div className="w-10 h-7 bg-gradient-to-br from-secondary-color to-secondary-color/80 border-2 border-secondary-color/60 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
                      <span className="text-white font-bold text-sm drop-shadow-sm">
                        {currency.symbol}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="font-bold text-foreground group-hover:text-secondary-color transition-colors duration-300">
                      {currency.code}
                    </span>
                    <span className="text-xs text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300 truncate">
                      {currency.name}
                    </span>
                  </div>
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
                <h4 className="text-sm font-medium">
                  {t('currencySelector.errorTitle')}
                </h4>
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
