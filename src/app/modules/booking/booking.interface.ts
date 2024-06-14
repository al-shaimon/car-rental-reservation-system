import { Document, Schema } from 'mongoose';
export interface TBooking extends Document {
  date: string;
  startTime: string;
  endTime: string | null;
  user: Schema.Types.ObjectId;
  car: Schema.Types.ObjectId;
  totalCost: number;
  createdAt?: Date;
  updatedAt?: Date;
}
