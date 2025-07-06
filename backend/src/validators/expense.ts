import { z } from 'zod';

export const expenseSelectSchema = z.object({
  id: z.string().cuid(),
  description: z.string().min(1),
  amount: z.number().positive(),
  date: z.string().datetime(),
  budgetId: z.string().cuid(),
  userId: z.string().cuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const expenseCreateOrUpdateSchema = expenseSelectSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

export type ExpenseCreateOrUpdate = z.infer<typeof expenseCreateOrUpdateSchema>;
