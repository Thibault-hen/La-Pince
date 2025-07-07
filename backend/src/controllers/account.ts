import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { zValidator } from '@hono/zod-validator';
import argon2 from 'argon2';
import prisma from '../db/client';
import {
  response200,
  response204,
  response400,
  response401,
  response404,
  response409,
} from '../utils/openapi';
import {
  updateUserCurrencySchema,
  updateUserPasswordSchema,
  userSelectSchema,
} from '../validators/user';
import { updateUserSchema } from '../validators/user';
import z from 'zod';
import { describeRoute } from 'hono-openapi';
import {
  deleteUserCookie,
  generateTokenCSRF,
  generateTokenJWT,
} from '../lib/tokens';
import { updateJWTPayload } from '../middlewares/auth.middleware';

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
          password: true,
        },
      });

      const tokenCSRF = await generateTokenCSRF(c);

      return c.json({ user: user, token: tokenCSRF }, 200);
    },
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
            res: c.json({ message: 'Email already in use.' }, 409),
          });
        }
      }
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data,
      });

      await generateTokenJWT(updatedUser.id, updatedUser.alert, c);
      await updateJWTPayload(c);
      const { password: _, ...safeUser } = updatedUser;

      return c.json(safeUser, 200);
    },
  )
  .patch(
    '/reset-password',
    describeRoute({
      description: 'Update current user password',
      tags: ['account'],
      responses: {
        200: response200(updateUserPasswordSchema),
        400: response400(
          z.union([
            z.literal('Current and new password are required.'),
            z.literal('Current password is incorrect.'),
          ]),
        ),
        404: response404(z.literal('User not found.')),
      },
    }),
    zValidator('json', updateUserPasswordSchema),
    async (c) => {
      const userId = c.get('jwtPayload').userId;
      const data = c.req.valid('json');

      if (!data.currentPassword || !data.newPassword) {
        throw new HTTPException(400, {
          res: c.json(
            { message: 'Current and new password are required.' },
            400,
          ),
        });
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new HTTPException(404, {
          res: c.json({ message: 'User not found' }, 404),
        });
      }

      const isPasswordValid = await argon2.verify(
        user.password,
        data.currentPassword,
      );
      if (!isPasswordValid) {
        throw new HTTPException(400, {
          res: c.json({ message: 'Current password is incorrect' }, 400),
        });
      }

      const hashedNewPassword = await argon2.hash(data.newPassword);
      const updateData = {
        password: hashedNewPassword,
      };

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          password: hashedNewPassword,
        },
      });

      const { password: _, ...safeUser } = updatedUser;

      return c.json(safeUser, 200);
    },
  )
  .patch(
    '/currency',
    describeRoute({
      description: 'Update currency',
      tags: ['account'],
      responses: {
        200: response200(updateUserCurrencySchema),
        404: response404(z.literal('User not found.')),
      },
    }),
    zValidator('json', updateUserCurrencySchema),
    async (c) => {
      const userId = c.get('jwtPayload').userId;
      const data = c.req.valid('json');

      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new HTTPException(404, {
          res: c.json({ message: 'User not found.' }, 404),
        });
      }

      const updatedCurrency = await prisma.user.update({
        where: { id: userId },
        data,
      });

      const { password: _, ...safeUser } = updatedCurrency;

      return c.json(safeUser, 200);
    },
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
    },
  );

export default accountRouter;
