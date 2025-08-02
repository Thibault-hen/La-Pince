import { AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BudgetCard } from '@/components/budget/BudgetCard';
import { BudgetCards } from '@/components/budget/BudgetCards';
import { BudgetChart } from '@/components/budget/BudgetChart';
import { BudgetHeader } from '@/components/budget/BudgetHeader';
import { BudgetSkeleton } from '@/components/budget/BudgetSkeleton';
import { AddBudgetModal } from '@/components/budget/modals/AddBudgetModal';
import { DeleteBudgetModal } from '@/components/budget/modals/DeleteBudgetModal';
import { EditBudgetModal } from '@/components/budget/modals/EditBudgetModal';
import { useBudgets } from '@/hooks/use-budget';
import { DefaultWrapper } from '@/layouts/DefaultWrapper';
import type { Budget } from '@/types/budget';

const BudgetPage = () => {
  const [openAddBudget, setOpenAddBudget] = useState(false);
  const [openEditBudget, setOpenEditBudget] = useState(false);
  const [openDeleteBudget, setOpenDeleteBudget] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<Budget>();

  const { data: budgets, isLoading } = useBudgets();
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="3xl:py-4 3xl:px-26 space-y-6 p-6">
        <BudgetSkeleton />
      </div>
    );
  }

  return (
    <DefaultWrapper key={String(isLoading)}>
      <div className="3xl:py-4 3xl:px-26 space-y-6 p-6">
        <AddBudgetModal open={openAddBudget} setOpen={setOpenAddBudget} />
        <EditBudgetModal
          open={openEditBudget}
          setOpen={setOpenEditBudget}
          budget={selectedBudget}
        />
        <DeleteBudgetModal
          open={openDeleteBudget}
          setOpen={setOpenDeleteBudget}
          budget={selectedBudget}
        />
        <BudgetHeader onOpenAddModal={() => setOpenAddBudget(true)} />
        <div className="flex gap-2 flex-col lg:flex-row mb-4">
          <BudgetChart budgets={budgets} />
          <BudgetCards
            totalBudget={budgets?.budgetTotal}
            activeBudget={budgets?.budgetCount}
            remainingBudget={budgets?.budgetRemaining}
          />
        </div>
        {budgets?.budgets?.length !== 0 ? (
          <section>
            <h2 className="border-l-4 border-primary-color text-xl p-2 font-bold mb-4">
              {t('budget.page.title')}
            </h2>
            <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
              <AnimatePresence mode="popLayout">
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
              </AnimatePresence>
            </div>
          </section>
        ) : null}
      </div>
    </DefaultWrapper>
  );
};

export default BudgetPage;
