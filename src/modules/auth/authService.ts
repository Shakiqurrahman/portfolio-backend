import bcrypt from 'bcryptjs';
import status from 'http-status';
import { User } from '../../../generated/prisma';
import { config } from '../../config/config';
import AppError from '../../errors/AppError';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import prisma from '../../utils/prisma';

const registerUserInDB = async (payload: User) => {
    const { email, name, username, password } = payload;

    const existUser = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (existUser) {
        throw new AppError(status.CONFLICT, 'This user already exists!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            email,
            name,
            username,
            password: hashedPassword,
        },
        select: {
            id: true,
            name: true,
            username: true,
            email: true,
            role: true,
        },
    });

    const accessToken = jwtHelpers.generateToken(
        {
            userId: newUser.id,
            role: newUser.role,
            email: newUser.email,
        },
        config.ACCESS_TOKEN_SECRET!,
        config.ACCESS_TOKEN_EXPIRY!,
    );

    const refreshToken = jwtHelpers.generateToken(
        {
            userId: newUser.id,
            role: newUser.role,
        },
        config.REFRESH_TOKEN_SECRET!,
        config.REFRESH_TOKEN_EXPIRY!,
    );

    return {
        user: newUser,
        accessToken,
        refreshToken,
    };
};

const loginUserFromDB = async (payload: {
    email: string;
    password: string;
}) => {
    const user = await prisma.user.findUnique({
        where: {
            email: payload.email,
        },
    });

    if (!user) {
        throw new AppError(status.EXPECTATION_FAILED, 'User not found!');
    }

    const isDeleted = user.isDeleted;
    if (isDeleted) {
        throw new AppError(status.EXPECTATION_FAILED, 'User is deleted.');
    }

    const isPasswordValid = await bcrypt.compare(
        payload.password,
        user.password,
    );

    if (!isPasswordValid) {
        throw new AppError(status.EXPECTATION_FAILED, 'Invalid credentials.');
    }

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { password, ...restUser } = user;

    const accessToken = jwtHelpers.generateToken(
        {
            userId: user.id,
            role: user.role,
            email: user.email,
        },
        config.ACCESS_TOKEN_SECRET!,
        config.ACCESS_TOKEN_EXPIRY!,
    );

    const refreshToken = jwtHelpers.generateToken(
        {
            userId: user.id,
            role: user.role,
        },
        config.REFRESH_TOKEN_SECRET!,
        config.REFRESH_TOKEN_EXPIRY!,
    );

    return { user: restUser, accessToken, refreshToken };
};

const generateNewAccessToken = async (
    refreshToken: string,
): Promise<string> => {
    const decoded = jwtHelpers.verifyToken(
        refreshToken,
        config.REFRESH_TOKEN_SECRET as string,
    );

    const { userId } = decoded;

    const user = await prisma.user.findUnique({
        where: {
            id: userId,
            isDeleted: false,
        },
    });

    if (!user) {
        throw new AppError(status.NOT_FOUND, 'This user is not found!');
    }

    // generating token
    const accessToken = jwtHelpers.generateToken(
        {
            userId: user.id,
            role: user.role,
            email: user.email,
        },
        config.ACCESS_TOKEN_SECRET!,
        config.ACCESS_TOKEN_EXPIRY!,
    );
    return accessToken;
};

export const authService = {
    registerUserInDB,
    loginUserFromDB,
    generateNewAccessToken,
};
