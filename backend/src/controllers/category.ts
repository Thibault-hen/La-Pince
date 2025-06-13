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
    const userId = c.get('jwtPayload').userId;
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
/* Route pour la création des catégories apres la validation du compte utilisateur
.post(
  '/default',
  describeRoute({
    description: 'Create a list of category for a new user',
    tags: ['category'],
    responses: {
      201: response201(categorySelectSchema),
      404: response404(z.literal('UserId not found')),
    }
  }),
  async(c) => {
    console.log("Create default")
    const userId = c.get('jwtPayload').userId;
    const names = ["Alimentation", "Logement", "Transports"]

    const newCategories = await prisma.category.createMany({
      data: names.map(name => ({
        title: name,
        userId,
        colorId: 1,
      }))
    });
        
    return c.json(newCategories, 200);
})*/
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
    const userId = c.get('jwtPayload').userId;
    const { title, colorId } = c.req.valid('json');

    await verifyDuplicateCategory(userId, title, false);
    
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
    const userId = c.get('jwtPayload').userId;
    const categoryId = c.req.param('id');
    await verifyCategoryExist(categoryId, userId);

    const { title, colorId } = c.req.valid('json');

    await verifyDuplicateCategory(userId, title, true);

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
    const userId = c.get('jwtPayload').userId;
    const categoryId = c.req.param('id');
    await verifyCategoryExist(categoryId, userId);

    await prisma.category.delete({
      where: {
        id: categoryId,
        userId,
      },
    });

    return c.json(204);
  }
);

async function verifyDuplicateCategory(userId: string,
  title: string, isUpdate:boolean) {
  const duplicateCategory = await prisma.category.findFirst({
    where: { 
      title: isUpdate
      ? { equals: title } 
      : { equals: title, mode: 'insensitive'},
    userId,
    },
  });
  if (duplicateCategory) {
    throw new HTTPException(400, {
      message: 'Category with the same title already exists.',
    });
  }
}

async function verifyCategoryExist(categoryId: string, userId: string) {
  const categoryExist = await prisma.category.findUnique({
      where: {
        id: categoryId,
        userId,
      },
    });
  if (!categoryExist) {
      throw new HTTPException(404, {
      message: 'Category not found.',
    });
  } 
}


export default categoryRouter;