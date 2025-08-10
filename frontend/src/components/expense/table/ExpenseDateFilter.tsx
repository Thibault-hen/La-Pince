import { t } from 'i18next';
import { Calendar } from 'lucide-react';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

export const DateFilter = ({
	onFilterDate,
}: {
	onFilterDate: (date: string) => void;
}) => {
	const handleDateFilter = (date: string) => {
		onFilterDate(date);
	};

	const datesOptions = [
		{ value: 'all', labelKey: 'expenses.table.filter.all' },
		{ value: 'today', labelKey: 'expenses.table.filter.today' },
		{ value: 'yesterday', labelKey: 'expenses.table.filter.yesterday' },
		{ value: 'week', labelKey: 'expenses.table.filter.week' },
		{ value: 'month', labelKey: 'expenses.table.filter.month' },
		{ value: 'year', labelKey: 'expenses.table.filter.year' },
	];

	return (
		<Select
			onValueChange={handleDateFilter}
			defaultValue={datesOptions[0].value}
		>
			<SelectTrigger
				className="w-full md:w-[220px] bg-primary"
				aria-label={t('expenses.table.filter.dateSelect')}
			>
				<div className="flex items-center gap-2">
					<Calendar />
					<SelectValue placeholder={t('expenses.table.filter.dateSelect')} />
				</div>
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>{t('expenses.table.filter.date')}</SelectLabel>
					{datesOptions.map((option) => (
						<SelectItem key={option.value} value={option.value}>
							{t(option.labelKey)}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};
