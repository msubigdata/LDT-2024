import { createContext } from "react";

import { type ReactNode } from "@tanstack/react-router";
import { clearAuthTokens, setAuthTokens } from "axios-jwt";

import { authRequests } from "@/api/auth";
import { useCheckAuth } from "@/hooks/auth";
import { type UserAuth } from "@/types/auth";

export interface AuthContext {
  login: (data: UserAuth) => void;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { authenticated } = useCheckAuth();

  const isAuthenticated = authenticated;

  const logout = async () => {
    await clearAuthTokens();
  };

  const login = async (data: UserAuth) => {
    const tokens = await authRequests.signIn.fn(data);

    await setAuthTokens({
      accessToken: tokens.access,
      refreshToken: tokens.refresh,
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
