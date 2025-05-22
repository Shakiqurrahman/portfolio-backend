import { Router } from 'express';
import { User_Role } from '../../../generated/prisma';
import auth from '../../middlewares/auth';
import { upload } from '../../middlewares/multer';
import { validate } from '../../middlewares/validate';
import { projectController } from './projectsController';
import { projectValidation } from './projectsValidation';

const router = Router();

router.post(
    '/',
    auth(User_Role.ADMIN),
    upload.single('thumbnail'),
    validate(projectValidation.createProject),
    projectController.createProject,
);

router.get('/', projectController.getAllProjects);
router.get('/:projectId', projectController.getProjectById);

router.put(
    '/:projectId',
    auth(User_Role.ADMIN),
    upload.single('thumbnail'),
    validate(projectValidation.updateProject),
    projectController.updateProjectById,
);

router.delete(
    '/:projectId',
    auth(User_Role.ADMIN),
    projectController.deleteProjectById,
);

export const projectRoutes = router;
