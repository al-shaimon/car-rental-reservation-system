import { model, Schema } from 'mongoose';
import { TBooking } from './booking.interface';

const BookingSchema: Schema = new Schema<TBooking>(
  {
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, default: null },
    approval: { type: Boolean, default: false },
    nidOrPassport: { type: String, required: true },
    drivingLicense: { type: String, required: true },
    paymentInfo: { type: String, required: true },
    paymentStatus: { type: Boolean, default: false, optional: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    car: {
      type: Schema.Types.ObjectId,
      ref: 'Car',
      required: true,
    },
    totalCost: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Booking = model<TBooking>('Booking', BookingSchema);
