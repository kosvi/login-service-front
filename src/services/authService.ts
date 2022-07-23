import { LocalStorage } from '../types';
import { ApiResult, FailedApiResult } from '../types/API';

import { isLocalStorageContent, isLoginResult } from '../utils/validators';
import { API } from './API';

const USER_DATA_KEY = 'loggedIn5vUserToken';

function storeToken(token: string, uid: string): void {
  window.localStorage.setItem(USER_DATA_KEY, JSON.stringify({ token, uid }));
  loadToken();
}

function loadToken(): LocalStorage | undefined {
  const value = window.localStorage.getItem(USER_DATA_KEY);
  if (value) {
    const content = JSON.parse(value);
    if (isLocalStorageContent(content)) {
      API.setToken(content.token);
      return content;
    }
  }
  return undefined;
}

function clearToken(): void {
  window.localStorage.removeItem(USER_DATA_KEY);
  API.removeToken();
}

async function login(username: string, password: string): Promise<ApiResult | FailedApiResult> {
  const result = await API.post('/login', { username, password });
  if (isLoginResult(result.content)) {
    storeToken(result.content.token, result.content.content.uid);
    return result;
  }
  return result;
}

export const authService = {
  storeToken, loadToken, clearToken, login
};
