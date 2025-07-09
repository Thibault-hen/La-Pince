import { BanknoteArrowDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useCurrency } from '@/hooks/use-currency';

interface FinanceCardProps {
	title: string;
	amount: number;
	icon?: React.ReactNode;
}

export const FinanceCard = ({ title, amount, icon }: FinanceCardProps) => {
	const { formatAmount } = useCurrency();

	return (
		<Card className="w-full shadow-md hover:shadow-lg transition-all duration-300 dark:bg-primary">
			<CardContent className="h-full flex flex-col justify-between gap-2 xl:p-6">
				<div className="flex justify-between items-start">
					<div className="p-2 bg-primary-color/10 border border-primary-color/20 rounded-lg">
						{icon ? (
							icon
						) : (
							<BanknoteArrowDown className="w-4 h-4 md:w-5 md:h-5 text-primary-color" />
						)}
					</div>
				</div>

				<div className="space-y-1">
					<h3 className="text-xs font-medium text-muted-foreground tracking-wide truncate">
						{title}
					</h3>
					<p className="text-base md:text-lg font-bold text-foreground tracking-tight">
						{formatAmount(amount)}
					</p>
				</div>
			</CardContent>
		</Card>
	);
};
