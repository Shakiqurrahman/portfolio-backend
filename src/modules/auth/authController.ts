import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authService } from './authService';

const registerUser = catchAsync(async (req, res) => {
    const { user, accessToken, refreshToken } =
        await authService.registerUserInDB(req.body);

    res.cookie('refreshToken', refreshToken, {
        expires: new Date(Date.now() + 3600000 * 24 * 30),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        // sameSite: 'strict',
    });

    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: 'User registered successfully',
        data: {
            user,
            accessToken,
        },
    });
});

const loginUser = catchAsync(async (req, res) => {
    const { user, accessToken, refreshToken } =
        await authService.loginUserFromDB(req.body);

    res.cookie('refreshToken', refreshToken, {
        expires: new Date(Date.now() + 3600000 * 24 * 30), // 30 day
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        // sameSite: 'strict',
    });

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'User Login successfully!',
        data: {
            user,
            accessToken,
        },
    });
});

const logout = catchAsync(async (req, res) => {
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    });
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'User Logout successfully!',
        data: {},
    });
});

const refreshToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    const accessToken = await authService.generateNewAccessToken(refreshToken);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Access token is retrieved succesfully!',
        data: accessToken,
    });
});

export const authController = {
    registerUser,
    loginUser,
    logout,
    refreshToken,
};
