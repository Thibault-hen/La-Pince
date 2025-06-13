import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { chartData } from '@/data/data';
import { TrendingUp } from 'lucide-react';

export const description = 'A donut chart with text';

const chartConfig = {} satisfies ChartConfig;

export const BudgetChart = () => {
  const totalAmount = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.amount, 0);
  }, []);

  const percentage = (amount: number): string => {
    return ((amount / totalAmount) * 100).toFixed(1) + '%';
  };

  return (
    <div className="flex justify-around items-center w-full min-h-[400px]">
      <Card className="dark:bg-primary flex overflow-hidden shadow-lg w-full h-full flex-col">
        <CardHeader className="items-center pb-0 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="p-2 bg-primary-color/10 border border-primary-color rounded-lg">
              <TrendingUp className="h-5 w-5 text-primary-color" />
            </div>
          </div>
          <CardTitle className="text-xl font-bold">Vue d'ensemble des budgets</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col lg:flex-row items-center justify-center gap-8 p-6">
          {/* Chart Section */}
          <div className="relative">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[280px] min-h-[280px]"
            >
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={chartData}
                  dataKey="amount"
                  nameKey="title"
                  innerRadius={70}
                  outerRadius={120}
                  strokeWidth={3}
                  stroke="rgba(255,255,255,0.1)"
                >
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
                              className="fill-gray-900 dark:fill-white text-2xl font-bold"
                            >
                              {totalAmount.toLocaleString('fr-FR', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}{' '}
                              €
                            </text>
                            <text
                              x={viewBox.cx}
                              y={(viewBox.cy ?? 0) + 15}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              className="fill-gray-500 dark:fill-gray-400 text-sm"
                            >
                              Budget total
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
            {chartData.map((item, key) => {
              const itemPercentage = percentage(item.amount);
              return (
                <div
                  key={key}
                  className="flex items-center gap-4 p-3 rounded-lg dark:bg-background transition-colors duration-200 min-w-[280px]"
                >
                  <div className="relative">
                    <span
                      className="block h-4 w-4 rounded-full shadow-sm"
                      style={{
                        backgroundColor: item.fill,
                      }}
                    ></span>
                  </div>

                  <div className="flex-1 flex items-center justify-between">
                    <span className="font-medium text-gray-700 dark:text-gray-300 text-sm">
                      {item.title}
                    </span>

                    <div className="flex items-center gap-3">
                      <span className="font-bold text-gray-900 dark:text-white">
                        {item.amount.toLocaleString('fr-FR', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}{' '}
                        €
                      </span>

                      <span
                        className="text-xs font-semibold px-2 py-1 rounded-full"
                        style={{
                          backgroundColor: `${item.fill}20`,
                          color: item.fill,
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
