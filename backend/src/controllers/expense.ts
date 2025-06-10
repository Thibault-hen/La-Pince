import { Hono } from 'hono';

const expenseRouter = new Hono();

expenseRouter.basePath('/expense').get('/', (c) => {
  return c.json({ message: 'Welcome to the expense endpoint!' });
});

export default expenseRouter;