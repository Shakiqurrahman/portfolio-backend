import { z } from 'zod';

const registerSchema = z.object({
    name: z.string({ required_error: 'Name is required' }),
    username: z.string({ required_error: 'Username is required' }),
    email: z
        .string({ required_error: 'Email is required' })
        .email('Invalid email address'),
    password: z.string({ required_error: 'Password is required' }),
});

const loginSchema = z.object({
    email: z
        .string({ required_error: 'Email is required' })
        .email('Invalid email address'),
    password: z.string({ required_error: 'Password is required' }),
});

export const authValidation = {
    registerSchema,
    loginSchema,
};
