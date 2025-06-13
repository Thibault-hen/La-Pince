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
  response400,
  response404,
} from '../utils/openapi';
import { paramsWithId } from '../validators/utils';

const budgetRouter = new Hono();

budgetRouter
  .basePath('/budget')
  .get(
    '/',
    describeRoute({
      description: 'Get budgets by user ID',
      tags: ['budget'],
      responses: {
        200: response200(budgetSelectSchema),
      },
    }),
    async (c) => {
      const userId = c.get('jwtPayload').userId;
      console.log('Fetching budgets for user ID:', userId);

      const budgets = await prisma.budget.findMany({
        where: { userId: userId },
        orderBy: [
          {
            month: 'desc',
          },
          {
            year: 'desc',
          },
        ],
        include: {
          category: {
            include: {
              color: true,
            },
          },
        },
      });

      return c.json(budgets, 200);
    }
  )
  .get(
    '/:id',
    describeRoute({
      description: 'Get budget by user ID and budget ID',
      tags: ['budget'],
      responses: {
        200: response200(budgetSelectSchema),
        400: response400(z.literal('Budget ID is required')),
        404: response404(),
      },
    }),
    zValidator('param', paramsWithId),
    async (c) => {
      const userId = c.get('jwtPayload').userId;
      const budgetId = c.req.param('id');

      if (!budgetId) {
        return c.json({ message: 'Budget ID is required' }, 400);
      }

      const budget = await prisma.budget.findUnique({
        where: {
          id: budgetId,
          userId: userId,
        },
        include: {
          category: {
            include: {
              color: true,
            },
          },
        },
      });

      if (!budget) {
        return c.json({ message: 'Budget not found' }, 404);
      }

      return c.json(budget, 200);
    }
  )
  .post(
    '/',
    describeRoute({
      description: 'Create a budget',
      tags: ['budget'],
      responses: {
        201: response201(budgetSelectSchema),
      },
    }),
    zValidator('json', createBudgetSchema),
    async (c) => {
      const userId = c.get('jwtPayload').userId;
      const budget = c.req.valid('json');

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
        200: response200(budgetSelectSchema),
        404: response404(),
      },
    }),
    zValidator('param', paramsWithId),
    zValidator('json', updateBudgetSchema),
    async (c) => {
      const userId = c.get('jwtPayload').userId;
      const budgetId = c.req.param('id');
      const budgetData = c.req.valid('json');

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
        data: budgetData,
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
