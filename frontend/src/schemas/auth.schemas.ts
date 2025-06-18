import z from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'login.errorMessages.invalidEmail' }),
  password: z.string().min(8, { message: 'login.errorMessages.invalidPassword' }),
});

export const registerSchema = loginSchema
  .extend({
    name: z.string().min(2, { message: 'register.errorMessages.invalidName' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'register.errorMessages.matchPassword',
    path: ['confirmPassword'],
  });

export type LoginUser = z.infer<typeof loginSchema>;
export type RegisterUser = z.infer<typeof registerSchema>;
