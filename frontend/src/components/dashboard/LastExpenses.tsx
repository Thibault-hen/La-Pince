import { ArrowUpRight, Calendar, TrendingDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCurrency } from '@/hooks/use-currency';
import type { Expense } from '@/types/dashboard';
import { Button } from '../ui/button';

interface LastExpensesProps {
  lastExpensesData: Expense[];
}

export const LastExpenses = ({ lastExpensesData }: LastExpensesProps) => {
  const navigate = useNavigate();
  const { formatAmount } = useCurrency();
  const { i18n, t } = useTranslation();

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return t('dashboard.last10Expenses.today');
    } else if (date.toDateString() === yesterday.toDateString()) {
      return t('dashboard.last10Expenses.isYesterday');
    } else {
      return date.toLocaleDateString(getLocale(), {
        day: 'numeric',
        month: 'short',
      });
    }
  };

  const totalAmount = lastExpensesData.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );

  return (
    <div className="w-full md:max-w-xl shadow-xl dark:bg-primary rounded-lg border">
      <div className="text-white relative overflow-hidden px-8 py-4">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-secondary-color/10 border border-secondary-color/20 rounded-lg">
                <TrendingDown className="h-5 w-5 text-secondary-color" />
              </div>
              <div>
                <h2 className="text-sm lg:text-lg font-bold mb-1 text-black dark:text-white">
                  {t('dashboard.last10Expenses.title')}
                </h2>
                <p className="text-xs font-medium text-muted-foreground tracking-wide truncate">
                  {t('dashboard.last10Expenses.subTitle')}
                </p>
              </div>
            </div>
            <div className="text-right justify-end">
              <div className="flex items-center gap-2 bg-secondary-color/10 border mb-1 border-secondary-color/20 rounded-lg p-2">
                <p className="text-sm md:text-base font-bold text-secondary-color">
                  {totalAmount ? '-' : ''}
                  {formatAmount(totalAmount ?? 0)}
                </p>
              </div>
              <p className="text-xs font-medium text-muted-foreground tracking-wide truncate">
                {t('dashboard.last10Expenses.totalExpense')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        {/* Expense List */}
        <div>
          {lastExpensesData.map((expense) => {
            return (
              <div
                key={expense.date}
                className="relative p-2 px-6 dark:bg-primary transition-all duration-300 cursor-pointer"
              >
                <div
                  className="absolute top-0 left-0 w-full h-1 opacity-60"
                  style={{
                    background: `linear-gradient(90deg, ${expense.budget?.category.color?.value}, transparent 70%)`,
                  }}
                />
                <div className="flex items-center gap-4">
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold truncate text-xs md:text-sm">
                        {expense.description}
                      </h3>
                      <span className="text-xs md:text-sm text-red-500 py-0.5 px-2 bg-red-500/5 border border-red-500/20 rounded-lg">
                        -{formatAmount(expense.amount)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="h-3 w-3" />
                      <span className="text-xs md:text-sm">
                        {formatDate(expense.date)}
                      </span>
                      <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-blue-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="p-6">
            {lastExpensesData.length > 0 ? (
              <Button
                className="w-full"
                variant="blue"
                onClick={() => navigate('/tableau-de-bord/depenses')}
              >
                {t('dashboard.last10Expenses.seeMore')}
              </Button>
            ) : (
              <div className="bg-secondary-color/10 border border-secondary-color p-4 rounded-md text-center">
                <p className="text-secondary-color text-sm">
                  <span className="font-semibold text-secondary-color">
                    {t('dashboard.last10Expenses.noExpenses1')}
                  </span>
                  .<br />
                  {t('dashboard.last10Expenses.noExpenses2')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
