import { ColorPercentage, getColorStatus } from '@/utils/colorStatus';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { FinanceCard } from './ExpensesOverallCard';
import { ExpensesOverallChart } from './ExpensesOverallChart';
import { Progress } from '../ui/progress';
import { getPercentage, getPercentageRaw } from '@/utils/percentage';
import { AlertCircle, CheckCircle, TrendingDown } from 'lucide-react';

interface ExpensesOverallProps {
  currentMonthExpenses: number;
  todayExpenses: number;
  currentWeekExpenses: number;
  previousMonthExpenses: number;
  averageMonthlyExpenses: number;
  last6MonthsExpensesByMonth: Record<string, number>;
}

export const ExpensesOverall = ({
  currentMonthExpenses,
  todayExpenses, 
  currentWeekExpenses, 
  previousMonthExpenses, 
  averageMonthlyExpenses,
  last6MonthsExpensesByMonth
}: ExpensesOverallProps) => {
  const spent = 200;
  const budget = 300;
  const percentage = getPercentage(spent, budget);

  return (
    <div className="w-full space-y-6">
      {/* First row - Enhanced Card and Chart side by side */}
      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="flex-1 dark:bg-primary border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
          <CardHeader className="pb-4 px-8 pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <CardTitle className="text-lg font-semibold text-muted-foreground tracking-wide">
                  Total dépenses ce mois
                </CardTitle>
                <CardDescription className="text-4xl font-bold text-foreground tracking-tight">
                  {currentMonthExpenses}€
                </CardDescription>
              </div>
              <div className="p-3 bg-secondary-color/10 border border-secondary-color/20 rounded-full">
                <TrendingDown className="h-6 w-6 text-secondary-color" />
              </div>
            </div>
          </CardHeader>

          <CardContent className="px-8 pb-8 space-y-4">
            {/* Status indicator */}
            <div className="flex items-center gap-2 text-sm">
              {getPercentageRaw(200, 300) > ColorPercentage.warning ? (
                <AlertCircle className="h-4 w-4" style={{ color: getColorStatus(200, 300) }} />
              ) : getPercentageRaw(200, 300) > ColorPercentage.ok ? (
                <AlertCircle className="h-4 w-4" style={{ color: getColorStatus(200, 300) }} />
              ) : (
                <CheckCircle className="h-4 w-4" style={{ color: getColorStatus(200, 300) }} />
              )}
              <span className="font-medium" style={{ color: getColorStatus(200, 300) }}>
                {getPercentageRaw(200, 300) >= 100
                  ? 'Budget atteint'
                  : getPercentageRaw(200, 300) > ColorPercentage.ok
                    ? 'Attention à votre budget'
                    : 'Dans le budget'}
              </span>
            </div>

            {/* Progress section */}
            <div className="space-y-3">
              <span className="text-muted-foreground">
                Vous avez dépensé <span className="font-semibold">{percentage}%</span> de votre
                budget
              </span>

              <Progress
                value={200}
                max={300}
                className="w-full border [&>*]:bg-[var(--bg-color)] h-3 mt-2"
                style={
                  {
                    '--bg-color': getColorStatus(200, 300),
                  } as React.CSSProperties
                }
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex-1">
          <ExpensesOverallChart last6MonthsExpensesByMonth={last6MonthsExpensesByMonth} />
        </div>
      </div>

      {/* Second row - Enhanced FinanceCards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <FinanceCard title="Dépensé aujourd'hui" amount={todayExpenses.toFixed(2)} variant="negative" />
        <FinanceCard title="Dépensé cette semaine" amount={currentWeekExpenses.toFixed(2)} variant="negative" />
        <FinanceCard title="Dépensé mois dernier" amount={previousMonthExpenses.toFixed(2)} variant="negative" />
        <FinanceCard title="Moyenne par mois" amount={averageMonthlyExpenses.toFixed(2)} variant="positive" />
      </div>
    </div>
  );
};
