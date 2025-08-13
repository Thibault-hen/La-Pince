import type { Context } from 'hono';
import { getCookie, getSignedCookie } from 'hono/cookie';
import { createMiddleware } from 'hono/factory';
import { HTTPException } from 'hono/http-exception';
import { verify } from 'hono/jwt';
import { getEnv } from '../utils/env';

const { SECRET_JWT, TOKEN_CSRF_NAME, TOKEN_JWT_NAME } = getEnv();

export const updateJWTPayload = async (c: Context) => {
	const token = await getSignedCookie(c, SECRET_JWT, TOKEN_JWT_NAME);

	if (!token) {
		throw new HTTPException(401, {
			message: 'You are not logged in.',
		});
	}
	const payload = await authentify(token, SECRET_JWT, c);
	c.set('jwtPayload', payload);
};

export const isAuthenticated = createMiddleware(async (c, next) => {
	const token = await getSignedCookie(c, SECRET_JWT, TOKEN_JWT_NAME);

	if (!token) {
		throw new HTTPException(401, {
			message: 'You are not logged in.',
		});
	}
	const payload = await authentify(token, SECRET_JWT, c);

	c.set('jwtPayload', payload);

	await next();
});

export async function authentify(
	token: string,
	SECRET_JWT: string,
	c: Context,
) {
	const decodedJWT = await verify(token, SECRET_JWT);
	if (!decodedJWT) {
		throw new HTTPException(401, {
			message: 'Invalid JWT token.',
		});
	}

	if (['POST', 'DELETE', 'PATCH', 'PUT'].includes(c.req.method)) {
		const csrfTokenFromHeader = c.req.header('csrf_token');

		const csrfTokenFromCookie = getCookie(c, TOKEN_CSRF_NAME);

		if (!csrfTokenFromHeader) {
			throw new HTTPException(401, {
				message: 'Missing CSRF token.',
			});
		}

		if (csrfTokenFromHeader !== csrfTokenFromCookie) {
			// If the CSRF token is not present or does not match, throw an error
			throw new HTTPException(401, {
				message: 'Invalid CSRF token.',
			});
		}
	}

	return decodedJWT;
}
