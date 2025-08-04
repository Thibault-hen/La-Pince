import { EllipsisVertical, Pencil, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useCurrency } from '@/hooks/use-currency';
import type { Budget } from '@/types/budget';
import type { Category } from '@/types/category';
import { getCategoryIcon } from '@/utils/categoryIcon';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface ICategoryProps {
	category?: Category & {
		budgets?: Budget[];
	};
	onOpenEditModal: () => void;
	onOpenDeleteModal: () => void;
}

export const CategoryCard = ({
	category,
	onOpenDeleteModal,
	onOpenEditModal,
}: ICategoryProps) => {
	const { t } = useTranslation();
	const { formatAmount } = useCurrency();
	const IconComponent = getCategoryIcon(category?.title ?? '');
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
			<Card className="flex relative justify-around p-4 dark:bg-primary transition-all duration-200 ease-in-out gap-1 hover:scale-[1.02] hover:-translate-y-1">
				<div
					className="absolute top-0 left-0 w-full h-1.5 rounded-t-full opacity-60"
					style={{
						background: `linear-gradient(90deg, ${category?.color?.value}, transparent 70%)`,
					}}
				/>
				<CardHeader className="p-0">
					<div className="flex items-center justify-between">
						<CardTitle className="px-2 flex gap-2 items-center">
							<div
								className="w-7 h-7 rounded-full flex items-center justify-center border"
								style={{
									backgroundColor: `${category?.color?.value}10`,
									borderColor: category?.color?.value,
								}}
							>
								<IconComponent
									className="w-4 h-4"
									style={{
										color: category?.color?.value,
									}}
								/>
							</div>
							{t(category?.title ?? 'category.defaultTitle')}
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
										<span>{t('categories.card.edit')}</span>
									</DropdownMenuItem>
									<DropdownMenuItem
										className="p-2 dark:bg-primary cursor-pointer hover:!bg-red-500 dark:hover:bg-red-700/20 transition-all duration-150 ease-in-out"
										onClick={onOpenDeleteModal}
									>
										<Trash2 className="dark:text-white text-dark" />
										<span>{t('categories.card.delete')}</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</CardDescription>
					</div>
				</CardHeader>
				<CardContent className="p-0 mx-4">
					<CardDescription>
						<span className="mr-2">{t('categories.card.currentBudget')}</span>
						<Badge
							variant="outline"
							className="font-bold items-center hover:bg-secondary-color transition-all duration-200 ease-in-out"
						>
							{formatAmount(
								category?.budgets?.reduce((total, budget) => {
									const amount = Number(budget?.amount);
									return total + (Number.isNaN(amount) ? 0 : amount);
								}, 0) ?? 0,
							)}
						</Badge>
					</CardDescription>
				</CardContent>
			</Card>
		</motion.div>
	);
};
