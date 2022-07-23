import { ApiResult, FailedApiResult, ZodApiError } from '../types/API';
import { BACKEND_URL } from '../utils/config';

let token: string | undefined = undefined;

function setToken(newToken: string): void {
  token = newToken;
}

function removeToken(): void {
  token = undefined;
}

async function get(path: string): Promise<ApiResult | FailedApiResult> {
  const fullUrl = `${BACKEND_URL}${path}`;
  const headers = makeHeaders();
  try {
    const response = await fetch(fullUrl, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: headers
    });
    const responseJson = await response.json();
    if (ZodApiError.safeParse(responseJson).success) {
      return {
        success: false,
        content: responseJson
      };
    }
    if (response.status === 200) {
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
  return {
    success: false,
    content: {
      error: 'unknown error'
    }
  };
}

async function post(path: string, content: unknown): Promise<ApiResult | FailedApiResult> {
  const fullUrl = `${BACKEND_URL}${path}`;
  const headers = makeHeaders();
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

function makeHeaders(): HeadersInit {
  let headers: HeadersInit;
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
  return headers;
}

export const API = {
  setToken, removeToken, get, post
};
