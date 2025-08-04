import { useSpring } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useCurrency } from '@/hooks/use-currency';
import { useExpenses } from '@/hooks/use-expense';

export const description = 'An interactive bar chart';

const chartConfig = {
  amount: {
    label: 'expenses.chart.header.totalAmount',
  },
} satisfies ChartConfig;

function getExpensesThisMonth<T extends { date: string; amount: number }>(
  expenses: T[],
): { date: string; amount: number }[] {
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();

  // Get the number of days in the current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const expenseMap: { [date: string]: number } = {};

  // Populate the map with actual expenses
  expenses.forEach((expense) => {
    const expenseDate = new Date(expense.date);
    if (
      expenseDate.getMonth() === month &&
      expenseDate.getFullYear() === year
    ) {
      const dayKey = expenseDate.toISOString().split('T')[0];
      expenseMap[dayKey] = (expenseMap[dayKey] || 0) + expense.amount;
    }
  });

  const allDays: { date: string; amount: number }[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const dayKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    allDays.push({
      date: dayKey,
      amount: expenseMap[dayKey] || 0,
    });
  }

  return allDays;
}

export function ChartBarInteractive() {
  const [displayTotal, setDisplayTotal] = useState<string>();
  const [activeChart, _setActiveChart] =
    useState<keyof typeof chartConfig>('amount');
  const { expenses } = useExpenses();
  const { formatAmount } = useCurrency();
  const { t, i18n } = useTranslation();
  const locale = i18n.language === 'en' ? 'en-US' : 'fr-FR';
  const expensesThisMonth = useMemo(
    () => getExpensesThisMonth(expenses),
    [expenses],
  );
  const total = useMemo(
    () => ({
      amount: expensesThisMonth.reduce((acc, curr) => acc + curr.amount, 0),
    }),
    [expensesThisMonth],
  );
  const dTotal = useSpring(0, {
    bounce: 0,
    duration: 1000,
  });

  const highestExpense = useMemo(
    () => Math.max(...expensesThisMonth.map((expense) => expense.amount), 0),
    [expensesThisMonth],
  );

  dTotal.on('change', (value) => {
    setDisplayTotal(value.toFixed(2));
  });

  useEffect(() => {
    dTotal.set(total.amount ?? 0);
  }, [total.amount, dTotal]);

  return (
    <Card className="py-0 dark:bg-primary">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
          <CardTitle className="text-sm md:text-base">
            {t('expenses.chart.header.title')}
          </CardTitle>
          <CardDescription className="text-xs md:text-sm">
            {t('expenses.chart.header.description')}
          </CardDescription>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col justify-center gap-1 px-6 py-4 text-left even:border-l border-t sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
            <span className="text-muted-foreground text-[0.625rem] uppercase font-bold">
              {t('expenses.chart.header.highestExpense')}
            </span>
            <span className="text-lg leading-none font-bold md:text-2xl">
              {formatAmount(Number(highestExpense ?? 0))}
            </span>
          </div>

          <div className="md:rounded-tr-lg flex flex-1 flex-col justify-center gap-1 px-6 py-4 text-left border-t sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
            <span className="text-muted-foreground text-[0.625rem] uppercase font-bold">
              {t('expenses.chart.header.totalAmount')}
            </span>
            <span className="text-lg leading-none font-bold md:text-2xl">
              {formatAmount(Number(displayTotal ?? 0))}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        {expensesThisMonth.some((expense) => expense.amount > 0) === false ? (
          <div className="bg-secondary-color/10 border border-secondary-color p-4 rounded-md text-center w-5/6 xl:w-1/2 mx-auto mb-6">
            <p className="flex flex-col text-secondary-color text-xs lg:text-sm">
              <span className="font-semibold text-secondary-color">
                {t('expenses.chart.noExpensesThisMonth1')}
              </span>
              <span>{t('expenses.chart.noExpensesThisMonth2')}</span>
            </p>
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[150px] w-full"
          >
            <BarChart accessibilityLayer data={expensesThisMonth}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={true}
                axisLine={true}
                tickMargin={12}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString(locale, {
                    month: 'short',
                    day: 'numeric',
                  });
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="amount"
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString(locale, {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      });
                    }}
                    formatter={(value) => (
                      <>
                        <div className="bg-primary-color w-3 h-3 rounded-full" />
                        {formatAmount(Number(value))}
                      </>
                    )}
                  />
                }
              />
              <Bar
                dataKey={activeChart}
                fill={'var(--color-primary-color)'}
                radius={[6, 6, 0, 0]}
                strokeOpacity={0.5}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
