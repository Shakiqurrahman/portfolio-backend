import status from 'http-status';
import AppError from '../../errors/AppError';
import prisma from '../../utils/prisma';

const getMe = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });

    if (!user) {
        throw new AppError(status.NOT_FOUND, 'User is not found!');
    }

    return user;
};

export const userService = {
    getMe,
};
