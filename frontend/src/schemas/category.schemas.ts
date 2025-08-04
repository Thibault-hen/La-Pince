import z from 'zod';

export const createCategorySchema = z.object({
	title: z.string().min(2, {
		message:
			'Le titre de votre catégorie doit contenir au moins deux caractères',
	}),
	colorId: z
		.string()
		.nonempty({ message: 'Veuillez sélectionner une couleur' }),
});

export const updateCategorySchema = z.object({
	title: z.string().min(2, {
		message:
			'Le titre de votre catégorie doit contenir au moins deux caractères',
	}),
	colorId: z
		.string()
		.nonempty({ message: 'Veuillez sélectionner une couleur' }),
});
