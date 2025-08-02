import { createClient } from 'redis';
import { getEnv } from './env';

const { REDIS_URL, NODE_ENV } = getEnv();

const redis = createClient({
  url: REDIS_URL,
  socket: {
    reconnectStrategy: (_retries) => {
      if (NODE_ENV === 'development') return false;
      return 60;
    },
  },
});

redis.on('error', (err) => console.error('Redis Client Error', err));
redis.on('connect', () => console.log('Redis Client Connected'));

export const initRedis = async () => {
  try {
    if (!redis.isOpen) {
      await redis.connect();
    }
    console.log('Redis client is already connected');
  } catch (error) {
    console.error('Error initializing Redis:', error);
  }
};

export { redis as redisClient };
