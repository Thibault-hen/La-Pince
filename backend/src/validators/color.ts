import { z }  from "zod";

export const colorSelectSchema = z.object({
  id: z.number(),
  name: z.string(),
  value : z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})