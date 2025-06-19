import { serve } from '@hono/node-server';
import { app, injectWebSocket } from './app';


injectWebSocket(
  serve({
    fetch: app.fetch,
    port: 3000,
    hostname: '0.0.0.0',
  })
)
