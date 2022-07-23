import { LoginResult, ZodLoginResult } from '../types/API';

export function isLoginResult(obj: unknown): obj is LoginResult {
  return ZodLoginResult.safeParse(obj).success;
}