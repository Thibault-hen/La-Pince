import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface ExpensesOverallChartProps {
  last6MonthsExpensesByMonth: Record<string, number>[];
}

export const ExpensesOverallChart = ({ last6MonthsExpensesByMonth }: ExpensesOverallChartProps) => {
  const chartConfig = {
    desktop: {
      label: 'Desktop',
      color: 'var(--chart-1)',
    },
  } satisfies ChartConfig;

  const chartData = Object.entries(last6MonthsExpensesByMonth).map(([month, value]) => ({
    month: month,
    desktop: value,
  }));

  return (
    <Card className="w-full h-fit dark:bg-primary border-none">
      <CardHeader className="pb-4">
        <CardTitle>Total des dépenses des 6 derniers mois</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <ChartContainer config={chartConfig} className="h-[170px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
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
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
              <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
