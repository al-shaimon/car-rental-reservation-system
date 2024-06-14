import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from './user.model';
import { UserServices } from './user.service';
import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import jwt from 'jsonwebtoken';

const createUser = catchAsync(async (req, res) => {
  const { password, user: userData } = req.body;

  const result = await UserServices.registerUser(password, userData);
});

const signIn = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await User.isPasswordMatched(password, user.password))) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    config.jwt_access_secret,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully',
    data: { user, token },
  });
});

export const UserControllers = {
  createUser,
  signIn,
};
