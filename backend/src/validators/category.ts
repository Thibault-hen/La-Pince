import { z }  from "zod";

export const categorySelectSchema = z.object({
  id: z.string().cuid(),
  title: z.string().min(1),
  userId : z.string(),
  colorId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const categoryCreateSchema = z.object({
  title: z.string().min(1),
  colorId: z.number(),
})