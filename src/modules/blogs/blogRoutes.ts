import { Router } from 'express';
import { User_Role } from '../../../generated/prisma';
import auth from '../../middlewares/auth';
import { upload } from '../../middlewares/multer';
import { validate } from '../../middlewares/validate';
import { blogController } from './blogController';
import { blogValidation } from './blogValidation';

const router = Router();

router.post(
    '/',
    auth(User_Role.ADMIN),
    upload.single('thumbnail'),
    validate(blogValidation.createBlog),
    blogController.createBlog,
);

router.get('/', blogController.getAllBlogs);
router.get('/:blogId', blogController.getBlogById);

router.put(
    '/:blogId',
    auth(User_Role.ADMIN),
    upload.single('thumbnail'),
    validate(blogValidation.updateBlog),
    blogController.updateBlogById,
);

router.delete('/:blogId', auth(User_Role.ADMIN), blogController.deleteBlogById);

export const blogRoutes = router;
