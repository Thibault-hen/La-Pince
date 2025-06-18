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

export const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(8, { message: 'user.resetPassword.errorChar' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'user.resetPassword.errorMatch',
    path: ['confirmPassword'],
  });

export const sendResetEmailSchema = z.object({
  email: z.string().email({ message: 'user.resetPassword.error.invalid' }),
});

export type LoginUser = z.infer<typeof loginSchema>;
export type RegisterUser = z.infer<typeof registerSchema>;
