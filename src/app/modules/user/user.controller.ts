import catchAsync from '../utils/catchAsync';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const { password, user: userData } = req.body;

  const result = await UserServices.registerUser(password, userData);
});

export const UserControllers = {
  createUser,
};
