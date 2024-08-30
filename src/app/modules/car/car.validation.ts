import { z } from 'zod';

const createCarValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  carType: z.string(),
  image: z.string(),
  color: z.string(),
  isElectric: z.boolean(),
  features: z.array(z.string()).optional(),
  pricePerHour: z.number().positive(),
  status: z.enum(['available', 'unavailable']).default('available'),
  reviews: z.array(z.string()).optional(),
  isDeleted: z.boolean().default(false),
});

const updateCarValidationSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  carType: z.string().optional(),
  image: z.string().optional(),
  color: z.string().optional(),
  isElectric: z.boolean().optional(),
  features: z.array(z.string()).nonempty().optional(),
  pricePerHour: z.number().positive().optional(),
  status: z.enum(['available', 'unavailable']).default('available').optional(),
  reviews: z.array(z.string()).optional(),
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
