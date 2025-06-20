import { useState } from 'react';
import { createColumns } from './table/columns';
import { DataTable } from './table/data-table';
import { Button } from '@/components/ui/button';
import ExpenseAddModal from '@/components/expense/modals/ExpenseAddModal';
import { ExpenseEditModal } from '@/components/expense/modals/ExpenseEditModal';
import { useExpenses, type Expense } from '@/hooks/use-expense';
import { ChartBarInteractive } from '@/components/expense/BarChart';
import { ExpenseDeleteModal } from '@/components/expense/modals/ExpenseDeleteModal';
import { useTranslation } from 'react-i18next';
import { HandCoins } from 'lucide-react';
import { useCurrency } from '@/hooks/use-currency';
import { DefaultWrapper } from '@/layouts/DefaultWrapper';
import { ExpenseSkeleton } from '@/components/expense/ExpenseSkeleton';

export function Expense() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | undefined>(undefined);
  const { expenses, isLoading } = useExpenses();
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
  const columns = createColumns(handleEdit, handleDelete, t, locale, formatAmount);

  if (isLoading) {
      return (
        <DefaultWrapper>
          <div className="3xl:py-4 3xl:px-26 space-y-6 p-6">
            <ExpenseSkeleton />
          </div>
        </DefaultWrapper>
      );
    }
  
  return (
    <DefaultWrapper>
      <div className="3xl:py-4 3xl:px-26 space-y-6 p-6">
      {isModalOpen && (
        <ExpenseAddModal isModalOpen={isModalOpen} handleClose={() => setIsModalOpen(false)} />
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
          <h1 className="text-2xl font-bold text-foreground">{t('expenses.header.title')}</h1>
          <p className="text-sm text-muted-foreground">{t('expenses.header.subtitle')}</p>
        </div>
      </div>

      <ChartBarInteractive />
      <div className="flex flex-col gap-2 mt-6">
        <DataTable
          children={
            <Button variant="blue" onClick={() => setIsModalOpen(true)}>
              <span className="max-w-sm block text-sm m-2">{t('expenses.table.addButton')}</span>
            </Button>
          }
          columns={columns}
          data={expenses}
          isLoading={isLoading}
        />
      </div>
      </div>
    </DefaultWrapper>
  );
}
