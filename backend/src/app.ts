import { Hono } from 'hono';
import router from './router';
import { openAPISpecs } from 'hono-openapi';
import { Scalar } from '@scalar/hono-api-reference';
import { cors } from 'hono/cors';
import { getOrigins } from './utils/env';
import { HTTPException } from 'hono/http-exception';
import { ZodError } from 'zod';

const app = new Hono();

app.use(
  cors({
    origin(origin) {
      const allowedOrigins = getOrigins();
      const isAllowed = allowedOrigins.some((o) => o === origin || o === '*');
      return isAllowed ? origin : '';
    },
    credentials: true,
  })
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
  })
);

app.get(
  '/docs',
  Scalar({
    url: '/openapi',
    theme: 'saturn',
  })
);

export { app };
