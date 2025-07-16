import z from 'zod';

export const createExpenseSchema = z.object({
  description: z.string().min(1, { message: 'Le titre est requis' }),
  amount: z.number().positive({ message: 'Le montant doit être positif' }),
  budgetId: z.string().min(1, { message: 'Veuillez sélectionner un budget' }),
  date: z.string().min(1, { message: 'Veuillez sélectionner une date' }),
});

export const updateExpenseSchema = z.object({
  description: z.string().min(1, { message: 'Le titre est requis' }),
  amount: z.number().positive({ message: 'Le montant doit être positif' }),
  budgetId: z.string().min(1, { message: 'Veuillez sélectionner un budget' }),
  date: z.string().min(1, { message: 'Veuillez sélectionner une date' }),
});
