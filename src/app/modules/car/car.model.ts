import { Schema, model } from 'mongoose';
import { TCar } from './car.interface';

const CarSchema: Schema = new Schema<TCar>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    color: { type: String, required: true },
    isElectric: { type: Boolean, required: true },
    features: { type: [String], required: true },
    pricePerHour: { type: Number, required: true },
    status: { type: String, default: 'available' },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Car = model<TCar>('Car', CarSchema);
