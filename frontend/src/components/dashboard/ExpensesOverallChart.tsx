import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';
import { type ChartConfig, ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { useCurrency } from '@/hooks/use-currency';
import { useTranslation } from 'react-i18next';

interface ExpensesOverallChartProps {
  last6MonthsExpensesByMonth: Record<string, number>;
}

export const ExpensesOverallChart = ({ last6MonthsExpensesByMonth }: ExpensesOverallChartProps) => {
  const { t } = useTranslation();
  
  const chartConfig = {
    amount: {
      label: 'Montant',
      color: 'var(--chart-1)',
    },
  } satisfies ChartConfig;

  const { formatAmount } = useCurrency();

  const CustomBarLabel = ({ x, y, width, value }: any) => {
    return (
      <text x={x + width / 2} y={y - 8} fill="var(--foreground)" fontSize={8} textAnchor="middle">
        {formatAmount(value)}
      </text>
    );
  };

  const chartData = Object.entries(last6MonthsExpensesByMonth).map(([month, value]) => ({
    month: month,
    amount: value,
  }));

  const firstMonth = Object.keys(last6MonthsExpensesByMonth)[0];
  const lastMonth = Object.keys(last6MonthsExpensesByMonth)[5];

  const today = new Date();
  const year = today.getFullYear();

  return (
    <Card className="w-full h-fit dark:bg-primary border">
      <CardHeader className="pb-4">
        <CardTitle>{t('dashboard.chart.title')}</CardTitle>
        <CardDescription>
          {firstMonth} - {lastMonth} {year}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4 px-0">
        <ChartContainer config={chartConfig} className="h-[170px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              bottom: 20,
            }}
            width={400}
            height={300}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} />
            <Bar dataKey="amount" fill="var(--color-amount)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
                content={<CustomBarLabel />}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
