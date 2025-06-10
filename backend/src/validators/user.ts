import { z }  from "zod/v4";

const userSelectSchema = z.object({
  id: z.cuid(),
  name: z.string().min(1),
  email: z.email(),
  currency: z.string().min(1),
  alert: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
})