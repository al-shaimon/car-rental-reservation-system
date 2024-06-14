import { z } from 'zod';

const createCarValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  color: z.string(),
  isElectric: z.boolean(),
  features: z.array(z.string()).nonempty(),
  pricePerHour: z.number().positive(),
  status: z.enum(['available', 'unavailable']).default('available'),
  isDeleted: z.boolean().default(false),
});

const updateCarValidationSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  color: z.string().optional(),
  isElectric: z.boolean().optional(),
  features: z.array(z.string()).nonempty().optional(),
  pricePerHour: z.number().positive().optional(),
  status: z.enum(['available', 'unavailable']).default('available').optional(),
  isDeleted: z.boolean().default(false).optional(),
});

const returnCarValidationSchema = z.object({
  bookingId: z.string(),
  endTime: z.string(),
});

export const carValidations = {
  createCarValidationSchema,
  updateCarValidationSchema,
  returnCarValidationSchema,
};
