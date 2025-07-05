import crypto from 'node:crypto';
import { Context } from 'hono';
import { deleteCookie, setCookie, setSignedCookie } from 'hono/cookie';
import { HTTPException } from 'hono/http-exception';
import { sign } from 'hono/jwt';
import { getEnv } from '../utils/env';

export async function generateTokenJWT(
  id: string,
  c: Context,
): Promise<string> {
  const { SECRET_JWT, TOKEN_JWT_NAME, NODE_ENV } = getEnv();

  // 7 days expiration for JWT
  const AUTH_EXPIRATION_DAYS = 7;
  const AUTH_EXPIRATION_SECONDS = 60 * 60 * 24 * AUTH_EXPIRATION_DAYS;
  const AUTH_EXPIRATION_MS = AUTH_EXPIRATION_SECONDS * 1000;
  const isProduction = NODE_ENV === 'production';

  const payload = {
    userId: id,
    exp: Math.floor(Date.now() / 1000) + AUTH_EXPIRATION_SECONDS,
  };

  if (!SECRET_JWT) {
    throw new HTTPException(500, {
      message: 'JWT secret is not set.',
    });
  }

  const token = await sign(payload, SECRET_JWT);

  await setSignedCookie(c, TOKEN_JWT_NAME, token, SECRET_JWT, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    expires: new Date(Date.now() + AUTH_EXPIRATION_MS),
    path: '/',
  });

  return token;
}

export async function generateTokenCSRF(c: Context): Promise<string> {
  const { TOKEN_CSRF_NAME, NODE_ENV } = getEnv();
  const csrfToken = generateRandomString();

  //1 hour expiration for CSRF token
  const AUTH_EXPIRATION_MINUTES = 60;
  const AUTH_EXPIRATION_SECONDS = 60 * AUTH_EXPIRATION_MINUTES;
  const AUTH_EXPIRATION_MS = AUTH_EXPIRATION_SECONDS * 1000;
  const isProduction = NODE_ENV === 'production';

  setCookie(c, TOKEN_CSRF_NAME, csrfToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    expires: new Date(Date.now() + AUTH_EXPIRATION_MS),
    path: '/',
  });

  return csrfToken;
}

export function deleteUserCookie(c: Context) {
  const { COOKIE_SECURE, DOMAIN_NAME } = getEnv();

  deleteCookie(c, getEnv().TOKEN_JWT_NAME, {
    path: '/',
    secure: COOKIE_SECURE,
    domain: DOMAIN_NAME,
  });

  deleteCookie(c, getEnv().TOKEN_CSRF_NAME, {
    path: '/',
    secure: COOKIE_SECURE,
    domain: DOMAIN_NAME,
  });
}

export function generateRandomString() {
  return crypto.randomBytes(128).toString('base64');
}
