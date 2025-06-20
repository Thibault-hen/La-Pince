import { z } from 'zod';

export const incomeSelectSchema = z.object({
  id: z.string().cuid(),
  value: z.number().positive(),
  month: z.number().int().min(1).max(12),
  year: z.number().int().min(2020).max(30000),
  userId: z.string().cuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const incomeCreateOrUpdateSchema = incomeSelectSchema.omit({
  id: true,
  userId: true,
  month: true,
  year: true,
  createdAt: true,
  updatedAt: true,
});

export type IncomeCreateOrUpdate = z.infer<typeof incomeCreateOrUpdateSchema>;
