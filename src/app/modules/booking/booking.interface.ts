import { Document, Schema } from 'mongoose';
export interface TBooking extends Document {
  date: string;
  startTime: string;
  endTime: string | null;
  approval: boolean;
  nidOrPassport: string;
  drivingLicense: string;
  paymentInfo: string;
  paymentStatus?: boolean;
  user: Schema.Types.ObjectId;
  car: Schema.Types.ObjectId;
  totalCost: number;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
