import { DashboardCards } from '@/components/dashboard/DashboardCards';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { ExpensesOverall } from '@/components/dashboard/ExpensesOverall';
import { LastExpenses } from '@/components/dashboard/LastExpenses';
import { useDashboard } from '@/hooks/use-dashboard';

export const Dashboard = () => {
  const { data, isLoading } = useDashboard();
  const { 
    averageMonthlyExpenses, 
    currentMonthBudget, 
    currentMonthExpenses, 
    currentMonthRevenue, 
    currentWeekExpenses, 
    last6MonthsExpensesByMonth, 
    last10Expenses, 
    previousMonthExpenses, 
    todayExpenses 
  } = data ?? {};

  return (
    <>
      <DashboardHeader />
      <div className="flex flex-col xl:flex-row gap-4">
        <div className="flex xl:w-3/4">
          <ExpensesOverall 
            currentMonthExpenses={currentMonthExpenses ?? 0} 
            todayExpenses={todayExpenses ?? 0} 
            currentWeekExpenses={currentWeekExpenses ?? 0} 
            previousMonthExpenses={previousMonthExpenses ?? 0} 
            averageMonthlyExpenses={averageMonthlyExpenses ?? 0} 
            last6MonthsExpensesByMonth={last6MonthsExpensesByMonth ?? {}}/>
        </div>
        <div className="flex xl:w-1/4">
          <DashboardCards 
            currentMonthRevenue={currentMonthRevenue ?? 0} 
            currentMonthBudget={currentMonthBudget ?? 0} 
            currentMonthExpenses={currentMonthExpenses ?? 0} />
        </div>
      </div>
      <LastExpenses lastExpensesData={last10Expenses ?? []} />
    </>
  );
};
