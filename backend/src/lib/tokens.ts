import crypto from "node:crypto";
import { Context } from 'hono';
import { deleteCookie, setCookie, setSignedCookie } from 'hono/cookie';
import { HTTPException } from 'hono/http-exception';
import { sign } from 'hono/jwt';
import { getEnv } from '../utils/env';

export async function generateTokenJWT(id: string, c: Context): Promise<string> {
  const { COOKIE_SECURE, SECRET_JWT, TOKEN_JWT_NAME } = getEnv();

  const payload = {
    userId: id,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, 
  };

  if (!SECRET_JWT) {
    throw new HTTPException(500, {
      message: 'JWT secret is not set.',
    });
  }

  const token = await sign(payload, SECRET_JWT);

  await setSignedCookie(c, TOKEN_JWT_NAME, token, SECRET_JWT, {
    httpOnly: true,
    //secure: process.env.NODE_ENV === 'production', // Mettre à true en production (nécessite HTTPS)
    secure: COOKIE_SECURE,
    sameSite: 'strict',
    expires: new Date(Date.now() + 60 * 60 * 24 * 30),
    path: '/',
  });

  return token ;
}

export async function generateTokenCSRF(c: Context): Promise<string> {
  const { COOKIE_SECURE, TOKEN_CSRF_NAME } = getEnv();
  const csrfToken = generateRandomString();

  const payload = {
    csrf_token: csrfToken,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
  };

  setCookie(c, TOKEN_CSRF_NAME, csrfToken, {
    httpOnly: true,
    //secure: process.env.NODE_ENV === 'production', // Mettre à true en production (nécessite HTTPS)
    secure: COOKIE_SECURE,
    sameSite: 'strict',
    expires: new Date(Date.now() + 60 * 60 * 24 * 30),
  });

  return  csrfToken;
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
  return crypto.randomBytes(128).toString("base64");
}

