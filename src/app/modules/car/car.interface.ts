import { Document } from 'mongoose';

export interface TCar extends Document {
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  features: string[];
  pricePerHour: number;
  status: 'available' | 'unavailable';
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
