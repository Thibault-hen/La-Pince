import { BudgetCard } from '@/components/budget/BudgetCard';
import { BudgetCards } from '@/components/budget/BudgetCards';
import { BudgetChart } from '@/components/budget/BudgetChart';
import { BudgetHeader } from '@/components/budget/BudgetHeader';
import { AddBudgetModal } from '@/components/budget/modals/AddBudgetModal';
import { DeleteBudgetModal } from '@/components/budget/modals/DeleteBudgetModal';
import { EditBudgetModal } from '@/components/budget/modals/EditBudgetModal';
import { useState } from 'react';

interface IBudget {
  id: string;
  title: string;
  amount: number;
  value: string;
  totalExpense: number;
}

export const Budget = () => {
  const [openAddBudget, setOpenAddBudget] = useState(false);
  const [openEditBudget, setOpenEditBudget] = useState(false);
  const [openDeleteBudget, setOpenDeleteBudget] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<IBudget>();
  const budgets = [
    { id: '1', title: 'Nourriture', amount: 200, value: '#0000FF', totalExpense: 201 },
    { id: '2', title: 'Voyages', amount: 200, value: '#FF0000', totalExpense: 190 },
    { id: '3', title: 'Vêtements', amount: 287, value: '#eb8c34', totalExpense: 60 },
    { id: '4', title: 'Loisirs', amount: 173, value: '#34eb74', totalExpense: 50 },
    { id: '5', title: 'Autres', amount: 190, value: '#8334eb', totalExpense: 130 },
    { id: '6', title: 'Loisirs', amount: 173, value: '#34eb74', totalExpense: 50 },
    { id: '7', title: 'Autres', amount: 190, value: '#8334eb', totalExpense: 103 },
    { id: '8', title: 'Loisirs', amount: 173, value: '#34eb74', totalExpense: 50 },
    { id: '9', title: 'Autres', amount: 190, value: '#8334eb', totalExpense: 103 },
  ];
  return (
    <>
      <BudgetHeader onOpenAddModal={() => setOpenAddBudget(true)} />
      <div className="flex gap-2 flex-col xl:flex-row mb-4">
        <BudgetChart />
        <BudgetCards />
      </div>
      <AddBudgetModal open={openAddBudget} setOpen={setOpenAddBudget} />
      <EditBudgetModal open={openEditBudget} setOpen={setOpenEditBudget} budget={selectedBudget} />
      <DeleteBudgetModal
        open={openDeleteBudget}
        setOpen={setOpenDeleteBudget}
        budget={selectedBudget}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {budgets.map((budget, idx) => (
          <BudgetCard
            key={idx}
            budget={budget}
            onOpenEditModal={() => {
              setOpenEditBudget(true);
              setSelectedBudget(budget);
            }}
            onOpenDeleteModal={() => {
              setOpenDeleteBudget(true);
              setSelectedBudget(budget);
            }}
          />
        ))}
      </div>
    </>
  );
};
