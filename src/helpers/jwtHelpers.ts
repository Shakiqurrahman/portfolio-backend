/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import status from 'http-status';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import AppError from '../errors/AppError';

const generateToken = (payload: any, secret: Secret, expiresIn: string) => {
    const token = jwt.sign(payload, secret, {
        algorithm: 'HS256',
        expiresIn,
    });

    return token;
};

const verifyToken = (token: string, secret: Secret) => {
    try {
        return jwt.verify(token, secret) as JwtPayload;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: any) {
        throw new AppError(status.FORBIDDEN, 'Invalid token');
    }
};

export const jwtHelpers = {
    generateToken,
    verifyToken,
};
