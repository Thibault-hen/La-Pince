import { Hono } from "hono";
import prisma from "../db/client";
import { describeRoute } from "hono-openapi";
import { response200 } from "../utils/openapi";

const dashboardRouter  = new Hono();

dashboardRouter
  .basePath('/dashboard')
  .get(
    '/budget',
    async (c) => {
    const userId = c.get('jwtPayload').userId;
    const now = new Date();
    const year = c.req.query('year') ? parseInt(c.req.query('year')!, 10) : now.getFullYear();
    const month = c.req.query('month') ? parseInt(c.req.query('month')!, 10) : now.getMonth() + 1;

    const [budgets, total] = await Promise.all([
      prisma.budget.findMany({
      where: {
        userId: userId,
        year: year,
        month: month,
      },
      omit:{
        id: true,
        categoryId: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
      },
      include: {
        expenses: {
          omit: {
            id: true,
            createdAt: true,
            updatedAt: true,
            userId: true,
            budgetId: true,
          }
        },
        category: {
          omit: {
            id: true,
            createdAt: true,
            updatedAt: true,
            userId: true,
          },
          include: {
            color: {
              omit: {
                id: true,
                createdAt: true,
                updatedAt: true,
              }
            }
          },
        },
      },
    }),
    prisma.budget.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        userId: userId,
        year: year,
        month: month,
      },
    })
    ]);

    return c.json({budgets, total}, 200);
  })
  .get(
    '/income',
    async (c) => {
    const userId = c.get('jwtPayload').userId;
    const now = new Date();
    const year = c.req.query('year') ? parseInt(c.req.query('year')!, 10) : now.getFullYear();
    const month = c.req.query('month') ? parseInt(c.req.query('month')!, 10) : now.getMonth() + 1;

    const [incomes, total] = await Promise.all([
      prisma.income.findMany({
      where: {
        userId: userId,
        year: year,
        month: month,
      },
      omit:{
        id: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
      },
    }),
    prisma.income.aggregate({
      _sum: {
        value: true,
      },
      where: {
        userId: userId,
        year: year,
        month: month,
      },
    })
    ]);

    return c.json({incomes, total}, 200);
  })
  .get(
    '/expense',
    async (c) => {
    const userId = c.get('jwtPayload').userId;
    const year = c.req.query('year') ? parseInt(c.req.query('year')!, 10) : new Date().getFullYear();
    const month = c.req.query('month') ? parseInt(c.req.query('month')!, 10) : new Date().getMonth() + 1;
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const [expenses, total] = await Promise.all([
      prisma.expense.findMany({
      where: {
        userId: userId,
        date: {
          gte: startDate,
          lt: endDate,
        },
      },
      omit:{
        id: true,
        createdAt: true,
        updatedAt: true,
        budgetId: true,
        userId: true,
      },
    }),
    prisma.expense.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        userId: userId,
        date: {
          gte: startDate,
          lt: endDate,
        },
      },
    })
    ]);

    return c.json({expenses, total}, 200);
  });

export default dashboardRouter;