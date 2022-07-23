import { LocalStorage, LoginResult, ZodLocalStorage, ZodLoginResult } from '../types';

export function isLoginResult(obj: unknown): obj is LoginResult {
  return ZodLoginResult.safeParse(obj).success;
}

export function isLocalStorageContent(obj: unknown): obj is LocalStorage {
  return ZodLocalStorage.safeParse(obj).success;
}