import { Router } from 'express';
import { authRoutes } from '../modules/auth/authRoute';
import { projectRoutes } from '../modules/projects/projectRoute';
import { userRoutes } from '../modules/user/userRoute';

const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: authRoutes,
    },
    {
        path: '/users',
        route: userRoutes,
    },
    {
        path: '/projects',
        route: projectRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
