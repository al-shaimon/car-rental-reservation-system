import { Document } from 'mongoose';

export interface TCar extends Document {
  name: string;
  description: string;
  carType: string;
  image: string;
  color: string;
  isElectric: boolean;
  features?: string[];
  pricePerHour: number;
  status: 'available' | 'unavailable';
  reviews?: string[];
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
