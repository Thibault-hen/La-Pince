import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

export const description = 'A donut chart with text';

const chartData = [
  { title: 'Nourriture', amount: 275, fill: '#4c51bf' },
  { title: 'Voyages', amount: 200, fill: '#f56565' },
  { title: 'Vêtements', amount: 287, fill: '#f97316' },
  { title: 'Loisirs', amount: 173, fill: '#22c55e' },
  { title: 'Autres', amount: 190, fill: '#a855f7' },
  { title: 'Nourriture', amount: 275, fill: '#4c51bf' },
  { title: 'Voyages', amount: 200, fill: '#f56565' },
  { title: 'Vêtements', amount: 287, fill: '#f97316' },
  { title: 'Loisirs', amount: 173, fill: '#22c55e' },
  { title: 'Autres', amount: 190, fill: '#a855f7' },
  { title: 'Nourriture', amount: 275, fill: '#4c51bf' },
  { title: 'Voyages', amount: 200, fill: '#f56565' },
  { title: 'Vêtements', amount: 287, fill: '#f97316' },
  { title: 'Loisirs', amount: 173, fill: '#22c55e' },
  { title: 'Autres', amount: 190, fill: '#a855f7' },
];

const chartConfig = {} satisfies ChartConfig;

export const BudgetChart = () => {
  const totalAmount = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.amount, 0);
  }, []);

  const percentage = (amount: number): string => {
    return ((amount / totalAmount) * 100).toFixed(1) + '%';
  };

  return (
    <div className="flex justify-around items-center w-full min-h-[350px]">
      <Card className="dark:bg-primary flex overflow-hidden shadow-lg w-full h-full flex-col border-l-primary-color border-l-4">
        <CardHeader className="items-center pb-0">
          <CardTitle>Vue d'ensemble</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row pb-0 justify-center items-center gap-4">
          <div className="w-full max-w-[300px] md:w-1/2 mx-auto">
            <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={chartData}
                  dataKey="amount"
                  nameKey="title"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-2xl font-bold"
                            >
                              {totalAmount.toLocaleString()} €
                            </tspan>
                          </text>
                        );
                      }
                      return null;
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </div>

          <div className="flex flex-col md:w-1/2 w-full max-w-[350px] mx-auto gap-3 text-xs xl:text-base max-h-[200px] overflow-y-auto border p-1.5 rounded-md">
            {chartData.map((item, key) => (
              <div key={key} className="flex items-center gap-3 justify-center md:justify-start">
                <span
                  className="inline-block h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.fill }}
                ></span>
                <span>{item.title}</span>
                <span className="font-bold text-md">{item.amount} €</span>
                <span>-</span>
                <span className="font-bold text-md">{percentage(item.amount)}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
