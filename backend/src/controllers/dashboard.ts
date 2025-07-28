import { Hono } from 'hono';
import prisma from '../db/client';
import { describeRoute } from 'hono-openapi';
import { response200 } from '../utils/openapi';
import { dashboardSchema, Expense } from '../validators/dashboard';
import { formatDecimal } from '../utils/formatDecimal';

const dashboardRouter = new Hono();

dashboardRouter.basePath('/dashboard').get(
  '/',
  describeRoute({
    tags: ['dashboard'],
    summary: 'Get dashboard data',
    description: 'Retrieve dashboard data.',
    responses: {
      200: response200(dashboardSchema),
    },
  }),
  async (c) => {
    const userId = c.get('jwtPayload').userId;
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    const [
      currentMonthExpenses,
      last6MonthsExpenses,
      todayExpenses,
      currentWeekExpenses,
      previousMonthExpenses,
      averageMonthlyExpenses,
      currentMonthIncome,
      currentMonthBudget,
      last10Expenses,
    ] = await Promise.all([
      prisma.expense.aggregate({
        _sum: { amount: true },
        where: {
          userId,
          date: {
            gte: new Date(year, month - 1, 1),
            lt: new Date(year, month, 1),
          },
        },
      }),
      prisma.expense.findMany({
        where: {
          userId,
          date: {
            gte: new Date(year, month - 6, 1),
            lt: new Date(year, month, 0),
          },
        },
        omit: {
          id: true,
          createdAt: true,
          updatedAt: true,
          userId: true,
          budgetId: true,
        },
      }),
      prisma.expense.aggregate({
        _sum: { amount: true },
        where: {
          userId,
          date: {
            gte: new Date(year, month - 1, now.getDate()),
            lt: new Date(year, month - 1, now.getDate() + 1),
          },
        },
      }),
      prisma.expense.aggregate({
        _sum: { amount: true },
        where: {
          userId,
          date: {
            gte: new Date(year, month - 1, now.getDate() - 6),
            lt: new Date(),
          },
        },
      }),
      prisma.expense.aggregate({
        _sum: { amount: true },
        where: {
          userId,
          date: {
            gte: new Date(year, month - 2, 1),
            lt: new Date(year, month - 1, 1),
          },
        },
      }),
      prisma.expense.aggregate({
        _avg: { amount: true },
        where: {
          userId,
        },
      }),
      prisma.income.findFirst({
        // _sum: { value: true },
        where: {
          userId,
          year,
          month,
        },
      }),
      prisma.budget.aggregate({
        _sum: { amount: true },
        where: {
          userId,
          year,
          month,
        },
      }),
      prisma.expense.findMany({
        where: {
          userId,
        },
        orderBy: {
          date: 'desc',
        },
        omit: {
          id: true,
          createdAt: true,
          updatedAt: true,
          userId: true,
          budgetId: true,
        },
        include: {
          budget: {
            omit: {
              id: true,
              userId: true,
              categoryId: true,
              createdAt: true,
              updatedAt: true,
            },
            include: {
              category: {
                omit: {
                  userId: true,
                  id: true,
                  colorId: true,
                  createdAt: true,
                  updatedAt: true,
                },
                include: {
                  color: {
                    omit: {
                      id: true,
                      createdAt: true,
                      updatedAt: true,
                    },
                  },
                },
              },
            },
          },
        },
        take: 10,
      }),
    ]);

    const last6MonthsExpensesByMonth = formatLast6MonthsExpensesByMonth(
      last6MonthsExpenses.map((expense) => ({
        ...expense,
        amount: Number(expense.amount),
      })),
    );

    return c.json(
      {
        currentMonthExpenses: formatDecimal(currentMonthExpenses._sum.amount),
        last6MonthsExpensesByMonth: last6MonthsExpensesByMonth,
        todayExpenses: formatDecimal(todayExpenses._sum.amount),
        currentWeekExpenses: formatDecimal(currentWeekExpenses._sum.amount),
        previousMonthExpenses: formatDecimal(previousMonthExpenses._sum.amount),
        averageMonthlyExpenses: formatDecimal(
          averageMonthlyExpenses?._avg?.amount,
        ),
        currentMonthRevenue: {
          ...currentMonthIncome,
          value: formatDecimal(currentMonthIncome?.value),
        },

        currentMonthBudget: formatDecimal(currentMonthBudget?._sum?.amount),
        last10Expenses: last10Expenses.map((exp) => ({
          ...exp,
          amount: formatDecimal(exp.amount),
          budget: {
            ...exp.budget,
            amount: formatDecimal(exp.budget?.amount),
            limitAlert: formatDecimal(exp.budget?.limitAlert),
            category: {
              ...exp.budget?.category,
            },
          },
        })),
      },
      200,
    );
  },
);

function formatLast6MonthsExpensesByMonth(
  last6MonthsExpenses: Expense[],
): Record<string, number> {
  const result: Record<string, number> = {};
  const now = new Date();

  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const key = `${month}/${year}`;
    result[key] = 0;
  }

  for (const expense of last6MonthsExpenses) {
    const date = new Date(expense.date);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const key = `${month}/${year}`;

    if (key in result) {
      result[key] += expense.amount;
    }
  }

  return result;
}

export default dashboardRouter;
