import { useState } from 'react';
import { columns } from './table/columns';
import { DataTable } from './table/data-table';
import { Button } from '@/components/ui/button';
import ExpenseAddModal from '@/components/expense/modals/expenseAddModal';
import { useExpenses } from '@/hooks/use-expenses';
import { Skeleton } from '@/components/ui/skeleton';
import { ChartBarInteractive } from '@/components/expense/barChart';

export function Expense() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { expenses, isLoading } = useExpenses();

  return (
    <>
      {isModalOpen && (
        <ExpenseAddModal isModalOpen={isModalOpen} handleClose={() => setIsModalOpen(false)} />
      )}
      <ChartBarInteractive />
      <div className="container mx-auto py-10">
        {isLoading ? (
          <>
            <Skeleton className="block bg-secondary h-full  w-full rounded-full m-2" />
          </>
        ) : (
          <DataTable
            children={
              <Button variant="blue" onClick={() => setIsModalOpen(true)}>
                <span className="max-w-sm block text-sm m-2">Ajouter une dépense</span>
              </Button>
            }
            columns={columns}
            data={expenses}
          />
        )}
      </div>
    </>
  );
}
