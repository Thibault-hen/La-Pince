import { BanknoteArrowDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useCurrency } from '@/hooks/use-currency';

interface FinanceCardProps {
  title: string;
  amount: number;
  icon?: React.ReactNode;
}

export const FinanceCard = ({ title, amount, icon }: FinanceCardProps) => {
  const { formatAmount } = useCurrency();

  return (
    <Card className="w-full h-44 dark:bg-primary shadow-md hover:shadow-lg transition-all duration-300">
      <CardContent className="h-full flex flex-col justify-between">
        <div className="flex justify-start">
          <div className="sm:p-2.5 bg-primary-color/10 border border-primary-color/20 rounded-lg">
            {icon ? icon : <BanknoteArrowDown className="w-4 h-4 text-primary-color" />}
          </div>
        </div>

        <div className="space-y-1 sm:space-y-2">
          <h3 className="text-xs sm:text-sm font-medium text-muted-foreground tracking-wide truncate">
            {title}
          </h3>
          <p className="text-lg sm:text-xl md:text-xl lg:text-2xl font-bold text-foreground tracking-tight break-all">
            {formatAmount(amount)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
