import { User } from './user.model';
import bcrypt from 'bcrypt';

// signup service

const signUp = async (userData: {
  name: string;
  email: string;
  role: string;
  password: string;
  confirmPassword: string;
  phone: string;
}) => {
  // Check if passwords match
  if (userData.password !== userData.confirmPassword) {
    throw new Error('Passwords do not match');
  }
  
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = new User({
    ...userData,
    password: hashedPassword,
  });

  return await user.save();
};

// signin service

const signIn = async (email: string) => {
  return await User.findOne({ email }).select('+password');
};

export const AuthServices = {
  signUp,
  signIn,
};
