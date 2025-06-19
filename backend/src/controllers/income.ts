import { Hono } from 'hono';
import { describeRoute } from 'hono-openapi';
import { describe } from 'node:test';
import { response200, response204, response404 } from '../utils/openapi';
import { type IncomeCreateOrUpdate, incomeCreateOrUpdateSchema, incomeSelectSchema } from '../validators/income';
import { zValidator } from '@hono/zod-validator';
import prisma from '../db/client';
import { paramsWithId, zodValidatorMessage } from '../validators/utils';
import { HTTPException } from 'hono/http-exception';

const incomeRouter = new Hono();

incomeRouter.basePath('/income')
.get('/', 
  describeRoute({
    description: 'Get income by user ID',
    tags: ['income'],
    responses: {
      200: response200(incomeSelectSchema),
    },
  }),
  async (c) => {
    const incomes = await prisma.income.findMany({
      where: {
        userId: c.get('jwtPayload').userId,
      },
      omit: {
        id: true,
        userId: true,
      },
      orderBy: [
        {
          month: 'desc',
        },
        {
          year: 'desc',
        },
      ],
    });

    return c.json(incomes);
})
.post('/',
  describeRoute({
    description: 'Create an income entry',
    tags: ['income'],
    responses: {
      201: response200(incomeSelectSchema),
    },
  }),
  zValidator('json', incomeCreateOrUpdateSchema, (result, c) => 
      zodValidatorMessage(result, c)
),
  async (c) => {
    const incomeData = c.req.valid('json') as IncomeCreateOrUpdate;

    const income = await prisma.income.create({
      data: {
        ...incomeData,
        userId: c.get('jwtPayload').userId,
      },
    });

    return c.json(income, 201);
  })
  .put('/:id',
  describeRoute({
    description: 'Update an income entry',
    tags: ['income'],
    responses: {
      200: response200(incomeSelectSchema),
      404: response404()
    },
  }),
  zValidator('param', paramsWithId),
  zValidator('json', incomeCreateOrUpdateSchema, (result, c) => 
    zodValidatorMessage(result, c)
),
  async (c) => {
    const incomeId = c.req.param('id');
    const data = c.req.valid('json') as IncomeCreateOrUpdate;

    const income = await prisma.income.findUnique({
      where: {
        id: incomeId,
        userId: c.get('jwtPayload').userId,
      },
    });

    if (!income) {
      throw new HTTPException(404, {
        res: c.json({ message: 'Income not found' }, 404),
      });
    }

    const updatedIncome = await prisma.income.update({
      data,
      where: {
        id: incomeId,
        userId: c.get('jwtPayload').userId,
      },
    });

    return c.json(updatedIncome);
  })
  .delete('/:id',
  describeRoute({
    description: 'Delete an income entry',
    tags: ['income'],
    responses: {
      204: response204(),
      404: response404()
    },
  }),
  zValidator('param', paramsWithId),
  async (c) => {
    const incomeId = c.req.param('id');

    const income = await prisma.income.findUnique({
      where: {
        id: incomeId,
        userId: c.get('jwtPayload').userId,
      },
    });

    if (!income) {
      throw new HTTPException(404, {
        res: c.json({ message: 'Income not found' }, 404),
      });
    }

    await prisma.income.delete({
      where: {
        id: incomeId,
        userId: c.get('jwtPayload').userId,
      },
    });

    return c.json(204);
  });

export default incomeRouter;