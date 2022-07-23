import { ApiError, ApiResult, FailedApiResult, ZodApiError } from '../types/API';
import { BACKEND_URL } from '../utils/config';

async function post(path: string, content: unknown): Promise<ApiResult | FailedApiResult> {
  const fullUrl = `${BACKEND_URL}${path}`;
  try {
    const response = await fetch(fullUrl, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(content)
    });
    const responseJson = await response.json();
    if (ZodApiError.safeParse(responseJson)) {
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
  post
};
