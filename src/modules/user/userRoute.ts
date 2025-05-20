import { Router } from 'express';
import { User_Role } from '../../../generated/prisma';
import auth from '../../middlewares/auth';
import { userController } from './userController';

const router = Router();

router.get('/me', auth(User_Role.ADMIN), userController.getMe);

export const userRoutes = router;
