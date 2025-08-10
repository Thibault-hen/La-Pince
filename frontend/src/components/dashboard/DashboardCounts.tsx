import NumberFlow, { continuous } from '@number-flow/react';
import { useAtomValue } from 'jotai';
import {
	AlertCircle,
	Calculator,
	CheckCircle,
	Euro,
	TrendingDown,
	TrendingUp,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { currencyAtom } from '@/stores/currencyStore';
import { ColorPercentage, getColorStatus } from '@/utils/colorStatus';
import { getLocale } from '@/utils/getLocale';
import { getPercentage, getPercentageRaw } from '@/utils/percentage';
import { Progress } from '../ui/progress';

type DashboardCountsProps = {
	currentMonthRevenue?: {
		value: number;
	};
	currentMonthBudget?: number;
	currentMonthExpenses?: number;
};

export const DashboardCounts = ({
	currentMonthRevenue,
	currentMonthBudget,
	currentMonthExpenses,
}: DashboardCountsProps) => {
	const { t } = useTranslation();
	const currency = useAtomValue(currencyAtom);

	return (
		<div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-4 gap-6">
			{/* Revenue Card */}
			<div className="bg-gradient-to-br from-white to-primary-color/10 dark:from-primary dark:via-primary dark:to-primary-color/20 p-6 rounded-xl border">
				<div className="flex items-center justify-between mb-4">
					<div className="p-2 bg-primary-color/10 border border-primary-color/20 rounded-lg">
						<Euro className="h-5 w-5 text-primary-color" />
					</div>
					<div className="font-bold text-primary-color uppercase tracking-wider bg-primary-color/10 border border-primary-color text-[0.625rem] p-1.5 rounded-xl shadow-sm">
						{t('dashboard.cards.income')}
					</div>
				</div>
				<div className="space-y-1">
					<div className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
						<NumberFlow
							plugins={[continuous]}
							value={currentMonthRevenue?.value ?? 0}
							format={{
								style: 'currency',
								currency: currency,
							}}
							locales={getLocale()}
							transformTiming={{ duration: 750, easing: 'linear' }}
							spinTiming={{ duration: 750, easing: 'linear' }}
							opacityTiming={{ duration: 350, easing: 'ease-out' }}
						/>
					</div>
					<p className="text-sm text-muted-foreground">
						{t('dashboard.cards.totalIncome')}
					</p>
				</div>
			</div>

			{/* Budget Card */}
			<div className="bg-gradient-to-br from-white to-green-100/60 dark:from-primary dark:via-primary dark:to-green-900/20 p-6 rounded-xl border">
				<div className="flex items-center justify-between mb-4">
					<div className="p-2 bg-green-500/10 border border-green-500/20 rounded-lg">
						<Calculator className="h-5 w-5 text-green-500" />
					</div>
					<div className="font-bold text-green-500 uppercase tracking-wider bg-green-500/10 border border-green-500 text-[0.625rem] p-1.5 rounded-xl shadow-sm">
						{t('dashboard.cards.totalBudget')}
					</div>
				</div>
				<div className="space-y-1">
					<div className="text-xl md:text-2xl font-bold">
						<NumberFlow
							plugins={[continuous]}
							value={currentMonthBudget ?? 0}
							format={{
								style: 'currency',
								currency: currency,
							}}
							locales={getLocale()}
							transformTiming={{ duration: 750, easing: 'linear' }}
							spinTiming={{ duration: 750, easing: 'linear' }}
							opacityTiming={{ duration: 350, easing: 'ease-out' }}
						/>
					</div>
					<p className="text-sm text-muted-foreground">
						{t('dashboard.cards.totalBudgets')}
					</p>
				</div>
			</div>

			{/* Remaining Card */}
			<div className="bg-gradient-to-br from-white to-purple-100 dark:from-primary dark:via-primary dark:to-purple-900/20 p-6 rounded-xl border">
				<div className="flex items-center justify-between mb-4">
					<div className="p-2 bg-purple-500/10 border border-purple-500/20 rounded-lg">
						<TrendingUp className="h-5 w-5 text-purple-500" />
					</div>
					<div
						className="font-bold text-purple-500 uppercase tracking-wider bg-purple-500/10 border border-purple-500
           text-[0.625rem] p-1.5 rounded-xl shadow-sm"
					>
						{t('dashboard.cards.remaining2')}
					</div>
				</div>
				<div className="space-y-1">
					<div className="text-xl md:text-2xl font-bold">
						<span>
							<NumberFlow
								plugins={[continuous]}
								value={
									(currentMonthRevenue?.value ?? 0) -
										(currentMonthExpenses ?? 0) <=
									0
										? 0
										: (currentMonthRevenue?.value ?? 0) -
											(currentMonthExpenses ?? 0)
								}
								format={{
									style: 'currency',
									currency: currency,
								}}
								locales={getLocale()}
								transformTiming={{ duration: 750, easing: 'linear' }}
								spinTiming={{ duration: 750, easing: 'linear' }}
								opacityTiming={{ duration: 350, easing: 'ease-out' }}
							/>
						</span>
					</div>
					<p className="text-sm text-muted-foreground">
						{t('dashboard.cards.remaining')}
					</p>
				</div>
			</div>

			{/* Current Month Expenses */}
			<div className="bg-gradient-to-br from-white to-secondary-color/10 dark:from-primary dark:via-primary dark:to-secondary-color/20 rounded-xl border">
				<div className="p-6">
					<div className="flex items-center justify-between mb-4">
						<div className="p-2 bg-secondary-color/10 border border-secondary-color/20 rounded-lg">
							<TrendingDown className="h-5 w-5 text-secondary-color" />
						</div>
						<div className="font-bold text-secondary-color uppercase tracking-wider bg-secondary-color/10 border border-secondary-color text-[0.625rem] p-1.5 rounded-xl shadow-sm">
							{t('dashboard.cards.expenses')}
						</div>
					</div>

					<div className="space-y-4">
						<div className="space-y-1">
							<div className="text-foreground flex items-center gap-2">
								<NumberFlow
									plugins={[continuous]}
									value={currentMonthExpenses ?? 0}
									format={{
										style: 'currency',
										currency: currency,
									}}
									locales={getLocale()}
									transformTiming={{ duration: 750, easing: 'linear' }}
									spinTiming={{ duration: 750, easing: 'linear' }}
									opacityTiming={{ duration: 350, easing: 'ease-out' }}
									className={`${(currentMonthExpenses ?? 0) > (currentMonthRevenue?.value ?? 0) ? 'text-red-500' : ''} text-xl md:text-2xl font-bold `}
								/>
								<span className="text-xl md:text-2xl font-bold">/</span>
								<NumberFlow
									plugins={[continuous]}
									value={currentMonthRevenue?.value ?? 0}
									format={{
										style: 'currency',
										currency: currency,
									}}
									locales={getLocale()}
									transformTiming={{ duration: 750, easing: 'linear' }}
									spinTiming={{ duration: 750, easing: 'linear' }}
									opacityTiming={{ duration: 350, easing: 'ease-out' }}
									className="text-xs md:text-sm mt-2 dark:text-muted-foreground font-bold"
								/>
							</div>
							<p className="text-sm text-muted-foreground">
								{t('dashboard.overallCard.totalSpent')}
							</p>
						</div>

						{/* Progress section */}
						{currentMonthRevenue?.value && currentMonthRevenue?.value > 0 ? (
							<div className="space-y-2">
								<div className="flex items-center gap-2 text-sm">
									{getPercentageRaw(
										currentMonthExpenses ?? 0,
										currentMonthRevenue?.value ?? 0,
									) > ColorPercentage.warning ? (
										<AlertCircle
											className="h-4 w-4"
											style={{
												color: getColorStatus(
													currentMonthExpenses ?? 0,
													currentMonthRevenue?.value ?? 0,
												),
											}}
										/>
									) : getPercentageRaw(
											currentMonthExpenses ?? 0,
											currentMonthRevenue?.value ?? 0,
										) > ColorPercentage.ok ? (
										<AlertCircle
											className="h-4 w-4"
											style={{
												color: getColorStatus(
													currentMonthExpenses ?? 0,
													currentMonthRevenue?.value ?? 0,
												),
											}}
										/>
									) : (
										<CheckCircle
											className="h-4 w-4"
											style={{
												color: getColorStatus(
													currentMonthExpenses ?? 0,
													currentMonthRevenue?.value ?? 0,
												),
											}}
										/>
									)}
									<span className="text-xs font-medium">
										{getPercentage(
											currentMonthExpenses ?? 0,
											currentMonthRevenue?.value ?? 0,
										)}{' '}
										{t('dashboard.overallCard.used')}
									</span>
								</div>

								<Progress
									aria-label={t('dashboard.overallCard.progressExpenses')}
									value={Math.min(
										currentMonthExpenses ?? 0,
										currentMonthRevenue?.value ?? 0,
									)}
									max={currentMonthRevenue?.value ?? 1}
									className="w-full h-2 border [&>*]:bg-[var(--bg-color)]"
									style={
										{
											'--bg-color': getColorStatus(
												currentMonthExpenses ?? 0,
												currentMonthRevenue?.value ?? 0,
											),
										} as React.CSSProperties
									}
								/>
							</div>
						) : (
							<div className="bg-secondary-color/10 border border-secondary-color p-3 rounded-md text-center">
								<span className="text-secondary-color text-xs font-medium">
									{t('dashboard.overallCard.updateYourIncome')}
								</span>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
