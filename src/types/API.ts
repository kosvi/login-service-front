import { z } from 'zod';

export const ZodRegisterRequestBody = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  username: z.string({
    required_error: 'username required'
  }),
  password: z.string({
    required_error: 'password required'
  })
}).strict();

export type RegisterRequestBody = z.infer<typeof ZodRegisterRequestBody>;

export const ZodRegisterResult = z.object({
  uid: z.string().uuid(),
  username: z.string(),
  name: z.string(),
  email: z.string().email(),
  admin: z.boolean(),
  locked: z.boolean(),
  deleted: z.boolean()
});

export type RegisterResult = z.infer<typeof ZodRegisterResult>;

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

export const ZodUserInfo = z.object({
  uid: z.string().uuid(),
  username: z.string(),
  name: z.string(),
  email: z.string(),
  admin: z.boolean(),
  locked: z.boolean(),
  deleted: z.boolean(),
  created_on: z.string()
}).strict();

export type UserInfo = z.infer<typeof ZodUserInfo>;

export const ZodClientInfo = z.object({
  id: z.string().uuid(),
  name: z.string(),
  redirect_uri: z.string().url()
}).strict();

export type ClientInfo = z.infer<typeof ZodClientInfo>;

export const ZodResourceInfo = z.object({
  id: z.string().uuid(),
  name: z.string()
}).strict();

export type ResourceInfo = z.infer<typeof ZodResourceInfo>;

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

export const ZodCodeRequest = z.object({
  response_type: z.string(),
  client_id: z.string().uuid(),
  state: z.string(),
  redirect_uri: z.string().url(),
  resource: z.string().uuid(),
  code_challenge: z.string(),
  code_challenge_method: z.string()
}).strict();

export type CodeRequest = z.infer<typeof ZodCodeRequest>;

export const ZodCodeResponse = z.object({
  code: z.string()
}).strict();

export type CodeResponse = z.infer<typeof ZodCodeResponse>;
