import { z }  from "zod";

export const categorySelectSchema = z.object({
  id: z.string().cuid(),
  title: z.string().trim().toLowerCase().min(1),
  userId : z.string().cuid(),
  colorId: z.number().int().positive(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export const categoryCreateOrUpdateSchema = z.object({
  title: z.string().trim().min(1),
  colorId: z.string().cuid(),
})