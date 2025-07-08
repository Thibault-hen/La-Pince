import { z } from 'zod';

export const userAccountSchema = z.object({
  email: z.string().email({ message: "L'adresse email n'est pas valide." }),
  name: z.string().min(1, { message: 'Le nom est requis.' }),
  alert: z.boolean(),
  currency: z.string().min(1, { message: 'La devise est requise.' }),
});

export const passwordChangeSchema = z
  .object({
    currentPassword: z.string().min(1, 'Le mot de passe actuel est requis.'),
    newPassword: z
      .string()
      .min(8, 'Le nouveau mot de passe doit contenir au moins 8 caractères.'),
    confirmPassword: z
      .string()
      .min(1, 'Veuillez confirmer votre nouveau mot de passe.'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas.',
    path: ['confirmPassword'],
  });

export const updateCurrencySchema = z.object({
  currency: z
    .string()
    .length(3, { message: 'Le format de devise est invalide' }),
});

export type UserAccountProfile = z.infer<typeof userAccountSchema>;
export type PasswordChange = z.infer<typeof passwordChangeSchema>;
export type UpdateCurrency = z.infer<typeof updateCurrencySchema>;
