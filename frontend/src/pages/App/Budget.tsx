import { BudgetCard } from '@/components/budget/BudgetCard';
import { BudgetCards } from '@/components/budget/BudgetCards';
import { BudgetChart } from '@/components/budget/BudgetChart';
import { BudgetHeader } from '@/components/budget/BudgetHeader';
import { AddBudgetModal } from '@/components/budget/modals/AddBudgetModal';
import { DeleteBudgetModal } from '@/components/budget/modals/DeleteBudgetModal';
import { EditBudgetModal } from '@/components/budget/modals/EditBudgetModal';
import { budgets, type IBudget } from '@/data/data';
import { useState } from 'react';

export const Budget = () => {
  const [openAddBudget, setOpenAddBudget] = useState(false);
  const [openEditBudget, setOpenEditBudget] = useState(false);
  const [openDeleteBudget, setOpenDeleteBudget] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<IBudget>();

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
