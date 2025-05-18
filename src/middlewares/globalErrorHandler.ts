/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '../../generated/prisma';
import { config } from '../config/config';
import AppError from '../errors/AppError';
import handlePrismaError from '../errors/handlePrismaError';
import handleZodError from '../errors/handleZodError';
import { TErrorSources } from '../interface/error';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    // default values
    let statusCode = 500;
    let message = 'Something went wrong!';
    let errorSources: TErrorSources = [
        {
            path: '',
            message: 'Something went wrong',
        },
    ];

    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
        const simplifiedError = handlePrismaError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    } else if (err instanceof Prisma.PrismaClientValidationError) {
        statusCode = 400;
        message = err.message;
        errorSources = [];
    } else if (err instanceof Prisma.PrismaClientInitializationError) {
        statusCode = 500;
        message = 'Database initialization failed';
        errorSources = [];
    } else if (err instanceof Prisma.PrismaClientRustPanicError) {
        statusCode = 500;
        message = 'Internal database error (Rust panic)';
        errorSources = [];
    } else if (err instanceof AppError) {
        statusCode = err?.statusCode;
        message = err?.message;
        errorSources = [
            {
                path: '',
                message: err?.message,
            },
        ];
    } else if (err instanceof Error) {
        message = err?.message;
        errorSources = [
            {
                path: '',
                message: err?.message,
            },
        ];
    }

    // final response
    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: config.NODE_ENV === 'dev' ? err?.stack : null,
    });

    return;
};

export default globalErrorHandler;
