import { z } from 'zod';

const userBookingValidationSchema = z.object({
  carId: z.string(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string().optional(),
  approval: z.boolean().optional(),
  nidOrPassport: z.string(),
  drivingLicense: z.string(),
  paymentInfo: z.string(),
  paymentStatus: z.boolean().optional(),
});

const userUpdateBookingValidationSchema = z.object({
  date: z.string().optional(),
  startTime: z.string().optional(),
  paymentStatus: z.boolean().optional(),
});

const adminUpdateBookingValidationSchema = z.object({
  date: z.string().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  approval: z.boolean().optional(),
  paymentStatus: z.boolean().optional(),
});

export const BookingValidations = {
  userBookingValidationSchema,
  userUpdateBookingValidationSchema,
  adminUpdateBookingValidationSchema,
};
