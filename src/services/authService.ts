import { isLoginResult } from '../utils/validators';
import { API } from './API';

const USER_DATA_KEY = 'loggedIn5vUser';

function storeToken(token: string): void {
  window.localStorage.setItem(USER_DATA_KEY, token);
  loadToken();
}

function loadToken(): boolean {
  const token = window.localStorage.getItem(USER_DATA_KEY);
  if (token) {
    API.setToken(token);
    return true;
  }
  return false;
}

function clearToken(): void {
  window.localStorage.removeItem(USER_DATA_KEY);
  API.removeToken();
}

async function login(username: string, password: string): Promise<boolean> {
  const result = await API.post('/login', { username, password });
  if (!result.success) {
    // login failed
    return false;
  }
  if (isLoginResult(result.content)) {
    storeToken(result.content.token);
    return true;
  }
  return false;
}

export const authService = {
  storeToken, loadToken, clearToken, login
};
