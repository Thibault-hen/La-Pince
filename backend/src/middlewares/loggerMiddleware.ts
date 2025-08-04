import { getConnInfo } from '@hono/node-server/conninfo';
import { createMiddleware } from 'hono/factory';

export const loggerMiddleware = createMiddleware(async (c, next) => {
	const start = Date.now();
	const userId = c.get('jwtPayload')?.userId || 'anonymous';
	const ip = getConnInfo(c);
	const ipAddress = ip?.remote.address || 'unknown';
	const requestId = c.req.header('x-request-id') || 'no-request-id';
	const userAgent = c.req.header('user-agent') || 'unknown';

	// log the incoming request
	c.get('log').info({
		method: c.req.method,
		url: c.req.url,
		userId,
		ip: ipAddress,
		requestId,
		userAgent,
	});

	await next();

	const duration = Date.now() - start;
	// log the response after processing
	c.get('log').info({
		status: c.res.status,
		userId,
		ip: ipAddress,
		requestId,
		duration: `${duration}ms`,
	});
});
