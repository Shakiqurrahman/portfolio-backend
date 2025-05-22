import { z } from 'zod';

const createBlog = z.object({
    title: z.string({ required_error: 'Title is required!' }),
    description: z.string({ required_error: 'Description is required!' }),
});

const updateBlog = createBlog.partial();

export const blogValidation = { createBlog, updateBlog };
