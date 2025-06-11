import { z } from 'zod';

export const paramsWithId = z.object({
	id: z.string().cuid().describe('Unique identifier for the resource'),
});