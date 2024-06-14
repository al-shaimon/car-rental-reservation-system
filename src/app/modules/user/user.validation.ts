import { z } from 'zod';

const userValidationSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  role: z.enum(['user', 'admin']),
  password: z.string().min(6),
  phone: z.string(),
  address: z.string(),
});

export const AuthValidations = {
  userValidationSchema,
};
