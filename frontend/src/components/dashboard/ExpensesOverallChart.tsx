import { Calendar, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { TooltipProps } from 'recharts';
import {
	Bar,
	BarChart,
	CartesianGrid,
	LabelList,
	XAxis,
	YAxis,
} from 'recharts';
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
} from '@/components/ui/chart';
import { useCurrency } from '@/hooks/use-currency';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../ui/card';

interface ExpensesOverallChartProps {
	last6MonthsExpensesByMonth: Record<string, number>;
}

export const ExpensesOverallChart = ({
	last6MonthsExpensesByMonth,
}: ExpensesOverallChartProps) => {
	const { t } = useTranslation();
	const { formatAmount } = useCurrency();

	const chartConfig = {
		amount: {
			label: t('dashboard.chart.amount'),
			color: 'var(--secondary-color)',
		},
	} satisfies ChartConfig;

	const chartData = Object.entries(last6MonthsExpensesByMonth).map(
		([month, value]) => ({
			month: month,
			amount: value,
			displayMonth: month.slice(0, 3),
		}),
	);

	const firstMonth = Object.keys(last6MonthsExpensesByMonth)[0];
	const lastMonth = Object.keys(last6MonthsExpensesByMonth)[5];
	const today = new Date();
	const year = today.getFullYear();

	// Calculer les stats
	const totalExpenses = chartData.reduce((sum, item) => sum + item.amount, 0);
	const averageExpenses = totalExpenses / chartData.length;

	const CustomBarLabel = ({
		x,
		y,
		width,
		value,
	}: {
		x: number;
		y: number;
		width: number;
		value: number;
	}) => {
		if (value === 0) return null;

		return (
			<text
				x={x + width / 2}
				y={y - 8}
				fill="var(--foreground)"
				fontSize={11}
				fontWeight="500"
				textAnchor="middle"
			>
				{formatAmount(value)}
			</text>
		);
	};

	const CustomTooltip = ({
		active,
		payload,
		label,
	}: TooltipProps<number, string>) => {
		if (active && payload && payload.length) {
			return (
				<div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg p-3">
					<p className="font-semibold text-foreground">{label}</p>
					<p className="text-sm text-muted-foreground">
						{t('dashboard.chart.expenses')}:{' '}
						{formatAmount(payload[0].value as number)}
					</p>
				</div>
			);
		}
		return null;
	};

	return (
		<Card className="w-full h-full dark:bg-primary border overflow-hidden">
			<CardHeader className="pb-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="p-2 bg-primary-color/10 border border-primary-color/20 rounded-lg">
							<TrendingUp className="h-5 w-5 text-primary-color" />
						</div>
						<div>
							<CardTitle className="text-sm xl:text-base font-bold text-foreground">
								{t('dashboard.chart.title')}
							</CardTitle>
							<CardDescription className="flex items-center gap-2 text-sm">
								<Calendar className="h-4 w-4" />
								{firstMonth} - {lastMonth} {year}
							</CardDescription>
						</div>
					</div>

					<div className="text-right">
						<div className="text-sm text-muted-foreground">
							{t('dashboard.chart.average')}
						</div>
						<div className="text-lg font-bold text-foreground">
							{formatAmount(averageExpenses)}
						</div>
					</div>
				</div>
			</CardHeader>

			<CardContent className="pb-4 px-6">
				<ChartContainer config={chartConfig} className="h-[200px] w-full">
					<BarChart
						data={chartData}
						margin={{
							top: 30,
							right: 10,
							left: 10,
							bottom: 5,
						}}
					>
						<CartesianGrid
							strokeDasharray="3 3"
							vertical={false}
							stroke="var(--border)"
							opacity={0.3}
						/>

						<XAxis
							dataKey="displayMonth"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tick={{
								fill: 'var(--muted-foreground)',
								fontSize: 12,
								fontWeight: 500,
							}}
						/>

						<YAxis
							tickLine={false}
							axisLine={false}
							tick={{
								fill: 'var(--muted-foreground)',
								fontSize: 11,
							}}
							tickFormatter={(value) => formatAmount(value)}
							width={80}
						/>

						<ChartTooltip content={<CustomTooltip />} />

						<Bar
							dataKey="amount"
							fill="var(--chart-1)"
							radius={[6, 6, 0, 0]}
							strokeWidth={1}
							strokeOpacity={0.5}
						>
							<LabelList
								position="top"
								offset={8}
								className="fill-foreground"
								fontSize={11}
								content={<CustomBarLabel x={0} y={0} width={0} value={0} />}
							/>
						</Bar>
					</BarChart>
				</ChartContainer>

				<div className="mt-4 p-3 border dark:bg-background rounded-lg">
					<div className="flex items-center justify-between text-sm">
						<span className="text-muted-foreground">
							{t('dashboard.chart.total')}
						</span>
						<span className="font-bold text-foreground">
							{formatAmount(totalExpenses)}
						</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
