import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { describeRoute } from 'hono-openapi';
import { response200, response201, response204, response400, response404 } from '../utils/openapi';
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
    description: 'Get all categories of a user with the ongoing budget',
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

    const now = new Date()
    const currentMonth = now.getMonth() + 1 
    const categories = await prisma.category.findMany({
      where: { userId: userId},
      include:{
        color:{
          omit:{
            id:true,
            createdAt:true,
            updatedAt:true
          }
        },
        budgets:{
          where:{
            month:currentMonth,
            userId:userId
          },
          omit:{
            categoryId:true,
            userId:true
          }
        }
      }
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

    const categoryExist = await prisma.category.findUnique({
      where: { 
        title_userId: {
          title,
          userId,
        },
       },
    });
    if (categoryExist) {
      throw new HTTPException(400, {
          message: 'Category with the same title already exists.',
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
    if (!userId) {
      throw new HTTPException(404, {
        message: 'UserId not found.',
      });
    }

    const categoryId = c.req.param('id');
    const categoryExist = await prisma.category.findUnique({
      where: {
        id: categoryId,
        userId:userId 
      },
    });
    if (!categoryExist) {
      throw new HTTPException(404, {
        message: 'Category not found.',
      });
    }

    const { title, colorId } = c.req.valid('json');
    const duplicateCategory = await prisma.category.findUnique({
       where: { 
        title_userId: {
          title,
          userId,
        },
       },
    });
    if (duplicateCategory) {
      throw new HTTPException(400, {
          message: 'Update failed, category with the same title already exists.',
        });
    }

    const updateCategory = await prisma.category.update({
      data: {
        title,
        colorId
      },
      where: {
        id: categoryId,
        userId: userId,
      },
    });

    return c.json(updateCategory, 200);
  }
)
.delete('/:id',
  describeRoute({
    description: 'Delete a category',
    tags: ['category'],
    responses:{
      204: response204(),
      404: response404()
    }
  }),
  zValidator('param', paramsWithId),
  async (c) => {
    const categoryId = c.req.param('id');
    const userId = c.get('jwtPayload').userId;
    if (!userId) {
      throw new HTTPException(404, {
        message: 'UserId not found.',
      });
    }

    const findCategory = await prisma.category.findUnique({
      where: {
        id: categoryId,
        userId,
      },
    });
    if (!findCategory) {
      return c.json({ message: 'Category not found' }, 404);
    }

    await prisma.category.delete({
      where: {
        id: categoryId,
        userId,
      },
    });

    return c.json(204);
  }
);

export default categoryRouter;