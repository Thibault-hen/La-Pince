import { Hono } from 'hono';
import router from './router';
import { openAPISpecs } from 'hono-openapi';
import { Scalar } from '@scalar/hono-api-reference';
import { cors } from 'hono/cors';
import { getEnv } from './utils/env';
import { HTTPException } from 'hono/http-exception';
import { ZodError } from 'zod';
import { createNodeWebSocket } from '@hono/node-ws';
import { getSignedCookie } from 'hono/cookie';
import { authentify } from './middlewares/auth.middleware';
import { notifiableUsers } from './websockets/notifiableUsers';
import { initRedis } from './utils/redis';
import { secureHeaders } from 'hono/secure-headers';

const app = new Hono();
const { injectWebSocket, upgradeWebSocket } = createNodeWebSocket({ app });

const { FRONTEND_URL } = getEnv();

initRedis();

app.use(
  secureHeaders({
    strictTransportSecurity: `max-age=31536000; includeSubDomains`,
    referrerPolicy: 'strict-origin-when-cross-origin',
  }),
);

app.use(
  '*',
  cors({
    origin: FRONTEND_URL,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
    maxAge: 86400,
  }),
);

app.onError((err, c) => {
  if (err instanceof HTTPException) return err.getResponse();
  if (err instanceof ZodError) {
    return c.json({ message: 'Validation Error', errors: err.errors }, 400);
  }
  return c.json({ message: 'Internal Server Error', error: err.message }, 500);
});

app.route('/', router);

app.get(
  '/openapi',
  openAPISpecs(app, {
    documentation: {
      info: {
        title: 'App Atelier API',
        version: '1.0.0',
        description: 'Greeting API',
      },
      servers: [{ url: 'http://localhost:3000', description: 'Local Server' }],
    },
  }),
);

app.get(
  '/docs',
  Scalar({
    url: '/openapi',
    theme: 'saturn',
  }),
);

app.get(
  '/ws',
  upgradeWebSocket(async (c) => {
    const { SECRET_JWT } = getEnv();
    try {
      const token = await getSignedCookie(
        c,
        getEnv().SECRET_JWT,
        getEnv().TOKEN_JWT_NAME,
      );

      if (!token) {
        throw new HTTPException(401, {
          message: 'You are not logged in.',
        });
      }

      const payload = (await authentify(token, SECRET_JWT, c)) as {
        userId: string;
        exp: number;
      };

      return {
        onOpen: async (_, ws) => {
          if (notifiableUsers.has(payload.userId)) {
            notifiableUsers.get(payload.userId)?.add(ws);
          } else {
            notifiableUsers.set(payload.userId, new Set([ws]));
          }
        },
        onClose: async (_, ws) => {
          notifiableUsers.get(payload.userId)?.delete(ws);
        },
      };
    } catch (error) {
      console.error('WebSocket connection error:', error);
      return {
        onOpen: async () => {},
        onClose: async () => {},
      };
    }
  }),
);
export { app, injectWebSocket };
