import { HandCoins, Plus } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChartBarInteractive } from '@/components/expense/BarChart';
import { ExpenseSkeleton } from '@/components/expense/ExpenseSkeleton';
import ExpenseAddModal from '@/components/expense/modals/ExpenseAddModal';
import { ExpenseDeleteModal } from '@/components/expense/modals/ExpenseDeleteModal';
import { ExpenseEditModal } from '@/components/expense/modals/ExpenseEditModal';
import { createColumns } from '@/components/expense/table/ExpenseColumns';
import { DataTable } from '@/components/expense/table/ExpenseTable';
import { Button } from '@/components/ui/button';
import { useCategories } from '@/hooks/use-category';
import { useCurrency } from '@/hooks/use-currency';
import { useExpenses } from '@/hooks/use-expense';
import { DefaultWrapper } from '@/layouts/DefaultWrapper';
import type { Expense } from '@/types/expense';

const ExpensePage = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [selectedExpense, setSelectedExpense] = useState<Expense | undefined>(
		undefined,
	);
	const { expenses, isLoading } = useExpenses();
	const { data: categories } = useCategories();
	const { t, i18n } = useTranslation();

	const handleEdit = (expense: Expense) => {
		setSelectedExpense(expense);
		setIsEditModalOpen(true);
	};

	const handleDelete = (expense: Expense) => {
		setSelectedExpense(expense);
		setIsDeleteModalOpen(true);
	};

	const { formatAmount } = useCurrency();
	const locale = i18n.language === 'en' ? 'en-US' : 'fr-FR';
	const columns = createColumns(
		handleEdit,
		handleDelete,
		t,
		locale,
		formatAmount,
	);

	if (isLoading) {
		return (
			<div className="3xl:py-4 3xl:px-26 space-y-6 p-6">
				<ExpenseSkeleton />
			</div>
		);
	}

	return (
		<DefaultWrapper key={String(isLoading)}>
			<div className="3xl:py-4 3xl:px-26 space-y-6 p-6">
				{isModalOpen && (
					<ExpenseAddModal
						isModalOpen={isModalOpen}
						handleClose={() => setIsModalOpen(false)}
					/>
				)}
				<ExpenseEditModal
					open={isEditModalOpen}
					setOpen={setIsEditModalOpen}
					expense={selectedExpense}
				/>
				{isDeleteModalOpen && (
					<ExpenseDeleteModal
						open={isDeleteModalOpen}
						setOpen={setIsDeleteModalOpen}
						expense={selectedExpense}
					/>
				)}
				<div className="flex items-center gap-3">
					<div className="p-2 bg-primary-color/10 border border-primary-color/20 rounded-lg">
						<HandCoins className="h-5 w-5 text-primary-color" />
					</div>
					<div>
						<h1 className="text-lg md:text-2xl font-bold text-foreground">
							{t('expenses.header.title')}
						</h1>
						<p className="text-sm text-muted-foreground">
							{t('expenses.header.subtitle')}
						</p>
					</div>
				</div>

				<ChartBarInteractive />
				<div className="flex flex-col gap-2">
					<DataTable
						columns={columns}
						data={expenses}
						categories={categories ?? []}
						isLoading={isLoading}
					>
						<Button
							className="w-full md:w-fit"
							variant="blue"
							onClick={() => setIsModalOpen(true)}
						>
							<Plus />
							{t('expenses.table.addButton')}
						</Button>
					</DataTable>
				</div>
			</div>
		</DefaultWrapper>
	);
};

export default ExpensePage;
