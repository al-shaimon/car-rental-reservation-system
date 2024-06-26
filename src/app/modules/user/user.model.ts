import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';

const UserSchema: Schema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['user', 'admin'], required: true },
    password: { type: String, required: true, select: 0 },
    phone: { type: String, required: true },
    address: { type: String, required: true },
  },
  { timestamps: true },
);

export const User = model<TUser>('User', UserSchema);
