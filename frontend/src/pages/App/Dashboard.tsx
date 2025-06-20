import { DashboardCards } from '@/components/dashboard/DashboardCards';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DasboardSkeleton } from '@/components/dashboard/DashboardSkeleton';
import { ExpensesOverall } from '@/components/dashboard/ExpensesOverall';
import { LastExpenses } from '@/components/dashboard/LastExpenses';
import { EditIncomeModal } from '@/components/dashboard/modals/EditIncomeModal';
import { useDashboard } from '@/hooks/use-dashboard';
import { DefaultWrapper } from '@/layouts/DefaultWrapper';
import { useState } from 'react';

export const Dashboard = () => {
  const { data: dashboardData, isLoading } = useDashboard();
  const [openEditIncome, setOpenEditIncome] = useState(false);

  if (isLoading) {
    return (
      <DefaultWrapper>
        <div className="3xl:py-4 3xl:px-26 space-y-6 p-6">
          <DasboardSkeleton />
        </div>
      </DefaultWrapper>
    );
  }

  return (
    <DefaultWrapper key={String(isLoading)}>
      <div className="3xl:py-4 3xl:px-26 space-y-6 p-6">
        <EditIncomeModal
          open={openEditIncome}
          setOpen={setOpenEditIncome}
          income={dashboardData?.currentMonthRevenue}
        />
        <DashboardHeader onOpenEditModal={() => setOpenEditIncome(true)} />
        <div className="flex flex-col 2xl:flex-row gap-4">
          <div className="flex 2xl:w-3/4">
            <ExpensesOverall
              currentMonthRevenue={dashboardData?.currentMonthRevenue}
              currentMonthExpenses={dashboardData?.currentMonthExpenses ?? 0}
              todayExpenses={dashboardData?.todayExpenses ?? 0}
              currentWeekExpenses={dashboardData?.currentWeekExpenses ?? 0}
              previousMonthExpenses={dashboardData?.previousMonthExpenses ?? 0}
              averageMonthlyExpenses={dashboardData?.averageMonthlyExpenses ?? 0}
              last6MonthsExpensesByMonth={dashboardData?.last6MonthsExpensesByMonth ?? {}}
            />
          </div>
          <div className="flex 2xl:w-1/4">
            <DashboardCards
              currentMonthRevenue={dashboardData?.currentMonthRevenue}
              currentMonthBudget={dashboardData?.currentMonthBudget ?? 0}
              currentMonthExpenses={dashboardData?.currentMonthExpenses ?? 0}
            />
          </div>
        </div>
        <LastExpenses lastExpensesData={dashboardData?.last10Expenses || []} />
      </div>
    </DefaultWrapper>
  );
};
