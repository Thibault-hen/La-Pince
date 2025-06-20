import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import {
  resetUserPasswordSchema,
  userLoginSchema,
  userRegisterSchema,
  userSelectSchema,
} from '../validators/user';
import prisma from '../db/client';
import argon2 from 'argon2';
import { describeRoute } from 'hono-openapi';
import {
  response200,
  response201,
  response400,
  response401,
  response409,
  response500,
} from '../utils/openapi';
import { HTTPException } from 'hono/http-exception';
import { z } from 'zod';
import 'dotenv/config';
import { getSignedCookie } from 'hono/cookie';
import {
  deleteUserCookie,
  generateRandomString,
  generateTokenCSRF,
  generateTokenJWT,
} from '../lib/tokens';
import { getEnv } from '../utils/env';
import { Resend } from 'resend';

const authRouter = new Hono();

authRouter
  .basePath('/auth')
  .post(
    '/register',
    describeRoute({
      description: 'Register a new user',
      tags: ['auth'],
      responses: {
        201: response201(userSelectSchema),
        400: response400(z.literal('User already exists.')),
        409: response409(z.literal('User already exists.')),
      },
    }),
    zValidator('json', userRegisterSchema),
    async (c) => {
      const { email, password, name } = c.req.valid('json');

      const userExists = await prisma.user.findUnique({
        where: { email },
      });

      if (userExists) {
        throw new HTTPException(409, {
          res: c.json({ message: 'User already exists.' }, 409),
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
      await createListCategories(safeUser.id, c);

      return c.json(
        { message: 'User registered successfully', user: safeUser },
        201
      );
    }
  )
  .post(
    '/login',
    describeRoute({
      description: 'Login',
      tags: ['auth'],
      responses: {
        200: response200(userSelectSchema),
        401: response400(z.literal('Invalid email or password.')),
        500: response500(z.literal('JWT secret is not set.')),
      },
    }),
    zValidator('json', userLoginSchema),
    async (c) => {
      const { email, password } = c.req.valid('json');

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user || !(await argon2.verify(user.password, password))) {
        throw new HTTPException(401, {
          res: c.json({ message: 'Invalid email or password' }, 401),
        });
      }

      const { password: _, ...safeUser } = user;

      //JWT
      await generateTokenJWT(user.id, c);
      const tokenCSRF = await generateTokenCSRF(c);

      return c.json(
        { message: 'success', user: safeUser, token: tokenCSRF },
        200
      );
    }
  )
  .post(
    '/request-reset',
    describeRoute({
      description: 'Request a reset password',
      tags: ['auth'],
      responses: {
        200: response200(userSelectSchema),
        401: response400(z.literal('Invalid email or password.')),
      },
    }),
    zValidator('json', userLoginSchema.pick({ email: true })),
    async (c) => {
      const { email } = c.req.valid('json');
      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (!user) {
        return c.status(200);
      }

      const token = generateRandomString();
      //verif resetPassword du user exist ? suppression + creation : creation
      const userToken = await prisma.resetPassword.findUnique({
        where: {
          userId: user.id,
        },
      });

      if (userToken) {
        await prisma.resetPassword.delete({
          where: {
            id: userToken.id,
          },
        });
      }

      await prisma.resetPassword.create({
        data: {
          userId: user.id,
          token: await argon2.hash(token),
          expiredAt: new Date(Date.now() + 1000 * 60 * 15),
        },
      });
      const resetLink = `http://localhost:5173/reset-password?token=${token}`;
      const resend = new Resend(getEnv().RESEND_API_KEY);
      const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
        <h2>Réinitialisation de votre mot de passe</h2>
        <p>Bonjour,</p>
        <p>Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le bouton ci-dessous pour continuer :</p>
        <a href="${resetLink}" style="display: inline-block; padding: 12px 20px; background-color: #615FFF; color: #fff; text-decoration: none; border-radius: 4px;">Réinitialiser mon mot de passe</a>
        <p style="margin-top: 20px;">Si vous n'avez pas demandé cette réinitialisation, ignorez simplement ce message.</p>
        <p>Merci,<br />L’équipe La pince - O'clock</p>
      </div>
      `;

      await resend.emails.send({
        from: 'La pince - Oclock <onboarding@resend.dev>',
        to: ['giselle.magalong@gmail.com'],
        subject: 'Reinitialisation de votre mot de passe',
        html: htmlContent,
      });

      return c.json({ message: 'Send reset password link successfuly' }, 200);
    }
  )
  .post(
    '/reset-password',
    describeRoute({
      description: 'Reset password',
      tags: ['auth'],
      responses: {
        200: response200(userSelectSchema),
        401: response401(z.literal('Token invalid.')),
      },
    }),
    zValidator('json', resetUserPasswordSchema),
    async (c) => {
      const data = c.req.valid('json');
      const tokenExist = await prisma.resetPassword.findFirst({
        where: {
          token: data.token,
        },
      });

      if (!tokenExist || tokenExist.expiredAt < new Date()) {
        throw new HTTPException(401, {
          res: c.json({ message: 'Token invalid' }, 401),
        });
      }

      const hashedNewPassword = await argon2.hash(data.newPassword);
      const updatedUser = await prisma.user.update({
        where: { id: tokenExist.userId },
        data: {
          password: hashedNewPassword,
        },
      });

      const { password: _, ...safeUser } = updatedUser;

      await prisma.resetPassword.delete({
        where: {
          id: tokenExist.id,
        },
      });

      return c.json(safeUser, 200);
    }
  )
  .get('/logout', async (c) => {
    const { TOKEN_JWT_NAME, SECRET_JWT } = getEnv();
    const token = await getSignedCookie(c, SECRET_JWT, TOKEN_JWT_NAME);
    if (!token) {
      throw new HTTPException(401, {
        res: c.json({ message: 'You are not logged in' }, 401),
      });
    }

    deleteUserCookie(c);

    return c.json({ message: 'Logged out' }, 200);
  });

async function createListCategories(userId: string, c?: any) {
  const categories = [
    { name: 'category.food', color: 'color.yellow' },
    { name: 'category.houseRent', color: 'color.red' },
    { name: 'category.transport', color: 'color.orange' },
    { name: 'category.health', color: 'color.green' },
    { name: 'category.shopping', color: 'color.pink' },
    { name: 'category.entertainment', color: 'color.blue' },
    { name: 'category.subscriptions', color: 'color.violet' },
    { name: 'category.other', color: 'color.gray' },
    { name: 'category.pet', color: 'color.green' },
    { name: 'category.sport', color: 'color.blue' },
    { name: 'category.education', color: 'color.blue' },
    { name: 'category.bills', color: 'color.blue' },
  ];

  categories.map(async (category) => {
    const findColor = await prisma.color.findFirst({
      where: {
        name: category.color,
      },
    });

    if (!findColor) {
      throw new HTTPException(404, {
        res: c.json({ message: 'Color not found' }, 404),
      });
    }
    const colorId = findColor.id;

    await prisma.category.create({
      data: {
        title: category.name,
        userId,
        colorId: colorId,
      },
    });
  });
}

export { createListCategories };

export default authRouter;
