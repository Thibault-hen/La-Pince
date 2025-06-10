import { Hono } from 'hono';

const notificationRouter = new Hono();

notificationRouter.basePath('/notification').get('/', (c) => {
  return c.json({ message: 'Welcome to the notification endpoint!' });
});

export default notificationRouter;