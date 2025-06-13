import { z } from 'zod';

export const colorSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  hex: z.string(),
});

export const categorySchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  colorId: z.string().cuid(),
  color: colorSchema,
});

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
  category: categorySchema,
  totalExpense: z.number(),
  budgetTotal: z.number(),
  budgetCount: z.number(),
  budgetRemaning: z.number(),
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
