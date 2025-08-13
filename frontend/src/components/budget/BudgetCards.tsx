import NumberFlow, { continuous } from '@number-flow/react';
import { useAtomValue } from 'jotai';
import { Euro, Hash, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { currencyAtom } from '@/stores/currencyStore';
import { getColorStatus } from '@/utils/colorStatus';
import { getLocale } from '@/utils/getLocale';
import { getPercentage } from '@/utils/percentage';
import { Progress } from '../ui/progress';

type BudgetCardsProps = {
	totalBudget?: number;
	activeBudget?: number;
	remainingBudget?: number;
};

export const BudgetCards = ({
	totalBudget,
	activeBudget,
	remainingBudget,
}: BudgetCardsProps) => {
	const currency = useAtomValue(currencyAtom);
	const { t } = useTranslation();

	return (
		<div className="flex flex-col gap-4 w-full xl:max-w-xl">
			<div className="relative group">
				<div className="relative bg-gradient-to-br from-white to-primary-color/10 dark:from-primary dark:via-primary dark:to-primary-color/20 p-6 rounded-xl border hover:shadow-xl transition-all duration-300">
					<div className="flex items-center justify-between mb-4">
						<div className="p-2 bg-primary-color/10 border border-primary-color/20 rounded-lg shadow-lg">
							<Euro className="h-5 w-5 text-primary-color" />
						</div>
						<div className="font-bold text-primary-color uppercase tracking-wider bg-primary-color/10 border border-primary-color text-[0.625rem] p-1.5 rounded-xl shadow-sm">
							{t('budget.cards.totalBudget').toUpperCase()}
						</div>
					</div>

					<div className="space-y-1">
						<div className="text-xl md:text-2xl font-bold">
							<NumberFlow
								plugins={[continuous]}
								value={totalBudget ?? 0}
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
							{t('budget.cards.totalBudget')}
						</p>
					</div>
				</div>
			</div>

			<div className="relative group">
				<div className="relative bg-gradient-to-br from-white to-primary-color/10 dark:from-primary dark:via-primary dark:to-primary-color/20 p-6 rounded-xl border hover:shadow-xl transition-all duration-300">
					<div className="flex items-center justify-between mb-4">
						<div className="p-2 bg-primary-color/10 border border-primary-color/20 rounded-lg shadow-lg">
							<Hash className="h-5 w-5 text-primary-color" />
						</div>
						<div className="font-bold text-primary-color uppercase tracking-wider bg-primary-color/10 border border-primary-color text-[0.625rem] p-1.5 rounded-xl shadow-sm">
							{t('budget.cards.activeBudgets').toUpperCase()}
						</div>
					</div>

					<div className="space-y-1">
						<div className="text-xl md:text-2xl font-bold">
							<NumberFlow
								plugins={[continuous]}
								value={activeBudget ?? 0}
								transformTiming={{ duration: 750, easing: 'linear' }}
								spinTiming={{ duration: 750, easing: 'linear' }}
								opacityTiming={{ duration: 350, easing: 'ease-out' }}
							/>
						</div>
						<p className="text-sm text-muted-foreground">
							{t('budget.cards.activeBudgets')}
						</p>
					</div>
				</div>
			</div>

			<div className="relative group">
				<div className="relative bg-gradient-to-br from-white to-secondary-color/15 dark:from-primary dark:via-primary dark:to-secondary-color/20 p-6 rounded-xl border hover:shadow-xl transition-all duration-300">
					<div className="flex items-center justify-between mb-4">
						<div className="p-2 bg-secondary-color/10 border border-secondary-color/20 rounded-lg shadow-lg">
							<TrendingUp className="h-5 w-5 text-secondary-color" />
						</div>
						<div className="font-bold text-secondary-color uppercase tracking-wider bg-secondary-color/10 border border-secondary-color text-[0.625rem] p-1.5 rounded-xl shadow-sm">
							{t('budget.cards.remainingBudget').toUpperCase()}
						</div>
					</div>

					<div className="space-y-1">
						<div className="text-xl md:text-2xl font-bold">
							<span>
								<NumberFlow
									plugins={[continuous]}
									value={remainingBudget ?? 0}
									format={{
										style: 'currency',
										currency: currency,
									}}
									locales={getLocale()}
								/>
							</span>
						</div>
						<p className="text-sm text-muted-foreground">
							{t('budget.cards.remainingBudget')}
						</p>

						<div className="mt-3">
							<div className="flex items-center justify-between text-xs text-muted-foreground font-bold mb-1">
								<span>{t('budget.cards.used')}</span>
								<span>
									{remainingBudget === totalBudget
										? '0%'
										: getPercentage(
												(totalBudget ?? 0) - (remainingBudget ?? 0),
												totalBudget ?? 0,
											)}
								</span>
							</div>
							<Progress
								aria-label={t('budget.card.progressRemaining')}
								value={(totalBudget ?? 0) - (remainingBudget ?? 0)}
								max={totalBudget && totalBudget > 0 ? totalBudget : 100}
								className="w-full border [&>*]:bg-[var(--bg-color)] h-3 mt-2"
								style={
									{
										'--bg-color':
											remainingBudget === totalBudget
												? ''
												: getColorStatus(
														(totalBudget ?? 0) - (remainingBudget ?? 0),
														totalBudget ?? 0,
													),
									} as React.CSSProperties
								}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
