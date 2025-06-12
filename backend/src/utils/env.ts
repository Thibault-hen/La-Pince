import { z } from 'zod';

const envSchema = z.object({
  ENV: z.union([z.literal('dev'), z.literal('prod')]).default('dev'),
  SECRET_JWT: z.string().min(32),
  PORT: z.coerce.number().positive().int().default(3000),
  CORS_ORIGIN: z.string(),
  COOKIE_SECURE: z
    .union([z.literal('true'), z.literal('false')])
    .default('true')
    .transform((val) => val === 'true'),
  DOMAIN_NAME: z.string().default('localhost'),
  TOKEN_JWT_NAME: z.string().default('auth_token'),
  TOKEN_CSRF_NAME: z.string().default('auth_token'),
});

export function getEnv() {
  return envSchema.parse(process.env);
}

export function getOrigins() {
  return getEnv().CORS_ORIGIN.split(',');
}