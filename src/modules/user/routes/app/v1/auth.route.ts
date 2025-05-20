import { Router } from 'express';
import {
  login,
  sendOTP,
  changePassword,
  refreshToken,
  logout
} from '../../../controller/user.controller';
import { checkAuth } from '@/src/middlewares/check.auth';

const authRouter: Router = Router();

// Auth routes
authRouter.post('/login', login);
authRouter.post('/refresh-token', refreshToken);
authRouter.post('/logout', logout);
authRouter.post('/password/otp', sendOTP);
authRouter.post('/password/change', changePassword);

export default authRouter;
