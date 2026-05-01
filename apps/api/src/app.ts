import routes from '@src/routes';
import { setupSwagger } from '@src/utils/swagger';
import cors from 'cors';
import express from 'express';

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  setupSwagger(app);

  app.use('/api', routes);

  return app;
}
