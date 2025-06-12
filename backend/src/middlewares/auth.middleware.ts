import { createMiddleware } from 'hono/factory';
import { verify } from 'hono/jwt';
import { getEnv } from '../utils/env';
import { HTTPException } from 'hono/http-exception';
import { getSignedCookie, setSignedCookie } from 'hono/cookie';
import { Context } from 'hono';

export const isAuthenticated = createMiddleware(async (c, next) => {
  const { SECRET_JWT } = getEnv();
  const token = await getSignedCookie(c, getEnv().SECRET_JWT, 'auth_token');

  if (!token) {
    throw new HTTPException(401, {
      message: 'You are not logged in.',
    });
  }

  const payload = await authentify(token, SECRET_JWT, c);

  c.set('jwtPayload', payload);

  await next();
});

export async function authentify(token: string, SECRET_JWT: string, c: Context) {
  const decodedPayload = await verify(token, SECRET_JWT);
  if (!decodedPayload) {
    throw new HTTPException(401, {
      message: 'Invalid JWT token.',
    });
  }

  const csrfToken = c.req.header('csrf_token');

  if (!csrfToken) {
    throw new HTTPException(401, {
      message: 'Missing CSRF token.',
    });
  }

  if (csrfToken !== decodedPayload.csrf_token) {
    // If the CSRF token is not present or does not match, throw an error
    throw new HTTPException(401, {
      message: 'Invalid CSRF token.',
    });
  }

  return decodedPayload;
}