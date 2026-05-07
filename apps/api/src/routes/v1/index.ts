import { Router } from 'express';

import healthRouter from './health';
import todosRouter from './todos';

const router = Router();

router.use('/health', healthRouter);
router.use('/todos', todosRouter);

export default router;
