import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";
import { getEnv } from "../utils/env";
import { HTTPException } from "hono/http-exception";
import { getSignedCookie, setSignedCookie } from "hono/cookie";

export const isAuthenticated = createMiddleware( async(c, next) => {
  const { SECRET_JWT } = getEnv();
  const token = await getSignedCookie(c, getEnv().SECRET_JWT, 'auth_token');
  
  if (!token) {
    throw new HTTPException(401, {
      message: 'You are not logged in.',
    });
  }

  const payload = await authentify(token, SECRET_JWT)

  c.set('userId', payload.userId);

  await next();
})

export async function authentify (token: string, SECRET_JWT: string) {
  const decodedPayload = await verify(token, SECRET_JWT);
  if (!decodedPayload) {
    throw new HTTPException(401, {
      message: 'Invalid token.',
    });
  }

  return decodedPayload
}
