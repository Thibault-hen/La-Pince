import { Hono } from 'hono';

const authRouter = new Hono();

authRouter.basePath('/auth').get('/', (c) => {
  return c.json({ message: 'Welcome to the authentication endpoint!' });
});

export default authRouter;