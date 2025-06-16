import { Context, Env } from 'hono';
import { z, ZodError } from 'zod';

export const paramsWithId = z.object({
	id: z.string().cuid().describe('Unique identifier for the resource'),
});

export function zodValidatorMessage(result: ({ success: true; data: any; } | { success: false; error: ZodError; data: any; }) & { target: "json"; }, c: Context<Env, "/expense", {}>) {
  if (!result.success) {
      const errors = result.error.errors.map((err: { path: any[]; message: any; }) => ({
        field: err.path[0],
        message: err.message, }));

      return c.json(errors, 400)
    }
}