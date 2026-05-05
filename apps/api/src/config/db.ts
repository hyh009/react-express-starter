import mongoose from 'mongoose';
import { createClient } from 'redis';

import { env } from './env.js';
import { logger } from '../utils/logger.js';

export async function connectMongo() {
  await mongoose.connect(env.MONGODB_URI);

  logger.info('mongodb connected');
}

export async function connectRedis() {
  const redisClient = createClient({ url: env.REDIS_URL });

  redisClient.on('error', (error) => {
    logger.error({ err: error }, 'redis error');
  });

  await redisClient.connect();

  logger.info('redis connected');

  return redisClient;
}
