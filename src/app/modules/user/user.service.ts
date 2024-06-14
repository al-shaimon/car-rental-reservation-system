import { User } from './user.model';
import bcrypt from 'bcrypt';

const signUp = async (userData: {
  name: string;
  email: string;
  role: string;
  password: string;
  phone: string;
  address: string;
}) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = new User({
    ...userData,
    password: hashedPassword,
  });

  return await user.save();
};

const signIn = async (email: string) => {
  return await User.findOne({ email }).select('+password');
};

export const AuthServices = {
  signUp,
  signIn,
};
