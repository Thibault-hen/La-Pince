import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { describeRoute } from 'hono-openapi';
import { response201, response400, response404 } from '../utils/openapi';
import { categoryCreateSchema, categorySelectSchema } from '../validators/category';
import prisma from '../db/client';
import { HTTPException } from 'hono/http-exception';
import z from 'zod';

const categoryRouter = new Hono();

categoryRouter.basePath('/category')
.get(
  '/',
  describeRoute({
    description: 'Get all categories of a user',
    tags: ['category'],
    responses: {
      201: response201(categorySelectSchema),
      404: response404(z.literal('UserId not found')),
    }
  }),
  async(c) => {
    const payload = c.get('jwtPayload');
    const userId = payload.userId;
    
    if (!userId) {
      throw new HTTPException(404, {
        message: 'UserId introuvable.',
      });
    }
    
    const categories = await prisma.category.findMany({
      where: { userId: userId},
    });
    
    return c.json(categories, 200);
})
.post(
  '/',
  describeRoute({
    description: 'Create a category for a user',
    tags: ['category'],
    responses: {
      201: response201(categorySelectSchema),
      404: response404(z.literal('UserId not found')),
    }
  }),
  zValidator('json', categoryCreateSchema),
  async(c) => {
    const payload = c.get('jwtPayload');
    const userId = payload.userId;
    const { title } = c.req.valid('json');
    if (!userId) {
      throw new HTTPException(404, {
        message: 'UserId introuvable.',
      });
    }
    
    //ColorID change en fonction de la bdd
    const category = await prisma.category.create({
      data: {
        title,
        userId : userId,
        colorId : 92
      },
    })
        
    return c.json(category, 200);
})


export default categoryRouter;