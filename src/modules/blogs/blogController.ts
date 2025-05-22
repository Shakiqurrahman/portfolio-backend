import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { blogHelper } from './blogHelper';
import { blogService } from './blogService';

const createBlog = catchAsync(async (req, res) => {
    let imageUrl;
    if (req.file) {
        imageUrl = await blogHelper.handleImageUpload(
            req.file as Express.Multer.File,
        );
    }

    const blog = await blogService.createBLog({
        ...req.body,
        thumbnail: imageUrl,
    });

    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: 'Blog created successfully!',
        data: blog,
    });
});

const getAllBlogs = catchAsync(async (req, res) => {
    const blogs = await blogService.getAllBlogs();

    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: 'Blogs fetched successfully!',
        data: blogs,
    });
});

const getBlogById = catchAsync(async (req, res) => {
    const { blogId } = req.params;

    const blog = await blogService.getBlogById(blogId);

    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: 'Blog fetched successfully!',
        data: blog,
    });
});

const updateBlogById = catchAsync(async (req, res) => {
    const { blogId } = req.params;

    let imageUrl;
    if (req.file) {
        imageUrl = await blogHelper.handleImageUpload(
            req.file as Express.Multer.File,
        );
    }

    const blog = await blogService.updateBlogById(blogId, {
        ...req.body,
        thumbnail: imageUrl,
    });

    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: 'Blog updated successfully!',
        data: blog,
    });
});

const deleteBlogById = catchAsync(async (req, res) => {
    const { blogId } = req.params;

    await blogService.deleteBlogById(blogId);

    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: 'Blog deleted successfully!',
    });
});

export const blogController = {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlogById,
    deleteBlogById,
};
