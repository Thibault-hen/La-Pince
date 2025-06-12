import { z }  from "zod";

export const notificationSelectSchema = z.object({
  id: z.string().cuid(),
  content: z.string(),
  isSeen : z.boolean(),
  userId: z.string().cuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export const notificationCreateOrUpdateSchema = z.object({
  content: z.string(),
  isSeen : z.boolean(),
})