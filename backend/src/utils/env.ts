import { z } from 'zod';

const envSchema = z.object({
	NODE_ENV: z
		.union([z.literal('development'), z.literal('production')])
		.default('development'),
	SECRET_JWT: z.string().min(32),
	PORT: z.coerce.number().positive().int().default(3000),
	COOKIE_SECURE: z
		.union([z.literal('true'), z.literal('false')])
		.default('true')
		.transform((val) => val === 'true'),
	DOMAIN_NAME: z.string().default('localhost'),
	TOKEN_JWT_NAME: z.string().default('auth_token'),
	TOKEN_CSRF_NAME: z.string().default('auth_token'),
	REDIS_URL: z.string().default('redis://redis:6379'),
	FRONTEND_URL: z.string().default('http://localhost:5173'),
	MAIL_PROVIDER: z.string().default('gmail'),
	GMAIL_USER: z.string().optional(),
	GMAIL_PASS: z.string().optional(),
	GMAIL_FROM: z.string().optional(),
});

export function getEnv() {
	return envSchema.parse(process.env);
}
