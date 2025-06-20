import { useCurrency } from '@/hooks/use-currency';
import type { Income } from '@/types/income';
import { Calculator, Euro, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface DashboardCardsProps {
  currentMonthRevenue?: Income;
  currentMonthBudget: number;
  currentMonthExpenses: number;
}

export const DashboardCards = ({
  currentMonthRevenue,
  currentMonthBudget,
  currentMonthExpenses,
}: DashboardCardsProps) => {
  const { t } = useTranslation();
  const { formatAmount } = useCurrency();
  return (
    <div className="flex flex-col xl:flew-row 2xl:flex-col w-full 2xl:max-w-xl justify-between gap-4">
      <div>
        <div className=" bg-white dark:bg-primary p-6 rounded-xl border hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-primary-color/10 border border-primary-color/20 rounded-lg">
              <Euro className="h-5 w-5 text-primary-color" />
            </div>
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              revenu
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {formatAmount(currentMonthRevenue?.value ?? 0)}
            </div>
            <p className="text-sm text-muted-foreground">{t('dashboard.cards.totalIncome')}</p>
          </div>
        </div>
      </div>

      <div>
        <div className="bg-white dark:bg-primary p-6 rounded-xl border hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-primary-color/10 border border-primary-color/20 rounded-lg">
              <Calculator className="h-5 w-5 text-primary-color" />
            </div>
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              budget total
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-xl md:text-3xl font-bold"> {formatAmount(currentMonthBudget)}</div>
            <p className="text-sm text-muted-foreground">{t('dashboard.cards.totalBudgets')}</p>
          </div>
        </div>
      </div>

      <div>
        <div className="bg-white dark:bg-primary p-6 rounded-xl border hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-primary-color/10 border border-primary-color/20 rounded-lg">
              <TrendingUp className="h-5 w-5 text-primary-color" />
            </div>
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Restant
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-xl md:text-3xl font-bold">
              {(currentMonthRevenue?.value ?? 0 - currentMonthExpenses < 0)
                ? formatAmount(0)
                : formatAmount((currentMonthRevenue?.value ?? 0) - currentMonthExpenses)}
            </div>
            <p className="text-sm text-muted-foreground">{t('dashboard.cards.remaining')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
