import { Context } from "hono";
import { deleteCookie, setCookie, setSignedCookie } from "hono/cookie";
import { HTTPException } from "hono/http-exception";
import { sign } from "hono/jwt";
import { getEnv } from "../utils/env";

export async function generateToken (id: string, c: Context): Promise<string> {
  const { COOKIE_SECURE, SECRET_JWT } = getEnv();
  const payload = {
      sub: id,
      //exp: Math.floor(Date.now() / 1000) + 60 * 5,
    }

    if(!SECRET_JWT) {
      throw new HTTPException(500, {
        message: 'JWT secret is not set.',
      });
    }

  const token = await sign(payload, SECRET_JWT);

  await setSignedCookie(c, 'auth_token', token, SECRET_JWT, {
      httpOnly: true,
      //secure: process.env.NODE_ENV === 'production', // Mettre à true en production (nécessite HTTPS)
      secure: COOKIE_SECURE,
      sameSite: 'strict',
      maxAge: 60 * 60, 
      path: '/',
  });

  return token;
}

export function deleteUserCookie(c: Context, cookieName: string) {
  const { COOKIE_SECURE, DOMAIN_NAME } = getEnv();

  deleteCookie(c, cookieName, {
    path: '/',
    secure: COOKIE_SECURE,
    domain: DOMAIN_NAME,
  })
}