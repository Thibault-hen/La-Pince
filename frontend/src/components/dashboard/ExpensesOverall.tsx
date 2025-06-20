import { ColorPercentage, getColorStatus } from '@/utils/colorStatus';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { FinanceCard } from './ExpensesOverallCard';
import { ExpensesOverallChart } from './ExpensesOverallChart';
import { Progress } from '../ui/progress';
import { getPercentage, getPercentageRaw } from '@/utils/percentage';
import { AlertCircle, CheckCircle, TrendingDown } from 'lucide-react';
import { useCurrency } from '@/hooks/use-currency';
import { useTranslation } from 'react-i18next';
import type { Income } from '@/types/income';

interface ExpensesOverallProps {
  currentMonthRevenue?: Income;
  currentMonthExpenses: number;
  todayExpenses: number;
  currentWeekExpenses: number;
  previousMonthExpenses: number;
  averageMonthlyExpenses: number;
  last6MonthsExpensesByMonth: Record<string, number>;
}

export const ExpensesOverall = ({
  currentMonthRevenue,
  currentMonthExpenses,
  todayExpenses,
  currentWeekExpenses,
  previousMonthExpenses,
  averageMonthlyExpenses,
  last6MonthsExpensesByMonth,
}: ExpensesOverallProps) => {
  const percentage = getPercentage(currentMonthExpenses, currentMonthRevenue?.value ?? 0);
  const { formatAmount } = useCurrency();
  const { t } = useTranslation();
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="flex-1 dark:bg-primary border">
          <CardHeader className="pb-4 px-8 pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <CardTitle className="text-base lgtext-lg font-semibold text-muted-foreground tracking-wide">
                  {t('dashboard.overallCard.totalSpent')}
                </CardTitle>
                <CardDescription className="text-2xl lg:text-4xl font-bold text-foreground tracking-tight">
                  {formatAmount(currentMonthExpenses)}
                </CardDescription>
              </div>
              <div className="p-3 bg-secondary-color/10 border border-secondary-color/20 rounded-full">
                <TrendingDown className="h-6 w-6 text-secondary-color" />
              </div>
            </div>
          </CardHeader>

          <CardContent className="px-8 pb-8 space-y-4">
            {/* Status indicator */}
            {currentMonthRevenue?.value && currentMonthRevenue?.value > 0 ? (
              <div className="flex items-center gap-2 text-sm">
                {getPercentageRaw(currentMonthExpenses, currentMonthRevenue?.value ?? 0) >
                ColorPercentage.warning ? (
                  <AlertCircle
                    className="h-4 w-4"
                    style={{
                      color: getColorStatus(currentMonthExpenses, currentMonthRevenue?.value ?? 0),
                    }}
                  />
                ) : getPercentageRaw(currentMonthExpenses, currentMonthRevenue?.value ?? 0) >
                  ColorPercentage.ok ? (
                  <AlertCircle
                    className="h-4 w-4"
                    style={{
                      color: getColorStatus(currentMonthExpenses, currentMonthRevenue?.value ?? 0),
                    }}
                  />
                ) : (
                  <CheckCircle
                    className="h-4 w-4"
                    style={{
                      color: getColorStatus(currentMonthExpenses, currentMonthRevenue?.value ?? 0),
                    }}
                  />
                )}
                <span
                  className="font-medium text-xs xl:text-sm tracking-wide"
                  style={{
                    color: getColorStatus(currentMonthExpenses, currentMonthRevenue?.value ?? 0),
                  }}
                >
                  {getPercentageRaw(currentMonthExpenses, currentMonthRevenue?.value ?? 0) >= 100
                    ? t('dashboard.overallCard.warning')
                    : getPercentageRaw(currentMonthExpenses, currentMonthRevenue?.value ?? 0) >
                        ColorPercentage.ok
                      ? t('dashboard.overallCard.careful')
                      : t('dashboard.overallCard.ok')}
                </span>
              </div>
            ) : undefined}

            {/* Progress section */}
            <div className="space-y-3">
              {currentMonthRevenue?.value && currentMonthRevenue?.value > 0 ? (
                <div>
                  <span className="text-muted-foreground text-sm xl:text-base">
                    {t('dashboard.overallCard.expensePercentage', { percentage: percentage })}
                  </span>

                  <Progress
                    value={
                      currentMonthExpenses > (currentMonthRevenue?.value ?? 0)
                        ? (currentMonthRevenue?.value ?? 0)
                        : currentMonthExpenses
                    }
                    max={currentMonthRevenue?.value ?? 1}
                    className="w-full border [&>*]:bg-[var(--bg-color)] h-3 mt-2"
                    style={
                      {
                        '--bg-color': getColorStatus(
                          currentMonthExpenses,
                          currentMonthRevenue?.value ?? 0
                        ),
                      } as React.CSSProperties
                    }
                  />
                </div>
              ) : (
                <div className="bg-secondary-color/10 border border-secondary-color p-4 rounded-md text-center">
                  <span className="font-semibold text-secondary-color text-xs tracking-wide">
                    {t('dashboard.overallCard.updateYourIncome')}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex-1">
          <ExpensesOverallChart last6MonthsExpensesByMonth={last6MonthsExpensesByMonth} />
        </div>
      </div>

      {/* Second row - Enhanced FinanceCards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 h-fit">
        <FinanceCard
          title={t('dashboard.overallCards.spentToday')}
          amount={todayExpenses}
          variant="negative"
        />
        <FinanceCard
          title={t('dashboard.overallCards.spentLast7Days')}
          amount={currentWeekExpenses}
          variant="negative"
        />
        <FinanceCard
          title={t('dashboard.overallCards.spentLastMonth')}
          amount={previousMonthExpenses}
          variant="negative"
        />
        <FinanceCard
          title={t('dashboard.overallCards.averageSpent')}
          amount={averageMonthlyExpenses}
          variant="positive"
        />
      </div>
    </div>
  );
};
