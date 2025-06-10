import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import router from './router';
import { openAPISpecs } from 'hono-openapi';
import { Scalar } from '@scalar/hono-api-reference';
import { csrf } from 'hono/csrf';
import { cors } from 'hono/cors';
import { getOrigins } from './utils/env';

const app = new Hono();

app.use(
  cors({
    origin(origin) {
      const allowedOrigins = getOrigins();

      console.log('CORS Origin:', allowedOrigins);

      const isAllowed = allowedOrigins.some((o) => o === origin || o === '*');

      if (isAllowed) {
        // If the origin is allowed, return it
        return origin;
      }
      // Otherwise, return an empty string to block the request
      return '';
    },
    credentials: true,
  }),
);

app.use(
  csrf({
    origin: (origin) => {
      const allowedOrigins = getOrigins();
      return allowedOrigins.some((o) => o === origin || o === '*');
    },
  }),
);

//proteger les routes en récupérant le token JWT. SI non connecté, renvoyer une erreur 401. SI connecté, vérifier le token JWT prolonger la durée de vie du token JWT



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

serve({
  fetch: app.fetch,
  port: 3000,
  hostname: '0.0.0.0',
});
