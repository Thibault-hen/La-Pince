type Color = {
  name: string;
  value: string;
};

type Category = {
  title: string;
  color: Color;
};

type Budget = {
  amount: number;
  limitAlert: number;
  month: number;
  year: number;
  category: Category;
};

export type Expense = {
  description: string;
  amount: number;
  date: string; 
  budget: Budget;
};

export type DashboardData = {
  currentMonthExpenses: number;
  last6MonthsExpensesByMonth: Record<string, number>;   
  todayExpenses: number;
  currentWeekExpenses: number;
  previousMonthExpenses: number;
  averageMonthlyExpenses: number;
  currentMonthRevenue: number;
  currentMonthBudget: number;
  last10Expenses: Expense[];
};
