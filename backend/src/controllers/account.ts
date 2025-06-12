import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { zValidator } from '@hono/zod-validator';
import argon2 from 'argon2';
import prisma from '../db/client';
import {
  response200,
  response204,
  response401,
  response409,
} from '../utils/openapi';
import { userSelectSchema } from '../validators/user';
import { updateUserSchema } from '../validators/user';
import z from 'zod';
import { describeRoute } from 'hono-openapi';
import { deleteUserCookie, generateTokenCSRF } from '../lib/tokens';

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
      },
    }),
    async (c) => {
      const userId = c.get('jwtPayload').userId;

      const user = await prisma.user.findUnique({
        where: { id: userId },
        omit: {
          password: true
        }
      });

      const tokenCSRF = await generateTokenCSRF(c);

      return c.json({user: user, token: tokenCSRF}, 200);
    }
  )
  .patch(
    '/',
    describeRoute({
      description: 'Update current user info',
      tags: ['account'],
      responses: {
        200: response200(userSelectSchema),
        409: response409(z.literal('Email already in use.')),
      },
    }),
    zValidator('json', updateUserSchema),
    async (c) => {
      const userId = c.get('jwtPayload').userId;
      const data = c.req.valid('json');

      if (data.email) {
        const emailExist = await prisma.user.findUnique({
          where: { email: data.email },
        });

        if (emailExist && emailExist.id !== userId) {
          throw new HTTPException(409, {
            message: 'Email already in use.',
          });
        }
      }

      if (data.password) {
        data.password = await argon2.hash(data.password);
      }

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data,
      });

      const { password: _, ...safeUser } = updatedUser;

      return c.json(safeUser, 200);
    }
  )
  .delete(
    '/',
    describeRoute({
      description: 'Delete current user account',
      tags: ['account'],
      responses: {
        204: response204(),
      },
    }),
    async (c) => {
      const userId = c.get('jwtPayload').userId;

      await prisma.user.delete({
        where: { id: userId },
      });

      deleteUserCookie(c);

      return c.body(null, 204);
    }
  );

export default accountRouter;
