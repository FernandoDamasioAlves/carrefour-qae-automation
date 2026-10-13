import { z } from 'zod';

export const userSchema = z.object({
  _id: z.string().min(1),
  nome: z.string().min(1),
  email: z.email(),
  password: z.string(),
  administrador: z.enum(['true', 'false'])
}).strict();

export const usersListSchema = z.object({
  quantidade: z.number().int().nonnegative(),
  usuarios: z.array(userSchema)
}).strict();
