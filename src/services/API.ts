import { ApiError, ApiResult, FailedApiResult, ZodApiError } from '../types/API';
import { BACKEND_URL } from '../utils/config';

let token: string | undefined = undefined;

function setToken(newToken: string): void {
  token = newToken;
}

function removeToken(): void {
  token = undefined;
}

async function get(path: string): Promise<ApiResult | FailedApiResult> {
  return {
    success: true,
    content: {}
  };
}

async function post(path: string, content: unknown): Promise<ApiResult | FailedApiResult> {
  const fullUrl = `${BACKEND_URL}${path}`;
  let headers;
  if (token) {
    headers = {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${token}`
    };
  } else {
    headers = {
      'Content-Type': 'application/json'
    };
  }
  try {
    const response = await fetch(fullUrl, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: headers,
      body: JSON.stringify(content)
    });
    const responseJson = await response.json();
    if (ZodApiError.safeParse(responseJson).success) {
      return {
        success: false,
        content: responseJson
      };
    }
    if (response.status >= 200 && response.status < 300) {
      // status 2xx
      return {
        success: true,
        content: responseJson
      };
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        content: {
          error: `api failed: ${error.message}`
        }
      };
    }
  }
  // finally just return unknown failure
  return {
    success: false,
    content: {
      error: 'unknown error'
    }
  };
}

export const API = {
  setToken, removeToken, get, post
};
