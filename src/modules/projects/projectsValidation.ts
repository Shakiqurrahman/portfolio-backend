import { z } from 'zod';

const createProject = z.object({
    title: z.string({ required_error: 'Title is required!' }),
    subTitle: z.string().optional(),
    description: z.string({ required_error: 'Description is required!' }),
    sourceLink: z.string().url().optional(),
    liveLink: z.string().url().optional(),
});

const updateProject = createProject.partial();

export const projectValidation = { createProject, updateProject };
