import { Application } from 'express';
import appRouter from './app.route';
import { checkAuth } from '../middlewares/check.auth';
import { RoleTypeEnum } from '@/modules/user/enums/role';
import { setupSwagger } from '../swagger';

const router = (app: Application) => {
  setupSwagger(app);
  app.use('/api', appRouter);
};
export default router;
