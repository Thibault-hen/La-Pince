import { getConnInfo } from '@hono/node-server/conninfo';
import { createNodeWebSocket } from '@hono/node-ws';
import { Scalar } from '@scalar/hono-api-reference';
import { type Context, Hono } from 'hono';
import { getSignedCookie } from 'hono/cookie';
import { cors } from 'hono/cors';
import { HTTPException } from 'hono/http-exception';
import { secureHeaders } from 'hono/secure-headers';
import { openAPISpecs } from 'hono-openapi';
import { ZodError } from 'zod';
import { authentify } from './middlewares/auth.middleware';
import router from './router';
import { getEnv } from './utils/env';
import { logger } from './utils/logger';
import { initRedis } from './utils/redis';
import { notifiableUsers } from './websockets/notifiableUsers';

const app = new Hono();
const { injectWebSocket, upgradeWebSocket } = createNodeWebSocket({ app });

const { FRONTEND_URL } = getEnv();

initRedis();

app.use('*', async (c: Context, next) => {
	c.set('log', logger);
	await next();
});

app.use(
	secureHeaders({
		strictTransportSecurity: `max-age=31536000; includeSubDomains`,
		referrerPolicy: 'strict-origin-when-cross-origin',
	}),
);

app.use(
	'*',
	cors({
		origin: FRONTEND_URL,
		allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
		credentials: true,
		maxAge: 86400,
	}),
);

app.onError(async (err, c: Context) => {
	if (err instanceof HTTPException) {
		return c.json({ message: err.message }, err.status);
	}

	if (err instanceof ZodError) {
		return c.json({ message: 'Validation Error', errors: err.errors }, 400);
	}

	const userId = c.get('jwtPayload')?.userId || 'anonymous';
	const ip = getConnInfo(c);
	const ipAddress = ip?.remote.address || 'unknown';
	const requestId = c.req.header('x-request-id') || 'no-request-id';
	const userAgent = c.req.header('user-agent') || 'unknown';

	c.get('log').error({
		error: err.message,
		stack: err.stack,
		method: c.req.method,
		url: c.req.url,
		userId,
		ip: ipAddress,
		requestId,
		userAgent,
	});

	return c.json({ message: 'Internal Server Error', error: err.message }, 500);
});

app.route('/', router);

app.get(
	'/openapi',
	openAPISpecs(app, {
		documentation: {
			info: {
				title: 'La Pince API',
				version: '1.0.0',
				description: '',
			},
			servers: [{ url: 'http://localhost:3000', description: 'Local Server' }],
		},
	}),
);

app.get(
	'/docs',
	Scalar({
		url: '/openapi',
		theme: 'deepSpace',
	}),
);

app.get(
	'/ws',
	upgradeWebSocket(async (c) => {
		const { SECRET_JWT } = getEnv();
		try {
			const token = await getSignedCookie(
				c,
				getEnv().SECRET_JWT,
				getEnv().TOKEN_JWT_NAME,
			);

			if (!token) {
				throw new HTTPException(401, {
					message: 'You are not logged in.',
				});
			}

			const payload = (await authentify(token, SECRET_JWT, c)) as {
				userId: string;
				exp: number;
			};

			return {
				onOpen: async (_, ws) => {
					if (notifiableUsers.has(payload.userId)) {
						notifiableUsers.get(payload.userId)?.add(ws);
					} else {
						notifiableUsers.set(payload.userId, new Set([ws]));
					}
				},
				onClose: async (_, ws) => {
					notifiableUsers.get(payload.userId)?.delete(ws);
				},
			};
		} catch (error) {
			console.error('WebSocket connection error:', error);
			return {
				onOpen: async () => {},
				onClose: async () => {},
			};
		}
	}),
);
export { app, injectWebSocket };
