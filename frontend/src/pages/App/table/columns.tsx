import type { ColumnDef } from '@tanstack/react-table';
import type { TFunction } from 'i18next';
import {
	Calendar,
	Captions,
	EllipsisVertical,
	HandCoins,
	Pencil,
	Tag,
	Tags,
	Trash2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Expense } from '@/hooks/use-expense';
import { getCategoryIcon } from '@/utils/categoryIcon';

export const createColumns = (
	onEdit: (expense: Expense) => void,
	onDelete: (expense: Expense) => void,
	t: TFunction,
	locale: string = 'fr-FR',
	formatAmount: (amount: number) => string,
): ColumnDef<Expense>[] => [
	{
		accessorKey: 'title',
		header: () => (
			<div className="ml-4 -m-1 p-4">
				<div className="flex items-center gap-3">
					<div className="p-1.5 bg-primary-color/10 border border-primary-color/20 rounded-lg">
						<Captions className="w-4 h-4 text-primary-color" />
					</div>

					<span className="font-semibold text-foreground text-xs uppercase tracking-widest">
						{t('expenses.table.columns.title')}
					</span>
				</div>
			</div>
		),
		cell: ({ row }) => {
			const title: string = row.getValue('title');
			const category = row.getValue('category') as {
				title: string;
				color: string;
			};

			return (
				<div className="font-medium text-xs lg:text-sm -m-4 p-4 h-full w-full flex items-center ml-4">
					<div
						className="w-1 h-5 rounded-full mr-2"
						style={{
							backgroundColor: category?.color || '#cbd5e1',
						}}
					/>
					{title}
				</div>
			);
		},
		filterFn: 'includesString',
	},
	{
		accessorKey: 'category',
		header: () => (
			<div className="ml-4 -m-1 p-4">
				<div className="flex justify-center items-center gap-3">
					<div className="p-1.5 bg-primary-color/10 border border-primary-color/20 rounded-lg">
						<Tags className="w-4 h-4 text-primary-color" />
					</div>

					<span className="font-semibold text-foreground text-xs uppercase tracking-widest">
						{t('expenses.table.columns.category')}
					</span>
				</div>
			</div>
		),
		cell: ({ row }) => {
			const category: { title: string; color: string } =
				row.getValue('category');
			const hasCategory = category?.title && category?.color;
			const IconComponent = getCategoryIcon(category?.title);

			if (!hasCategory) {
				return (
					<div className="flex justify-center">
						<Badge
							variant="outline"
							className="
                        border-dashed items-center capitalize min-w-26 gap-1.5 rounded-xl bg-secondary-color/20 text-secondary-color border-secondary-color
                    shadow-sm font-bold text-xs border
                    "
						>
							<div className="w-6 h-6 rounded-full flex items-center justify-center bg-secondary-color">
								<Tag className="w-3.5 h-3.5 text-white" />
							</div>
							{t('expenses.uncategorized')}
						</Badge>
					</div>
				);
			}

			return (
				<div className="flex justify-center">
					<Badge
						className="
                    items-center capitalize min-w-26 gap-1.5 rounded-xl
                    shadow-sm font-bold text-xs border
                "
						style={{
							backgroundColor: `${category.color}15`,
							color: category.color,
							borderColor: `${category.color}`,
						}}
					>
						<div
							className="w-6 h-6 rounded-full flex items-center justify-center"
							style={{ backgroundColor: category.color }}
						>
							<IconComponent className="w-3.5 h-3.5 text-white" />
						</div>
						<span>{t(category.title)}</span>
					</Badge>
				</div>
			);
		},
	},
	{
		accessorKey: 'date',
		header: () => (
			<div className="ml-4 -m-1 p-4">
				<div className="flex justify-center items-center gap-3">
					<div className="p-1.5 bg-primary-color/10 border border-primary-color/20 rounded-lg">
						<Calendar className="w-4 h-4 text-primary-color" />
					</div>

					<span className="font-semibold text-foreground text-xs uppercase tracking-widest">
						{t('expenses.table.columns.date')}
					</span>
				</div>
			</div>
		),
		cell: ({ row }) => {
			const date: string = row.getValue('date');
			const formated = new Date(Date.parse(date));
			return (
				<div className="flex justify-center">
					<span className="font-bold text-xs lg:text-sm">
						{formated.toLocaleDateString(locale)}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'amount',
		header: () => (
			<div className="ml-4 -m-1 p-4">
				<div className="flex justify-end items-center gap-3">
					<div className="p-1.5 bg-primary-color/10 border border-primary-color/20 rounded-lg">
						<HandCoins className="w-4 h-4 text-primary-color" />
					</div>

					<span className="font-semibold text-foreground text-xs uppercase tracking-widest">
						{t('expenses.table.columns.amount')}
					</span>
				</div>
			</div>
		),
		cell: ({ row }) => {
			return (
				<div className="text-right font-medium">
					{formatAmount(row.getValue('amount'))}
				</div>
			);
		},
	},
	{
		accessorKey: 'edit',
		header: '',
		cell: ({ row }) => {
			return (
				<div className="flex justify-end">
					<DropdownMenu>
						<DropdownMenuTrigger
							asChild
							className="bg-transparent cursor-pointer hover:bg-secondary-color dark:hover:bg-secondary-color border-none  focus:outline-none focus:ring-0 focus:ring-transparent
             focus-visible:outline-none focus-visible:ring-0
             data-[highlighted]:bg-transparent data-[state=open]:bg-transparent
             shadow-none focus:shadow-none focus-visible:shadow-none"
						>
							<Button variant="outline" size="icon">
								<EllipsisVertical />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className="outline  rounded-md shadow-lg"
							align="start"
						>
							<DropdownMenuItem
								className="p-2 dark:bg-primary cursor-pointer hover:!bg-secondary-color transition-all duration-150 ease-in-out"
								onSelect={() => onEdit(row.original)}
							>
								<Pencil className="dark:text-white text-dark" />
								{t('expenses.table.actions.edit')}
							</DropdownMenuItem>

							<DropdownMenuItem
								className="p-2 dark:bg-primary cursor-pointer hover:!bg-red-500 dark:hover:bg-red-700/20 transition-all duration-150 ease-in-out"
								onSelect={() => onDelete(row.original)}
							>
								<Trash2 className="dark:text-white text-dark" />
								{t('expenses.table.actions.delete')}
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			);
		},
	},
];
