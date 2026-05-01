import mongoose from 'mongoose';
import { createClient } from 'redis';

export async function connectMongo() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI is not defined');
  }

  await mongoose.connect(uri);

  console.log('MongoDB connected');
}

export async function connectRedis() {
  const url = process.env.REDIS_URL;

  if (!url) {
    throw new Error('REDIS_URL is not defined');
  }

  const redisClient = createClient({ url });

  redisClient.on('error', (error) => {
    console.error('Redis error:', error);
  });

  await redisClient.connect();

  console.log('Redis connected');

  return redisClient;
}
