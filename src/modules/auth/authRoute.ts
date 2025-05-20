import { Router } from 'express';
import { validate } from '../../middlewares/validate';
import { authController } from './authController';
import { authValidation } from './authValidation';

const router = Router();

router.post(
    '/register',
    validate(authValidation.registerSchema),
    authController.registerUser,
);
router.post(
    '/login',
    validate(authValidation.loginSchema),
    authController.loginUser,
);

router.post('/logout', authController.logout);
router.post('/refresh-token', authController.refreshToken);

export const authRoutes = router;
