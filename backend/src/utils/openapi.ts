import { resolver } from 'hono-openapi/zod';
import { z, type ZodSchema } from 'zod';

export const response400 = (schema: ZodSchema = z.literal('Bad request')) => ({
  description: 'Bad request',
  content: {
    'text/plain': {
      schema: resolver(schema),
    },
  },
});

export const response401 = (schema: ZodSchema = z.literal('Unauthorized')) => ({
  description: 'Unauthorized',
  content: {
    'text/plain': {
      schema: resolver(schema),
    },
  },
});

export const response403 = (schema: ZodSchema = z.literal('Forbidden')) => ({
  description: 'Forbidden',
  content: {
    'text/plain': {
      schema: resolver(schema),
    },
  },
});

export const response404 = (schema: ZodSchema = z.literal('Not found')) => ({
  description: 'Not found',
  content: {
    'text/plain': {
      schema: resolver(schema),
    },
  },
});

export const response409 = (
  schema: ZodSchema = z.literal('Already exist')
) => ({
  description: 'Already exists',
  content: {
    'text/plain': {
      schema: resolver(schema),
    },
  },
});

export const response200 = (schema: ZodSchema) => ({
  description: 'Successful response',
  content: {
    'application/json': {
      schema: resolver(schema),
    },
  },
});

export const response201 = (schema: ZodSchema) => ({
  description: 'Created successfully',
  content: {
    'application/json': {
      schema: resolver(schema),
    },
  },
});

export const response204 = () => ({
  description: 'Deleted successfully',
});

export const response500 = (schema: ZodSchema = z.literal('Server Error')) => ({
  description: 'Server Error',
  content: {
    'text/plain': {
      schema: resolver(schema),
    },
  },
});
