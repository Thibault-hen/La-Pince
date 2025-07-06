import { z } from 'zod';

export const exchangeRateSelectSchema = z.object({
  result: z.literal('success'),
  provider: z.string().url(),
  documentation: z.string().url(),
  terms_of_use: z.string().url(),
  time_last_update_unix: z.number(),
  time_last_update_utc: z.string(),
  time_next_update_unix: z.number(),
  time_next_update_utc: z.string(),
  time_eol_unix: z.number(),
  base_code: z.string(),
  rates: z.record(z.string(), z.number()),
});
