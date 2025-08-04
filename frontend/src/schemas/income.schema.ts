import z from 'zod';

export const updateIncomeSchema = z.object({
	value: z.number().positive({ message: 'income.modal.errorValue' }),
});

export type UpdateIncome = z.infer<typeof updateIncomeSchema>;
