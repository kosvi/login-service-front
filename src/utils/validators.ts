import { ClientInfo, CodeRequest, LocalStorage, LoginResult, ResourceInfo, UserInfo, ZodClientInfo, ZodCodeRequest, ZodLocalStorage, ZodLoginResult, ZodResourceInfo, ZodUserInfo } from '../types';

export function isLoginResult(obj: unknown): obj is LoginResult {
  return ZodLoginResult.safeParse(obj).success;
}

export function isUserInfo(obj: unknown): obj is UserInfo {
  return ZodUserInfo.safeParse(obj).success;
}

export function isClientInfo(obj: unknown): obj is ClientInfo {
  return ZodClientInfo.safeParse(obj).success;
}

export function isResourceInfo(obj: unknown): obj is ResourceInfo {
  return ZodResourceInfo.safeParse(obj).success;
}

export function isLocalStorageContent(obj: unknown): obj is LocalStorage {
  return ZodLocalStorage.safeParse(obj).success;
}

export function isCodeRequest(obj: unknown): obj is CodeRequest {
  return ZodCodeRequest.safeParse(obj).success;
}
