import * as React from 'react';
import { Cell, Label, Pie, PieChart } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { TrendingUp } from 'lucide-react';
import type { BudgetResponse } from '@/types/budget';
import { useTranslation } from 'react-i18next';
import { useCurrency } from '@/hooks/use-currency';

export const description = 'A donut chart with text';

const chartConfig = {} satisfies ChartConfig;

interface BudgetChartProps {
  budgets?: BudgetResponse;
}

export const BudgetChart = ({ budgets }: BudgetChartProps) => {
  const { t } = useTranslation();
  const { formatAmount } = useCurrency();
  const totalAmount = React.useMemo(() => {
    return budgets?.budgets.reduce((acc, curr) => acc + curr.amount, 0);
  }, [budgets?.budgets]);

  const percentage = (amount: number): string => {
    return ((amount / (totalAmount ?? 0)) * 100).toFixed(1) + '%';
  };

  return (
    <div className="flex justify-around items-center w-full min-h-[400px]">
      <Card className="dark:bg-primary flex overflow-hidden shadow-lg w-full h-full flex-col">
        <CardHeader className="items-center pb-0 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="p-2 bg-primary-color/10 border border-primary-color/20 rounded-lg">
              <TrendingUp className="h-5 w-5 text-primary-color" />
            </div>
          </div>
          <CardTitle className="text-xl font-bold">{t('budget.chart.title')}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col xl:flex-row items-center justify-center gap-8 p-6">
          {/* Chart Section */}
          <div className="relative">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[280px] min-h-[280px]"
            >
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={budgets?.budgets}
                  dataKey="amount"
                  nameKey="category.title"
                  innerRadius={70}
                  outerRadius={120}
                  strokeWidth={3}
                  stroke="rgba(255,255,255,0.1)"
                >
                  {budgets?.budgets.map((budget) => (
                    <Cell key={`cell-${budget.id}`} fill={budget.category.color?.value} />
                  ))}

                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                        return (
                          <g>
                            <text
                              x={viewBox.cx}
                              y={(viewBox.cy ?? 0) - 10}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              className="fill-gray-900 dark:fill-white text-lg font-bold"
                            >
                              {formatAmount(totalAmount ?? 0)}
                            </text>
                            <text
                              x={viewBox.cx}
                              y={(viewBox.cy ?? 0) + 15}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              className="fill-gray-500 dark:fill-gray-400 text-sm"
                            >
                              {t('budget.chart.totalLabel')}
                            </text>
                          </g>
                        );
                      }
                      return null;
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </div>

          {/* Legend Section */}
          <div className="flex flex-col gap-3 max-h-[280px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
            {budgets?.budgets.map((budget) => {
              const itemPercentage = percentage(budget.amount);
              return (
                <div
                  key={budget.id}
                  className="flex items-center gap-4 p-3 rounded-lg dark:bg-background transition-colors duration-200 min-w-[280px]"
                >
                  <div className="relative">
                    <span
                      className="block h-4 w-4 rounded-full shadow-sm"
                      style={{
                        backgroundColor: budget.category.color?.value,
                      }}
                    ></span>
                  </div>

                  <div className="flex-1 flex items-center justify-between ">
                    <span className="font-medium text-gray-700 dark:text-gray-300 text-sm truncate mr-2">
                      {t(budget.category.title)}
                    </span>

                    <div className="flex items-center gap-3">
                      <span className="font-bold text-gray-900 dark:text-white text-sm">
                        {formatAmount(budget.amount ?? 0)}
                      </span>

                      <span
                        className="text-xs font-semibold px-2 py-1 rounded-full"
                        style={{
                          backgroundColor: `${budget.category.color?.value}20`,
                          color: budget.category.color?.value,
                        }}
                      >
                        {itemPercentage}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
