import { createMiddleware } from 'hono/factory';
import { verify } from 'hono/jwt';
import { getEnv } from '../utils/env';
import { HTTPException } from 'hono/http-exception';
import { getCookie, getSignedCookie } from 'hono/cookie';
import { Context } from 'hono';

export const isAuthenticated = createMiddleware(async (c, next) => {
  const { SECRET_JWT } = getEnv();
  const token = await getSignedCookie(c, getEnv().SECRET_JWT, getEnv().TOKEN_JWT_NAME);
  console.log({c, s:getEnv().SECRET_JWT, token: getEnv().TOKEN_JWT_NAME});
  console.log({token})

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
  const decodedJWT = await verify(token, SECRET_JWT);
  if (!decodedJWT) {
    throw new HTTPException(401, {
      message: 'Invalid JWT token.',
    });
  }
  
  if (['POST', 'DELETE', 'PATCH', 'PUT'].includes(c.req.method)){
    const csrfTokeFromHeader = c.req.header('csrf_token');

    const csrfTokenFromCookie = getCookie(c, getEnv().TOKEN_CSRF_NAME);
    
    if (!csrfTokeFromHeader) {
      throw new HTTPException(401, {
        message: 'Missing CSRF token.',
      });
    }
    
    if (csrfTokeFromHeader !== csrfTokenFromCookie) {
      // If the CSRF token is not present or does not match, throw an error
      throw new HTTPException(401, {
        message: 'Invalid CSRF token.',
      });
    }
  }

  return decodedJWT;
}