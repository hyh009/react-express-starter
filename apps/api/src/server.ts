import 'dotenv/config';
import { createServer } from 'node:http';

import mongoose from 'mongoose';

import { createApp } from './app.js';
import { connectMongo, connectRedis } from './config/db.js';

let server: ReturnType<typeof createServer>;

async function bootstrap() {
  await connectMongo();
  const redisClient = await connectRedis();

  const app = createApp();
  server = createServer(app);

  const port = Number(process.env.PORT ?? 3001);

  server.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
  });

  // If you don't need WebSocket, you can simplify to:
  // const app = createApp();
  // app.listen(port, () => {
  //   console.log(`🚀 Server running at http://localhost:${port}`);
  // });

  // graceful shutdown
  const shutdown = async () => {
    console.log('Shutting down...');

    await mongoose.connection.close();
    await redisClient.quit();

    server.close(() => {
      process.exit(0);
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

bootstrap().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
