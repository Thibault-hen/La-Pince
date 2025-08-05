import { zValidator } from '@hono/zod-validator';
import type { Income } from '@prisma/client';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { describeRoute } from 'hono-openapi';
import prisma from '../db/client';
import { response200, response204, response404 } from '../utils/openapi';
import {
	type IncomeCreateOrUpdate,
	incomeCreateOrUpdateSchema,
	incomeSelectSchema,
} from '../validators/income';
import { paramsWithId, zodValidatorMessage } from '../validators/utils';

const incomeRouter = new Hono();

incomeRouter
	.basePath('/income')
	.get(
		'/',
		describeRoute({
			description: 'Get income by user ID',
			tags: ['income'],
			responses: {
				200: response200(incomeSelectSchema),
			},
		}),
		async (c) => {
			const userId = c.get('jwtPayload').userId;
			const incomes = await prisma.income.findFirst({
				where: {
					userId,
				},
				orderBy: [
					{
						year: 'desc',
					},
					{
						month: 'desc',
					},
				],
			});

			return c.json({
				...incomes,
				value: Number(incomes?.value.toFixed(2)),
			});
		},
	)
	.put(
		'/',
		describeRoute({
			description: 'Update an income entry',
			tags: ['income'],
			responses: {
				200: response200(incomeSelectSchema),
				404: response404(),
			},
		}),
		zValidator('json', incomeCreateOrUpdateSchema, (result, c) =>
			zodValidatorMessage(result, c),
		),
		async (c) => {
			const data = c.req.valid('json') as IncomeCreateOrUpdate;
			const userId = c.get('jwtPayload').userId;
			const now = new Date();
			const month = now.getMonth() + 1;
			const year = now.getFullYear();
			const income = await prisma.income.findFirst({
				where: {
					userId,
					month,
					year,
				},
			});

			if (!income) {
				const createdIncome = await createIncome(
					c.get('jwtPayload').userId,
					data.value,
				);
				return c.json(
					{
						...createdIncome,
						value: Number(createdIncome.value.toFixed(2)),
					},
					201,
				);
			}

			const updatedIncome = await prisma.income.update({
				data,
				where: {
					id: income.id,
				},
			});

			return c.json(
				{
					...updatedIncome,
					value: Number(updatedIncome.value.toFixed(2)),
				},
				200,
			);
		},
	)
	.delete(
		'/:id',
		describeRoute({
			description: 'Delete an income entry',
			tags: ['income'],
			responses: {
				204: response204(),
				404: response404(),
			},
		}),
		zValidator('param', paramsWithId),
		async (c) => {
			const incomeId = c.req.param('id');
			const userId = c.get('jwtPayload').userId;
			const income = await prisma.income.findFirst({
				where: {
					id: incomeId,
					userId,
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
					userId,
				},
			});

			return c.newResponse(null, 204);
		},
	);

async function createIncome(userId: string, value?: number): Promise<Income> {
	const now = new Date();

	const createdIncome = await prisma.income.create({
		data: {
			userId,
			value: value ?? 0,
			month: now.getMonth() + 1,
			year: now.getFullYear(),
		},
	});

	return createdIncome;
}

export { createIncome };

export default incomeRouter;
