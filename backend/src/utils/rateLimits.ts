import { getConnInfo } from '@hono/node-server/conninfo';
import { rateLimiter } from 'hono-rate-limiter';

export const RATE_LIMITS = {
	// Auth limits
	LOGIN: { requests: 5, window: 15 * 60 * 1000 }, // 5/15min
	REGISTER: { requests: 5, window: 30 * 60 * 1000 }, // 3/30min
	RESET_PASSWORD: { requests: 3, window: 60 * 60 * 1000 }, // 3/1h
	DELETE_ACCOUNT: { requests: 5, window: 24 * 60 * 60 * 1000 }, // 1/24h

	// API genral
	API_GENERAL: { requests: 100, window: 60 * 1000 }, // 100/min
} as const;

const createRateLimit = (max: number, windowMs: number) => {
	return rateLimiter({
		windowMs,
		limit: max,
		keyGenerator: (c) => {
			const userId = c.get('jwtPayload')?.userId;
			if (userId) return `user:${userId}`;

			const ip = getConnInfo(c);
			return (
				c.req.header('x-forwarded-for') ||
				c.req.header('x-real-ip') ||
				ip.remote.address ||
				'anonymous'
			);
		},
	});
};

export const apiRateLimit = createRateLimit(
	RATE_LIMITS.API_GENERAL.requests,
	RATE_LIMITS.API_GENERAL.window,
);

export const loginRateLimit = createRateLimit(
	RATE_LIMITS.LOGIN.requests,
	RATE_LIMITS.LOGIN.window,
);

export const registerRateLimit = createRateLimit(
	RATE_LIMITS.REGISTER.requests,
	RATE_LIMITS.REGISTER.window,
);

export const resetPasswordRateLimit = createRateLimit(
	RATE_LIMITS.RESET_PASSWORD.requests,
	RATE_LIMITS.RESET_PASSWORD.window,
);

export const deleteAccountRateLimit = createRateLimit(
	RATE_LIMITS.DELETE_ACCOUNT.requests,
	RATE_LIMITS.DELETE_ACCOUNT.window,
);
