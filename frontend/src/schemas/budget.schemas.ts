import z from 'zod';

export const createBudgetSchema = z.object({
  amount: z.number().positive({ message: 'Votre montant ne peut pas être négatif' }),
  limitAlert: z
    .number()
    .positive({ message: 'Votre limite ne peut pas être négative ou égale à 0' }),
  categoryId: z.string().min(1, { message: 'Veuillez sélectionner une catégorie' }),
});

export const updateBudgetSchema = z.object({
  amount: z.number().positive({ message: 'Votre montant ne peut pas être négatif' }),
  limitAlert: z
    .number()
    .positive({ message: 'Votre limite ne peut pas être négative ou égale à 0' }),
  categoryId: z.string().min(1, { message: 'Veuillez sélectionner une catégorie' }),
});
