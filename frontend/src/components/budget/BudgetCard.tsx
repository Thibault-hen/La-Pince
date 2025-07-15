import { EllipsisVertical, Pencil, Trash2, TriangleAlert } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCurrency } from '@/hooks/use-currency';
import type { Budget } from '@/types/budget';
import { getCategoryIcon } from '@/utils/categoryIcon';
import { getColorStatus } from '@/utils/colorStatus';
import { getPercentage } from '@/utils/percentage';
import { Button } from '../ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../ui/card';
import { Progress } from '../ui/progress';

interface BudgetProps {
	budget: Budget;
	onOpenEditModal: () => void;
	onOpenDeleteModal: () => void;
}

export const BudgetCard = ({
	budget,
	onOpenEditModal,
	onOpenDeleteModal,
}: BudgetProps) => {
	const { t } = useTranslation();
	const { formatAmount } = useCurrency();
	const IconComponent = getCategoryIcon(budget.category.title);

	const getRemainingBudget = () => {
		if (budget.amount === undefined || budget.totalExpense === undefined) {
			return 0;
		}
		const remaining = budget.amount - budget.totalExpense;
		return remaining < 0 ? '0' : remaining.toFixed(2);
	};

	return (
		<motion.div
			initial={{ opacity: 0, x: -100, scale: 0.95 }}
			animate={{ opacity: 1, x: 0, scale: 1 }}
			exit={{
				opacity: 0,
				scale: 0.9,
				transition: { duration: 0.2, ease: 'easeIn' },
			}}
			transition={{
				type: 'spring',
				stiffness: 120,
				damping: 15,
				mass: 0.6,
				delay: 0.1,
			}}
			layout
		>
			<Card className="flex relative justify-around p-4 dark:bg-primary transition-all duration-200 ease-in-out hover:scale-[1.02] hover:-translate-y-1">
				<div
					className="absolute top-0 left-0 w-full h-1.5 rounded-t-full opacity-60"
					style={{
						background: `linear-gradient(90deg, ${budget.category.color?.value}, transparent 70%)`,
					}}
				/>
				<CardHeader className="p-0">
					<div className="flex items-center justify-between">
						<CardTitle className="px-2 flex gap-2 items-center relative">
							<div
								className="w-7 h-7 rounded-full flex items-center justify-center border"
								style={{
									backgroundColor: `${budget.category.color?.value}10`,
									borderColor: budget.category.color?.value,
								}}
							>
								<IconComponent
									className="w-4 h-4"
									style={{
										color: budget.category.color?.value,
									}}
								/>
							</div>
							{t(budget.category.title)}
							{budget.totalExpense >= (budget.amount ?? 0) && (
								<div className="relative z-10">
									<TriangleAlert
										size={24}
										className="text-red-600 dark:text-red-400 drop-shadow-sm relative z-10"
									/>
									<div className="absolute dark:-inset-1 bg-red-500/20 rounded-full blur-sm z-0" />
								</div>
							)}
						</CardTitle>
						<CardDescription className="flex gap-1">
							<DropdownMenu>
								<DropdownMenuTrigger
									asChild
									className="dark:bg-primary cursor-pointer hover:bg-secondary-color dark:hover:bg-secondary-color border-none  focus:outline-none focus:ring-0 focus:ring-transparent
             focus-visible:outline-none focus-visible:ring-0
             data-[highlighted]:bg-transparent data-[state=open]:bg-transparent
             shadow-none focus:shadow-none focus-visible:shadow-none"
								>
									<Button variant="outline" size="icon">
										<EllipsisVertical />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuItem
										className="p-2 dark:bg-primary cursor-pointer hover:!bg-secondary-color transition-all duration-150 ease-in-out"
										onClick={onOpenEditModal}
									>
										<Pencil className="dark:text-white text-dark" />
										<span>{t('budget.card.edit')}</span>
									</DropdownMenuItem>
									<DropdownMenuItem
										className="p-2 dark:bg-primary cursor-pointer hover:!bg-red-500 dark:hover:bg-red-700/20 transition-all duration-150 ease-in-out"
										onClick={onOpenDeleteModal}
									>
										<Trash2 className="dark:text-white text-dark" />
										<span>{t('budget.card.delete')}</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</CardDescription>
					</div>
				</CardHeader>

				<CardContent className="flex flex-col">
					<CardDescription className="flex flex-col space-x-1 items-center">
						<div className="flex justify-between w-full">
							<div className="flex gap-1 items-center">
								<span className="text-xs text-muted-foreground">
									{t('budget.card.spent')}
								</span>
								<span
									className="text-xs"
									style={
										{
											color: getColorStatus(budget.totalExpense, budget.amount),
										} as React.CSSProperties
									}
								>
									({getPercentage(budget.totalExpense, budget.amount)})
								</span>
							</div>
							<div className="flex items-center gap-1">
								<span
									className={`${budget.totalExpense > budget.amount ? 'text-red-500' : ''}`}
								>
									{formatAmount(budget.totalExpense)}
								</span>
								<span>/</span>
								<span className="font-bold">{formatAmount(budget.amount)}</span>
							</div>
						</div>
						<div className="flex w-full flex-col">
							<Progress
								value={
									budget.totalExpense > budget.amount
										? budget.amount
										: budget.totalExpense
								}
								max={budget.amount > 0 ? budget.amount : 100}
								className="w-full border [&>*]:bg-[var(--bg-color)] h-3 mt-2"
								style={
									{
										'--bg-color': getColorStatus(
											budget.totalExpense,
											budget.amount,
										),
									} as React.CSSProperties
								}
							/>
							<span className="flex self-end p-1 text-xs text-muted-foreground font-bold">
								{formatAmount(Number(getRemainingBudget()))}{' '}
								{t('budget.card.remaining')}
							</span>
						</div>
					</CardDescription>
				</CardContent>
			</Card>
		</motion.div>
	);
};
