import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().email('Email non valida'),
  password: z.string().min(1, 'Password obbligatoria'),
});

export type LoginInput = z.infer<typeof loginSchema>;
