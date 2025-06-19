import { z } from 'zod';

const colorSchema = z.object({
  name: z.string(),
  value: z.string(), // couleur hexadécimale
});

const categorySchema = z.object({
  title: z.string(),
  color: colorSchema,
});

const budgetSchema = z.object({
  amount: z.number(),
  limitAlert: z.number(),
  month: z.number(),
  year: z.number(),
  category: categorySchema,
});

const expenseSchema = z.object({
  description: z.string(),
  amount: z.number(),
  date: z.date(),
});

export const dashboardSchema = z.object({
  currentMonthExpenses: z.number(),
  last6MonthsExpensesByMonth: z.record(z.string(), z.number()),
  todayExpenses: z.number(),
  currentWeekExpenses: z.number(),
  previousMonthExpenses: z.number(),
  averageMonthlyExpenses: z.number(),
  currentMonthRevenue: z.number(),
  currentMonthBudget: z.number(),
  last10Expenses: z.array(expenseSchema),
});

export type Expense = z.infer<typeof expenseSchema>;