import { TypeOf, z } from 'zod';

export const createSessionSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required!' }).email('Invalid email or password!'),
    password: z.string({ required_error: 'Password is required!' }).min(6, 'Invalid email or password!'),
  }),
});

export type CreateSessionInput = TypeOf<typeof createSessionSchema>['body'];
