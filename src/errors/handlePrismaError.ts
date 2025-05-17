import { Prisma } from '../../prisma/generated/prisma-client';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handlePrismaError = (
    err: Prisma.PrismaClientKnownRequestError,
): TGenericErrorResponse => {
    const statusCode = 400;
    let message = 'Database Error';
    let errorSources: TErrorSources = [];

    switch (err.code) {
        case 'P2002':
            // Unique constraint failed (duplicate entry)
            const target = (err.meta as any)?.target?.[0];
            message = `${target} already exists`;
            errorSources = [{ path: target || '', message }];
            break;

        case 'P2003':
            // Foreign key constraint failed
            const fkField = (err.meta as any)?.field_name || 'Foreign key';
            message = `Invalid reference for ${fkField}`;
            errorSources = [{ path: fkField, message }];
            break;

        case 'P2025':
            // Record not found
            message = (err.meta as any)?.cause || 'Record not found';
            errorSources = [{ path: '', message }];
            break;

        default:
            // fallback
            errorSources = [{ path: '', message: err.message }];
            break;
    }

    return {
        statusCode,
        message,
        errorSources,
    };
};

export default handlePrismaError;
