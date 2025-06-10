import { Hono } from 'hono';

const incomeRouter = new Hono();

incomeRouter.basePath('/income').get('/', (c) => {
  return c.json({ message: 'Welcome to the income endpoint!' });
});

export default incomeRouter;