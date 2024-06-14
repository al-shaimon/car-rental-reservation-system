import { Document } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser extends Document {
  name: string;
  email: string;
  role: 'user' | 'admin';
  password: string;
  phone: string;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type TUserRole = keyof typeof USER_ROLE;
