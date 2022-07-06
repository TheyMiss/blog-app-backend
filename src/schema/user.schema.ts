import { z } from 'zod';

export const createUserSchema = z.object({
  body: z
    .object({
      email: z
        .string({
          required_error: 'Email is required!',
        })
        .email('Not a valid email'),
      password: z
        .string({
          required_error: 'Password is required!',
        })
        .min(6, 'Password must be at least 6 characters long')
        .max(50, 'Password must be bellow 50 characters'),
      passwordConfirmation: z.string({ required_error: 'Password confirmation is required!' }),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: 'Password do not match!',
      path: ['passwordConfirmation'],
    }),
});
