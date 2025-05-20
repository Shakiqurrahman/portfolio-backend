import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userService } from './userService';

const getMe = catchAsync(async (req, res) => {
    const { userId } = req.user;
    const user = await userService.getMe(userId);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'User retrived successfully!',
        data: user,
    });
});

export const userController = {
    getMe,
};
