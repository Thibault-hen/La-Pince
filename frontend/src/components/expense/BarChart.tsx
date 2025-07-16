import { useSpring } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
		color: 'var(--chart-2)',
	},
} satisfies ChartConfig;

function getExpensesThisMonth<T extends { date: string; amount: number }>(
	expenses: T[],
): { date: string; amount: number }[] {
	const date = new Date();
	const month = date.getMonth();
	const year = date.getFullYear();

	const map: { [date: string]: { date: string; amount: number } } = {};

	expenses.forEach((expense) => {
		const expenseDate = new Date(expense.date);
		if (
			expenseDate.getMonth() === month &&
			expenseDate.getFullYear() === year
		) {
			const dayKey = expenseDate.toISOString().split('T')[0];
			if (!map[dayKey]) {
				map[dayKey] = {
					date: dayKey,
					amount: 0,
				};
			}
			map[dayKey].amount += expense.amount;
		}
	});
	return Object.values(map).sort(
		(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
	);
}

export function ChartBarInteractive() {
	const [displayTotal, setDisplayTotal] = useState<string>();
	const [activeChart, setActiveChart] =
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
					<CardTitle>{t('expenses.chart.header.title')}</CardTitle>
				</div>
				<div className="flex">
					{Object.keys(chartConfig).map((key) => {
						const chart = key as keyof typeof chartConfig;
						return (
							<button
								key={chart}
								type="button"
								data-active={activeChart === chart}
								className="data-[active=true]:bg-muted/50 dark:bg-primary rounded-tr-lg border-r relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
								onClick={() => setActiveChart(chart)}
							>
								<span className="text-muted-foreground text-xs">
									{t(chartConfig[chart].label)}
								</span>
								<span className="text-lg leading-none font-bold sm:text-3xl">
									{formatAmount(Number(displayTotal ?? 0))}
								</span>
							</button>
						);
					})}
				</div>
			</CardHeader>
			<CardContent className="px-2 sm:p-6">
				{expensesThisMonth.length === 0 ? (
					<div className="bg-secondary-color/10 border border-secondary-color p-4 rounded-md text-center w-5/6 xl:w-1/2 mx-auto mb-6">
						<p className="text-secondary-color text-xs lg:text-sm">
							<span className="font-semibold text-secondary-color">
								{t('expenses.chart.noExpensesThisMonth1')}
							</span>
							.<br />
							{t('expenses.chart.noExpensesThisMonth2')}
						</p>
					</div>
				) : (
					<ChartContainer
						config={chartConfig}
						className="aspect-auto h-[150px] w-full"
					>
						<BarChart
							accessibilityLayer
							data={expensesThisMonth}
							margin={{
								left: 12,
								right: 12,
							}}
						>
							<CartesianGrid vertical={true} />
							<XAxis
								dataKey="date"
								tickLine={false}
								axisLine={false}
								tickMargin={8}
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
										formatter={(value) => formatAmount(Number(value))}
									/>
								}
							/>
							<Bar dataKey={activeChart} fill={'var(--color-primary-color)'} />
						</BarChart>
					</ChartContainer>
				)}
			</CardContent>
		</Card>
	);
}
