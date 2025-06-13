import { z } from 'zod';

export const budgetSelectSchema = z.object({
  id: z.string().cuid(),
  amount: z.string(),
  limitAlert: z.number().positive(),
  month: z.number().int().min(1).max(12),
  year: z.number().int().min(2020).max(30000),
  categoryId: z.string().cuid(),
  userId: z.string().cuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const createBudgetSchema = z.object({
  amount: z.number().positive(),
  limitAlert: z.number().positive(),
  month: z.number().int().min(1).max(12),
  year: z.number().int().min(2020).max(30000),
  categoryId: z.string().cuid(),
});

export const updateBudgetSchema = z.object({
  amount: z.number().positive().optional(),
  limitAlert: z.number().positive().optional(),
  month: z.number().int().min(1).max(12).optional(),
  year: z.number().int().min(2020).max(30000).optional(),
  categoryId: z.string().cuid().optional(),
});
