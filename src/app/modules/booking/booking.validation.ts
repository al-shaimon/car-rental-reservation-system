import { z } from 'zod';

const userBookingValidationSchema = z.object({
  carId: z.string(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string().optional(),
  approval: z.boolean().optional(),
});

const userUpdateBookingValidationSchema = z.object({
  date: z.string().optional(),
  startTime: z.string().optional(),
});

const adminUpdateBookingValidationSchema = z.object({
  date: z.string().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  approval: z.boolean().optional(),
});

export const BookingValidations = {
  userBookingValidationSchema,
  userUpdateBookingValidationSchema,
  adminUpdateBookingValidationSchema,
};
