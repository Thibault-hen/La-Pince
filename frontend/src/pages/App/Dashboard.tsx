import { BadgePercent } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DashboardCounts } from '@/components/dashboard/DashboardCounts';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DasboardSkeleton } from '@/components/dashboard/DashboardSkeleton';
import { FinanceCard } from '@/components/dashboard/ExpensesOverallCard';
import { ExpensesOverallChart } from '@/components/dashboard/ExpensesOverallChart';
import { LastExpenses } from '@/components/dashboard/LastExpenses';
import { EditIncomeModal } from '@/components/dashboard/modals/EditIncomeModal';
import { useDashboard } from '@/hooks/use-dashboard';
import { DefaultWrapper } from '@/layouts/DefaultWrapper';

const Dashboard = () => {
  const { data: dashboardData, isLoading } = useDashboard();
  const { t } = useTranslation();
  const [openEditIncome, setOpenEditIncome] = useState(false);

  if (isLoading) {
    return (
      <div className="3xl:py-4 3xl:px-26 space-y-6 p-6">
        <DasboardSkeleton />
      </div>
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

        <div className="space-y-6">
          <DashboardCounts
            currentMonthBudget={dashboardData?.currentMonthBudget}
            currentMonthExpenses={dashboardData?.currentMonthExpenses}
            currentMonthRevenue={dashboardData?.currentMonthRevenue}
          />
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="lg:col-span-1">
              <ExpensesOverallChart
                last6MonthsExpensesByMonth={
                  dashboardData?.last6MonthsExpensesByMonth ?? {}
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FinanceCard
                title={t('dashboard.overallCards.spentToday')}
                amount={dashboardData?.todayExpenses ?? 0}
              />
              <FinanceCard
                title={t('dashboard.overallCards.spentLast7Days')}
                amount={dashboardData?.currentWeekExpenses ?? 0}
              />
              <FinanceCard
                title={t('dashboard.overallCards.spentLastMonth')}
                amount={dashboardData?.previousMonthExpenses ?? 0}
              />
              <FinanceCard
                title={t('dashboard.overallCards.averageSpent')}
                amount={dashboardData?.averageMonthlyExpenses ?? 0}
                icon={
                  <BadgePercent className="w-4 h-4 md:w-5 md:h-5 text-primary-color" />
                }
              />
            </div>
          </div>
        </div>

        <LastExpenses lastExpensesData={dashboardData?.last10Expenses || []} />
      </div>
    </DefaultWrapper>
  );
};

export default Dashboard;
