import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { describeRoute } from 'hono-openapi';
import prisma from '../db/client';
import {
  budgetSelectSchema,
  createBudgetSchema,
  updateBudgetSchema,
} from '../validators/budget';
import {
  response200,
  response201,
  response204,
  response404,
} from '../utils/openapi';
import { paramsWithId } from '../validators/utils';

const budgetRouter = new Hono();

budgetRouter
  .basePath('/budget')
  .get(
    '/',
    describeRoute({
      description: 'Get budgets for the current user',
      tags: ['budget'],
      responses: {
        200: response200(budgetSelectSchema),
      },
    }),
    async (c) => {
      const userId = c.get('jwtPayload').userId;
      const now = new Date();
      const month = now.getMonth() + 1;
      const year = now.getFullYear();

      console.log(
        `Fetching budgets for userId: ${userId}, month: ${month}, year: ${year}`
      );

      const budgets = await prisma.budget.findMany({
        where: {
          userId,
          year,
          month,
        },
        include: {
          category: {
            include: {
              color: true,
            },
          },
          expenses: {
            select: {
              amount: true,
            },
          },
        },
      });

      // Fonction d'arrondi pour les floats (2 décimales)
      const round = (value: number, decimals = 2) => {
        return Number(
          Math.round(Number(value + 'e' + decimals)) + 'e-' + decimals
        );
      };

      const budgetsWithTotalExpense = budgets.map(
        (budget: (typeof budgets)[number]) => {
          const totalExpense =
            budget.expenses?.reduce(
              (sum: number, exp: { amount: number }) => sum + exp.amount,
              0
            ) || 0;

          const { expenses, ...budgetWithoutExpenses } = budget;
          return {
            ...budgetWithoutExpenses,
            totalExpense: round(totalExpense),
          };
        }
      );

      const budgetCount = budgetsWithTotalExpense.length;

      const budgetTotal = round(
        budgetsWithTotalExpense.reduce(
          (sum: number, budget: (typeof budgetsWithTotalExpense)[number]) =>
            sum + Number(budget.amount),
          0
        )
      );

      const totalExpenses = round(
        budgetsWithTotalExpense.reduce(
          (sum: number, budget: (typeof budgetsWithTotalExpense)[number]) =>
            sum + Number(budget.totalExpense),
          0
        )
      );

      const budgetRemaining = round(Math.max(budgetTotal - totalExpenses, 0));

      return c.json(
        {
          budgets: budgetsWithTotalExpense,
          budgetTotal,
          budgetCount,
          budgetRemaining,
          totalExpenses,
        },
        200
      );
    }
  )
  .post(
    '/',
    describeRoute({
      description: 'Create a budget',
      tags: ['budget'],
      responses: {
        201: response201(createBudgetSchema),
      },
    }),
    zValidator('json', createBudgetSchema),
    async (c) => {
      const userId = c.get('jwtPayload').userId;
      const budget = c.req.valid('json');
      const now = new Date();

      const categoryExists = await prisma.category.findUnique({
        where: {
          id: budget.categoryId,
          userId: userId,
        },
      });
      if (!categoryExists) {
        return c.json({ message: 'Category not found' }, 404);
      }

      const createBudget = await prisma.budget.create({
        data: {
          ...budget,
          userId: userId,
          month: now.getMonth() + 1,
          year: now.getFullYear(),
        },
        include: {
          category: {
            include: {
              color: true,
            },
          },
        },
      });

      return c.json(createBudget, 201);
    }
  )
  .patch(
    '/:id',
    describeRoute({
      description: 'Update a budget',
      tags: ['budget'],
      responses: {
        200: response200(updateBudgetSchema),
        404: response404(),
      },
    }),
    zValidator('param', paramsWithId),
    zValidator('json', updateBudgetSchema),
    async (c) => {
      const userId = c.get('jwtPayload').userId;
      const budgetId = c.req.param('id');
      const budgetData = c.req.valid('json');
      const now = new Date();

      const budgetExists = await prisma.budget.findUnique({
        where: {
          id: budgetId,
          userId: userId,
        },
      });
      if (!budgetExists) {
        return c.json({ message: 'Budget not found' }, 404);
      }

      if (budgetData.categoryId) {
        console.log(
          'Checking if category exists for ID:',
          budgetData.categoryId
        );

        const categoryExists = await prisma.category.findUnique({
          where: {
            id: budgetData.categoryId,
            userId: userId,
          },
        });
        if (!categoryExists) {
          return c.json({ message: 'Category not found' }, 404);
        }
      }

      const updatedBudget = await prisma.budget.update({
        where: {
          id: budgetId,
          userId: userId,
        },
        data: {
          ...budgetData,
          month: now.getMonth() + 1,
          year: now.getFullYear(),
        },
        include: {
          category: {
            include: {
              color: true,
            },
          },
        },
      });

      return c.json(updatedBudget, 200);
    }
  )
  .delete(
    '/:id',
    describeRoute({
      description: 'Delete a budget',
      tags: ['budget'],
      responses: {
        204: response204(),
      },
    }),
    zValidator('param', paramsWithId),
    async (c) => {
      const userId = c.get('jwtPayload').userId;
      const budgetId = c.req.param('id');

      const budgetExists = await prisma.budget.findUnique({
        where: {
          id: budgetId,
          userId: userId,
        },
      });
      if (!budgetExists) {
        return c.json({ message: 'Budget not found' }, 404);
      }

      await prisma.budget.delete({
        where: {
          id: budgetId,
          userId: userId,
        },
      });

      return c.body(null, 204);
    }
  );

export default budgetRouter;
