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

  const locale = i18n.language === 'en' ? 'en-US' : 'fr-FR';
  const columns = createColumns(handleEdit, handleDelete, t, locale);

  return (
    <>
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
      <ChartBarInteractive />
      <div className="container mx-auto py-10">
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
    </>
  );
}
