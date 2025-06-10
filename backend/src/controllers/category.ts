import { Hono } from 'hono';

const categoryRouter = new Hono();

categoryRouter.basePath('/category').get('/', (c) => {
  return c.json({ message: 'Welcome to the category endpoint!' });
});

export default categoryRouter;