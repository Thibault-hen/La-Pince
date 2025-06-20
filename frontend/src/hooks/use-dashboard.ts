import { dashboardService } from '@/services/dashboard';
import { useQuery } from '@tanstack/react-query';
import type { DashboardData } from '@/types/dashboard';
import { useCurrency } from './use-currency';
import { useTranslation } from 'react-i18next';

export function useDashboard() {
  const { convertFromEUR } = useCurrency();
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

  return useQuery<DashboardData>({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const response = await dashboardService.getDashboard();
      return response;
    },
    select: (data) => ({
      ...data,
      currentMonthExpenses: convertFromEUR(data.currentMonthExpenses),
      last6MonthsExpensesByMonth: Object.fromEntries(
        Object.entries(data.last6MonthsExpensesByMonth).map(([month, amount]) => {
          const [monthNumber, yearNumber] = month.split('/');
          const date = new Date(Number(yearNumber), Number(monthNumber) - 1, 1);
          const formattedMonth = date.toLocaleString(getLocale(), { month: 'long' });
          return [`${formattedMonth}`, convertFromEUR(amount)];
        })
      ),
      todayExpenses: convertFromEUR(data.todayExpenses),
      currentWeekExpenses: convertFromEUR(data.currentWeekExpenses),
      PreviousMonthExpenses: convertFromEUR(data.previousMonthExpenses),
      averageMonthlyExpenses: convertFromEUR(data.averageMonthlyExpenses),
      currentMonthBudget: convertFromEUR(data.currentMonthBudget),
      currentMonthRevenue: {
        ...data.currentMonthRevenue,
        value: convertFromEUR(data.currentMonthRevenue.value),
      },
      last10Expenses: data.last10Expenses.map((expense) => ({
        ...expense,
        amount: convertFromEUR(expense.amount),
      })),
    }),
    staleTime: 1000 * 60 * 5,
  });
}
