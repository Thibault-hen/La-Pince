import { zValidator } from '@hono/zod-validator';
import { Decimal } from '@prisma/client/runtime/library';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { describeRoute } from 'hono-openapi';
import { z } from 'zod';
import prisma from '../db/client';
import { formatDecimal } from '../utils/formatDecimal';
import {
	response200,
	response201,
	response204,
	response404,
	response409,
	response422,
} from '../utils/openapi';
import {
	budgetSelectSchema,
	createBudgetSchema,
	updateBudgetSchema,
} from '../validators/budget';
import { paramsWithId, zodValidatorMessage } from '../validators/utils';

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

			const firstDay = new Date(year, month - 1, 1);
			const lastDay = new Date(year, month, 0, 23, 59, 59, 999);

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
						where: {
							date: {
								gte: firstDay,
								lte: lastDay,
							},
						},
						select: {
							amount: true,
						},
					},
				},
			});

			const budgetsWithTotalExpense = budgets.map(
				(budget: (typeof budgets)[number]) => {
					const totalExpense =
						budget.expenses?.reduce(
							(sum: Decimal, exp: { amount: Decimal }) => sum.add(exp.amount),
							new Decimal(0),
						) || new Decimal(0);

					const { ...budgetWithoutExpenses } = budget;
					return {
						...budgetWithoutExpenses,
						amount: formatDecimal(budget.amount),
						limitAlert: formatDecimal(budget.limitAlert),
						totalExpense: formatDecimal(totalExpense),
					};
				},
			);
			const budgetCount = budgetsWithTotalExpense.length;

			const budgetTotal = formatDecimal(
				budgetsWithTotalExpense.reduce(
					(sum: Decimal, budget: (typeof budgetsWithTotalExpense)[number]) =>
						sum.add(new Decimal(budget.amount)),
					new Decimal(0),
				),
			);

			const totalExpenses = formatDecimal(
				budgetsWithTotalExpense.reduce(
					(sum: Decimal, budget: (typeof budgetsWithTotalExpense)[number]) =>
						sum.add(new Decimal(budget.totalExpense)),
					new Decimal(0),
				),
			);

			const budgetRemaining = formatDecimal(
				new Decimal(budgetTotal).minus(totalExpenses),
			);

			return c.json(
				{
					budgets: budgetsWithTotalExpense,
					budgetTotal,
					budgetCount,
					budgetRemaining,
					totalExpenses,
				},
				200,
			);
		},
	)
	.post(
		'/',
		describeRoute({
			description: 'Create a budget',
			tags: ['budget'],
			responses: {
				201: response201(createBudgetSchema),
				404: response404(z.literal('Category not found.')),
				422: response422(
					z.literal('The limit cannot be higher than the amount.'),
				),
				409: response409(
					z.literal(
						'A budget already exists for this category in the current month.',
					),
				),
			},
		}),
		zValidator('json', createBudgetSchema),
		zValidator('json', createBudgetSchema, (result, c) =>
			zodValidatorMessage(result, c),
		),
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
				throw new HTTPException(404, { message: 'Category not found.' });
			}

			if (budget.limitAlert > budget.amount) {
				throw new HTTPException(422, {
					message: 'The limit cannot be higher than the amount.',
				});
			}

			const existingBudget = await prisma.budget.findFirst({
				where: {
					userId: userId,
					categoryId: budget.categoryId,
					month: now.getMonth() + 1,
					year: now.getFullYear(),
				},
			});

			if (existingBudget) {
				throw new HTTPException(409, {
					message:
						'A budget already exists for this category in the current month.',
				});
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

			return c.json(
				{
					...createBudget,
					amount: formatDecimal(createBudget.amount),
					limitAlert: formatDecimal(createBudget.limitAlert),
				},
				201,
			);
		},
	)
	.patch(
		'/:id',
		describeRoute({
			description: 'Update a budget',
			tags: ['budget'],
			responses: {
				200: response200(updateBudgetSchema),
				404: response404(
					z.union([
						z.literal('Budget not found.'),
						z.literal('Category not found.'),
					]),
				),
				422: response422(
					z.literal('The limit cannot be higher than the amount.'),
				),
				409: response409(
					z.literal(
						'A budget already exists for this category in the current month.',
					),
				),
			},
		}),
		zValidator('param', paramsWithId),
		zValidator('json', updateBudgetSchema, (result, c) =>
			zodValidatorMessage(result, c),
		),
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
				throw new HTTPException(404, { message: 'Budget not found.' });
			}

			if (budgetData.categoryId) {
				const categoryExists = await prisma.category.findUnique({
					where: {
						id: budgetData.categoryId,
						userId: userId,
					},
				});

				if (!categoryExists) {
					throw new HTTPException(404, { message: 'Category not found.' });
				}

				const existingBudget = await prisma.budget.findFirst({
					where: {
						userId: userId,
						categoryId: budgetData.categoryId,
						month: now.getMonth() + 1,
						year: now.getFullYear(),
						NOT: {
							id: budgetId,
						},
					},
				});

				if (existingBudget) {
					throw new HTTPException(409, {
						message:
							'A budget already exists for this category in the current month.',
					});
				}
			}

			if (
				budgetData.limitAlert !== undefined &&
				budgetData.amount !== undefined &&
				budgetData.limitAlert > budgetData.amount
			) {
				throw new HTTPException(422, {
					message: 'The limit cannot be higher than the amount.',
				});
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

			return c.json(
				{
					...updatedBudget,
					amount: formatDecimal(updatedBudget.amount),
					limitAlert: formatDecimal(updatedBudget.limitAlert),
				},
				200,
			);
		},
	)
	.delete(
		'/:id',
		describeRoute({
			description: 'Delete a budget',
			tags: ['budget'],
			responses: {
				204: response204(),
				404: response404(z.literal('Budget not found.')),
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
				throw new HTTPException(404, { message: 'Budget not found.' });
			}

			await prisma.budget.delete({
				where: {
					id: budgetId,
					userId: userId,
				},
			});

			return c.body(null, 204);
		},
	);

export default budgetRouter;
