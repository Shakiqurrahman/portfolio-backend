import { NextFunction, Request, Response } from 'express';
import status from 'http-status';

const globalErrorHandler = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    err: any,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
) => {
    // console.log(err);
    res.status(err.statusCode ?? status.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.message || 'Something went wrong',
    });
};

export default globalErrorHandler;
