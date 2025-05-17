import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

export const validate =
    (schema: ZodSchema) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            const dataToValidate = req.body.data
                ? JSON.parse(req.body.data)
                : req.body;
            req.body = schema.parse(dataToValidate);
            next();
        } catch (error) {
            next(error);
        }
    };
