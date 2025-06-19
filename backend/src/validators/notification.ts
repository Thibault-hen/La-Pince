import { z } from "zod";

export const notificationSelectSchema = z.object({
  id: z.string().cuid(),
  userId: z.string().cuid(),
  budgetName: z.string(),
  notificationType: z.enum(["budgetWarning", "budgetExceeded"]),
  maximumAmount: z.number(),
  totalAmount: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export const notificationCreateOrUpdateSchema = z.object({
  content: z.string(),
  isSeen: z.boolean(),
})
