import { z } from 'zod';

export const userSelectSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1),
  email: z.string().email(),
  currency: z.string().min(1),
  alert: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const userRegisterSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const updateUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(1).max(100).optional(),
  currency: z.string().min(1).max(10).optional(),
  alert: z.boolean().optional(),
});
