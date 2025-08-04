import { Euro, Hash, TrendingUp } from 'lucide-react';
import { useSpring } from 'motion/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCurrency } from '@/hooks/use-currency';
import { getColorStatus } from '@/utils/colorStatus';
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
	const { formatAmount } = useCurrency();
	const [displayTotal, setDisplayTotal] = useState<string>('0.00');
	const [displayCount, setDisplayCount] = useState<string>('0');
	const [displayRemaining, setDisplayRemaining] = useState<string>('0.00');
	const { t } = useTranslation();

	const total = useSpring(0, {
		bounce: 0,
		duration: 2000,
	});

	const count = useSpring(0, {
		bounce: 0,
		duration: 2000,
	});

	const remaining = useSpring(0, {
		bounce: 0,
		duration: 2000,
	});

	total.on('change', (value) => {
		setDisplayTotal(value.toFixed(2));
	});

	count.on('change', (value) => {
		setDisplayCount(value.toFixed(0));
	});

	remaining.on('change', (value) => {
		setDisplayRemaining(value < 0 ? '0' : value.toFixed(2));
	});

	useEffect(() => {
		total.set(totalBudget ?? 0);
		count.set(activeBudget ?? 0);
		remaining.set(remainingBudget ?? 0);

		if (remainingBudget === 0) {
			setDisplayRemaining('0.00');
		}
	}, [totalBudget, activeBudget, remainingBudget, count, remaining, total]);

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
							{formatAmount(Number(displayTotal))}
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
						<div className="text-xl md:text-2xl font-bold"> {displayCount}</div>
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
							<span> {formatAmount(Number(displayRemaining))}</span>
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
								value={(totalBudget ?? 0) - (remainingBudget ?? 0)}
								max={totalBudget}
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
