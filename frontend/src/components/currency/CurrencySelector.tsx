import { categories } from '@/data/data';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select';
import type { User } from '@/services/auth';
import { useQueryClient } from '@tanstack/react-query';
import { useCurrency } from '@/hooks/use-currency';

type Currency = {
  name: string;
  code: string;
  symbol: string;
};

const currencies = [
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
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData<User>(['authUser']);
  const { setCurrency } = useCurrency();
  return (
    <Select
      required
      defaultValue={userData?.user.currency ?? 'EUR'}
      onValueChange={(value) => setCurrency(value)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Selectionne ta monnaie</SelectLabel>
          {currencies?.map((currency, idx) => (
            <SelectItem key={idx} value={currency.code} className="flex cursor-pointer">
              <div className="flex items-center justify-center w-6 h-6">
                <span className=" p-2 bg-secondary-color border border-secondary-color/40 px-1.5 py-0.5 rounded-md">
                  {currency.symbol}
                </span>
              </div>
              <div className="flex flex-col ml-2 flex-start">
                <span className="font-bold">{currency.code}</span>
                <span className="font-bold text-muted-foreground text-xs">{currency.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
