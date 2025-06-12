import { Hono } from 'hono';
import { describeRoute } from 'hono-openapi';
import { response200, response201, response204, response401, response404 } from '../utils/openapi';
import z from 'zod';
import prisma from '../db/client';
import { notificationCreateOrUpdateSchema, notificationSelectSchema } from '../validators/notification';
import { zValidator } from '@hono/zod-validator';
import { paramsWithId } from '../validators/utils';
import { HTTPException } from 'hono/http-exception';

const notificationRouter = new Hono();

notificationRouter.basePath('/notification')
.get(
  '/',
  describeRoute({
    description: 'Get all notifications of a user',
    tags: ['notification'],
    responses: {
      200: response200(notificationSelectSchema),
      401: response401()
    }
  }),
  async(c) => {
    const userId = c.get('jwtPayload').userId;
    const notifications = await prisma.notification.findMany({
      where: { userId: userId},
    });
    
    return c.json(notifications, 200);
})
.post(
  '/',
  describeRoute({
    description: 'Create a notifications for a user',
    tags: ['notification'],
    responses: {
      201: response201(notificationSelectSchema),
      401: response401()
    }
  }),
  zValidator('json', notificationCreateOrUpdateSchema),
  async(c) => {
    const userId = c.get('jwtPayload').userId;
    const { content, isSeen } = c.req.valid('json');
    
    const notification = await prisma.notification.create({
      data: {
        content,
        isSeen:false, 
        userId:userId
      },
    })
        
    return c.json(notification, 200);
})
.put(
  '/:id',
  describeRoute({
    description: 'Create a notifications for a user',
    tags: ['notification'],
    responses: {
      201: response201(notificationSelectSchema),
      401: response401()
    }
  }),
  zValidator('param', paramsWithId),
  async(c) => {
    const userId = c.get('jwtPayload').userId;
    const notificationId = c.req.param('id');
    const notificationExist = await prisma.notification.findUnique({
      where: {
        id: notificationId,
        userId,
      },
    });
    if (!notificationExist) {
        throw new HTTPException(404, {
        message: 'Category not found.',
      });
    }

    const updateNotification = await prisma.notification.update({
      data: {
        isSeen:true
      },
      where: {
        id: notificationId,
        userId: userId,
      },
    });
        
    return c.json(updateNotification, 200);
})
.delete(
  '/:id',
  describeRoute({
    description: 'Delete a notification',
    tags: ['notification'],
    responses:{
      204: response204(),
      404: response404()
    }
  }),
  zValidator('param', paramsWithId),
  async (c) => {
    const userId = c.get('jwtPayload').userId;
    const notificationId = c.req.param('id');
    const notificationExist = await prisma.notification.findUnique({
      where: {
        id: notificationId,
        userId,
      },
    });
    if (!notificationExist) {
        throw new HTTPException(404, {
        message: 'Category not found.',
      });
    }

    await prisma.notification.delete({
      where: {
        id: notificationId,
        userId,
      },
    });
    return c.json(204);
});

export default notificationRouter;