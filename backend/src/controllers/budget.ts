import { Hono } from 'hono';

const budgetRouter = new Hono();

budgetRouter.basePath('/budget').get('/', (c) => {
  return c.json({ message: 'Welcome to the budget endpoint!' });
});

export default budgetRouter;