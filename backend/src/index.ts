import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import router from './router';

const app = new Hono();

app.route('/', router)

serve({
  fetch: app.fetch,
  port: 3000,
  hostname: '0.0.0.0',
});
