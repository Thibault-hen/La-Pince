import { z } from 'zod';

export const incomeSelectSchema = z.object({
  id: z.string().cuid(),
  value: z.number().positive(),
});

export const incomeCreateOrUpdateSchema = incomeSelectSchema.omit({
  id: true,
});

export type IncomeCreateOrUpdate = z.infer<typeof incomeCreateOrUpdateSchema>;
