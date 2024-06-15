import axios from "axios";
import { applyAuthTokenInterceptor, getBrowserLocalStorage } from "axios-jwt";
import { z } from "zod";

import type { IAuthTokens, TokenRefreshRequest } from "axios-jwt";

const BASE_URL = "/api";

export const authTokensSchema = z.object({
  refresh: z.string(),
  access: z.string(),
});

// 1. Create an axios instance that you wish to apply the interceptor to
export const axiosInstance = axios.create({ baseURL: BASE_URL });

// 2. Define token refresh function.
const requestRefresh: TokenRefreshRequest = async (
  refreshToken: string,
): Promise<IAuthTokens | string> => {
  // Important! Do NOT use the axios instance that you supplied to applyAuthTokenInterceptor (in our case 'axiosInstance')
  // because this will result in an infinite loop when trying to refresh the token.
  // Use the global axios client or a different instance
  const response = await axios.post(`${BASE_URL}/auth/token/refresh/`, { token: refreshToken });

  const tokens = await authTokensSchema.parseAsync(response.data);

  //   If your backend supports rotating refresh tokens, you may also choose to return an object containing both tokens:
  return {
    accessToken: tokens.access,
    refreshToken: tokens.refresh,
  };
};

// 3. Add interceptor to your axios instance
applyAuthTokenInterceptor(axiosInstance, { requestRefresh });

// New to 2.2.0+: initialize with storage: localStorage/sessionStorage/nativeStorage. Helpers: getBrowserLocalStorage, getBrowserSessionStorage
const getStorage = getBrowserLocalStorage;

// You can create you own storage, it has to comply with type StorageType
applyAuthTokenInterceptor(axiosInstance, { requestRefresh, getStorage });
