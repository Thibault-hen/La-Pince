import { Hono } from "hono";
import { describeRoute } from "hono-openapi";
import {
  response200,
  response204,
  response404,
} from "../utils/openapi";
import prisma from "../db/client";
import {
  notificationSelectSchema,
} from "../validators/notification";
import { zValidator } from "@hono/zod-validator";
import { paramsWithId } from "../validators/utils";
import { HTTPException } from "hono/http-exception";

const notificationRouter = new Hono();

notificationRouter
  .basePath("/notification")
  .get(
    "/",
    describeRoute({
      description: "Get all notifications of a user",
      tags: ["notification"],
      responses: {
        200: response200(notificationSelectSchema),
      },
    }),
    async (c) => {
      const userId = c.get("jwtPayload").userId;
      const notifications = await prisma.notification.findMany({
        where: { userId: userId },
        orderBy: { createdAt: "desc" },
        include: {
          budget: {
            include: {
              category: {}
            }
          }
        }
      });

      return c.json(notifications.map(({ budget, ...notification }) => ({ ...notification, budgetName: budget.category.title })), 200);
    },
  )
  .delete(
    "/:id",
    describeRoute({
      description: "Delete a notification",
      tags: ["notification"],
      responses: {
        204: response204(),
        404: response404(),
      },
    }),
    zValidator("param", paramsWithId),
    async (c) => {
      const userId = c.get("jwtPayload").userId;
      const notificationId = c.req.param("id");
      const notificationExist = await prisma.notification.findUnique({
        where: {
          id: notificationId,
          userId,
        },
      });
      if (!notificationExist) {
        throw new HTTPException(404, {
          message: "Notification not found.",
        });
      }

      await prisma.notification.delete({
        where: {
          id: notificationId,
          userId,
        },
      });
      return c.json(204);
    },
  );

export async function tryCreateBudgetNotification(budgetId: string, userId: string) {
  try {
    const budget = await prisma.budget.findUnique({
      where: {
        id: budgetId,
        userId,
      },
      include: {
        expenses: {},
      },
    });
    if (!budget) return;

    const totalExpenseAmount = budget.expenses.reduce(
      (acc, expense) => acc + expense.amount,
      0,
    );
    const limitAlert = budget.limitAlert;
    const maxAmount = budget.amount;

    if (totalExpenseAmount < limitAlert) return;

    await prisma.notification.create({
      data: {
        userId,
        budgetId,
        maximumAmount: maxAmount,
        totalAmount: totalExpenseAmount,
        notificationType: totalExpenseAmount > maxAmount ? "budgetExceeded" : "budgetWarning",
      },
    });

  } catch (error) { }
}

export default notificationRouter;
