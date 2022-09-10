import { ClientInfo, CodeRequest, CodeResponse, LocalStorage, LoginResult, RegisterRequestBody, RegisterResult, ResourceInfo, UserInfo, ZodClientInfo, ZodCodeRequest, ZodCodeResponse, ZodLocalStorage, ZodLoginResult, ZodRegisterRequestBody, ZodRegisterResult, ZodResourceInfo, ZodUserInfo } from '../types';

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

export function isCodeResponse(obj: unknown): obj is CodeResponse {
  return ZodCodeResponse.safeParse(obj).success;
}

export function isRegisterRequestBody(obj: unknown): obj is RegisterRequestBody {
  return ZodRegisterRequestBody.safeParse(obj).success;
}

export function isRegisterResult(obj: unknown): obj is RegisterResult {
  return ZodRegisterResult.safeParse(obj).success;
}
