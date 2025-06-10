import { Hono } from 'hono';

const accountRouter = new Hono();

accountRouter.basePath('/account').get('/', (c) => {
  return c.json({ message: 'Welcome to the account endpoint!' });
});

export default accountRouter;