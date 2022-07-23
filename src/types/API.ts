import { z } from 'zod';

export const ZodLoginResult = z.object({
  token: z.string(),
  content: z.object({
    uid: z.string(),
    username: z.string(),
    name: z.string().optional(),
    email: z.string().email().optional(),
    read_only: z.boolean(),
    expires: z.number()
  })
}).strict();

export type LoginResult = z.infer<typeof ZodLoginResult>;

export const ZodApiError = z.object({
  error: z.string()
});

export type ApiError = z.infer<typeof ZodApiError>;

export interface FailedApiResult {
  success: false,
  content: ApiError
}

export interface ApiResult {
  success: true,
  content: unknown
}