import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { api, setUnauthorizedHandler } from "@/lib/api";
import { clearSession, loadSession, saveSession } from "@/lib/authStorage";
import { queryClient } from "@/lib/queryClient";
import {
  AuthContext,
  type AuthContextValue,
  type AuthUser,
} from "./AuthContext";

interface TokenResponse {
  accessToken: string;
  tokenType: string;
  expiresAt: string;
}

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const session = loadSession();
    return session ? { username: session.username } : null;
  });

  const endLocalSession = useCallback(() => {
    clearSession();
    queryClient.clear();
    setUser(null);
  }, []);

  useEffect(() => {
    setUnauthorizedHandler(endLocalSession);
    return () => setUnauthorizedHandler(null);
  }, [endLocalSession]);

  const login = useCallback(async (username: string, password: string) => {
    const { data } = await api.post<TokenResponse>("/v1/auth/login", {
      username,
      password,
    });

    saveSession({
      token: data.accessToken,
      username,
      expiresAt: data.expiresAt,
    });
    setUser({ username });
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post("/v1/auth/logout");
    } catch {
    } finally {
      endLocalSession();
    }
  }, [endLocalSession]);

  const value = useMemo<AuthContextValue>(
    () => ({ user, login, logout }),
    [user, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
