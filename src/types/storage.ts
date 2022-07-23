import { z } from 'zod';

export const ZodLocalStorage = z.object({
  token: z.string(),
  uid: z.string().uuid()
});

export type LocalStorage = z.infer<typeof ZodLocalStorage>;
