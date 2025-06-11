import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { verify } from 'hono/jwt';
import prisma from '../db/client';
import { getSignedCookie } from 'hono/cookie';
import { getEnv } from '../utils/env';
import { response200, response400, response500 } from '../utils/openapi';
import { userSelectSchema } from '../validators/user';
import { updateUserSchema } from '../validators/user';
import z from 'zod';
import { describeRoute } from 'hono-openapi';
import { authentify, isAuthenticated } from '../middlewares/auth.middleware';
import { deleteUserCookie } from '../lib/tokens';

const accountRouter = new Hono();

accountRouter
  .basePath('/account')
  .get(
    '/me',
    describeRoute({
      description: 'Get current user',
      tags: ['account'],
      responses: {
        200: response200(userSelectSchema),
        401: response400(z.literal('You are not logged in.')),
        500: response500(z.literal('Internal server error.')),
      },
    }),
    async (c) => {
      const payload = c.get('jwtPayload');
      const userId = payload.userId;

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
  .patch(
    '/',
    describeRoute({
      description: 'Update current user info',
      tags: ['account'],
      responses: {
        200: response200(userSelectSchema),
        400: response400(z.literal('Invalid request body.')),
        409: response400(z.literal('Email already in use.')),
        401: response400(z.literal('You are not logged in.')),
        500: response500(z.literal('Internal server error.')),
      },
    }),
    async (c) => {
      const payload = c.get('jwtPayload');
      const userId = payload.userId;

      const body = await c.req.json();
      const parseResult = updateUserSchema.safeParse(body);

      if (!parseResult.success) {
        throw new HTTPException(400, {
          message: 'Invalid request body.',
        });
      }

      const data = parseResult.data;

      if (data.email) {
        const existingUser = await prisma.user.findUnique({
          where: { email: data.email },
        });

        if (existingUser && existingUser.id !== userId) {
          throw new HTTPException(409, {
            message: 'Email already in use.',
          });
        }
      }

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data,
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

      return c.json(updatedUser, 200);
    }
  )
  .delete(
    '/',
    describeRoute({
      description: 'Delete current user account',
      tags: ['account'],
      responses: {
        200: response200(z.literal('Account deleted successfully.')),
        401: response400(z.literal('You are not logged in.')),
        500: response500(z.literal('Internal server error.')),
      },
    }),
    async (c) => {
      const payload = c.get('jwtPayload');
      const userId = payload.userId;

      console.log(`Deleting user with ID: ${userId}`);

      // await prisma.user.delete({
      //   where: { id: userId },
      // });

      // deleteUserCookie(c);

      return c.json('Account deleted successfully.', 200);
    }
  );

export default accountRouter;
