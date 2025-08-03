import { PiggyBank, TrendingUp } from 'lucide-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Cell, Label, Pie, PieChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useCurrency } from '@/hooks/use-currency';
import { useIsMobile } from '@/hooks/use-mobile';
import type { BudgetResponse } from '@/types/budget';

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

  const isMobile = useIsMobile();

  const percentage = (amount: number): string => {
    return `${((amount / (totalAmount ?? 0)) * 100).toFixed(1)}%`;
  };

  const chartData = budgets?.budgets.map((budget) => ({
    ...budget,
    translatedTitle: t(budget.category.title) || budget.category.title,
  }));

  return (
    <div className="flex justify-around items-center w-full min-h-[400px]">
      <Card className="bg-gradient-to-br from-white to-primary-color/5 dark:from-primary dark:via-primary dark:to-primary-color/20 flex overflow-hidden w-full h-full flex-col">
        <CardHeader className="items-center pb-0 text-center relative overflow-hidden border-b">
          <div className="flex items-center justify-center gap-4">
            <div className="relative p-2 bg-primary-color/10 border border-primary-color/30 rounded-lg shadow-lg">
              <TrendingUp className="h-4 w-4 text-primary-color animate-pulse" />
            </div>

            <CardTitle className="text-sm md:text-base">
              {t('budget.chart.title')}
            </CardTitle>
          </div>

          <div className="flex items-center justify-center gap-2">
            <div className="px-3 py-1 bg-gradient-to-r from-secondary-color/20 to-secondary-color/30 border border-secondary-color/30 rounded-full">
              <span className="text-xs font-semibold text-secondary-color flex items-center gap-1">
                <PiggyBank className="h-3.5 w-3.5 animate-bounce" />
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              {t('budget.chart.subTitle')}
            </span>
          </div>
        </CardHeader>
        {budgets?.budgets?.length === 0 ? (
          <div className="bg-secondary-color/10 border border-secondary-color p-4 rounded-md text-center w-2/3 xl:w-1/2 mx-auto">
            <p className="text-secondary-color text-sm">
              <span className="font-semibold text-secondary-color">
                {t('budget.chart.noBudgets1')}
              </span>
              .<br />
              {t('budget.chart.noBudgets2')}
            </p>
          </div>
        ) : (
          <CardContent className="flex flex-col md:flex-row lg:flex-col xl:flex-row items-center justify-center gap-8 p-6">
            {/* Chart Section */}
            <div className="relative">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[200px] min-h-[200px] lg:max-h-[280px] lg:min-h-[280px]"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={chartData}
                    dataKey="amount"
                    nameKey="translatedTitle"
                    innerRadius={isMobile ? 60 : 70} // 👈 adapte ici aussi
                    outerRadius={isMobile ? 100 : 110} // 👈 réduit proportionnellement
                    strokeWidth={4}
                    stroke="rgba(255,255,255,0.1)"
                    paddingAngle={2}
                  >
                    {budgets?.budgets.map((budget) => (
                      <Cell
                        key={`cell-${budget.id}`}
                        fill={budget.category.color?.value}
                      />
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
                                className="fill-muted-foreground uppercase text-[0.625rem] font-semibold"
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
                    className="flex items-center gap-4 p-2 border rounded-lg bg-background transition-colors duration-200 min-w-[280px]"
                  >
                    <div className="relative">
                      <span
                        className="block h-4 w-4 rounded-full shadow-sm"
                        style={{
                          backgroundColor: budget.category.color?.value,
                        }}
                      ></span>
                    </div>

                    <div className="flex-1 flex items-center justify-between text-xs">
                      <span className="font-medium text-muted-foreground truncate mr-2">
                        {t(budget.category.title)}
                      </span>

                      <div className="flex items-center gap-3">
                        <span className="font-bold">
                          {formatAmount(budget.amount ?? 0)}
                        </span>

                        <span
                          className="font-semibold px-2 py-1 rounded-full"
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
        )}
      </Card>
    </div>
  );
};
