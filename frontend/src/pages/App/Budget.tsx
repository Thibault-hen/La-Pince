import { BudgetCard } from '@/components/budget/BudgetCard';
import { BudgetCards } from '@/components/budget/BudgetCards';
import { BudgetChart } from '@/components/budget/BudgetChart';
import { BudgetHeader } from '@/components/budget/BudgetHeader';
import { AddBudgetModal } from '@/components/budget/modals/AddBudgetModal';
import { DeleteBudgetModal } from '@/components/budget/modals/DeleteBudgetModal';
import { EditBudgetModal } from '@/components/budget/modals/EditBudgetModal';
import { MainLoader } from '@/components/ui/MainLoader';
import { useBudgets } from '@/hooks/use-budget';
import { UserAppWrapper } from '@/layouts/UserAppWrapper';
import type { Budget } from '@/types/budget';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const BudgetPage = () => {
  const [openAddBudget, setOpenAddBudget] = useState(false);
  const [openEditBudget, setOpenEditBudget] = useState(false);
  const [openDeleteBudget, setOpenDeleteBudget] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<Budget>();

  const { data: budgets, isLoading } = useBudgets();
  const { t } = useTranslation();

  if (isLoading) return <MainLoader />;

  return (
    <UserAppWrapper key={String(isLoading)}>
      <AddBudgetModal open={openAddBudget} setOpen={setOpenAddBudget} />
      <EditBudgetModal open={openEditBudget} setOpen={setOpenEditBudget} budget={selectedBudget} />
      <DeleteBudgetModal
        open={openDeleteBudget}
        setOpen={setOpenDeleteBudget}
        budget={selectedBudget}
      />
      <section>
        <BudgetHeader onOpenAddModal={() => setOpenAddBudget(true)} />
        <div className="flex gap-2 flex-col lg:flex-row mb-4">
          <BudgetChart budgets={budgets} />
          <BudgetCards
            totalBudget={budgets?.budgetTotal}
            activeBudget={budgets?.budgetCount}
            remainingBudget={budgets?.budgetRemaining}
          />
        </div>
      </section>
      <section>
        <h2 className="border-l-4 border-primary-color text-xl p-2 font-bold mb-4">
          {t('budget.page.title')}
        </h2>
        <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
          {budgets?.budgets?.map((budget) => (
            <BudgetCard
              key={budget.id}
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
      </section>
    </UserAppWrapper>
  );
};
