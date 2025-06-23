import { ArrowUpRight, TrendingDown, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import type { Expense } from '@/types/dashboard';
import { useNavigate } from 'react-router-dom';
import { useCurrency } from '@/hooks/use-currency';
import { useTranslation } from 'react-i18next';

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
      return date.toLocaleDateString(getLocale(), { day: 'numeric', month: 'short' });
    }
  };

  const totalAmount = lastExpensesData.reduce((sum, expense) => sum + expense.amount, 0);

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
                <p className="text-sm font-medium text-black dark:text-white">
                  {t('dashboard.last10Expenses.subTitle')}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-base md:text-xl font-bold text-black dark:text-white">
                  -{formatAmount(totalAmount ?? 0)}
                </p>
              </div>
              <p className="text-black dark:text-white text-sm">
                {t('dashboard.last10Expenses.totalExpense')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        {/* Expense List */}
        <div>
          {lastExpensesData.map((expense, index) => {
            return (
              <div
                key={index}
                className="relative p-2 px-6 dark:bg-primary transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  {/* Color indicator */}
                  <div
                    className="w-4 h-4 rounded-lg shadow-sm"
                    style={{
                      background: !expense.budget?.category
                        ? 'linear-gradient(135deg, #FFFFFF, #bb6f64, #c9a29c)' // special fallback style
                        : (expense.budget.category.color?.value ?? '#f0f0f0'),

                      boxShadow: !expense.budget?.category
                        ? '0 0 15px rgba(245, 87, 108, 0.5)'
                        : 'none',

                      color: '#fff',
                    }}
                  />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold truncate text-xs md:text-base">
                        {expense.description}
                      </h3>
                      <span className="text-xs md:text-sm font-bold text-red-500 ml-4">
                        -{formatAmount(expense.amount)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="h-3 w-3" />
                      <span className="text-xs md:text-base">{formatDate(expense.date)}</span>
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
