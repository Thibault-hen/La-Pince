import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { paramsWithId } from '../validators/utils';
import { describeRoute } from 'hono-openapi';
import { response200, response201, response204, response401, response404 } from '../utils/openapi';
import { ExpenseCreateOrUpdate, expenseCreateOrUpdateSchema, expenseSelectSchema } from '../validators/expense';
import prisma from '../db/client';

const expenseRouter = new Hono();

expenseRouter.basePath('/expense')
.get('/', 
  describeRoute({
    description: 'Get expenses by user ID',
    tags: ['expense'],
    responses:{
      200: response200(expenseSelectSchema),
    }
  }),
  async (c) => {
    const expenses = await prisma.expense.findMany({
      where: {
        userId: c.get('jwtPayload').userId
      },
      orderBy: {
        date: 'desc',
      },
      omit:{
        userId: true, 
        budgetId: true, 
      },
      include: {
        budget:{
          include:{
            category: {
              omit:{
                userId: true,
                id: true,
                colorId: true
              },
              include: {
                color: {
                  omit: {
                    id: true,
                    createdAt: true,
                    updatedAt: true,
                  }
              }
            }
          }
        }
      }
    }});

    const formattedExpenses =  expenses.map(expense => {
      const { budget, ...restOfExpense } = expense;
      
      return ({
        ...restOfExpense,
        category: budget.category, 
      });
    });

  return c.json(formattedExpenses, 200);
})
.get('/:id', 
  describeRoute({
    description: 'Get expense by user ID and budget ID',
    tags: ['expense'],
    responses:{
      200: response200(expenseSelectSchema),
    }
  }),
  zValidator('param', paramsWithId),
  async (c) => {
    const budgetId = c.req.param('id');
    
    const expense = await prisma.expense.findMany({
      where: {
        userId: c.get('jwtPayload').userId,
        budgetId: budgetId,
      },
      orderBy: {
        date: 'desc',
      },
      omit:{
        userId: true, 
        budgetId: true, 
      },
      include: {
        budget:{
          include:{
            category: {
              omit:{
                userId: true,
                id: true,
                colorId: true
              },
              include: {
                color: {
                  omit: {
                    id: true,
                    createdAt: true,
                    updatedAt: true,
                  }
                }
              }
            }
          }
        }
      }
    });

    return c.json(expense, 200);
  }
)
.post('/', 
  describeRoute({
    description: 'Create an expense',
    tags: ['expense'],
    responses:{
      201: response201(expenseSelectSchema),
      404: response404(),
    }
  }),
  zValidator('json', expenseCreateOrUpdateSchema),
  async (c) => {
    const expense = c.req.valid('json') as ExpenseCreateOrUpdate;

    const budgetExists = await prisma.budget.findUnique({
      where: {
        id: expense.budgetId,
        userId: c.get('jwtPayload').userId,
      },
    });

    if (!budgetExists) {
      return c.json({ message: 'Budget not found' }, 404);
    }

    const createdExpense = await prisma.expense.create({
      data: {
        ...expense,
        userId: c.get('jwtPayload').userId,
      },});

    return c.json(createdExpense);
  }
)
.put('/:id', 
  describeRoute({
    description: 'Update an expense',
    tags: ['expense'],
    responses:{
      200: response200(expenseSelectSchema),
      404: response404()
    }
  }),
  zValidator('param', paramsWithId),
  zValidator('json', expenseCreateOrUpdateSchema),
  async (c) => {
    const expenseId = c.req.param('id');
    const expenseToUpdate = c.req.valid('json');

    const budgetExists = await prisma.budget.findUnique({
      where: {
        id: expenseToUpdate.budgetId,
        userId: c.get('jwtPayload').userId,
      },
    });

    if (!budgetExists) {
      return c.json({ message: 'Budget not found' }, 404);
    }

    const expense = await prisma.expense.findUnique({
      where: {
        id: expenseId,
        userId: c.get('jwtPayload').userId,
      },
    });

    if (!expense) {
      return c.json({ message: 'Expense not found' }, 404);
    }

    const updatedExpense = await prisma.expense.update({
      data: expenseToUpdate,
      where: {
        id: expenseId,
        userId: c.get('jwtPayload').userId,
      },
    });

    return c.json(updatedExpense, 201);
  }
)
.delete('/:id', 
  describeRoute({
    description: 'Delete an expense',
    tags: ['expense'],
    responses:{
      204: response204(),
      404: response404()
    }
  }),
  zValidator('param', paramsWithId),
  async (c) => {
    const expenseId = c.req.param('id');
    const userId = c.get('jwtPayload').userId;

    const expense = await prisma.expense.findUnique({
      where: {
        id: expenseId,
        userId,
      },
    });

    if (!expense) {
      return c.json({ message: 'Expense not found' }, 404);
    }

    await prisma.expense.delete({
      where: {
        id: expenseId,
        userId,
      },
    });

    return c.json(204);
  }
);

export default expenseRouter;