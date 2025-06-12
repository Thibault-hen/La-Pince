import { Hono } from 'hono';
import { describeRoute } from 'hono-openapi';
import { response201, response401 } from '../utils/openapi';
import { colorSelectSchema } from '../validators/color';
import prisma from '../db/client';

const colorRouter = new Hono();

colorRouter.basePath('/color')
.get(
  '/',
  describeRoute({
    description: 'Get list color',
    tags: ['color'],
    responses: {
      200: response201(colorSelectSchema),
    }
  }),
  async(c) => {
    const color = await prisma.color.findMany();
  
    return c.json(color, 200);
});

export default colorRouter;