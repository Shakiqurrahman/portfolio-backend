import status from 'http-status';
import { Blog } from '../../../generated/prisma';
import AppError from '../../errors/AppError';
import prisma from '../../utils/prisma';

const createBLog = async (payload: Blog) => {
    const blog = await prisma.blog.create({
        data: payload,
    });

    return blog;
};

const getAllBlogs = async () => {
    const blog = await prisma.blog.findMany();
    return blog;
};

const getBlogById = async (blogId: string) => {
    const blog = await prisma.blog.findUnique({
        where: {
            id: blogId,
        },
    });

    if (!blog) {
        throw new AppError(status.NOT_FOUND, 'Blog not found!');
    }
    return blog;
};

const updateBlogById = async (blogId: string, payload: Partial<Blog>) => {
    const blog = await prisma.blog.findUnique({
        where: {
            id: blogId,
        },
    });

    if (!blog) {
        throw new AppError(status.NOT_FOUND, 'Blog not found!');
    }

    const updatedBlog = await prisma.blog.update({
        where: {
            id: blogId,
        },
        data: payload,
    });

    return updatedBlog;
};

const deleteBlogById = async (blogId: string) => {
    const blog = await prisma.blog.findUnique({
        where: {
            id: blogId,
        },
    });

    if (!blog) {
        throw new AppError(status.NOT_FOUND, 'Blog not found!');
    }

    await prisma.blog.delete({
        where: {
            id: blogId,
        },
    });

    return;
};

export const blogService = {
    createBLog,
    getAllBlogs,
    getBlogById,
    updateBlogById,
    deleteBlogById,
};
