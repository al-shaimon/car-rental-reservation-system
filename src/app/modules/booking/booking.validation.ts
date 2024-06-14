import { z } from 'zod';

const userBookingValidationSchema = z.object({
  carId: z.string(),
  date: z.string(),
  startTime: z.string(),
});

export const BookingValidations = {
  userBookingValidationSchema,
};
