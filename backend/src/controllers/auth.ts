import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { userLoginSchema, userRegisterSchema, userSelectSchema } from '../validators/user';
import prisma from '../db/client';
import argon2 from 'argon2';
import { describeRoute } from 'hono-openapi';
import { response200, response201, response400, response500 } from '../utils/openapi';
import { HTTPException } from 'hono/http-exception';
import { z } from 'zod';
import 'dotenv/config'
import { deleteCookie, getSignedCookie, setCookie } from 'hono/cookie';
import { deleteUserCookie, generateToken } from '../lib/tokens';
import { getEnv } from '../utils/env';
import { verify } from 'hono/jwt';

const authRouter = new Hono();

authRouter.basePath('/auth')
.post(
  '/register',
  describeRoute({
    description: 'Register a new user',
    tags: ['auth'],
    responses: {
      201: response201(userSelectSchema),
      400: response400(z.literal('User already exists.')),
    }
  }),
  zValidator('json', userRegisterSchema),
  async (c) => {
    const { email, password, name } = c.req.valid('json');

    const userExists = await prisma.user.findUnique({
      where: { email },
    });
    
    if (userExists) {
      throw new HTTPException(400, {
          message: 'User already exists.',
        });
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        alert: true, 
        currency: 'EUR', 
        name,
        password: await argon2.hash(password),
      },
    });

    const { password: _, ...safeUser } = newUser;
    
    return c.json({ message: 'User registered successfully', user: safeUser }, 201);
})
.post('/login',
  describeRoute({
    description: 'Login',
    tags: ['auth'],
    responses: {
      200: response200(userSelectSchema),
      401: response400(z.literal('Invalid email or password.')),
      500: response500(z.literal('JWT secret is not set.')),
    }
  }),
  zValidator('json', userLoginSchema),
  async (c) => {
    const { email, password } = c.req.valid('json');

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await argon2.verify(user.password, password))) {
      throw new HTTPException(401, {
        message: 'Invalid email or password.',
      });
    }

    const { password: _, ...safeUser } = user;

    //JWT 
    await generateToken(user.id, c);

    return c.json({ message: 'Login successful', user: safeUser });
  }
)
.get('/logout', async (c) => {
  const { TOKEN_NAME, SECRET_JWT } = getEnv();
  const token = await getSignedCookie(c, SECRET_JWT, TOKEN_NAME);
  if (!token) {
    throw new HTTPException(401, {
      message: 'You are not logged in.',
    });
  }

  deleteUserCookie(c);

  return c.json({ message: 'Logged out' }, 200);
})


export default authRouter;