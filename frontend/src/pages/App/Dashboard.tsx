import { DashboardCards } from '@/components/dashboard/DashboardCards';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { ExpensesOverall } from '@/components/dashboard/ExpensesOverall';
import { LastExpenses } from '@/components/dashboard/LastExpenses';

export const Dashboard = () => {
  return (
    <>
      <DashboardHeader />
      <div className="flex flex-col xl:flex-row gap-4">
        <div className="flex xl:w-3/4">
          <ExpensesOverall />
        </div>
        <div className="flex xl:w-1/4">
          <DashboardCards />
        </div>
      </div>
      <LastExpenses />
    </>
  );
};
