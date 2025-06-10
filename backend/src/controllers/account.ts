import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { verify } from 'hono/jwt';
import prisma from '../db/client';
import { getSignedCookie } from 'hono/cookie';
import { getEnv } from '../utils/env';
import { response200, response400, response500 } from '../utils/openapi';
import { userSelectSchema } from '../validators/user';
import z from 'zod';
import { describeRoute } from 'hono-openapi';
import { authentify, isAuthenticated } from '../middlewares/auth.middleware';

const accountRouter = new Hono();

accountRouter.basePath('/account').get('/me',
  describeRoute({
    description: 'Get current user',
    tags: ['auth'],
    responses: {
      200: response200(userSelectSchema),
      401: response400(z.literal('You are not logged in.')),
      500: response500(z.literal('JWT secret is not set.')),
    }
  }),
  async (c) => {   
    const userId = c.get('jwtPayload').userId as string;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        currency: true,
        alert: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new HTTPException(401, {
        message: 'You are not logged in.',
      });
    }

    return c.json(user, 200);
  }
)

export default accountRouter;