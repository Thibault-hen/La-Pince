import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { describeRoute } from 'hono-openapi';
import { response200, response201, response400, response404 } from '../utils/openapi';
import { categoryCreateOrUpdateSchema, categorySelectSchema } from '../validators/category';
import prisma from '../db/client';
import { HTTPException } from 'hono/http-exception';
import z from 'zod';
import { paramsWithId } from '../validators/utils';

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
  zValidator('json', categoryCreateOrUpdateSchema),
  async(c) => {
    const payload = c.get('jwtPayload');
    const userId = payload.userId;
    const { title, colorId } = c.req.valid('json');
    if (!userId) {
      throw new HTTPException(404, {
        message: 'UserId introuvable.',
      });
    }
    
    const category = await prisma.category.create({
      data: {
        title,
        colorId,
        userId : userId,
      },
    })
        
    return c.json(category, 200);
})
.put('/:id', 
  describeRoute({
    description: 'Update a category',
    tags: ['category'],
    responses:{
      200: response200(categorySelectSchema),
      404: response404()
    }
  }),
  zValidator('param', paramsWithId),
  zValidator('json', categoryCreateOrUpdateSchema),
  async (c) => {
    const payload = c.get('jwtPayload');
    const userId = payload.userId;
    const categoryId = c.req.param('id');
    const data = c.req.valid('json');
    const findCategory = await prisma.category.findUnique({
      where: {
        id: categoryId,
        userId:userId 
      },
    });

    if (!findCategory) {
      throw new HTTPException(404, {
        message: 'Category not found',
      });
    }

    const updateCategory = await prisma.category.update({
      data: data,
      where: {
        id: categoryId,
        userId: userId,
      },
    });

    return c.json(updateCategory, 201);
  }
)

export default categoryRouter;