import z from 'zod';

export const contactFormSchema = z.object({
	firstName: z.string().min(2, { message: 'Nom requis' }).max(255),
	lastName: z.string().min(2, { message: 'Prénom requis' }).max(255),
	email: z.string().email(),
	subject: z.string().min(2, { message: 'Sujet requis' }).max(255),
	message: z.string().min(2, { message: 'Message requis' }).max(255),
});
