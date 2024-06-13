import { z } from 'zod';

const userValidationSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  role: z.enum(['user', 'admin']),
  password: z
    .string({
      invalid_type_error: 'Password must be a string',
    })
    .max(20, { message: 'Password cannot be longer than 20 characters' })
    .optional(),
  phone: z.string(),
  address: z.string(),
});

export const UserValidation = {
  userValidationSchema,
};
