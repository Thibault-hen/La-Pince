import z from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Email invalide' }),
  password: z.string().min(8, { message: 'Le mot de passe doit contenir au moins 6 caractères' }),
});

export const registerSchema = loginSchema
  .extend({
    name: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  });

export type LoginUser = z.infer<typeof loginSchema>;
export type RegisterUser = z.infer<typeof registerSchema>;
