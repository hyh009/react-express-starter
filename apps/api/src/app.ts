import { errorHandler } from '@src/middlewares/error';
import { requestId } from '@src/middlewares/requestId';
import { requestLogger } from '@src/middlewares/requestLogger';
import routes from '@src/routes';
import { NotFoundError } from '@src/utils/errors';
import { setupSwagger } from '@src/utils/swagger';
import cors from 'cors';
import express from 'express';

export function createApp() {
  const app = express();

  app.use(requestId);
  app.use(requestLogger);
  app.use(cors());
  app.use(express.json());

  setupSwagger(app);

  app.use('/api', routes);

  // 404 Handler
  app.use((req, res, next) => {
    next(new NotFoundError(`Can't find ${req.originalUrl} on this server!`));
  });

  // Global Error Handler
  app.use(errorHandler);

  return app;
}
